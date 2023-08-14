import ballerina/http;
import ballerinax/mongodb;
import ballerina/io;

type requestRecord record {
    json _id;
    string NIC;
    map<json> address;
    string status;
};

configurable string username = ?;
configurable string password = ?;

//SETUP mongoDB Connection
mongodb:ConnectionConfig mongoConfig1 = {
    connection: {
        url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`

    },
    databaseName: "GramaSewakaApp"
};
//Create a client
mongodb:Client mongoClient = check new (mongoConfig1);

//service for identity check
service /requests on new http:Listener(8080) {

    //Create entry for new request in database

    resource function post newRequest/[string NIC]/[string no]/[string street]/[string city]() returns boolean|error {

        json address = {
            "no": no,
            "street": street,
            "city": city
        };

        map<json> doc = {"NIC": NIC, "address": address, "status": "Pending"};

        error? resultData = check mongoClient->insert(doc, collectionName = "RequestDetails");

        if (resultData !is error) {
            return true;
        }
        return false;

    }

    resource function get getAllRequests() returns requestRecord[]|error {

        stream<requestRecord, error?> resultData = check mongoClient->find(collectionName = "RequestDetails");

        requestRecord[] allData = [];
        int index = 0;
        check resultData.forEach(function(requestRecord data) {

            allData[index] = data;
            index += 1;

            io:println(data.NIC);
            io:println(data.address);
            io:println(data.status);

        });

        return allData;

    }

    resource function put updateStatus/[string NIC]/[string status]() returns int|error {

        map<json> queryString = {"$set": {"status": status}};
        map<json> filter = {"NIC": NIC};

        int|error resultData = check mongoClient->update(queryString, "RequestDetails", filter = filter);

        return resultData;
    }
}

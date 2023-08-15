import ballerina/http;
import ballerinax/mongodb;
import ballerina/io;

type Request record {
    string _id;
    string NIC;
    json address;
    string status = "Pending";
};

configurable string username = ?;
configurable string password = ?;

// Create connection
mongodb:ConnectionConfig mongoConfig = {
    connection: {
        url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net`
    },
    databaseName: "GramaSewakaApp"
};

// Create a client
mongodb:Client mongoClient = check new (mongoConfig);


@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"], // Replace with your frontend URL
        allowMethods: ["*"], // Include any other methods you need
        allowHeaders: ["*"], // Include headers you need
        allowCredentials: true
    }
}



service /sendRequest on new http:Listener(9090) {
    @http:ResourceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000/"],
        allowCredentials: true,
        allowMethods: ["GET","POST","PUT","DELETE"]
    }
}

    resource function post saveRequestData(string NIC, string no, string street, string city) returns string | error {

        string status = "Pending";
        
        json address = {
            "no": no,
            "street": street,
            "city": city
        };
        
        map<json> request = {
            _id: "",
            NIC: NIC,
            address: address,
            status: status
        };
        
        error? insertResult = check mongoClient->insert(request, "RequestDetails");
        
        if (insertResult == null) {
            return "Data saved successfully";
        } else {
            return "Error saving data";
        }
    }
    
    resource function get getAllRequests() returns Request[] | error {
        stream<Request, error?> resultData = check mongoClient->find(collectionName = "RequestDetails");

        Request[] allData = [];
        int index = 0;
        
        check resultData.forEach(function(Request data) {
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

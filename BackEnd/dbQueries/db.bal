import ballerina/http;
import ballerinax/mongodb;
import ballerina/io;
import ballerina/time;

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
type ValidationResponse record {|
    boolean identityVerificationStatus;
    boolean addressVerificationStatus;
    boolean policeVerificationStatus;
|};

type ErrorDetails record {|
    time:Utc timeStamp;
    string message;
    string details;
|};

type AddressResponse record {
    string NIC;
    Address address;
};

type ValidationRequest record {
    string NIC;
    Address address;
};

type Address record {
    string no;
    string street;
    string city;
};

type Person record {
    string firstName;
    string lastName;
    string NIC;
    Address address;
    string civilStatus;
    string dob;
};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

type PoliceResponse record {
    string status;
    CRecord[] records;
};

type CRecord record {
    string NIC;
    string criminalRecord;
    string confirmedStation;
};

type AddressRequest record {
    string NIC;
    Address address;
};

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

    resource function post validate(@http:Payload ValidationRequest request) returns ValidationResponse|UserNotFound|error? {
        http:Client http_client = check new ("http://identity-check-service-3223962601:9090/identity/verify");
        Person|error person = http_client->/nic/[request.NIC];
        ValidationResponse val_response = {
            identityVerificationStatus: true,
            addressVerificationStatus: true,
            policeVerificationStatus: true
        };
        if person is error {
            val_response.identityVerificationStatus = false;
            return person;
        }

        http_client = check new ("http://police-check-service-313503678:8090/police/verify");
        PoliceResponse pol_response = check http_client->/PoliceVerification/[request.NIC];
        if pol_response.status == "failed" {
            val_response.policeVerificationStatus = false;
        }
        http_client = check new ("http://address-check-service-622955183:8070/address/verify");
        AddressRequest addressRequest = {
            NIC: request.NIC,
            address: request.address
        };
        AddressResponse|error address_response = http_client->/.post(addressRequest);
        if address_response is error {
            val_response.addressVerificationStatus = false;
        }

        if val_response.identityVerificationStatus == true && val_response.policeVerificationStatus == true && val_response.addressVerificationStatus == true {
            map<json> queryString = {"$set": {"status": "APPROVED"}};
            map<json> filter = {"NIC": request.NIC};
            _ = check mongoClient->update(queryString, "RequestDetails", filter = filter);

        }
        else {
            map<json> queryString = {"$set": {"status": "REJECTED"}};
            map<json> filter = {"NIC": request.NIC};
            _ = check mongoClient->update(queryString, "RequestDetails", filter = filter);
        }
        return val_response;

    }
}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `uri = ${path}`};
}

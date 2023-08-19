import ballerina/http;
import ballerinax/mongodb;
import ballerina/io;
import ballerina/time;

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

service /requests on new http:Listener(8080) {

    //Create entry for new request in database

    resource function post newRequest/[string NIC]/[string no]/[string street]/[string city]() returns boolean|error {

        json address = {
            "no": no,
            "street": street,
            "city": city
        };

        map<json> doc = {
            "NIC": NIC,
            "address": address,
            "identityVerificationStatus": false,
            "addressVerificationStatus": false,
            "policeVerificationStatus": false,
            "validationResult": "PENDING"
        };

        error? resultData = check mongoClient->insert(doc, collectionName = "RequestDetails");

        if (resultData !is error) {
            return true;
        }
        return false;

    }

    resource function get police\-report/[string nic]() returns PoliceResponse|error {
        http:Client http_client = check new ("http://police-check-service-313503678:8090/police/verify");
        PoliceResponse pol_response = check http_client->/PoliceVerification/[nic];
        return pol_response;
    }

    resource function get status/[string NIC]() returns ValidationResponse|NoRequestFoundError|error {

        map<json> queryString = {"NIC": NIC};
        stream<ValidationResponse, error?>|error resultData = check mongoClient->find(collectionName = "RequestDetails", filter = queryString);

        if resultData is error {
            return resultData;
        }
        var val = resultData.next();
        if val is error? {
            ErrorDetails errorDetails = buildErrorPayload(string `NIC: ${NIC}`, string `requests/status`);
            NoRequestFoundError noRequestFoundError = {
                body: errorDetails
            };
            return noRequestFoundError;
        }
        ValidationResponse[] reqs = from ValidationResponse req in val
            select req;

        return reqs[0];
    }

    resource function get getAllRequests() returns ValidationResponse[]|error {

        stream<ValidationResponse, error?> resultData = check mongoClient->find(collectionName = "RequestDetails");

        ValidationResponse[] allData = [];
        int index = 0;
        check resultData.forEach(function(ValidationResponse data) {

            allData[index] = data;
            index += 1;

            io:println(data.NIC);
            io:println(data.address);

        });

        return allData;

    }

    resource function put updateStatus/[string NIC]/[string status]() returns int|error {

        map<json> queryString = {"$set": {"status": status}};
        map<json> filter = {"NIC": NIC};

        int|error resultData = check mongoClient->update(queryString, "RequestDetails", filter = filter);

        return resultData;
    }

    resource function get validate/[string nic]() returns ValidationResponse|VerificationFailError|error? {
        http:Client http_client = check new ("http://identity-check-service-3223962601:9090/identity/verify");

        map<json> queryString1 = {"NIC": nic};

        stream<ValidationResponse, error?>|error resultData = check mongoClient->find(collectionName = "RequestDetails", filter = (queryString1));

        if resultData is error {
            return resultData;
        }
        var val = resultData.next();
        if val is error? {
            ErrorDetails errorDetails = buildErrorPayload(string `NIC: ${nic}`, string `requests/validate`);
            VerificationFailError verificationFailError = {
                body: errorDetails
            };
            return verificationFailError;
        }

        ValidationResponse[] res = from ValidationResponse resp in val
            select resp;
        ValidationResponse response = res[0];
        ValidationResponse val_response = {
            NIC: response.NIC,
            address: response.address,
            identityVerificationStatus: true,
            addressVerificationStatus: true,
            policeVerificationStatus: true,
            validationResult: "APPROVED"
        };
        Person|error person = http_client->/nic/[nic];

        if person is error {
            val_response.identityVerificationStatus = false;

        }

        http_client = check new ("http://police-check-service-313503678:8090/police/verify");
        PoliceResponse pol_response = check http_client->/PoliceVerification/[nic];
        if pol_response.status == "failed" {
            val_response.policeVerificationStatus = false;
        }
        http_client = check new ("http://address-check-service-622955183:8070/address/verify");
        AddressRequest addressRequest = {
            NIC: response.NIC,
            address: response.address
        };
        AddressResponse|error address_response = http_client->/.post(addressRequest);
        if address_response is error {
            val_response.addressVerificationStatus = false;
        }

        string val_result = val_response.identityVerificationStatus && val_response.addressVerificationStatus && response.policeVerificationStatus ? "APPROVED" : "REJECTED";
        val_response.validationResult = val_result;
        map<json> queryString = {"$set": {"identityVerificationStatus": val_response.identityVerificationStatus, "addressVerificationStatus": val_response.addressVerificationStatus, "policeVerificationStatus": val_response.policeVerificationStatus, validationResult: "REJECTED"}};
        map<json> filter = {"NIC": nic};
        _ = check mongoClient->update(queryString, "RequestDetails", filter = filter);

        return val_response;

    }
}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `uri = ${path}`};
}

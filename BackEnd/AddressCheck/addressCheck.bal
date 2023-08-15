import ballerina/http;
import ballerinax/mongodb;
import ballerina/time;

configurable string username = ?;
configurable string password = ?;

service /address/verify on new http:Listener(8070) {

    // Check whether Address exists or not
    resource function post .(@http:Payload AddressRequest addressRequest) returns AddressResponse|VerificationFailError|error {
        // Set up MongoDB Connection
        mongodb:ConnectionConfig mongoConfig = {
            connection: {
                url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`
            },
            databaseName: "GramaSewakaApp"
        };

        // Create a Client
        mongodb:Client mongoClient = check new (mongoConfig);

        json filterJson = addressRequest.toJson();

        // Define query filter
        map<json> queryFilter = {
            "NIC": check filterJson.NIC,
            "address": check filterJson.address
        };

        // Execute find operation with the query filter
        stream<AddressResponse, error?>|error resultData = check mongoClient->find(
            collectionName = "AddressDetails",
            filter = (queryFilter)
        );

        if resultData is error {
            return resultData;
        }
        var val = resultData.next();
        if val is error? {
            ErrorDetails errorDetails = buildErrorPayload(string `NIC: ${addressRequest.NIC}`, string `address/verify`);
            VerificationFailError verificationFailError = {
                body: errorDetails
            };
            return verificationFailError;
        }
        AddressResponse[] addressRes = from AddressResponse address in val
            select address;

        return addressRes[0];

    }
}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `uri = ${path}`};
}

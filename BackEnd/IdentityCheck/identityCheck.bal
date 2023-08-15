import ballerina/http;
import ballerinax/mongodb;
import ballerina/time;

configurable string username = ?;
configurable string password = ?;

//SETUP mongoDB Connection
mongodb:ConnectionConfig mongoConfig = {
    connection: {
        url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`

    },
    databaseName: "GramaSewakaApp"
};
//Create a client
mongodb:Client mongoClient = check new (mongoConfig);

//service for identity check
service /identity/verify on new http:Listener(9090) {

    //Check whether the NIC exists or not
    resource function get nic/[string NIC]() returns Person|VerificationFailError|error? {

        map<json> queryString = {"NIC": NIC};
        stream<Person, error?>|error resultData = check mongoClient->find(collectionName = "People", filter = (queryString));
        if resultData is error {
            return resultData;
        }

        var val = resultData.next();
        if val is error? {
            ErrorDetails errorDetails = buildErrorPayload(string `NIC: ${NIC}`, string `address/verify`);
            VerificationFailError verificationFailError = {
                body: errorDetails
            };
            return verificationFailError;
        }
        Person[] persons = from Person person in val
            select person;

        return persons[0];

    }

}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `uri = ${path}`};
}


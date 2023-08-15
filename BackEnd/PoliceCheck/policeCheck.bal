import ballerina/http;
import ballerinax/mongodb;

import ballerina/time;

// import ballerina/io;

type CRecord record {
    string NIC;
    string criminalRecord;
    string confirmedStation;
};

type PoliceResponse record {
    string status;
    CRecord[] records;
};

configurable string username = ?;
configurable string password = ?;

//service for identity check
service /police/verify on new http:Listener(8090) {

    resource function get PoliceVerification/[string NIC]() returns PoliceResponse|error {

        //SETUP mongoDB Connection
        mongodb:ConnectionConfig mongoConfig1 = {
            connection: {
                url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`
            },
            databaseName: "GramaSewakaApp"
        };
        //Create a client
        mongodb:Client mongoClient = check new (mongoConfig1);

        map<json> queryString = {"NIC": NIC};
        stream<CRecord, error?>|error resultData = check mongoClient->find(collectionName = "PoliceDetails", filter = (queryString));
        if resultData is error {
            return resultData;
        }

        int count = 0;
        PoliceResponse policeResponse = {
            status: "failed",
            records: []
        };

        check resultData.forEach(function(CRecord data) {
            count += 1;
            policeResponse.records.push(data);
        });
        if count == 0 {
            policeResponse.status = "success";
        }
        return policeResponse;

    }

}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `uri = ${path}`};
}


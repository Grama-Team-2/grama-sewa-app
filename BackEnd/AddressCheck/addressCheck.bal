import ballerina/http;
import ballerinax/mongodb;

type AddressStatus record {
    json _id;
    string NIC;
    json address;

};

configurable string username = ?;
configurable string password = ?;

// Define service for address check
service /AddressVerify on new http:Listener(8070) {
    // Check whether Address exists or not
    resource function get AddressVerification/[string NIC]/[string no]/[string street]/[string city]() returns boolean|error {
        // Set up MongoDB Connection
        mongodb:ConnectionConfig mongoConfig = {
            connection: {
                url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`
            },
            databaseName: "GramaSewakaApp"
        };

        // Create a Client
        mongodb:Client mongoClient = check new (mongoConfig);

        // Define the address JSON object
        json address = {
            "no": no,
            "street": street,
            "city": city
        };

        // Define query filter
        map<json> queryFilter = {
            "NIC": NIC,
            "address": address
        };

        // Execute find operation with the query filter
        stream<AddressStatus, error?> resultData = check mongoClient->find(
            collectionName = "AddressDetails",
            filter = (queryFilter)
        );

        // Check if data exists
        var status = resultData.next();

        if (status !is error?) {
            return true;
        }

        return false;
    }
}

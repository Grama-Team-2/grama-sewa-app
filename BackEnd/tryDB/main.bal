// import ballerina/io;

import ballerinax/mongodb;
// import ballerina/io;


configurable string username =?;
configurable string password =?;

//SETUP mongoDB Connection
mongodb:ConnectionConfig mongoConfig = {
    connection: {
        url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`
        
        // auth: {
        //     username: "nirasha",
        //     password: "joA7NPBXE0vi9uVr"
        // },
        // options: {
        //     sslEnabled: false,
        //     serverSelectionTimeout: 5000
        // }
    },
    databaseName: "GramaSewakaApp"
};

//Create a client
mongodb:Client mongoClient = check new (mongoConfig);

//Data Type to store records
type definetype record {
    string firstName;
    string lastName;
    int age;

    //more to come : TODO

};

public function main() returns error? {

    
    
    // string collection = "People";
    // map<json> doc = { "firstName": "John", "lastName": "Doe", "age" : 25 , "NIC": "9988"};

    // check mongoClient->insert(doc, collection);

    // stream<definetype, error?> resultData = check mongoClient->find(collectionName = "People");
        

    // check resultData.forEach(function(definetype datas){
    //         io:println(datas.firstName.toString());
    //         io:println(datas.lastName.toString());
    //         // log:println(datas.age.toString());
    // });

   




}

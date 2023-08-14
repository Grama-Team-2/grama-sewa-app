import ballerina/http;
import ballerinax/mongodb;
// import ballerina/io;


type User record {
    json _id;
    string firstName;
    string lastName;
    int age;
    string NIC;
};


configurable string username =?;
configurable string password =?;


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
service /IdentityVerify on new http:Listener(9090) {


    //Check whether the NIC exists or not
    resource function get NIC_check/[string NIC]() returns boolean|error? {
        
        boolean valid = false;
        map<json> queryString = {"NIC": NIC };
        stream<User, error?> resultData = check mongoClient->find(collectionName = "People",filter = (queryString));
    
        check resultData.forEach(function(User datas){
                
                // io:println(datas.NIC);
                // io:println(resultData.count());
                valid = true;
                
        });
        return valid;
    }


}





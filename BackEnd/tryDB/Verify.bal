import ballerina/http;
import ballerinax/mongodb;
// import ballerina/io;



type PoliceStatus record {
    json _id;
    string CriminalRecords;
    string NIC;
};

type User record {
    json _id;
    string firstName;
    string lastName;
    int age;
    string NIC;
};



// configurable string username =?;
// configurable string password =?;



//SETUP mongoDB Connection
mongodb:ConnectionConfig mongoConfig3 = {
    connection: {
        url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`
        
    },
    databaseName: "GramaSewakaApp"
};
//Create a client
mongodb:Client mongoClient3 = check new (mongoConfig3);




//service for identity check
service /Verify on new http:Listener(9090) {


    //Check whether the NIC exists or not
    

    resource function get PoliceVerification/[string NIC]() returns boolean|error {
        
        
        map<json> queryString = {"NIC": NIC ,"CriminalRecords":"NO"};
        stream<PoliceStatus, error?> resultData = check mongoClient->find(collectionName = "PoliceDetails",filter = (queryString));
        // boolean valid = false;
        var var1= resultData.next();
        if(var1 !is error?){
            return true;
        }
        return false;
        // if var1==""{
        //     return false;
        // }

        // else{
        //     return false;
        // }
        // check resultData.forEach( isolated function(PoliceStatus datas) {
                
        //         // io:println(datas.NIC);
                
        //         if datas.CriminalRecords=="YES" {
        //             valid = false;
        //             // return false;
        //         }

        //         if datas.CriminalRecords=="NO" {
        //             // valid = true;
        //             return true;
        //         }
        //         io:println(datas.CriminalRecords);
                
                
        // });
        // return valid;
        
    }

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




    // //Retieve Data from database
    // resource function get users() returns User[]|error? {

    //     stream<User, error?> resultData = check mongoClient->find(collectionName = "People");
    //     User[] variable = [];
    //     check resultData.forEach(function(User datas){
    //         io:println(datas.firstName.toString());
    //         io:println(datas.lastName.toString());
    //         variable.push(datas);
    //         // log:println(datas.age.toString());
    //     });
        
    //     return variable;
        
    
    // }


}





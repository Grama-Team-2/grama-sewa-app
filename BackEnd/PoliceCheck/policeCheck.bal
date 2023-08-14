import ballerina/http;
import ballerinax/mongodb;
// import ballerina/io;



type PoliceStatus record {
    json _id;
    string CriminalRecords;
    string NIC;
};




configurable string username =?;
configurable string password =?;




//service for identity check
service /PoliceVerify on new http:Listener(8090) {
    

    


    //Check whether the NIC exists or not
    

    resource function get PoliceVerification/[string NIC]() returns boolean|error {
        
        //SETUP mongoDB Connection
        mongodb:ConnectionConfig mongoConfig1 = {
            connection: {
                url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`
                
            },
            databaseName: "GramaSewakaApp"
        };
        //Create a client
        mongodb:Client mongoClient = check new (mongoConfig1);

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

    

}





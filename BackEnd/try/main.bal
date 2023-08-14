import ballerina/http;
// import ballerinax/mongodb;
// import ballerina/io;



type PoliceStatus record {
    json _id;
    string CriminalRecords;
    string NIC;
};




// configurable string username =?;
// configurable string password =?;




//service for identity check
service /PoliceVerify on new http:Listener(8090) {
    

    


    //Check whether the NIC exists or not
    

    resource function get PoliceVerification/[string NIC]() returns boolean|error {
        
        
        return true;
       
                
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





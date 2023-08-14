import ballerina/http;
import ballerina/io;




//main API
service / on new http:Listener(9090) {


    //Check whether the NIC exists or not
    resource function get PoliceVerify/[string NIC]() returns boolean|error? {
        
        // http://police-1437909295:8090/PoliceVerify
        int val = 123;


        http:Client policeClient = check new (string `http://police-1437909295:8090/PoliceVerify${val}`);

        boolean policeVerify = check policeClient->/PoliceVerify;
        io:println( policeVerify);

        return true;
    }


}





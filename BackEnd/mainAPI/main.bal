import ballerina/http;


//main API
service / on new http:Listener(9090) {


    //Check whether the NIC exists or not
    resource function get PoliceVerify/[string NIC]() returns boolean|error? {
        
        // http://police-1437909295:8090/PoliceVerify

        http:Client policeClient = check new ("http://police-1437909295:8090/PoliceVerify");

    
        // boolean policeVerify = check policeClient->/PoliceVerify${123};
        // io:println("GET request:" + policeVerify);

        return true;
    }


}





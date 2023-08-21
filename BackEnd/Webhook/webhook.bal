import ballerinax/trigger.asgardeo;
import ballerina/http;
import ballerina/log;
import ballerina/regex;
// import ballerina/io;
// import ballerina/json;

import ballerinax/scim;

// import ballerina/regex;


configurable asgardeo:ListenerConfig config = ?;
configurable string org = ?;
configurable string client_id = ?;
configurable string client_secret = ?;
configurable string group_name = ?;
listener http:Listener httpListener = new (8090);
listener asgardeo:Listener webhookListener = new (config, httpListener);

//To make phone number starting with country code
//Map country with the code
map<string> countryCodes = {
        "\"Sri Lanka\"": "+94",
        "\"United States\"": "+1",
        "\"Canada\"": "+1",
        "\"United Kingdom\"": "+44",
        "\"India\"": "+91"

        // Add more country mappings as needed
};

scim:ConnectorConfig config1 = {
    orgName: org,
    clientId: client_id,
    clientSecret: client_secret,
    scope: [
        "internal_user_mgt_view",
        "internal_user_mgt_list",
        "internal_user_mgt_create",
        "internal_user_mgt_update",
        "internal_user_mgt_delete",
        "internal_group_mgt_view",
        "internal_group_mgt_create",
        "internal_group_mgt_update",
        "internal_group_mgt_delete"
    ]
};

type Message record {
    string fromMobile;
    string toMobile;
    string content;
};

string MESSAGE_TEMPLATE = "Hi USER_NAME, Welcome to Grama Assist!";

service asgardeo:RegistrationService on webhookListener {

    remote function onAddUser(asgardeo:AddUserEvent event) returns error? {


        scim:Client client1 = check new (config1);

        log:printInfo(string `The add user webhook activated`);

        //Needed to change this to read only and make a new scope as "internal_user_mgt_view" to make getUser work
        final string & readonly userId = <string>event?.eventData?.userId;
        log:printInfo(string `user name found: ${userId}`);

        scim:UserResource|scim:ErrorResponse|error user = check client1->getUser(userId);
        //this will be having all data of the user
        json allData ={};
        //phone number will be stored
        string phone = "+17069898836";

        if user is error {
            log:printInfo(string ` ${user.toBalString()} `);

        }
        else {
            log:printInfo(user.toBalString());
            scim:Phone[]? phoneNumber = user.phoneNumbers;
            //retrieve phone number
            json[] toMobile = check phoneNumber.first().cloneWithType();

            //Get all user data- to get the country
            allData = check user.cloneWithType();

            // Check if the JSON array has elements
            if (toMobile.length() > 0) {
                // Access the "value" field of the first element
                
                string value = (check toMobile[0].value).toBalString();
                log:printInfo("Value: " + value);
                
                string country = (check allData.urn\:scim\:wso2\:schema.country).toBalString();
                log:printInfo("Country: " + country);

                //setting up the country code
                string? countryCode = countryCodes[country];
                if countryCode is (){
                    countryCode="0";
                }
                else{
                    log:printInfo("countryCode: " + countryCode);
                }
                //made up the phone number correctly
                phone = <string> countryCode + value.substring(2,value.length()-1);
                log:printInfo("phone: " + phone);


            } else {
                log:printInfo("No elements found in the JSON array.");
            }

            

        }
        
        string userName = <string>event?.eventData?.userName;
        log:printInfo(string `user name found: ${userName}`);
        string|error groupId = getGroupIdByName(group_name);
        if groupId is error {
            return groupId;
        }
        scim:GroupPatch patchData = {
            schemas: [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            Operations: [
                {
                    op: "add",
                    value: {
                        members: [
                            {value: userId, display: userName}
                        ]
                    }
                }
            ]
        };
        scim:GroupResponse|scim:ErrorResponse|error patchResponse = client1->patchGroup(groupId, patchData);

        if (patchResponse is scim:ErrorResponse) {
            log:printError(patchResponse.toString());
            log:printError(string `Error setting User : ${userId} to Group : ${groupId}`);
        } else {
            log:printInfo(string `User : ${userId} assigned to Group : ${groupId}`);
        }
        
        
        //Retrieve user name for welcome message
        string givenName = (check allData.name.givenName).toBalString();
        givenName = givenName.substring(1,givenName.length()-1);
        //made up the welcome message
        string cuurentMSG = regex:replace(MESSAGE_TEMPLATE,"USER_NAME",givenName);
        
    
        Message newmsg = {
            content: cuurentMSG,
            fromMobile: "+17069898836",
            toMobile: phone

        };
        
        //sending the message
        http:Client clientEndpoint = check new ("http://twilio-service-2012579124:2020/twilio");
        http:Response res = check clientEndpoint->/sms.post(newmsg);
        

        log:printInfo(string `${res.statusCode}`);

        log:printInfo(string `success !!! `);

        

    }

    remote function onConfirmSelfSignup(asgardeo:GenericEvent event) returns error? {
        log:printInfo(event.toJsonString());
    }
    remote function onAcceptUserInvite(asgardeo:GenericEvent event) returns error? {
        log:printInfo(event.toJsonString());
    }
}

service /ignore on httpListener {
}

function getGroupIdByName(string name) returns string|error {
    scim:Client client1 = check new (config1);

    scim:GroupSearch groupSearchQuery = {filter: string `displayName eq ${name}`};
    scim:GroupResponse|scim:ErrorResponse|error groupResponse = client1->searchGroup(groupSearchQuery);
    if (groupResponse is scim:GroupResponse) {
        if (groupResponse.totalResults != 0) {
            scim:GroupResource[] groups = <scim:GroupResource[]>groupResponse.Resources;
            return <string>groups[0].id; // GroupId should be there if a group is found
        } else {
            return error(string `No groups foundfor${name}`);
        }
    }
    else if (groupResponse is scim:ErrorResponse) {
        return error(string `SCIM Error : ${groupResponse.detail().toJsonString()}`);

    }
    else {
        return groupResponse;
    }
}

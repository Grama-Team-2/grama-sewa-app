import ballerinax/trigger.asgardeo;
import ballerina/http;
import ballerina/log;
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
        // scim:UserResource|scim:ErrorResponse|error user = check client1->getUser(userId);

        log:printInfo(string `The add user webhook activated`);

        //Needed to change this to read only and make a new scope as "internal_user_mgt_view" to make getUser work
        final string & readonly userId = <string>event?.eventData?.userId;
        log:printInfo(string `user name found: ${userId}`);

        scim:UserResource|scim:ErrorResponse|error user = check client1->getUser(userId);
        string phone = "+94713345285";
        if user is error {
            log:printInfo(string ` ${user.toBalString()} `);

        }
        else {
            log:printInfo(user.toBalString());
            scim:Phone[]? phoneNumber = user.phoneNumbers;
            // scim:Address[]? Address = user.addresses;
            
            
            json[] toMobile = check phoneNumber.first().cloneWithType();
            json allData = check user.cloneWithType();

            // string country = Address.first().toBalString();
            // "urn:scim:wso2:schema"
            
            // log:printInfo("Country: " + country);

            // Check if the JSON array has elements
            if (toMobile.length() > 0) {
                // Access the "value" field of the first element
                // string value = toMobile.;
                string value = (check toMobile[0].value).toBalString();
                log:printInfo("Value: " + value);
                // string path ="urn\:scim\:wso2\:schema";
                string country = (check allData.urn\:scim\:wso2\:schema.country).toBalString();
                log:printInfo("Country: " + country);

                phone = value;

            } else {
                log:printInfo("No elements found in the JSON array.");
            }

            // log:printInfo(string ` ${phoneNumber.first().toBalString()} `);
            // foreach var Number in phoneNumber {
            //     log:println(name);
            // }

        }

        string userName = <string>event?.eventData?.userName;
        // string userName2 = <string>event?.eventData?.;
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
        // scim:UserResource|scim:ErrorResponse|error user = check client1->getUser(userId);
        // try{
        //     scim:UserResource|scim:ErrorResponse|error user = check client1->getUser(userId);

        // }
        // catch{
        //     continue;
        // }

        // scim:UserResource|scim:ErrorResponse|error user2 = check client1->getUser(userId);
        // log:printInfo(string ` ${user} `);

        // scim:Phone[]? phoneNumber = user.phoneNumbers;

        // scim:Phone[]? phoneNumbers = user?.phoneNumbers;

        // log:printInfo(string ` ${phoneNumber} `);

        // if phoneNumbers is () {
        //     return;
        // }
        // else{
        
            Message newmsg = {
                content: MESSAGE_TEMPLATE,
                fromMobile: "+17069898836",
                toMobile: phone

        };
        // map<json> msg ={
        //     "content": "string",
        //     "fromMobile": "+17069898836",
        //     "toMobile": "+94752958651"
        //     };
        // var msg2 = msg.toJson();

        // log:printInfo(msg2);
        http:Client clientEndpoint = check new ("http://twilio-service-2012579124:2020/twilio");
        http:Response res = check clientEndpoint->/sms.post(newmsg);
        // log:printInfo(check res.getTextPayload());

        log:printInfo(string `${res.statusCode}`);

        log:printInfo(string `success !!! `);

        // }

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

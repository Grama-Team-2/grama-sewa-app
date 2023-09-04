import ballerina/http;
import ballerinax/mongodb;
import ballerina/io;
import ballerina/time;
import ballerinax/scim;
import ballerina/log;
import ballerina/regex;

configurable string username = ?;
configurable string password = ?;
configurable string org = ?;
configurable string client_id = ?;
configurable string client_secret = ?;

string MESSAGE_TEMPLATE = "Hi USER_NAME,Your request has been STATUS!";

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

//SETUP mongoDB Connection
mongodb:ConnectionConfig mongoConfig1 = {
    connection: {
        url: string `mongodb+srv://${username}:${password}@cluster0.sg7wemt.mongodb.net/?retryWrites=true&w=majority`

    },
    databaseName: "GramaSewakaApp"
};
//Create a client
mongodb:Client mongoClient = check new (mongoConfig1);

type GSRequest record {|
    string sender;
    string NIC;
    Address address;

|};
type StatusRequest record {|
    string sender;
    string NIC;


|};

service /requests on new http:Listener(8080) {

    resource function post newRequest(@http:Payload GSRequest request) returns boolean|error {

        map<json> doc = {
            "sender": request.sender,
            "NIC": request.NIC,
            "address": request.address.toJson(),
            "identityVerificationStatus": false,
            "addressVerificationStatus": false,
            "policeVerificationStatus": false,
            "validationResult": "PENDING"
        };

        error? resultData = check mongoClient->insert(doc, collectionName = "RequestDetails");

        if (resultData !is error) {
            return true;
        }
        return false;

    }

    resource function get police\-report/[string nic]() returns PoliceResponse|error {
        http:Client http_client = check new ("http://police-check-service-313503678:8090/police/verify");
        PoliceResponse pol_response = check http_client->/PoliceVerification/[nic];
        return pol_response;
    }

    resource function post address\-report(@http:Payload AddressRequest addressRequest) returns AddressResponse|VerificationFailError|error {
        http:Client http_client = check new ("http://address-check-service-622955183:8070/address/verify");
        AddressResponse|error address_response = http_client->/.post(addressRequest);
        if address_response is error|VerificationFailError {
            return address_response;
        }
        return address_response;
    }
    resource function get identity\-report/nic/[string nic]() returns Person|VerificationFailError|error? {
        http:Client http_client = check new ("http://identity-check-service-3223962601:9090/identity/verify");
        Person|error person = http_client->/nic/[nic];

        if person is VerificationFailError|error {
            return person;
        }
        return person;
    }
    resource function get status/[string NIC]/[string sender]() returns ValidationResponse|NoRequestFoundError|error {

        map<json> queryString = {"NIC": NIC, "sender":sender};
        stream<ValidationResponse, error?>|error resultData = check mongoClient->find(collectionName = "RequestDetails", filter = queryString);

        if resultData is error {
            return resultData;
        }
        var val = resultData.next();
        if val is error? {
            ErrorDetails errorDetails = buildErrorPayload(string `NIC: ${NIC}`, string `requests/status`);
            NoRequestFoundError noRequestFoundError = {
                body: errorDetails
            };
            return noRequestFoundError;
        }
        ValidationResponse[] reqs = from ValidationResponse req in val
            select req;

        return reqs[0];
    }

    resource function get getAllRequests() returns ValidationResponse[]|error {

        stream<ValidationResponse, error?> resultData = check mongoClient->find(collectionName = "RequestDetails");

        ValidationResponse[] allData = [];
        int index = 0;
        check resultData.forEach(function(ValidationResponse data) {

            allData[index] = data;
            index += 1;

            io:println(data.NIC);
            io:println(data.address);

        });

        return allData;

    }

    resource function put updateStatus/[string NIC]/[string status]() returns int|error {

        map<json> queryString = {"$set": {"status": status}};
        map<json> filter = {"NIC": NIC};

        int|error resultData = check mongoClient->update(queryString, "RequestDetails", filter = filter);

        return resultData;
    }

    resource function get validate/[string nic]() returns ValidationResponse|VerificationFailError|error? {
        http:Client http_client = check new ("http://identity-check-service-3223962601:9090/identity/verify");

        map<json> queryString1 = {"NIC": nic};

        stream<ValidationResponse, error?>|error resultData = check mongoClient->find(collectionName = "RequestDetails", filter = (queryString1));

        if resultData is error {
            return resultData;
        }
        var val = resultData.next();
        if val is error? {
            ErrorDetails errorDetails = buildErrorPayload(string `NIC: ${nic} not found`, string `requests/validate`);
            VerificationFailError verificationFailError = {
                body: errorDetails
            };
            return verificationFailError;
        }

        ValidationResponse[] res = from ValidationResponse resp in val
            select resp;
        ValidationResponse response = res[0];
        ValidationResponse val_response = {
            NIC: response.NIC,
            address: response.address,
            identityVerificationStatus: true,
            addressVerificationStatus: true,
            policeVerificationStatus: true,
            validationResult: "APPROVED",
            sender: response.sender
        };
        Person|error person = http_client->/nic/[nic];

        if person is error {
            val_response.identityVerificationStatus = false;
        }

        http_client = check new ("http://police-check-service-313503678:8090/police/verify");
        PoliceResponse pol_response = check http_client->/PoliceVerification/[nic];
        if pol_response.status == "failed" {
            val_response.policeVerificationStatus = false;
        }
        http_client = check new ("http://address-check-service-622955183:8070/address/verify");
        AddressRequest addressRequest = {
            NIC: response.NIC,
            address: response.address
        };
        AddressResponse|error address_response = http_client->/.post(addressRequest);
        if address_response is error {
            val_response.addressVerificationStatus = false;
        }

        string val_result = val_response.identityVerificationStatus && val_response.addressVerificationStatus && response.policeVerificationStatus ? "APPROVED" : "REJECTED";
        val_response.validationResult = val_result;
        io:println(val_response.validationResult);
        io:println(val_result);
        map<json> queryString = {"$set": {"identityVerificationStatus": val_response.identityVerificationStatus, "addressVerificationStatus": val_response.addressVerificationStatus, "policeVerificationStatus": val_response.policeVerificationStatus, validationResult:  val_response.validationResult}};
        map<json> filter = {"NIC": nic};
        _ = check mongoClient->update(queryString, "RequestDetails", filter = filter);

        scim:Client client1 = check new (config1);
        scim:UserResource|scim:ErrorResponse|error user = check client1->getUser(response.sender);
        //this will be having all data of the user
        json allData = {};
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
                if countryCode is () {
                    countryCode = "0";
                }
                else {
                    log:printInfo("countryCode: " + countryCode);
                }
                //made up the phone number correctly
                phone = <string>countryCode + value.substring(2, value.length() - 1);
                log:printInfo("phone: " + phone);

            } else {
                log:printInfo("No elements found in the JSON array.");
            }

        }

        //Retrieve user name for welcome message
        string givenName = (check allData.name.givenName).toBalString();
        givenName = givenName.substring(1, givenName.length() - 1);
        //made up the welcome message
        string nameReplacedMsg = regex:replace(MESSAGE_TEMPLATE, "USER_NAME", givenName);
        string finalMessage = regex:replace(nameReplacedMsg, "STATUS", val_response.validationResult);
        Message newmsg = {
            content: finalMessage,
            fromMobile: "+17069898836",
            toMobile: phone

        };

        //sending the message
        http:Client clientEndpoint = check new ("http://twilio-service-2012579124:2020/twilio");
        http:Response _ = check clientEndpoint->/sms.post(newmsg);

        return val_response;

    }
}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `uri = ${path}`};
}

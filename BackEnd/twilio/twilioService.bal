import ballerina/http;
import ballerina/log;
import ballerinax/twilio;

configurable string accountSId = ?;
configurable string authToken = ?;

// string MESSAGE_TEMPLATE = "Hi {USER_NAME}, Welcome to Grama Assist!";

type Message record {
    string fromMobile;
    string toMobile;
    string content;
};

twilio:ConnectionConfig twilioConfig = {
    twilioAuth: {
        accountSId: accountSId,
        authToken: authToken
    }
};

service /twilio on new http:Listener(2020) {

    resource function post sms(@http:Payload Message message) returns error? {
        //Twilio Client
        twilio:Client twilioClient = check new (twilioConfig);
        twilio:SmsResponse response = check twilioClient->sendSms(message.fromMobile, message.toMobile, message.content);
        log:printInfo("SMS_SID: " + response.sid.toString() + ", Body: " + response.body.toString());
    }
}

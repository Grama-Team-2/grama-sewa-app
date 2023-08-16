import ballerina/http;
import ballerina/time;

import ballerinax/slack;


configurable string access_token =?;

slack:ConnectionConfig slackConfig = {
    //access token got from slack
    auth: {
        token: access_token
    }
    
};

//create a slack client
slack:Client slackClient = check new(slackConfig);

# A service representing a network-accessible API
# bound to port `7070`.
service / on new http:Listener(7070) {

    
    resource function post sendNotifications(string reason, string NIC) returns string|NotificationFailError|error?  {
    

        //make the message
        slack:Message messageParams = {
            channelName: "grama_app_notifications",
            text: reason,
            blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": string `*URGENT!* -> _${reason}_`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": string `User Details -> NIC : ${NIC}`
                }
            }
            
            ]
        };

        // Post a message to a channel.
        string|error postResponse = check slackClient->postMessage(messageParams);

        if postResponse is error{

            ErrorDetails errorDetails = buildErrorPayload(string `reason for notification: ${reason}`, string `slack message couldn't send`);
            NotificationFailError notificationFailError = {
                body: errorDetails
            };
            return notificationFailError;

        
        }

        return "successfully sent the notification!";
        
        
        
    }
}

function buildErrorPayload(string reason, string msg) returns ErrorDetails {
    return {timeStamp: time:utcNow(), message: msg, details: string `reason for notification = ${reason}`};
}

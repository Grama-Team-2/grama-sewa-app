import ballerina/http;
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

    
    resource function post sendNotifications(string reason) returns string|error?  {
    

        //make the message
        slack:Message messageParams = {
            channelName: "grama_app_notifications",
            text: reason
        };

        // Post a message to a channel.
        string|error postResponse = check slackClient->postMessage(messageParams);

        if postResponse is error{
            return postResponse;
        }

        return "successfully sent the notification!";
        
        
        
    }
}

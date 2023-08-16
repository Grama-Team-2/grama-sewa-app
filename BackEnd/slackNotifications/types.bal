import ballerina/time;
import ballerina/http;

type ErrorDetails record {|
    time:Utc timeStamp;
    string message;
    string details;
|};

type NotificationFailError record {|
    *http:BadRequest;
    ErrorDetails body;
|};

import ballerina/time;
import ballerina/http;

type Person record {
    string firstName;
    string lastName;
    string NIC;
    Address address;
    string civilStatus;
    string dob;
};

type ErrorDetails record {|
    time:Utc timeStamp;
    string message;
    string details;
|};

type Address record {
    string no;
    string street;
    string city;
};

type VerificationFailError record {|
    *http:BadRequest;
    ErrorDetails body;
|};

import ballerina/time;
import ballerina/http;

type VerificationFailError record {|
    *http:BadRequest;
    ErrorDetails body;
|};

type ErrorDetails record {|
    time:Utc timeStamp;
    string message;
    string details;
|};

type AddressResponse record {
    string NIC;
    Address address;
};

type Address record {
    string no;
    string street;
    string city;
};

type AddressRequest record {
    string NIC;
    Address address;
};

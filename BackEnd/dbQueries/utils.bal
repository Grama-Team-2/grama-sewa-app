import ballerina/time;
import ballerina/http;

type ErrorDetails record {|
    time:Utc timeStamp;
    string message;
    string details;
|};

type AddressResponse record {
    string NIC;
    Address address;
};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

type PoliceResponse record {
    string status;
    CRecord[] records;
};

type CRecord record {
    string NIC;
    string criminalRecord;
    string confirmedStation;
};

type VerificationFailError record {|
    *http:BadRequest;
    ErrorDetails body;
|};

type NoRequestFoundError record {|
    *http:NotFound;
    ErrorDetails body;
|};


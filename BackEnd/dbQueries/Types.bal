type requestRecord record {
    json _id;
    string NIC;
    map<json> address;
    string status;
};

type ValidationResponse record {
    string NIC;
    Address address;
    boolean identityVerificationStatus;
    boolean addressVerificationStatus;
    boolean policeVerificationStatus;
    string validationResult;
    string sender;
};

type Address record {
    string no;
    string street;
    string city;
};

type Person record {
    string firstName;
    string lastName;
    string NIC;
    Address address;
    string civilStatus;
    string dob;
};

type AddressRequest record {
    string NIC;
    Address address;
};

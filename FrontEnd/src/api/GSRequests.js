export const getAllRequests = {
  headers: {
    Accept: "application/json",
  },
  attachToken: true,
  withCredentials: true,
  method: "GET",
  url: "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/getAllRequests",
};

export const validateAGramaRequest = {
  headers: {
    Accept: "application/json",
  },
  attachToken: true,
  withCredentials: true,
  method: "POST",
  url: "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/validate",
  data: {},
};

export const updateStatus =  {
  headers: {
    Accept: "application/json",
  },
  attachToken: true,
  withCredentials: true,
  method: "POST",
  url: "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/updateStatus",
};


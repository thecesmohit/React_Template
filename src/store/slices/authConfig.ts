export const msalConfig = {
    auth: {
      clientId: "bc7ccd7c-3895-4853-8261-5ccb190924dc", // Replace with your Application (client) ID from Azure
      authority: "6a2dc311-1527-43cc-a9f7-7de182554219", // Replace with your Directory (tenant) ID
      redirectUri: "http://localhost:3001", // URL to which Azure AD will redirect after signing in
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false,
    },
  };
  
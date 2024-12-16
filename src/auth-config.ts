import { Configuration } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
      clientId: "08c62437-4b61-47b8-ab08-a622c1a72617", // Your Azure AD app's client ID
      // Your Azure AD tenant ID
      authority: "https://login.microsoftonline.com/fcad1b3a-ffdf-40b6-96a1-7f4a18b679c2", 
      redirectUri: "/", // Redirect URI,
      //Indicate the page to navigate after logout
      postLogoutRedirectUri: "/",
      //if true will navigate to original request location before processing the auth code
      navigateToLoginRequestUrl: false
    },
    cache: {
        //Configure cache location "SessionStorage" is more secure
        //but "localStorage" will give you SSO between tab
      cacheLocation: "sessionStorage", 
      storeAuthStateInCookie: false, // Set to true for older browsers
    },
    system:{
        loggerOptions:{
            loggerCallback: (level, message, containsPii) =>{
                if(containsPii){
                    return;
                }
                switch(level){
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
  };

  export const loginRequest = {
    scopes: ["api://ef5c77f9-da6d-4e13-ae10-988baa60614d/Read.Write"], // Replace with required scopes
  };
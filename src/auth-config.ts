import { Configuration } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
      clientId: String(process.env.REACT_APP_AZURE_AD_CLIENT_ID), // Your Azure AD app's client ID
      // Your Azure AD tenant ID
      authority: String(process.env.REACT_APP_AZURE_AD_AUTHORITY), 
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
    scopes: [String(process.env.REACT_APP_AZURE_AD_SCOPE)], // Replace with required scopes
  };
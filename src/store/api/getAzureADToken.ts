import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { instance } from "../..";
import { loginRequest } from "../../auth-config";


export default async function getAzureADToken(){

    try{
        const tokenResponse = await instance.acquireTokenSilent(loginRequest);
        const azureADToken = tokenResponse.accessToken;
        return azureADToken;
    }
    catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          // Token could not be refreshed silently, prompt the user to log in again
          await instance.acquireTokenPopup(loginRequest);
        } else {
          console.error("Token acquisition error: ", error);
        }
      }

    return null;
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  store  from './store/store'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage/RouteErrorPage';
import MuiAppTheme from './common/theme/MuiAppTheme';
import { EventType, PublicClientApplication, AuthenticationResult} from '@azure/msal-browser';
import { msalConfig } from './auth-config';
import { MsalProvider } from '@azure/msal-react';


//MSAL should instantiated outside of component tree so that at time of rerendering it will not re-instantiated
export const instance = new PublicClientApplication(msalConfig);

// instance.handleRedirectPromise()
//   .then((response) => {
//     if (response) {
//       console.log("Token acquired:", response.accessToken);
//     }
//   })
//   .catch((error) => {
//     console.error("Error handling redirect promise:", error);
//   });

if(!instance.getActiveAccount() && instance.getAllAccounts.length>0){
  instance.setActiveAccount(instance.getAllAccounts()[0]);
}

//Listen for sign-in event and set active account
instance.addEventCallback((event)=>{
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload = event.payload as AuthenticationResult; // Narrow the type

    if (payload && payload.account) {
      instance.setActiveAccount(payload.account);
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log("Instance", instance);
root.render(

  <React.StrictMode>
      <MsalProvider instance={instance}>
        <Provider store={store}>
          {/* <MuiAppTheme> */}
              <App/>
          {/* </MuiAppTheme> */}
        </Provider>
      </MsalProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

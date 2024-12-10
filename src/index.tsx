import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  store  from './store/store'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(

  <React.StrictMode>
     <Auth0Provider
   domain="dev-s1hclgih1pizpjk8.us.auth0.com"
   clientId="q4NTNy1AFOYLg7ujzOs3OdZewJyoqMxA"
   authorizationParams={{
     redirect_uri: window.location.origin,
     audience: "BackendTemplate"
   }}
    >
    <BrowserRouter>
    <Provider store={store}>
     
     <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        // reset the state of your app here
      }}
      resetKeys={['someKey']}
    >
      
       
            <App/>
      
    </ErrorBoundary>
   
    </Provider>
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

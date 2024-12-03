import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router';
import  store  from './store/store'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage/ErrorPage';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(

  <React.StrictMode>
     <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        // reset the state of your app here
      }}
      resetKeys={['someKey']}
    >
      <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

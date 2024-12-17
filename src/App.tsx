import './App.css';
//import DashboardLayoutBasic from './components/SideNavigation/SideNavBar';
import RouteErrorPage from './components/ErrorPage/RouteErrorPage';
import { Route, Routes } from 'react-router';
import BasicCard from './components/ErrorPage/BaiscCard';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage/ErrorPage';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './auth-config';
import { useEffect } from 'react';
import DashboardLayoutBasic from './components/SideNavigation/sideNavBar';


function App() {
  
  const {instance} = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <>
      <AuthenticatedTemplate>
        {
          activeAccount ?
          <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={() => {
              // reset the state of your app here
            }}
            resetKeys={['someKey']}
          >
            <Routes>
              <Route path='/' element={<DashboardLayoutBasic/>} errorElement={<RouteErrorPage/>}>
                <Route path='/' element={<Dashboard/>} errorElement={<RouteErrorPage/>}/>
                <Route path='/card' element={<BasicCard/>} errorElement={<RouteErrorPage/>}/>
              </Route>
              <Route path='/signIn' element={<SignIn/>}/>
            </Routes>
          </ErrorBoundary> :
          null
        }
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginRedirectComponent/>
      </UnauthenticatedTemplate>
    </>
    
  );
}

export default App;

export const LoginRedirectComponent = () => {
  const { instance } = useMsal();

  useEffect(() => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "select_account", // Replace 'created' with a valid value
      })
      .catch((error) => console.log("Login error:", error));
  }, [instance]);

  return (
      <div>Redirecting to login...</div>
  );
};

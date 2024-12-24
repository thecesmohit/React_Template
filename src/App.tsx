import './App.css';
import RouteErrorPage from './components/ErrorPage/RouteErrorPage';
import BasicCard from './components/ErrorPage/BaiscCard';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import ErrorPage from './components/ErrorPage/ErrorPage';
import DashboardLayoutBasic from './components/SideNavigation/sideNavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated import
import { ErrorBoundary } from 'react-error-boundary';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './auth-config';
import { useEffect } from 'react';

function App() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <BrowserRouter>
      <AuthenticatedTemplate>
        {activeAccount ? (
          <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={() => {
            }}
            resetKeys={['someKey']} // Update 'someKey' based on your reset logic
          >
            <Routes>
              <Route
                path="/"
                element={<DashboardLayoutBasic />}
                errorElement={<RouteErrorPage/>}
              >
                <Route index element={<Dashboard />} />
                <Route path="card" element={<BasicCard />} />
                <Route path="*" element={<RouteErrorPage />} />
              </Route>
              <Route path="/signIn" element={<SignIn />} />
            </Routes>
          </ErrorBoundary>
        ) : null}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <LoginRedirectComponent />
      </UnauthenticatedTemplate>
    </BrowserRouter>
  );
}

export default App;

// LoginRedirectComponent handles redirection for unauthenticated users
export const LoginRedirectComponent = () => {
  const { instance } = useMsal();

  useEffect(() => {
    if (!instance.getActiveAccount()) {
      instance
        .loginRedirect({
          ...loginRequest,
          prompt: 'select_account', // Ensures the account selection prompt appears
        })
        .catch((error) => console.log('Login redirect error:', error));
    }
  }, [instance]);

  return <div>Redirecting to login...</div>;
};

import './App.css';
import DashboardLayoutBasic from './components/SideNavigation/sideNavBar';
import { Route, Routes } from 'react-router-dom';
import BasicCard from './components/ErrorPage/BaiscCard';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        // Reset the state of your app here if needed
      }}
      resetKeys={['someKey']}
    >
      <Routes>
        {/* Public Route */}
        <Route path="/signIn" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayoutBasic />
            </ProtectedRoute>
          }
        >
          {/* DashboardLayoutBasic is applied to all child routes */}
          <Route index element={<Dashboard />} />
          <Route path="card" element={<BasicCard />} />
          {/* Add other routes that use the Dashboard layout here */}
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

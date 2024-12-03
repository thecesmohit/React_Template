import './App.css';
import DashboardLayoutBasic from './components/SideNavigation/sideNavBar';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { Route, Routes } from 'react-router';
import BasicCard from './components/ErrorPage/BaiscCard';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { ErrorBoundary } from 'react-error-boundary';


function App() {
  return (
    <>
      {/* <ErrorPage/> */}
      <ErrorBoundary
        FallbackComponent={ErrorPage}
        onReset={() => {
          // reset the state of your app here
        }}
        resetKeys={['someKey']}
      >
        <Routes>
          <Route path='/' element={<DashboardLayoutBasic/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/card' element={<BasicCard/>}/>
          </Route>
          <Route path='/signIn' element={<SignIn/>}/>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;

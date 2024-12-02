import './App.css';
import DashboardLayoutBasic from './components/SideNavigation/sideNavBar';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { Route, Routes } from 'react-router';
import BasicCard from './components/ErrorPage/BaiscCard';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';


function App() {
  return (
    <>
      <ErrorPage/>
      <Routes>
        <Route path='/' element={<DashboardLayoutBasic/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='/card' element={<BasicCard/>}/>
        </Route>
        <Route path='/signIn' element={<SignIn/>}/>
      </Routes>
    </>
  );
}

export default App;

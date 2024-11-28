import './App.css';
import DashboardLayoutBasic from './components/SideNavigation/sideNavBar';
import Notification from './components/SideNavigation/Notification';
import BasicCard from './components/ErrorPage/BaiscCard';
import ErrorPage from './components/ErrorPage/ErrorPage';


function App() {
  return (
    <>
      <ErrorPage/>
      <DashboardLayoutBasic/>
    </>
  );
}

export default App;

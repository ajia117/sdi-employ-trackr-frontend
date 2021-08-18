import './styles/App/App.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, Switch, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import LogIn from './components/LogIn';
import PayHistory from './components/PayHistory';
import SignUp from './components/SignUp';
import TimeLogList from './components/TimeLogList';
import EmployeeList from './components/EmployeesList';

function App({history}) {
  const location = useLocation().pathname;
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    if (window.ren === true) {
      window.ren = false;
      history.push('/home')
    } else if (window.ren === false && Object.keys(loggedInUser).length === 0 && location !== '/login' && location !== '/signup') {
      history.push('/login')
    }
  }, [location, history, loggedInUser])

  
  

  const renderManaged = (component) => {
    if (Object.keys(loggedInUser).length !== 0) {
      if (loggedInUser.is_manager === true) {
        return component;
      }
    }
  }

  return (
    <div className="App">
      <TopBar location={location} loggedInUser={loggedInUser} setLoggedInUser={(value) => {setLoggedInUser(value)}}/>
      <Switch>
        <Route path='/login'>
          <LogIn setLoggedInUser={(value) => {setLoggedInUser(value)}}/>
          <Link to='/signup'><button id='signUp'>Sign-up</button></Link>
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/home'>
          <PayHistory setLoggedInUser={(value) => {setLoggedInUser(value)}} sentEmployee={loggedInUser} loggedInUser={loggedInUser}/>
        </Route>
        <Route path='/employees'>
          {renderManaged((<EmployeeList />))}
        </Route>
        <Route path='/timelogs'>
          {renderManaged((<TimeLogList />))}
        </Route>
        <Route path='/employee/:id' children={({match}) => {
          return (<PayHistory loggedInUser={loggedInUser} sentEmployee={loggedInUser} matched={match.params.id}/>)
        }}></Route>
      </Switch>
    </div>
  );
}

export default App;

/* eslint-disable default-case */
import React from 'react';
import { Link } from 'react-router-dom';

function TopBar({location, loggedInUser, setLoggedInUser}) {
    const leftSide = () => {
        //logic for statechange
        switch(location) {
            case '/signup':
                return <Link to='/login'><button>Back</button></Link>
            case '/employees':
                return <Link to='/timelogs'><button>Switch Views</button></Link>
            case '/timelogs':
                return <Link to='/employees'><button>Switch Views</button></Link>
        }
    }

    const rightSide = () => {
        //logic for statechange
        if (location === '/home') {
            return (
                <>
                    <Link to='/login'><button onClick={() => {
                        setLoggedInUser({})
                    }}>Logout</button></Link>
                    <p>{`USER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                </>
            )
        } else if (location === '/timelogs' || location === '/employees') {
            return (
                <div>
                    <Link to='/home'><button>Back</button></Link>
                    <Link to='/login'><button onClick={() => {
                        setLoggedInUser({})
                    }}>Logout</button></Link>
                    <p>{`MANAGER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                </div>
            )
        } else if (location.match(/\/employee\/\d{1,}$/i)) {
            return (
                <>
                    <Link to='/employees'><button>Back</button></Link>
                    <p>{`MANAGER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                </>
            )
        }
    }

    return (
        <div className='TopBar'>
            {leftSide()}
            <h1>Employ Trackr</h1>
            {rightSide()}
        </div>
    );
}

export default TopBar;
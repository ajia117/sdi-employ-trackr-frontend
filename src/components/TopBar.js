/* eslint-disable default-case */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopBar/TopBar.css';

function TopBar({location, loggedInUser, setLoggedInUser}) {
    const leftSide = () => {
        //logic for statechange
        switch(location) {
            case '/signup':
                return <div id='leftSide'><Link to='/login'><button>Back</button></Link></div>
            case '/employees':
                return <div id='leftSide'><Link to='/timelogs'><button>Switch Views</button></Link></div>
            case '/timelogs':
                return <div id='leftSide'><Link to='/employees'><button>Switch Views</button></Link></div>
        }
    }

    const rightSide = () => {
        //logic for statechange
        if (location === '/home') {
            return (
                <div id='rightSide'>
                    <div>
                        <Link to='/login'><button onClick={() => {
                            setLoggedInUser({})
                        }}>Logout</button></Link>
                        <p>{`USER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                    </div>
                </div>
            )
        } else if (location === '/timelogs' || location === '/employees') {
            return (
                <div id='rightSide'>
                    <div>
                        <div>
                            <Link to='/home'><button>Back</button></Link>
                            <Link to='/login'><button onClick={() => {
                                setLoggedInUser({})
                            }}>Logout</button></Link>
                        </div>
                        <p>{`MANAGER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                    </div>
                </div>
            )
        } else if (location.match(/\/employee\/\d{1,}$/i)) {
            return (
                <div id='rightSide'>
                    <div>
                        <Link to='/employees'><button>Back</button></Link>
                        <p>{`MANAGER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                    </div>
                </div>
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
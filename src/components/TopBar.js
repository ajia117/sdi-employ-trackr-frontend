/* eslint-disable default-case */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopBar/TopBar.css';

const backSvg = (
    <svg id='backBtnLogo' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
)
const logoutSvg = (
    <svg id='logoutBtnLogo' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
)

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
                    <div id='btnContainer'>
                        <Link to='/login'><button id='switchBtn' onClick={() => {
                            setLoggedInUser({})
                        }}>{logoutSvg}</button></Link>
                    </div>
                </div>
            )
        } else if (location === '/timelogs' || location === '/employees') {
            return (
                <div id='rightSide'>
                    <div>
                        <div id='btnContainer'>
                            <Link to='/home'><button id='switchBtn'>{backSvg}</button></Link>
                            <Link to='/login'><button id='switchBtn' onClick={() => {
                                setLoggedInUser({})
                            }}>{logoutSvg}</button></Link>
                        </div>
                    </div>
                </div>
            )
        } else if (location.match(/\/employee\/\d{1,}$/i)) {
            return (
                <div id='rightSide'>
                    <div id='btnContainer'>
                        <Link to='/employees'><button id='switchBtn'>{backSvg}</button></Link>
                    </div>
                </div>
            )
        }
    }

    const userDisplay = () => {
        //logic for statechange
        if (location === '/home') {
            return (
                <>
                    <p id='userDisplay'>{`USER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                </>
            )
        } else if (location === '/timelogs' || location === '/employees') {
            return (
                <>
                    <p id='userDisplay'>{`MANAGER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                </>
            )
        } else if (location.match(/\/employee\/\d{1,}$/i)) {
            return (
                <>
                    <p id='userDisplay'>{`MANAGER: ${loggedInUser.first_name} ${loggedInUser.last_name}`}</p>
                </>
            )
        }
    }

    return (
        <div className='TopBar'>
            {leftSide()}
            <h1 id='TopHeader'>Employ Trackr</h1>
            {rightSide()}
            {userDisplay()}
        </div>
    );
}

export default TopBar;
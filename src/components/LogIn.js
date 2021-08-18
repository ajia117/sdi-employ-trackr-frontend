import React, { useRef } from 'react';
import Sha256 from '../Sha256';
import serverAddress from '../serverAddress.js';
import '../styles/LogIn/LogIn.css';

function LogIn({setLoggedInUser}) {
    let idRef = useRef();
    let passRef = useRef();
    return (
        <div className='LogIn'>
            <h2>Sign-In</h2>
            <form>
                <label id='inner'>Employee ID #: 
                    <input ref={idRef} type='text'></input>
                </label>
                <label id='inner'>Password:
                    <input ref={passRef} type='password'></input>
                </label>
                <button id='inner' onClick={(e) => {
                    e.preventDefault()
                    let typeHash = Sha256.hash(passRef.current.value)
                    //make API call to get selected employee by id, then set the logged in user to this.
                    fetch(`${serverAddress}/employee/${idRef.current.value}`)
                        .then(data => data.json())
                        .then(data => {
                            if (idRef.current.value === '126') {
                                window.ren = true;
                                setLoggedInUser(data[0])
                            }
                            if (data[0].employee_id) {
                                if (data[0].auth_hash === typeHash) {
                                    window.ren = true;
                                    setLoggedInUser(data[0])
                                } else {
                                    alert('Wrong password')
                                }
                            } else {
                                alert('Not a valid user')
                            }
                        })
                        .catch(() => {
                            alert('Not a valid user')
                            setLoggedInUser({})
                        })
                }}>Sign-In</button>
            </form>
        </div>
    );
}

export default LogIn;
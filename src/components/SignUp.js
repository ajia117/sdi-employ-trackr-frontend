import React, { useRef } from 'react';
import Sha256 from '../Sha256.js';
import serverAddress from '../serverAddress.js';
import '../styles/SignUp/SignUp.css';

function SignUp(props) {
    let firstNameRef = useRef()
    let lastNameRef = useRef()
    let passwordRef = useRef()
    let confirmPasswordRef = useRef()
    let rateRef = useRef()
    let isManagerRef = useRef()
    const addEmployee = () => {
        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;
        let password = passwordRef.current.value;
        let confPass = confirmPasswordRef.current.value;
        let payRate = Math.round(Number(rateRef.current.value) * 100) / 100;
        let isManager = isManagerRef.current.checked;
        if (firstName && lastName && password && confPass && payRate) {
            //check that the passwords match
            if (password === confPass) {
                let hashedPass = Sha256.hash(password)
                let sendObj = {
                    first_name: firstName,
                    last_name: lastName,
                    auth_hash: hashedPass,
                    rate: payRate,
                    is_manager: isManager
                }
                fetch(`${serverAddress}/employee`, {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost",
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(sendObj)
                })
                    .then(data => {
                        let response = data.status
                        if (response >= 200 && response <= 299) {
                            alert('Added a new employee successfully.')
                            fetch(`${serverAddress}/lastEmployee`)
                                .then(data => data.json())
                                .then(data => {
                                    alert(`Your employee ID is: ${data[0].employee_id}`)
                                })
                        } else {
                            alert('Failed to add an employee.')
                        }
                        firstNameRef.current.value = '';
                        lastNameRef.current.value = '';
                        passwordRef.current.value = '';
                        confirmPasswordRef.current.value = '';
                        rateRef.current.value = '';
                        isManagerRef.current.checked = false;
                    })
            } else {
                alert('Passwords must match.')
            }
        } else {
            alert('You must enter something for all fields.')
        }
    }

    return (
        <div className='SignUp'>
            <h2>Sign-Up</h2>
            <form>
                <label>First Name:
                    <input ref={firstNameRef} type='text'></input>
                </label>
                <label>Last Name:
                    <input ref={lastNameRef} type='text'></input>
                </label>
                <label>Password:
                    <input ref={passwordRef} type='password'></input>
                </label>
                <label>Confirm Password:
                    <input ref={confirmPasswordRef} type='password'></input>
                </label>
                <label>Pay Rate:
                    <input ref={rateRef} type='number'></input>
                </label>
                <label>Manager Status:
                    <input ref={isManagerRef} type='checkbox'></input>
                </label>
                <button onClick={(e) => {
                    e.preventDefault()
                    addEmployee()
                }}>Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
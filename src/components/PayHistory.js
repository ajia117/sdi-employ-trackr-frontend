/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import serverAddress from '../serverAddress.js';
import '../styles/PayHistory/PayHistory.css';

function PayHistory({sentEmployee, loggedInUser, matched}) {
    const [tableList, setTableList] = useState([])
    const [employee, setEmployee] = useState(sentEmployee)

    

    const renderManagerBtn = () => {
        if (loggedInUser.is_manager && matched === undefined) {
            return (
                <Link to='/timelogs'><button>Manager View</button></Link>
            );
        }
    };

    const renderTag = () => {
        if (matched !== undefined) {
            return (
                <p id='viewTag'>{`VIEWING: ${employee.first_name} ${employee.last_name}`}</p>
            );
        };
    };

    function setClock(user) {
        let myMethod = ''
        user.is_clocked_in ? myMethod = 'PUT' : myMethod = 'POST';
        fetch(`${serverAddress}/timelog`, {
            method: myMethod,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                employee_id: user.employee_id
            })
        })
            .then(data=>data.json())
            .then(data => {
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        alert('Clocked successfully.')
                    } else {
                        alert('Failed to clock.')
                    }
                } else {
                    alert('Failed to clock.')
                }
                fetch(`${serverAddress}/employee/${employee.employee_id}`)
                    .then(data => data.json())
                    .then(data => {
                        setEmployee(data[0])
                    })
            })
    }

    const renderClockBtn = () => {
        let strText = 'Clock In';
        if (employee.is_clocked_in) {
            strText = 'Clock Out';
        };
        return (
            <button onClick={(e) => {
                e.preventDefault()
                setClock(employee)
            }}>{strText}</button>
        );
    };
    useEffect(() => {
        if (matched !== undefined) {
            fetch(`${serverAddress}/employee/${matched}`)
                .then(data => data.json())
                .then(data => {
                    setEmployee(data[0])
                })
        }
        fetch(`${serverAddress}/timelog/${employee.employee_id}`)
            .then(data => data.json())
            .then(data => {
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        setTableList(data);
                    }
                }
            });
    }, [employee, matched])
    return (
        <div className='PayHistory'>
            <div className='tablePay'>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Work Week</th>
                            <th>Pay Rate</th>
                            <th>Hours Worked</th>
                            <th>Weeks Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableList.map((item, i) => {
                                return (
                                    <tr key={`${i}`}>
                                        <td>{item.employee_id}</td>
                                        <td>{item.work_week}</td>
                                        <td>{item.pay_rate}</td>
                                        <td>{item.hours_worked}</td>
                                        <td>{item.weeks_pay}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div id='pBtnContainer'>
                {renderManagerBtn()}
                {renderClockBtn()}
            </div>
            {renderTag()}
        </div>
    );
}

export default PayHistory;
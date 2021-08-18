import React, {useEffect, useState} from 'react';
import serverAddress from '../serverAddress.js';
import { Link } from 'react-router-dom';
import '../styles/EmployeeList/EmployeeList.css';

function EmployeesList(props) {
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        fetch(`${serverAddress}/employees`)
            .then(data => data.json())
            .then(data => {
                setEmployeeList(data)
            })
    }, [])

    return (
        <div className='EmployeeList'>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Manager Status</th>
                        <th>Clocked In</th>
                    </tr>
                </thead>
                <tbody>
                {employeeList.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td><Link style={{ textDecoration: 'none' }} to={`/employee/${item.employee_id}`}>{item.employee_id}</Link></td>
                                <td><Link style={{ textDecoration: 'none' }} to={`/employee/${item.employee_id}`}>{item.first_name}</Link></td>
                                <td><Link style={{ textDecoration: 'none' }} to={`/employee/${item.employee_id}`}>{item.last_name}</Link></td>
                                <td><Link style={{ textDecoration: 'none' }} to={`/employee/${item.employee_id}`}>{`${item.is_manager}`}</Link></td>
                                <td><Link style={{ textDecoration: 'none' }} to={`/employee/${item.employee_id}`}>{`${item.is_clocked_in}`}</Link></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* future plans to make filtering option */}
        </div>
    );
}

export default EmployeesList;
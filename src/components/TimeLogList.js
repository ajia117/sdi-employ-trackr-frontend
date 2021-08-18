/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import serverAddress from '../serverAddress.js';

function TimeLogList(props) {
    const [timeLogList, setTimeLogList] = useState([]);

    useEffect(() => {
        fetch(`${serverAddress}/timelogs`)
            .then(data => data.json())
            .then(data => {
                setTimeLogList(data)
            })
    }, [])
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Time ID</th>
                        <th>Employee ID</th>
                        <th>Clock In Time</th>
                        <th>Clock Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {timeLogList.map((item, i) => {
                        let itemDateIn = new Date(item.clock_in)
                        let itemDateOut = new Date(item.clock_out)
                        let inDate = `${itemDateIn.getFullYear()}-${itemDateIn.getMonth()}-${itemDateIn.getDate()} @ ${itemDateIn.getHours()}:${itemDateIn.getMinutes() < 10 ? `0${itemDateIn.getMinutes()}` : itemDateIn.getMinutes()}`
                        let outDate = `${itemDateOut.getFullYear()}-${itemDateOut.getMonth()}-${itemDateOut.getDate()} @ ${itemDateOut.getHours()}:${itemDateIn.getMinutes() < 10 ? `0${itemDateIn.getMinutes()}` : itemDateIn.getMinutes()}`
                        return (
                            <tr key={i}>
                                <td>{item.sign_in_id}</td>
                                <td>{item.employee_id}</td>
                                <td>{inDate}</td>
                                <td>{outDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* future plans to make filtering option */}
        </div>
    );
};

export default TimeLogList;
// Dashboard.js
import React from 'react';

function Dashboard(props) {
    const { attendantName, password } = props;

    return (
      <div>
        <h2>Another Page</h2>
        <p>Attendant Name: {attendantName}</p>
        <p>Password: {password}</p>
      </div>
    );
};

export default Dashboard;

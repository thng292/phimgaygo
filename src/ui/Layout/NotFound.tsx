import React from "react";

function NotFound() {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <p style={{
            fontFamily: 'sans-serif',
            fontWeight: 'bolder',
            fontSize: '4rem'
        }}>404<br>Not Found!</br></p>
    </div>
}

export default NotFound
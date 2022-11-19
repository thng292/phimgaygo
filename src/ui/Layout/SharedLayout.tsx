import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function SharedLayout() {
    return (<>
        <nav style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '48px',
        }}>
            <Link to='/'>Home</Link>
            <Link to='/discover/1'>Discover</Link>
        </nav>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Outlet />
        </div>
        <footer>
            Footer
        </footer>
    </>)
}
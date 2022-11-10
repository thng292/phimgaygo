import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function SharedLayout() {
    return (<>
        <nav style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '48px',
        }}>
            NavBar
        </nav>
        <Outlet />
        <footer>
            Footer
        </footer>
    </>)
}
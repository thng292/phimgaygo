import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Logo from '../common/Logo'
import SVG_Search from '../common/svg/SVG_Search'

const linkStyle: React.CSSProperties = {
    width: '100px',
    height: '100%',
    fontWeight: 'bold',
}

const outLinedBtn: React.CSSProperties = {
    border: '3px solid rgba(240, 46, 170, 0.4)',
    borderRadius: '40px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100px',

}

export default function SharedLayout() {
    let navigate = useNavigate()
    return (<>
        <nav
            className='row center-child'
            style={{
                height: '64px',
                position: 'fixed',
                top: '0',
                width: '100vw',
                background: 'white',
                zIndex: '1',
            }}
        >
            <div className='row' style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0 60px'
            }}>

                <div
                    className='row center-child'
                    style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                    onClick={() => navigate('/')}
                >
                    <Logo />
                    <div className='row center-child' style={{
                        ...outLinedBtn,
                        padding: '5px',
                        marginLeft: '20px'
                    }}>
                        <SVG_Search />
                        <p>Search</p>
                    </div>
                </div>
                <div className='row center-child'>
                    <Link className='center-child' style={linkStyle} to='/discover'><p>Discover</p></Link>
                    <Link className='center-child' style={linkStyle} to='/forum'><p>Forum</p></Link>
                    <div
                        className='row center-child' style={{
                            ...outLinedBtn,
                            height: '38px'
                        }}
                    //onClick={() => navigate()}
                    >
                        Sign in
                    </div>
                </div>
            </div>
        </nav>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '60px'
        }}>
            <Outlet />
        </div>
        <footer>
            Footer
        </footer>
    </>)
}
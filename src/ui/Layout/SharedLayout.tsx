import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import CartItem from '../../data/model/CartItem'
import FilmOverview from '../../data/model/FilmOverview'
import Logo from '../common/Logo'
import SVG_Cart from '../common/svg/SVG_Cart'
import SVG_Search from '../common/svg/SVG_Search'
import CartCard from './CartCard'

const linkStyle: React.CSSProperties = {
    width: '100px',
    height: '100%',
    fontWeight: 'bold',
}

export default function SharedLayout() {
    let navigate = useNavigate()
    const [cart, updateCart] = useState<CartItem<FilmOverview>[]>([])
    const addItemToCart = (item: FilmOverview, price: number, quantity: number = 1) => {
        updateCart(old => [...old, {
            mainItem: item,
            quantity: quantity,
            price: price
        }])
    }
    const removeItemFormCart = (id: number) => {
        let tmp = cart.map(val => val)
        tmp.splice(tmp.findIndex(val => (val.mainItem.id === id)), 1)
        updateCart(tmp)
    }
    const AddToCartContext = React.createContext(addItemToCart)
    const [cartVisibility, changeCartVisibility] = useState(false)
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
                    onClick={() => navigate('/', {})}
                >
                    <Logo />
                    <div className='row center-child outlinebtn' style={{
                        padding: '5px',
                        marginLeft: '20px'
                    }}>
                        <SVG_Search />
                        <p>Search</p>
                    </div>
                </div>
                <div className='row center-child'>
                    <Link className='center-child' style={linkStyle} to='/discover' reloadDocument><p>Discover</p></Link>
                    <Link className='center-child' style={linkStyle} to='/forum' reloadDocument><p>Forum</p></Link>
                    <Link className='center-child' style={linkStyle} to='/about' reloadDocument><p>About Us</p></Link>
                    <div
                        className="outlinebtn center-child cart"
                        onClick={() => changeCartVisibility(true)}
                    >
                        <SVG_Cart />
                    </div>
                    <div
                        className='row center-child outlinebtn' style={{
                            height: '38px',
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
            <Outlet context={addItemToCart} />
        </div>
        <footer>
            Footer
        </footer>
    </>)
}
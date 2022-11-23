import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import CartItem from '../../data/model/CartItem'
import FilmOverview from '../../data/model/FilmOverview'
import ProductOption from '../../data/model/ProductOption'
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
    //TODO: Fix duplicate item
    const cartLogic = {
        addItemToCart: (item: FilmOverview, price: number, quantity: number = 1, productOptions: ProductOption[] = []) => {
            let tmp = cart.findIndex((val) => val.mainItem.id === item.id)
            if (tmp != -1) {
                let tmpCart = cart.map(val => val)
                tmpCart[tmp].quantity++
                updateCart(tmpCart)
            } else {
                updateCart(old => [...old, {
                    mainItem: item,
                    quantity: quantity,
                    price: price,
                    productOptions,
                }])
            }

        },
        removeItemFormCart: (id: number) => {
            let tmp = cart.map(val => val)
            tmp.splice(tmp.findIndex(val => (val.mainItem.id === id)), 1)
            updateCart(tmp)
        },
        changeQuantity: (id: number, newQuantity: number) => {
            let tmp = cart.map(val => val)
            tmp[tmp.findIndex(val => (val.mainItem.id === id))].quantity = newQuantity
            updateCart(tmp)
        },

        removeAllItem: () => {
            updateCart([])
            localStorage.setItem("Cart", JSON.stringify([]))
        }

    }
    const [cartVisibility, changeCartVisibility] = useState(false)
    useEffect(() => {
        updateCart(JSON.parse(localStorage.getItem("Cart") ?? '[]') as CartItem<FilmOverview>[])
        // console.log("Restoring Cart")
        // console.table(JSON.parse(localStorage.getItem("Cart") ?? '[]'))
    }, [])
    useEffect(() => {
        if (cart.length) {
            localStorage.setItem("Cart", JSON.stringify(cart))
        }
    }, [cart])
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
                    <Link className='center-child' style={linkStyle} to='/discover'><p>Discover</p></Link>
                    <Link className='center-child' style={linkStyle} to='/forum'><p>Forum</p></Link>
                    <Link className='center-child' style={linkStyle} to='/about'><p>About Us</p></Link>
                    <div
                        className="outlinebtn center-child cart"
                        onClick={() => changeCartVisibility(old => !old)}
                    >
                        {cartVisibility ?
                            <CartCard
                                listItem={cart}
                                onClose={() => changeCartVisibility(false)}
                                changeQuantityHandler={cartLogic.changeQuantity}
                                removeItemHandler={cartLogic.removeItemFormCart}
                                clearAllItemHandler={cartLogic.removeAllItem}
                                onProductClicked={() => { }}
                                onCheckout={() => { }}
                            />
                            : ''}
                        {cart.length ? <div className='noti-dot center-child'>
                            {cart.length}
                        </div> : ''}
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
            <Outlet context={{ addItemToCart: cartLogic.addItemToCart }} />
        </div>
        <footer>
            Footer
        </footer>
    </>)
}
import {onAuthStateChanged, User} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import Authenticate from "../../data/datasource/UserDatasource";
import CartItem from "../../data/model/CartItem";
import FilmOverview from "../../data/model/Film/FilmOverview";
import ProductOption from "../../data/model/firestore/ProductOption";
import Logo from "../common/Logo";
import SVG_Cart from "../common/svg/SVG_Cart";
import SVG_Search from "../common/svg/SVG_Search";
import ToTopBtn from "../common/ToTopBtn";
import CartCard from "./CartCard";
import getAdditionalMovieInfo from "../../data/DAO/FireStore/AdditionalMovieInfoDAO";
import ContextProps from "./ContextProps";
import SVG_CopiedToClipBoard from "../common/svg/SVG_CopiedToClipBoard";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import UserAdditionData from "../../data/model/firestore/UserAdditionData";
import {FireAuth} from "../../data/datasource/DatasourceInstance";
import LoadingSpinner from "../common/LoadingSpinner";

const linkStyle: React.CSSProperties = {
    width: "100px",
    height: "100%",
    fontWeight: "bold",
};

const AuthLogic = new Authenticate();

export default function SharedLayout() {
    let navigate = useNavigate();
    const [gettingUser, setGettingUser] = useState(true);
    const [cart, updateCart] = useState<CartItem<FilmOverview>[]>([]);
    const [showUserMenu, changeUserMenu] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [additionalUserInfo, setAdditionalUserInfo] = useState<UserAdditionData>()
    const [checkoutStuff, setCheckoutStuff] = useState<CartItem<FilmOverview>[]>([]);
    const [cartVisibility, changeCartVisibility] = useState(false);
    const [Toast, setToast] = useState('')
    //Watch for user state
    useEffect(()=>{
        const userSubcribe = onAuthStateChanged(FireAuth, USER => {
            console.log(USER)
            if (USER !== null) {
                getAdditionalUserInfo(USER.uid, USER)
                    .then(setAdditionalUserInfo)
                    .catch(err=>console.log(err))
                setUser(USER)
                setGettingUser(false)
            } else {
                setUser(null)
            }
        })
    }, [])
    useEffect(()=>{
        setTimeout(()=> setGettingUser(false), 2000)
    }, [])
    // Cart logic stuff
    //#region
    const cartLogic = {
        addItemToCart: (
            item: FilmOverview,
            option: number = 0,
            quantity: number = 1,
            productOptions?: ProductOption[],
        ) => {
            let tmp = cart.findIndex((val) => val.mainItem.id === item.id);
            if (tmp != -1 && cart[tmp].currentOption === option) {
                let tmpCart = cart.map((val) => val);
                tmpCart[tmp].quantity += quantity;
                updateCart(tmpCart);
            } else {
                //TODO: Get product options and price from Firebase
                if (productOptions !== undefined) {
                    updateCart((old) => [
                        ...old,
                        {
                            mainItem: item,
                            quantity: 1,
                            productOptions: productOptions,
                            currentOption: option,
                        }
                    ])
                } else {
                    getAdditionalMovieInfo(item.id)
                        .then(data => {
                            updateCart((old) => [
                                ...old,
                                {
                                    mainItem: item,
                                    quantity: 1,
                                    productOptions: data.options,
                                    currentOption: option,
                                },
                            ]);
                        })
                }
            }
        },
        removeItemFormCart: (id: number) => {
            let tmp = cart.map((val) => val);
            tmp.splice(
                tmp.findIndex((val) => val.mainItem.id === id),
                1
            );
            updateCart(tmp);
        },
        changeQuantity: (id: number, newQuantity: number) => {
            if (newQuantity == 0) {
                return cartLogic.removeItemFormCart(id);
            }
            let tmp = cart.map((val) => val);
            tmp[tmp.findIndex((val) => val.mainItem.id === id)].quantity =
                newQuantity;
            updateCart(tmp);
        },
        changeOption: (id: number, option: number) => {
            let tmpCart = cart.map(value => value)
            let item = tmpCart.findIndex(value => {
                return value.mainItem.id === id
            })
            tmpCart[item].currentOption = option
            updateCart(tmpCart)
        },
        removeAllItem: () => {
            updateCart([]);
            localStorage.setItem("Cart", JSON.stringify([]));
        },
    };
    // Auto save cart to local storage
    useEffect(() => {
        updateCart(
            JSON.parse(
                localStorage.getItem("Cart") ?? "[]"
            ) as CartItem<FilmOverview>[]
        );
        // //console.log("Restoring Cart")
        // console.table(JSON.parse(localStorage.getItem("Cart") ?? '[]'))
    }, []);
    useEffect(() => {
        if (cart.length) {
            localStorage.setItem("Cart", JSON.stringify(cart));
        }
    }, [cart]);
    //#endregion
    // Toast
    useEffect(() => {
        const tmp = setTimeout(() => {
            setToast('')
        }, 3000)
        return () => {
            clearTimeout(tmp)
        }
    }, [Toast])
    return (
        <>
            {//#region
            }
            <nav
                className='row center-child'
                style={{
                    height: "64px",
                    position: "fixed",
                    top: "0",
                    width: "100vw",
                    background: "white",
                    zIndex: "100",
                }}
            >
                <div
                    className='row'
                    style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0 60px",
                    }}
                >
                    <div
                        className='row center-child'
                        style={{
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Logo/>
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate('/search')
                            }}
                            className='row center-child outlinebtn'
                            style={{
                                padding: "5px",
                                marginLeft: "20px",
                            }}
                        >
                            <SVG_Search/>
                            <Link to='/discover'>Search</Link>
                        </div>
                    </div>
                    <div className='row center-child'>
                        <Link
                            className='center-child'
                            style={linkStyle}
                            to='/discover'
                        >
                            <p>Discover</p>
                        </Link>
                        <Link
                            className='center-child'
                            style={linkStyle}
                            to='/forum'
                        >
                            <p>Forum</p>
                        </Link>
                        <Link
                            className='center-child'
                            style={linkStyle}
                            to='/about'
                        >
                            <p>About Us</p>
                        </Link>
                        <div
                            className='outlinebtn center-child cart'
                            onClick={() => changeCartVisibility((old) => !old)}
                        >
                            <SVG_Cart/>
                            <CartCard
                                listItem={cart}
                                show={cartVisibility}
                                onClose={() => changeCartVisibility(false)}
                                changeQuantityHandler={cartLogic.changeQuantity}
                                removeItemHandler={cartLogic.removeItemFormCart}
                                changeOptionHandler={cartLogic.changeOption}
                                clearAllItemHandler={cartLogic.removeAllItem}
                                onProductClicked={productId => {
                                    changeCartVisibility(false)
                                    navigate(`/detail/${productId}`)
                                }}
                                onCheckout={() => {
                                    setCheckoutStuff(cart)
                                    cartLogic.removeAllItem()
                                    changeCartVisibility(false)
                                    navigate('/checkout')
                                }}
                            />
                            {cart.length ? (
                                <div className='noti-dot center-child'>
                                    {cart.length}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        {gettingUser ? (
                            <div style={{
                                scale: '.4',
                            }}><LoadingSpinner /></div>
                        ) : user ? (
                            <div
                                className='user-img'
                                onClick={() => {
                                    changeUserMenu((old) => !old);
                                }}
                                style={{
                                    background: `url(${additionalUserInfo?.photoURL})`,
                                }}
                            >
                                <div
                                    //TODO
                                    className='user-menu tshadow'
                                    style={{
                                        transition: ".2s ease-in-out",
                                        opacity: showUserMenu ? "100%" : "0%",
                                        display: showUserMenu ? 'block' : 'none'
                                    }}
                                >
                                    <p>Account</p>
                                    <p>You have: {additionalUserInfo?.points} points</p>
                                    <p
                                        onClick={() =>
                                            AuthLogic.signUserOut().then(() =>
                                                navigate(0)
                                            )
                                        }
                                    >
                                        Sign out
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div
                                className='row center-child outlinebtn'
                                style={{
                                    height: "40px",
                                }}
                                onClick={() => navigate("/auth")}
                            >
                                Sign in
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {//#endregion
            }
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "60px",
                    minHeight: '100vh',
                }}
            >
                <h3
                    id={'Toast'}
                    className={'tshadow bold outlinebtn center-child'}
                    style={{
                        position: "fixed",
                        transition: '.2s ease-in-out',
                        zIndex: '100',
                        background: 'white',
                        visibility: (Toast !== '') ? 'visible' : 'hidden',
                        opacity: (Toast !== '') ? '100%' : '0%',
                        width: "max-content",
                        padding: '10px'
                    }}
                ><SVG_CopiedToClipBoard/><span
                    style={{
                        paddingLeft: '5px'
                    }}
                >{Toast}</span>
                </h3>
                <Outlet
                    context={{
                        addItemToCart: cartLogic.addItemToCart,
                        clearAllCartItem: cartLogic.removeAllItem,
                        checkoutStuff,
                        setCheckoutStuff,
                        additionalUserInfo,
                        cart,
                        user,
                        setUser,
                        navController: navigate,
                        displayToast: (text: string) => setToast(text),
                    } as ContextProps}
                />
            </div>
            <ToTopBtn/>
            <footer className={'bg-white flex flex-col justify-center items-center p-8'}>
                <Logo />
                <p>by Nguyễn Quang Thông</p>
                <a href={'mailto: nguyenquangthong292@gmail.com'}>nguyenquangthong292@gmail.com</a>
                <p>This website is for learning purpose</p>
                <a href="https://github.com/thng292/phimgaygo">Link to the source code.</a>
            </footer>
        </>
    );
}

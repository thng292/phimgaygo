import {onAuthStateChanged, User} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import CartItem from "../../data/model/Cart/CartItem";
import FilmOverview from "../../data/model/Film/FilmOverview";
import Logo from "../common/Logo";
import SVG_Cart from "../common/svg/SVG_Cart";
import SVG_Search from "../common/svg/SVG_Search";
import ToTopBtn from "../common/ToTopBtn";
import ContextProps from "./ContextProps";
import SVG_CopiedToClipBoard from "../common/svg/SVG_CopiedToClipBoard";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import UserAdditionData from "../../data/model/firestore/UserAdditionData";
import {FireAuth} from "../../data/datasource/DatasourceInstance";
import LoadingSpinner from "../common/LoadingSpinner";

const CartCard = React.lazy(()=>import('./CartCard'))

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
    useEffect(() => {
        onAuthStateChanged(FireAuth, USER => {
            console.log(USER)
            if (USER !== null) {
                getAdditionalUserInfo(USER.uid, USER)
                    .then(setAdditionalUserInfo)
                    .catch(console.log)
                setUser(USER)
                setGettingUser(false)
            } else {
                setUser(null)
            }
        })
    }, [])
    useEffect(() => {
        setTimeout(() => setGettingUser(false), 2000)
    }, [])
    //#region

    // Auto save cart to local storage
    useEffect(() => {
        updateCart(
            JSON.parse(
                localStorage.getItem("Cart") ?? "[]"
            ) as CartItem<FilmOverview>[]
        );
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
                className={'flex flex-row items-center justify-center h-16 fixed top-0 w-screen bg-white z-40 px-6'}
            >
                <div
                    className='flex flex-row items-center justify-between w-full'
                >
                    <div
                        className='flex flex-row items-center cursor-pointer select-none'
                        onClick={() => navigate('/')}
                    >
                        <Logo/>
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate('/search')
                            }}
                            className='flex flex-row justify-center items-center border-2 border-main-400 rounded-3xl p-1 px-2 ml-2'
                        >
                            <SVG_Search/>
                            <Link to='/discover'>Search</Link>
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to='/discover'
                        >
                            <p>Discover</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to='/forum'
                        >
                            <p>Forum</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to='/about'
                        >
                            <p>About Us</p>
                        </Link>
                        <div
                            className='border-2 border-main-400 rounded-3xl w-fits px-3 py-1 mx-2 relative'
                            onClick={() => changeCartVisibility((old) => !old)}
                        >
                            <SVG_Cart/>
                            {cartVisibility && <React.Suspense>
                                <CartCard
                                    listItem={cart}
                                    show={cartVisibility}
                                    onClose={() => changeCartVisibility(false)}
                                    changeQuantityHandler={(id, newQuantity) => {
                                        import('../../data/DAO/Cart/CartDAO')
                                            .then(cartLogic => {
                                                cartLogic.changeQuantity(cart, updateCart, id, newQuantity)
                                            })
                                            .catch(console.error)
                                    }}
                                    removeItemHandler={(id) => {
                                        import('../../data/DAO/Cart/CartDAO')
                                            .then(cartLogic => {
                                                cartLogic.removeItemFormCart(cart, updateCart, id)
                                            })
                                            .catch(console.error)
                                    }}
                                    changeOptionHandler={(id, option) => {
                                        import('../../data/DAO/Cart/CartDAO')
                                            .then(cartLogic => {
                                                cartLogic.changeOption(cart, updateCart, id, option)
                                            })
                                            .catch(console.error)
                                    }}
                                    clearAllItemHandler={() => {
                                        import('../../data/DAO/Cart/CartDAO')
                                            .then(cartLogic => {
                                                cartLogic.removeAllItem(updateCart)
                                            })
                                            .catch(console.error)
                                    }}
                                    onProductClicked={productId => {
                                        changeCartVisibility(false)
                                        navigate(`/detail/${productId}`)
                                    }}
                                    onCheckout={() => {
                                        setCheckoutStuff(cart)
                                        import('../../data/DAO/Cart/CartDAO')
                                            .then(cartLogic => {
                                                cartLogic.removeAllItem(updateCart)
                                            })
                                            .catch(console.error)
                                        changeCartVisibility(false)
                                        navigate('/checkout')
                                    }}
                                />
                            </React.Suspense>
                            }
                            {cart.length ? (
                                <p className='absolute top-0 right-0 z-50 w-4 h-4 text-center text-sm bg-main-400 rounded-full -translate-y-1/2 translate-x-1/2'>
                                    {cart.length}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        {gettingUser ? (
                            <div style={{
                                scale: '.4',
                            }}><LoadingSpinner/></div>
                        ) : user ? (
                            <div
                                className='w-11 h-11 cursor-pointer rounded-full relative bg-cover bg-center'
                                onClick={() => {
                                    changeUserMenu((old) => !old);
                                }}
                                style={{
                                    backgroundImage: `url(${additionalUserInfo?.photoURL})`,
                                }}
                            >
                                <div
                                    //TODO
                                    className='absolute top-14 right-0 rounded-2xl shadow-2xl bg-white w-max py-2'
                                    style={{
                                        transition: ".2s ease-in-out",
                                        opacity: showUserMenu ? "100%" : "0%",
                                        display: showUserMenu ? 'block' : 'none'
                                    }}
                                >
                                    <p className={'py-2 px-4 font-bold border-b border-gray-200'}>Hello {user.displayName}!</p>
                                    <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}>Account</p>
                                    <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}>You have: {additionalUserInfo?.points} points</p>
                                    <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}
                                        onClick={() =>
                                            import('../../data/datasource/UserDatasource').then(AuthLogic => {
                                                AuthLogic.signUserOut().then(() =>
                                                    navigate(0)
                                                )
                                            })
                                        }
                                    >
                                        Sign out
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div
                                className='border-2 border-main-400 rounded-3xl p-1 px-2 mx-1 font-bold'
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
                className={'flex justify-center mt-16 min-h-screen'}
            >
                <h3
                    id={'Toast'}
                    className={'fixed z-50 bg-white p-2 w-max shadow-2xl font-bold border-2 border-main-400 rounded-3xl flex justify-center'}
                    style={{
                        transition: '.2s ease-in-out',
                        visibility: (Toast !== '') ? 'visible' : 'hidden',
                        opacity: (Toast !== '') ? '100%' : '0%',
                    }}
                ><SVG_CopiedToClipBoard/><span
                    className={'pl-1'}
                >{Toast}</span>
                </h3>
                <React.Suspense fallback={<LoadingSpinner/>}>
                    <Outlet
                        context={{
                            addItemToCart: (item, option, quantity, productOptions) => {
                                import('../../data/DAO/Cart/CartDAO')
                                    .then(cartLogic => {
                                        cartLogic.addItemToCart(cart, updateCart, item, option, quantity, productOptions)
                                    })
                                    .catch(console.error)
                            },
                            clearAllCartItem: () => {
                                import('../../data/DAO/Cart/CartDAO')
                                    .then(cartLogic => cartLogic.removeAllItem(updateCart))
                            },
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
                </React.Suspense>
            </div>
            <ToTopBtn/>
            <footer className={'bg-white flex flex-col justify-center items-center p-8'}>
                <Logo/>
                <p>by Nguyễn Quang Thông</p>
                <a href={'mailto: nguyenquangthong292@gmail.com'}>nguyenquangthong292@gmail.com</a>
                <p>This website is for learning purpose</p>
                <a href="https://github.com/thng292/phimgaygo">Link to the source code.</a>
            </footer>
        </>
    );
}

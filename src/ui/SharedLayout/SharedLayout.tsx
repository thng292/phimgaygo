import {onAuthStateChanged, User} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import CartItem from "../../data/model/Cart/CartItem";
import MovieOverview from "../../data/model/Movie/MovieOverview";
import Logo from "../common/Logo";
import SVG_Search from "../common/SVG/SVG_Search";
import ToTopBtn from "../common/Component/ToTopBtn";
import ContextProps from "./ContextProps";
import SVG_CopiedToClipBoard from "../common/SVG/SVG_CopiedToClipBoard";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";
import {FireAuth} from "../../data/Datasource/DatasourceInstance";
import LoadingSpinner from "../common/Component/LoadingSpinner";
import Screen, {MediaType} from "../../utils/Screen";

export default function SharedLayout() {
    let navigate = useNavigate();
    let isMovieActive = useLocation().pathname.includes(MediaType.Movie)
    const [shoudTransparent, updateShouldTransparent] = useState(true)
    const [gettingUser, setGettingUser] = useState(true);
    const [cart, updateCart] = useState<CartItem<MovieOverview>[]>([]);
    const [showUserMenu, changeUserMenu] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [additionalUserInfo, setAdditionalUserInfo] = useState<UserAdditionData>()
    const [checkoutStuff, setCheckoutStuff] = useState<CartItem<MovieOverview>[]>([]);
    const [Toast, setToast] = useState('')
    //Watch for user state
    useEffect(() => {
        onAuthStateChanged(FireAuth, USER => {
            if (USER !== null) {
                getAdditionalUserInfo(USER.uid, USER)
                    .then(setAdditionalUserInfo)
                    .catch(console.error)
                setUser(USER)
                setGettingUser(false)
            } else {
                setUser(null)
            }
        })
    }, [])
    useEffect(() => {
        setTimeout(() => setGettingUser(false), 2000)
        const updatePos = () => {
            if (window.scrollY >= 10) {
                updateShouldTransparent(false)
                return
            } else {
                updateShouldTransparent(true)
            }
        }
        window.addEventListener('scroll', updatePos)
        return () => {
            window.removeEventListener('scroll', updatePos)
        }
    }, [])
    //#region
    // Auto save cart to local storage
    useEffect(() => {
        updateCart(
            JSON.parse(
                localStorage.getItem("Cart") ?? "[]"
            ) as CartItem<MovieOverview>[]
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
                className={'flex flex-row items-center justify-center h-16 fixed top-0 w-screen z-40 px-6'}
                style={{
                    backgroundImage: shoudTransparent ? 'linear-gradient(to bottom, #000000aa, #00000055 30%, transparent)' : '',
                    backgroundColor: shoudTransparent ? '' : "black"
                }}
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
                                navigate(`/${isMovieActive ? MediaType.Movie : MediaType.TVShow}/${Screen.Search}`)
                            }}
                            className='flex flex-row justify-center items-center border-2 border-main-1000 rounded-3xl p-1 px-2 ml-2'
                        >
                            {SVG_Search()}
                            <p>Search</p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to={`/${isMovieActive ? MediaType.Movie : MediaType.TVShow}/${Screen.Discover}`}
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
                                    <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}>You
                                        have: {additionalUserInfo?.points} points</p>
                                    <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}
                                       onClick={() =>
                                           import('../../data/DAO/User/UserDAO').then(AuthLogic => {
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
                                className='border-2 border-main-1000 rounded-3xl p-1 px-2 mx-1 font-bold cursor-pointer'
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
                className={'flex justify-center min-h-screen'}
            >
                <h3
                    id={'Toast'}
                    className={'fixed z-50 bg-white p-2 w-max shadow-2xl font-bold border-2 border-main-1000 rounded-3xl flex justify-center'}
                    style={{
                        transition: '.2s ease-in-out',
                        visibility: (Toast !== '') ? 'visible' : 'hidden',
                        opacity: (Toast !== '') ? '100%' : '0%',
                    }}
                >{SVG_CopiedToClipBoard()}<span
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
            <footer className={'flex flex-col justify-center items-center p-8'}>
                <Logo/>
                <p>by Nguyễn Quang Thông</p>
                <a href={'mailto: nguyenquangthong292@gmail.com'}>nguyenquangthong292@gmail.com</a>
                <p>This website is for learning purpose</p>
                <a href="https://github.com/thng292/phimgaygo">Link to the source code.</a>
            </footer>
        </>
    );
}

import {User} from "firebase/auth";
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
    const cartLogic = {
        addItemToCart: (
            item: FilmOverview,
            option: number = 0,
            productOptions?: ProductOption[]
        ) => {
            let tmp = cart.findIndex((val) => val.mainItem.id === item.id);
            if (tmp != -1) {
                let tmpCart = cart.map((val) => val);
                tmpCart[tmp].quantity++;
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
        removeAllItem: () => {
            updateCart([]);
            localStorage.setItem("Cart", JSON.stringify([]));
        },
    };
    const [cartVisibility, changeCartVisibility] = useState(false);

    // Waiting for firebase to check user login state
    useEffect(() => {
        let tmp = setInterval(() => {
            console.log("Try to get user detail");
            if (AuthLogic.getUser())
                setUser(AuthLogic.getUser());
        }, 1000);
        setTimeout(() => {
            setGettingUser(false);
            clearInterval(tmp);
            console.log("interval cleared")
        }, 4000);
        return () => {
            clearInterval(tmp)
        };
    }, []);

    //Auto save cart to local storage
    //#region
    useEffect(() => {
        updateCart(
            JSON.parse(
                localStorage.getItem("Cart") ?? "[]"
            ) as CartItem<FilmOverview>[]
        );
        // console.log("Restoring Cart")
        // console.table(JSON.parse(localStorage.getItem("Cart") ?? '[]'))
    }, []);
    useEffect(() => {
        if (cart.length) {
            localStorage.setItem("Cart", JSON.stringify(cart));
        }
    }, [cart]);
    //#endregion
    return (
        <>
            <nav
                className='row center-child'
                style={{
                    height: "64px",
                    position: "fixed",
                    top: "0",
                    width: "100vw",
                    background: "white",
                    zIndex: "1",
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
                                clearAllItemHandler={cartLogic.removeAllItem}
                                onProductClicked={productId => {
                                    navigate(`/detail/${productId}`)
                                }}
                                onCheckout={() => {
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
                            <div className='outlinebtn'>Loading</div>
                        ) : user ? (
                            <div
                                className='outlinebtn user-img'
                                onClick={() => {
                                    changeUserMenu((old) => !old);
                                }}
                                style={{
                                    background: `url(${user.photoURL})`,
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
                                    <p>Balance</p>
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "60px",
                }}
            >
                <Outlet
                    context={{
                        addItemToCart: cartLogic.addItemToCart,
                        user,
                        setUser,
                        navController: navigate,
                    }}
                />
            </div>
            <ToTopBtn/>
            <footer>Footer</footer>
        </>
    );
}

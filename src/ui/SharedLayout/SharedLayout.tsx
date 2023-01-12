import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import SVG_Search from "../common/SVG/SVG_Search";
import ToTopBtn from "../common/Component/ToTopBtn";
import ContextProps from "./ContextProps";
import SVG_CopiedToClipBoard from "../common/SVG/SVG_CopiedToClipBoard";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";
import { FireAuth } from "../../data/Datasource/DatasourceInstance";
import LoadingSpinner from "../common/Component/LoadingSpinner";
import UserMenu from "./UserMenu";

export default function SharedLayout() {
    let navigate = useNavigate();
    const shouldTransparent = checkTop();
    const [Toast, setToast] = useToast();

    const [user, additionalUserInfo] = useUser();
    return (
        <>
            <nav
                className={
                    "flex flex-row items-center justify-center h-16 fixed top-0 w-screen z-40 px-6 transition-all duration-500"
                }
                style={{
                    backgroundImage: shouldTransparent
                        ? "linear-gradient(to bottom, #000000aa, #00000055 30%, transparent)"
                        : "",
                    backdropFilter: shouldTransparent ? "" : "blur(16px)",
                    backgroundColor: shouldTransparent ? "" : "#000000aa",
                }}
            >
                <div className='flex flex-row items-center justify-between w-full'>
                    <div
                        className='flex flex-row items-center cursor-pointer select-none'
                        onClick={() => navigate("/")}
                    >
                        <Logo />
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to={``}
                        >
                            <p>Movies</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to={``}
                        >
                            <p>TV Shows</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold w-24 text-center'
                            to='/about'
                        >
                            <p>About</p>
                        </Link>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(``);
                            }}
                            className='flex flex-row justify-center items-center border-2 border-main-1000 rounded-3xl p-1 px-2 ml-2'
                        >
                            <SVG_Search />
                            <p>Search</p>
                        </div>
                        <UserMenu
                            user={user}
                            additionalUserInfo={additionalUserInfo}
                            navigate={navigate}
                        />
                    </div>
                </div>
            </nav>
            <div className={"flex justify-center min-h-screen"}>
                <h3
                    id={"Toast"}
                    className={
                        "fixed z-50 bg-white p-2 w-max shadow-2xl font-bold border-2 border-main-1000 rounded-3xl flex justify-center"
                    }
                    style={{
                        transition: ".2s ease-in-out",
                        visibility: Toast !== "" ? "visible" : "hidden",
                        opacity: Toast !== "" ? "100%" : "0%",
                    }}
                >
                    <SVG_CopiedToClipBoard />
                    <span className={"pl-1"}>{Toast}</span>
                </h3>
                <React.Suspense fallback={<LoadingSpinner />}>
                    <Outlet
                        context={
                            {
                                additionalUserInfo,
                                user,
                                navController: navigate,
                                displayToast: (text: string) => setToast(text),
                            } as ContextProps
                        }
                    />
                </React.Suspense>
            </div>
            <ToTopBtn show={!shouldTransparent} />
            <footer className={"flex flex-col justify-center items-center p-8"}>
                <Logo />
                <p>by Nguyễn Quang Thông</p>
                <a href={"mailto: nguyenquangthong292@gmail.com"}>
                    nguyenquangthong292@gmail.com
                </a>
                <p>This website is for learning purpose</p>
                <a href='https://github.com/thng292/phimgaygo'>
                    Link to the source code.
                </a>
            </footer>
        </>
    );
}

function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [additionalUserInfo, setAdditionalUserInfo] =
        useState<UserAdditionData>();

    useEffect(() => {
        onAuthStateChanged(FireAuth, (USER) => {
            if (USER !== null) {
                getAdditionalUserInfo(USER.uid, USER)
                    .then(setAdditionalUserInfo)
                    .catch(console.error);
                setUser(USER);
            } else {
                setUser(null);
            }
        });
    }, []);
    return [user, additionalUserInfo] as [User | null, UserAdditionData];
}

function checkTop() {
    const [shouldTransparent, updateShouldTransparent] = useState(true);
    useEffect(() => {
        const updatePos = () => {
            if (window.scrollY >= 10) {
                updateShouldTransparent(false);
                return;
            } else {
                updateShouldTransparent(true);
            }
        };
        window.addEventListener("scroll", updatePos);
        return () => {
            window.removeEventListener("scroll", updatePos);
        };
    }, []);
    return shouldTransparent;
}

function useToast() {
    const [Toast, setToast] = useState("");
    useEffect(() => {
        const tmp = setTimeout(() => {
            setToast("");
        }, 3000);
        return () => {
            clearTimeout(tmp);
        };
    }, [Toast]);
    return [Toast, setToast] as [
        string,
        React.Dispatch<React.SetStateAction<string>>
    ];
}

import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import SVG_Search from "../common/SVG/SVG_Search";
import ToTopBtn from "../common/Component/ToTopBtn";
import ContextProps from "./ContextProps";
import MenuIcon from "@mui/icons-material/Menu";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";
import { FireAuth } from "../../data/Datasource/DatasourceInstance";
import LoadingSpinner from "../common/Component/LoadingSpinner";
import UserMenu from "./UserMenu";
import { Drawer, IconButton, List, ListItemButton } from "@mui/material";
import useIntersection from "../../utils/ElementInViewObseve";

export default function SharedLayout() {
    let navigate = useNavigate();
    const shouldTransparent = checkTop();
    const [searchField, setSearchField] = useState("");
    const [drawerOpend, setDrawerOpened] = useState(false);
    const [user, additionalUserInfo] = useUser();
    const footerRef = useRef<HTMLDivElement>(null)
    const footerInView = useIntersection(footerRef, 0)
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
                    <div className='flex flex-row gap-6 items-center cursor-pointer select-none'>
                        <div className='md:hidden'>
                            <IconButton onClick={() => setDrawerOpened(true)}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <div onClick={() => navigate("/")}>
                            <Logo />
                        </div>
                        <Drawer
                            anchor='left'
                            open={drawerOpend}
                            onClose={() => setDrawerOpened(false)}
                        >
                            <List sx={{
                                minWidth: '50vw'
                            }}>
                                <ListItemButton>
                                    <IconButton
                                        onClick={() => setDrawerOpened(false)}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </ListItemButton>
                                <ListItemButton>
                                    <Link
                                        className='font-bold text-center'
                                        to={"/"}
                                    >
                                        <p>Home</p>
                                    </Link>
                                </ListItemButton>
                                <ListItemButton>
                                    <Link
                                        className='font-bold text-center'
                                        to={``}
                                    >
                                        <p>Movies</p>
                                    </Link>
                                </ListItemButton>
                                <ListItemButton>
                                    <Link
                                        className='font-bold text-center'
                                        to={``}
                                    >
                                        <p>TV Shows</p>
                                    </Link>
                                </ListItemButton>
                                <ListItemButton>
                                    <Link
                                        className='font-bold text-center'
                                        to='/about'
                                    >
                                        <p>About</p>
                                    </Link>
                                </ListItemButton>
                            </List>
                        </Drawer>
                        <Link
                            className='hidden md:block font-bold text-center'
                            to={"/"}
                        >
                            <p>Home</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold text-center'
                            to={``}
                        >
                            <p>Movies</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold text-center'
                            to={``}
                        >
                            <p>TV Shows</p>
                        </Link>
                        <Link
                            className='hidden md:block font-bold text-center'
                            to='/about'
                        >
                            <p>About</p>
                        </Link>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className='flex flex-row justify-center items-center border-2 border-main-1000 rounded-3xl p-1 px-2 mr-2'>
                            <input
                                className='px-2 bg-transparent placeholder placeholder-white underline-offset-1 text-white focus:outline-none focus:underline hidden lg:block'
                                placeholder='Looking for something?'
                                type={"text"}
                                name='search'
                                value={searchField}
                                onChange={(e) =>
                                    setSearchField(e.currentTarget.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && searchField) {
                                        navigate(
                                            `search?query=${encodeURIComponent(
                                                searchField ?? ""
                                            )}`
                                        );
                                        setSearchField("");
                                    }
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                        `search?query=${encodeURIComponent(
                                            searchField ?? ""
                                        )}`
                                    );
                                    setSearchField("");
                                }}
                                className='cursor-pointer'
                            >
                                <SVG_Search />
                            </div>
                        </div>
                        <UserMenu
                            user={user}
                            additionalUserInfo={additionalUserInfo}
                            navigate={navigate}
                        />
                    </div>
                </div>
            </nav>
            <div className={"min-h-screen"}>
                <React.Suspense fallback={<LoadingSpinner />}>
                    <Outlet
                        context={
                            {
                                additionalUserInfo,
                                user,
                                navController: navigate,
                                footerInView
                            } as ContextProps
                        }
                    />
                </React.Suspense>
            </div>
            <ToTopBtn show={!shouldTransparent} />
            <footer
                className={"flex flex-col justify-center items-center p-8"}
                ref={footerRef}
            >
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

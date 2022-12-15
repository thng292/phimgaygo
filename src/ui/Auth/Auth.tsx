import { useState } from "react";
import Logo from "../common/Logo";
import LogoGoogle from "/logo-google.jfif";
import { signInEmail, signInGoogle, signUpEmail } from "../../data/datasource/UserDatasource";
import CheckValidEmail from "../../Utils/CheckValidEmail";
import { useOutletContext } from "react-router-dom";
import ContextProps from "../Layout/ContextProps";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";

function Auth() {
    const { setUser, navController, user } = useOutletContext<ContextProps>();
    const [tab, changeTab] = useState(true);
    // True: Sign in
    // False: Sign up
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const userError = CheckValidEmail(email);
    if (user!== null) navController('/');
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div
                className='max-w-lg flex flex-col justify-center items-center shadow-xl rounded-xl'
                style={{
                    minWidth: "20rem",
                    width: "fit-content",
                }}
            >
                <Logo classN='text-3xl antialiased p-2 pt-6' />
                <div className='flex flex-row justify-around w-full content-center'>
                    <p
                        className={`text-xl cursor-pointer p-2 w-1/2 text-center ${
                            tab ? "border-b-2 border-b-main-400" : ""
                        }`}
                        onClick={() => changeTab(true)}
                    >
                        Sign in
                    </p>
                    <p
                        className={`text-xl cursor-pointer p-2 w-1/2 text-center ${
                            !tab ? "border-b-2 border-b-main-400" : ""
                        }`}
                        onClick={() => changeTab(false)}
                    >
                        Sign up
                    </p>
                </div>
                {tab ? (
                    <>
                        <div className='flex flex-col'>
                            <input
                                type='text'
                                placeholder='Email'
                                className={`border-2 p-2 rounded m-4 transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-main-1000 focus:outline-0 ${
                                    userError
                                        ? "border-main-400"
                                        : "border-rose-600"
                                }`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                }}
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                className='border-2 border-main-400 p-2 rounded m-4 mt-0'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                signInEmail(email, password).then(
                                    (user) => {
                                        getAdditionalUserInfo(user.uid, user)
                                            .then(()=> {
                                                setUser(user)
                                                navController('/')
                                            })
                                            .catch(()=>console.log("Fuck Error"))
                                    }
                                );
                            }}
                            className='bg-main-400 rounded-3xl p-3 w-1/3'
                        >
                            Sign in
                        </button>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col'>
                            <input
                                type='text'
                                placeholder='Email'
                                className={`border-2 p-2 rounded m-4 transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-main-1000 focus:outline-0 ${
                                    userError
                                        ? "border-main-400"
                                        : "border-rose-600"
                                }`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                }}
                            />
                            <input
                                type='text'
                                placeholder='Display Name'
                                className='border-2 border-main-400 p-2 rounded m-4 mt-0'
                                value={displayName}
                                onChange={(e) => {
                                    setDisplayName(e.currentTarget.value);
                                }}
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                className='border-2 border-main-400 p-2 rounded m-4 mt-0'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                signUpEmail(email, password, displayName).then(
                                    (user) => {
                                        //console.log("this is you: ", user);
                                        getAdditionalUserInfo(user.uid, user).then(()=> {
                                            setUser(user)
                                            navController('/')
                                        })

                                    }
                                );
                            }}
                            className='bg-main-400 rounded-3xl p-3 w-1/3'
                        >
                            Sign up
                        </button>
                    </>
                )}
                <div className='w-full mt-4 border-t border-t-main'></div>
                <div
                    className='flex flex-row p-3 px-4 bg-main-400 rounded-3xl cursor-pointer m-4'
                    onClick={() =>
                        signInGoogle()
                            .then((user) => {
                                //console.log("this is you", user)
                                getAdditionalUserInfo(user.uid, user).then(console.log)
                                setUser(user)
                                navController('/')
                            })
                            .catch((err) => console.log(err))
                    }
                >
                    <img
                        src={LogoGoogle}
                        alt='Google'
                        className='w-6 h-6 rounded-full'
                    />
                    <p className='pl-1'>Or sign in with Google</p>
                </div>
            </div>
        </div>
    );
}

export default Auth;

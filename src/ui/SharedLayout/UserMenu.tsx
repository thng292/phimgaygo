import {FC, useState} from "react";
import {User} from "firebase/auth";
import UserAdditionData from "../../data/model/Firebase/UserAdditionData";
import {NavigateFunction} from "react-router-dom";
import Screens from "../../utils/Screen";

const UserMenu: FC<{
    user: User | null,
    additionalUserInfo: UserAdditionData | null,
    navigate: NavigateFunction
}> = ({user, additionalUserInfo, navigate}) => {
    const [showUserMenu, changeUserMenu] = useState(false);
    if (user) {
        return <div
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
                    opacity: showUserMenu ? "100%" : "0%",
                    display: showUserMenu ? 'block' : 'none'
                }}
            >
                <p className={'py-2 px-4 font-bold border-b border-gray-200'}>Hello {user.displayName}!</p>
                <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}>Account</p>
                <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl'}>You
                    have: {additionalUserInfo?.points} points</p>
                <p className={'py-2 px-4 font-bold hover:bg-gray-300 rounded-2xl mix-blend-difference'}
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
    } else {
        return <div
            className='border-2 border-main-1000 rounded-3xl p-1 px-4 mx-1 font-bold tracking-wide cursor-pointer mix-blend-difference'
            onClick={() => navigate(Screens.SignIn)}
        >
            Sign in
        </div>
    }
}

export default UserMenu
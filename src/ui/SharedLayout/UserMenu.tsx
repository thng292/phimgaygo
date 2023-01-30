import { FC, useRef, useState } from "react";
import { User } from "firebase/auth";
import { Link, NavigateFunction } from "react-router-dom";
import Screens from "../../utils/Screen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ClickAwayListener } from "@mui/base";
import { Avatar, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { deleteUserAccount } from "../../data/DAO/User/UserDAO";
import { deleteAdditionalUserInfo } from "../../data/DAO/FireStore/AdditionalUserInfoDAO";

const UserMenu: FC<{
    user: User | null;
    navigate: NavigateFunction;
}> = ({ user, navigate }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    if (user) {
        return (
            <div>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    {user.photoURL ? (
                        <Avatar src={user.photoURL} />
                    ) : (
                        <AccountCircleIcon fontSize='large' />
                    )}
                </IconButton>
                <Menu
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                    onClick={() => setAnchorEl(null)}
                >
                    <MenuItem disabled>Hello {user.displayName}!</MenuItem>
                    <Divider></Divider>
                    <MenuItem onClick={() => navigate(Screens.Library)}>
                        Library
                    </MenuItem>
                    <MenuItem onClick={() => navigate(Screens.History)}>
                        History
                    </MenuItem>
                    
                    <MenuItem
                        onClick={() =>
                            import("../../data/DAO/User/UserDAO").then(
                                (AuthLogic) => {
                                    AuthLogic.signUserOut().then(() =>
                                        navigate(0)
                                    );
                                }
                            )
                        }
                    >
                        Sign out
                    </MenuItem>
                    <MenuItem sx={{
                        '&': {
                            color: 'red'
                        }
                    }} onClick={() => {
                        deleteAdditionalUserInfo(user.uid)
                        deleteUserAccount(user)
                    }}>Delete this account</MenuItem>
                </Menu>
            </div>
        );
    } else {
        return (
            <div
                className='border-2 border-main-1000 rounded-3xl p-1 px-4 mx-1 font-bold tracking-wide cursor-pointer mix-blend-difference'
                onClick={() => navigate(Screens.SignIn)}
            >
                Sign in
            </div>
        );
    }
};

export default UserMenu;

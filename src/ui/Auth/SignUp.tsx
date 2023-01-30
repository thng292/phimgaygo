import { FC, useEffect, useRef, useState } from "react";
import Logo from "../common/Logo";
import {
    signInEmail,
    signInGoogle,
    signUpEmail,
} from "../../data/DAO/User/UserDAO";
import CheckValidEmail from "../../utils/CheckValidEmail";
import { Link, useOutletContext } from "react-router-dom";
import ContextProps from "../SharedLayout/ContextProps";
import {
    Backdrop,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Screens from "../../utils/Screen";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp: FC = () => {
    const { navController, user } = useOutletContext<ContextProps>();
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordRe, setPasswordRe] = useState("");
    const [passwordReVisibility, setPasswordReVisibility] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState<boolean | "error">(
        false
    );
    const [error, setError] = useState("");
    const signUpEmailHandle = () => {
        setShowModal(true);
        signUpEmail(email, password, displayName)
            .then(() => {
                setTimeout(() => navController(Screens.Home), 4000);
            })
            .catch((reason) => {
                setSignUpSuccess("error");
                setError(reason.message);
                setShowModal(false)
            });
    };
    const [emailError, setEmailError] = useState(true);
    useEffect(() => {
        setEmailError(true);
        const tmp = setTimeout(() => {
            setEmailError(CheckValidEmail(email));
        }, 500);
        return () => clearTimeout(tmp);
    }, [email]);
    useEffect(() => {
        if (user) {
            setSignUpSuccess(true);
            setTimeout(() => navController(Screens.Home), 4000);
        }
    }, []);
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Modal
                disableEnforceFocus
                sx={{
                    pointerEvents: "all",
                }}
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    {signUpSuccess === true ? (
                        <Paper
                            elevation={4}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                p: "2rem",
                            }}
                        >
                            <Stack spacing={2}>
                                <Typography fontSize={20}>
                                    Login Successful
                                </Typography>
                                <Typography>
                                    Hello, {user?.displayName}!
                                </Typography>
                                <Typography>
                                    Redirecting to{" "}
                                    <Link
                                        to={Screens.Home}
                                        className='hover:text-main-1000'
                                    >
                                        home
                                    </Link>
                                </Typography>
                            </Stack>
                        </Paper>
                    ) : (
                        <CircularProgress></CircularProgress>
                    )}
                </div>
            </Modal>
            <Paper
                elevation={4}
                sx={{
                    "&": {
                        p: "2rem",
                        width: "80%",
                        maxWidth: "36rem",
                    },
                }}
            >
                <Stack
                    spacing={2}
                    className='items-center'
                    sx={{
                        width: "80%",
                        m: "auto",
                    }}
                >
                    <Logo classN='scale-125' />
                    <Typography>Sign in to your account</Typography>
                    {signUpSuccess === "error" && (
                        <Typography color={"error"}>
                            {error}
                        </Typography>
                    )}
                    <div className='flex flex-col gap-4 w-full'>
                        <TextField
                            fullWidth
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            inputMode='email'
                            type={"email"}
                            label='Email'
                            required
                            error={!emailError && Boolean(email)}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            value={displayName}
                            onChange={(e) =>
                                setDisplayName(e.currentTarget.value)
                            }
                            inputMode='text'
                            type={"text"}
                            label='Display name'
                            required
                        />
                        <TextField
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            inputMode='text'
                            required
                            type={passwordVisibility ? "text" : "password"}
                            label={
                                password.length > 6 || password.length === 0
                                    ? "Password"
                                    : "Too short"
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={() =>
                                                setPasswordVisibility(
                                                    (old) => !old
                                                )
                                            }
                                        >
                                            {passwordVisibility ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={
                                !(password.length > 6 || password.length === 0)
                            }
                        />
                        <TextField
                            fullWidth
                            value={passwordRe}
                            onChange={(e) =>
                                setPasswordRe(e.currentTarget.value)
                            }
                            inputMode='text'
                            required
                            type={passwordReVisibility ? "text" : "password"}
                            label='Confirm Password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={() =>
                                                setPasswordReVisibility(
                                                    (old) => !old
                                                )
                                            }
                                        >
                                            {passwordReVisibility ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    signUpEmailHandle();
                                }
                            }}
                            error={password !== passwordRe}
                        />
                    </div>
                    <Button
                        variant='contained'
                        disabled={
                            !emailError || !Boolean(email) || !Boolean(password)
                        }
                        onClick={signUpEmailHandle}
                    >
                        Sign Up
                    </Button>
                    <Divider
                        flexItem
                        light
                    />
                    <div className='flex flex-col items-center'>
                        <Typography>Already have an account?</Typography>
                        <Link
                            className='hover:text-main-1000 underline'
                            to={Screens.SignIn}
                        >
                            Sign in here
                        </Link>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
};

export default SignUp;

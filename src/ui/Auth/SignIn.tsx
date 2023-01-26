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

const SignIn: FC = () => {
    const { navController, user } = useOutletContext<ContextProps>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [signInSuccess, setSignInSuccess] = useState<boolean | "error">(false);
    const signInEmailHandle = () => {
        setShowModal(true);
        signInEmail(email, password)
            .then(() => {
                setSignInSuccess(true);
                setTimeout(() => navController(Screens.Home), 4000);
            })
            .catch((reason) => {
                setSignInSuccess("error");
                setShowModal(false);
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
            setSignInSuccess(true);
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
                    {signInSuccess === true ? (
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
                    <Logo classN="scale-125" />
                    <Typography>Sign in to your account</Typography>
                    {signInSuccess === "error" && (
                        <Typography color={"error"}>
                            Invalid email or password
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
                            error={!emailError}
                        />
                        <TextField
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            inputMode='text'
                            required
                            type={passwordVisibility ? "text" : "password"}
                            label='Password'
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
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    signInEmailHandle();
                                }
                            }}
                        />
                    </div>
                    <Button
                        variant='contained'
                        disabled={
                            !emailError || !Boolean(email) || !Boolean(password)
                        }
                        onClick={signInEmailHandle}
                    >
                        Sign In
                    </Button>
                    <Divider
                        flexItem
                        light
                        children='Or'
                    />
                    <Button
                        variant='contained'
                        startIcon={<GoogleIcon />}
                        onClick={() => {
                            setShowModal(true);
                            signInGoogle().then(() => {
                                setSignInSuccess(true);
                                setTimeout(
                                    () => navController(Screens.Home),
                                    4000
                                );
                            }).catch(() => {
                                setSignInSuccess('error')
                                setShowModal(false)
                            })
                        }}
                    >
                        Sign in with Google
                    </Button>
                    <div className='flex flex-col items-center'>
                        <Typography>Don't have an account?</Typography>
                        <Link
                            className='hover:text-main-1000 underline'
                            to={Screens.SignUp}
                        >
                            Register one here
                        </Link>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
};

export default SignIn;

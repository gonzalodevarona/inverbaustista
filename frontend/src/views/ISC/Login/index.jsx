import { Box, Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import LoadingButton from "@mui/lab/LoadingButton";
import Constants from '../../../utils/Constants';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from '../../../config/AxiosBackend';
import { setLocalData } from '../../../utils/CommonFunctions';
import ToastAlert from '../../../components/Alerts/ToastAlert';
import AuthService from '../../../services/AuthService';
import LoginBanner from '../../../assets/images/LoginBanner.png'

function Login() {
    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/' + route)
    };

    const [isProcessingInfo, setIsProcessingInfo] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (loginData) => {

        setIsProcessingInfo(true);
        const token = await AuthService.login(loginData);

        if (typeof token === 'string') {
            setLocalData('token', token, Constants.dayCacheToExpire);
            axios.defaults.headers.Authorization = `Bearer ${token}`
            setTimeout(() => {
                handleRedirectClick('isc');
            }, 1000);
            
        }
        else {
            
            ToastAlert('top-right', 4000).fire({
                icon: 'error',
                title: 'Nombre de usuario o contraseña incorrecto'
            });
            setTimeout(() => {
                setIsProcessingInfo(false);
            }, 1000);
            
        }
        
    };
    return (
        <Stack sx={{ width: { xs: '50%', md: '100%' } }} alignItems='center' spacing={5} >

            <Box
                component="img"
                src={LoginBanner}
            />
            <form id="loginInfo" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2}>

                    <TextField
                        label="Nombre de usuario"
                        type="text"
                        sx={{ width: '45em' }}
                        InputLabelProps={{
                            sx: {

                                fontSize: "17px",
                                fontWeight: 1000,
                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                            }
                        }}
                        required
                        {...register("username", {
                            required: "El nombre de usuario es requerido", validate: {

                                matchPattern: (v) =>
                                    /^[\p{L}\p{M}]+$/u.test(v) ||
                                    "El nombre de usuario debe ser válido",
                            },
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        InputLabelProps={{
                            sx: {

                                fontSize: "16px",
                                fontWeight: 1000,
                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                        sx={{ width: '45em' }}
                        required
                        {...register("password", {
                            required: "La contraseña es requerida"
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />


                </Stack>

            </form>

            <LoadingButton
                sx={{ width: '20em' }}
                variant='contained'
                form="loginInfo"
                type="Submit"
                loading={isProcessingInfo}

            >
                Iniciar sesión
            </LoadingButton>
        </Stack>
    )
}

export default Login
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import ForgotPassword from './ForgotPassword';
import CustomizedSnackbar from '../../common/snackbar/CustomizedSnackbar';
import { login } from '../../store/slices/authSlice';
import { useAuth0 } from '@auth0/auth0-react';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {

  const navigate = useNavigate();
  const userList = useSelector((state: RootState)=> state.getUsers.users);

  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<String>('');
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<String>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [openCustomeSnackbar, setOpenCustomeSnackbar] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { token, loading, error } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginWithRedirect } = useAuth0(); // Auth0 hook

  useEffect(() => {
    // Redirect if login is successful
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    const action = await dispatch(login({ username, password }));
    if (login.rejected.match(action)) {
      setOpenCustomeSnackbar(true);
    }
  };
  const handleAuth0Login = () => {
    loginWithRedirect();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCustomeSnackbarClose = () =>{
    setOpenCustomeSnackbar(!openCustomeSnackbar);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    document.cookie='EmailId ='+ String(data.get('email')); 
    document.cookie='Password ='+ String(data.get('password')); 
    navigate('/');
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    console.log("In validation function", userList);
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    console.log("email", email.value);
    console.log("password", password.value)
    const verifyUser = userList.find((u: any)=>u.email==email.value && u.password==password.value);
    console.log("verifyUser", verifyUser);
    if(verifyUser===undefined)
      isValid=false;

    //User Snackbar over here
    if(!isValid){
      setOpenCustomeSnackbar(true);
      setEmailError(true);
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    //<AppTheme {...props}>
      //<CssBaseline enableColorScheme />
      <React.Fragment>
        <CustomizedSnackbar 
          open={openCustomeSnackbar} 
          bgColor='error' 
          message="Invalid emailId or password"
          handleClose={handleCustomeSnackbarClose}
        />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
              {/* logo */}
            {/* <SitemarkIcon /> */}
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight:'900'}}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  size='small'
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  size='small'
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleAuth0Login}
              sx={{ mt: 2 }}
            >
              Sign in with Auth0
            </Button>
              <Link
                
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center', color:'black'}}
              >
                Forgot your password?
              </Link>
            </Box>
          </Card>
        </SignInContainer>
      </React.Fragment>
    //</AppTheme>
  );
}
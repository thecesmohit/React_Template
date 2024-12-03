import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
    const [showPasswordField, setShowPasswordField] = React.useState<boolean>(false);
    const userList = useSelector((state: RootState)=> state.getuserList.userList);
    const emailRef = React.useRef<HTMLDivElement | null>(null);
    const passwordRef = React.useRef<HTMLDivElement | null>(null);

    const handleContinueBtnClick = () => {
        //complete the remaining code
    }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //   event.preventDefault();
        //   //handleClose();
        // },
        sx: { backgroundImage: 'none', width:'50%'},
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column',gap:1}}
      >
        {/* <DialogContentText>
          Enter your account&apos;s email address
        </DialogContentText>
        <OutlinedInput
          autoFocus
          size='small'
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
        /> */}
        <FormControl>
            <FormLabel htmlFor="email">Enter Email</FormLabel>
            <TextField
                size='small'
                //error={emailError}
                //helperText={emailErrorMessage}
                ref={emailRef}
                id="emailId"
                type="emailId"
                name="emailId"
                placeholder="your@email.com"
                autoComplete="emailId"
                autoFocus
                required
                fullWidth
                variant="outlined"
                //color={emailError ? 'error' : 'primary'}
            />
        </FormControl>
        {
            showPasswordField &&
            <FormControl>
                <FormLabel htmlFor="password">Enter Password</FormLabel>
                <TextField
                    size='small'
                    //error={passwordError}
                    //helperText={passwordErrorMessage}
                    ref={passwordRef}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    //color={passwordError ? 'error' : 'primary'}
                />
            </FormControl>
        }
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleContinueBtnClick}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
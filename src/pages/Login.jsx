import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Fade,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { useState } from 'react'
import { ErrorOutline } from '@mui/icons-material'

function Login() {
  const navigate = useNavigate()
  const loginAction = useUser((c) => c.login)
  const [pageState, setPageState] = useState({ isLoading: false, message: '' })
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
      phonenumber: '',
    },
  })
  const { errors } = formState

  const onSubmit = async (data) => {
    try {
      setPageState({ isLoading: true, message: '' })
      await loginAction(data)
      navigate('/store')
    } catch (error) {
      setPageState((p) => ({
        ...p,
        message: error,
      }))
      console.error(error)
    } finally {
      setPageState((pre) => ({ ...pre, isLoading: false }))
    }
  }
  return (
    <>
      <Header title={'Login'} hideAction />
      <Box
        component={'img'}
        src='/logo.svg'
        display={'block'}
        mx='auto'
        width={'360px'}
      />
      {pageState.message && (
        <Fade in={Boolean(pageState.message)}>
          <Alert color='error' sx={{ my: 2.3 }} icon={<ErrorOutline />}>
            <AlertTitle>Error message</AlertTitle>
            {pageState.message}
          </Alert>
        </Fade>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
          fullWidth
          size='small'
          margin='dense'
          label='Email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              message: 'Type a valid email',
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            },
          })}
        />
        <TextField
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
          fullWidth
          size='small'
          margin='dense'
          label='Password'
          {...register('password', { required: 'Password is required' })}
          type='password'
        />
        <Link component={RouterLink} to='/reset-password' sx={{ fontSize: 12 }}>
          Forget password?
        </Link>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ my: 2 }}
          disabled={pageState.isLoading}
          endIcon={pageState.isLoading && <CircularProgress size={18} />}
        >
          Login
        </Button>
        <Typography component={'span'}>
          {"Don't"} have an account?{' '}
          <Link component={RouterLink} to='/signup'>
            create one
          </Link>
        </Typography>
      </form>
    </>
  )
}

export default Login

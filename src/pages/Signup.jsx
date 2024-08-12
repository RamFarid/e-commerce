import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
// import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import server from '../lib/axios'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PhoneNumberinput from '../components/signup_login/PhoneNumberinput'

function Signup() {
  const [pageState, setPageState] = useState({ isLoading: false, message: '' })
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repassword: '',
      age: null,
    },
  })
  const { errors } = formState
  const navigate = useNavigate()
  const pnRef = useRef()

  const onSubmit = async (data) => {
    const datanew = { ...data, phonenumber: pnRef.current.getInputValue() }
    try {
      setPageState({ isLoading: true, message: '' })
      await server.post('/auth/signup', datanew)
      toast.success('Successfully Created Account')
      navigate('/login')
    } catch (error) {
      console.log(error)
      if (error.name === 'AxiosError') {
        return setPageState((p) => ({
          ...p,
          message: error?.response?.data?.message,
        }))
      }
    } finally {
      setPageState((pre) => ({ ...pre, isLoading: false }))
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Header title={'Signup'} hideAction />
      <Box
        component={'img'}
        src='/logo.svg'
        display={'block'}
        mx='auto'
        width={'360px'}
      />
      {pageState.message && (
        <Alert color='error' sx={{ mb: 2 }}>
          <AlertTitle>Error!</AlertTitle>
          {pageState.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Name'
          fullWidth
          size='small'
          margin='dense'
          error={Boolean(errors?.name?.message)}
          helperText={errors?.name?.message}
          {...register('name', {
            required: 'Your name is required',
            maxLength: {
              value: 25,
              message: "Name shouldn't exceed 25 character",
            },
          })}
        />
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
        <TextField
          error={Boolean(errors?.repassword?.message)}
          helperText={errors?.repassword?.message}
          fullWidth
          size='small'
          margin='dense'
          label='Confirm password'
          type='password'
          {...register('repassword', {
            required: 'Match this field with password',
            validate: {
              matchPassword: (value, { password }) => {
                return value === password || 'Password not match'
              },
            },
          })}
        />
        <TextField
          error={Boolean(errors?.age?.message)}
          helperText={errors?.age?.message}
          fullWidth
          size='small'
          margin='dense'
          type='number'
          label='Your age'
          {...register('age', {
            valueAsNumber: true,
            min: { value: '1', message: 'Age is not valid' },
          })}
        />
        <PhoneNumberinput ref={pnRef} />
        <Typography my={2}>
          Already have an account?{' '}
          <Link component={RouterLink} to='/login'>
            Login
          </Link>
        </Typography>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ mt: 2 }}
          disabled={pageState.isLoading}
          endIcon={pageState.isLoading && <CircularProgress size={18} />}
        >
          Create account
        </Button>
      </form>
    </Box>
  )
}

export default Signup

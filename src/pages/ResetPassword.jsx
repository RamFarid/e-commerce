import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import { Box, Button, TextField, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import server from '../lib/axios'
import { useState } from 'react'
import NewPasswordForm from '../components/home/settings/profile/NewPasswordForm'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const navigate = useNavigate('/login')
  const {
    formState: { errors, isSubmitting },
    getValues,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      code: '',
    },
  })
  const [stage, setStage] = useState(1)

  const verifyCode = async ({ code, email }) => {
    const { data } = await server.post('/auth/temp-code-check', {
      email,
      tempCode: code,
    })
    setStage(3)
    toast.success(data.message)
  }

  const changePassword = async ({ password }) => {
    try {
      await server.put('/user/password', {
        password,
        tempCode: getValues('code'),
        email: getValues('email'),
      })
      toast.success('Password successfully Changed')
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const onSubmit = async (formData) => {
    try {
      if (stage === 2)
        return await verifyCode({ code: formData.code, email: formData.email })
      const { data } = await server.post('/auth/reset-password', {
        email: formData.email,
      })
      setStage(2)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  return (
    <>
      <Header href={'/login'} title='Reset password' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
          fullWidth
          size='small'
          margin='dense'
          label='Email'
          {...register('email', {
            required: 'Email is required to send email',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email is not valid',
            },
          })}
          disabled={stage !== 1}
          sx={(p) => ({
            backgroundColor:
              stage !== 1 ? p.palette.background.paper : 'transparent',
          })}
        />
        {stage >= 2 && (
          <TextField
            error={Boolean(errors?.code?.message)}
            helperText={errors?.code?.message}
            fullWidth
            size='small'
            margin='dense'
            label='Confirm Code'
            {...register('code', {
              required: 'Code is required',
            })}
            disabled={stage > 2}
          />
        )}
        <Box textAlign={'end'}>
          <Button
            disableElevation
            size='small'
            sx={{ my: 1.4 }}
            type='submit'
            endIcon={isSubmitting && <CircularProgress size={16} />}
            disabled={isSubmitting || stage === 3}
          >
            {stage === 1 ? 'Send Email' : 'Confirm Code'}
          </Button>
        </Box>
      </form>
      {stage === 3 && <NewPasswordForm onSubmit={changePassword} />}
    </>
  )
}

export default ResetPassword

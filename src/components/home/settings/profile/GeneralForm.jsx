import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useUser } from '../../../../contexts/UserContext'
import ProfileFormHeader from './ProfileFormHeader'
import { toast } from 'react-toastify'
import server from '../../../../lib/axios'

GeneralForm.propTypes = {
  pageState: PropTypes.shape({
    isLoading: PropTypes.bool,
    message: PropTypes.string,
  }),
  setPageState: PropTypes.func,
}

function GeneralForm() {
  const user = useUser((v) => v.user)
  const updateUser = useUser((v) => v.updateUser)
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: user?.name || 'Ram Farid',
      email: user?.email || 'contactramfarid@gmail.com',
      phonenumber: user?.phonenumber || '',
      age: user?.age || 18,
    },
  })
  const { errors, isDirty, isSubmitting, dirtyFields } = formState

  const onSubmit = async (data) => {
    const fieldsToServer = {}
    for (const key in dirtyFields) {
      const value = data[key]
      fieldsToServer[key] = value
    }
    console.log(fieldsToServer)
    try {
      await server.put('/user', fieldsToServer)
      updateUser(fieldsToServer)
      reset({ ...user, ...fieldsToServer })
    } catch (error) {
      console.log(error)
      if (error.name === 'AxiosError') {
        return toast.error(error?.response?.data?.message)
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileFormHeader
        title={'General'}
        disableAction={!isDirty}
        isLoading={isSubmitting}
      />
      <TextField
        label='Name'
        fullWidth
        size='small'
        margin='dense'
        error={Boolean(errors?.name?.message)}
        helperText={errors?.name?.message}
        {...register('name', {
          required: 'Your name is required',
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: 'Name should only contains Alphabets',
          },
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
        aria-readonly='true'
        InputProps={{ readOnly: true }}
        disabled
        {...register('email', {
          required: 'Email is required',
          pattern: {
            message: 'Type a valid email',
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          },
        })}
      />
      {/* <TextField
            error={Boolean(errors?.phonenumber?.message)}
            helperText={errors?.phonenumber?.message}
            fullWidth
            size='small'
            margin='dense'
            label='Phone number'
            {...register('number', { required: 'Phone number is required' })}
          /> */}
      {/* <PhoneInput
            onChange={(v) => {
              setValue(v)
              console.log(v)
              console.log(
                isPossiblePhoneNumber(v || '', { defaultCountry: 'EG' })
              )
              console.log(isValidPhoneNumber(v || '', { defaultCountry: 'EG' }))
            }}
            id='phone-number__custom'
            defaultCountry='EG'
            value={value}
          /> */}
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
    </form>
  )
}

export default GeneralForm

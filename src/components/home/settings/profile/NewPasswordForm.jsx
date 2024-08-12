import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import ProfileFormHeader from './ProfileFormHeader'
import { useUser } from '../../../../contexts/UserContext'

NewPasswordForm.propTypes = {
  pageState: PropTypes.shape({
    isLoading: PropTypes.bool,
    message: PropTypes.string,
  }),
  setPageState: PropTypes.func,
  requiredOldPassword: PropTypes.bool,
  onSubmit: PropTypes.func,
}

const getDefaultValues = (requiredOldPassword, phonenumber) => {
  let defaultValues = {
    password: '',
    repassword: '',
    phonenumber: phonenumber,
  }
  if (requiredOldPassword) defaultValues.oldpassword = ''
  return defaultValues
}

function NewPasswordForm({ requiredOldPassword, onSubmit }) {
  const phonenumber = useUser((v) => v?.user?.phonenumber)
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: getDefaultValues(requiredOldPassword, phonenumber),
  })
  const { errors, isDirty, isSubmitting, isValid } = formState
  console.log(getDefaultValues(requiredOldPassword, phonenumber))
  const submitHandler = async (data) => {
    await onSubmit(data)
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{ marginBlock: '30px' }}
    >
      <ProfileFormHeader
        title={'Change Password'}
        disableAction={!isDirty || !isValid}
        isLoading={isSubmitting}
      />
      {requiredOldPassword && (
        <TextField
          error={Boolean(errors?.oldpassword?.message)}
          helperText={errors?.oldpassword?.message}
          fullWidth
          size='small'
          margin='dense'
          label='Old Password'
          {...register('oldpassword', {
            required: 'Old password must be define',
          })}
          type='password'
        />
      )}
      <TextField
        error={Boolean(errors?.password?.message)}
        helperText={errors?.password?.message}
        fullWidth
        size='small'
        margin='dense'
        label='New Password'
        {...register('password', { required: 'Password is required' })}
        type='password'
      />
      <TextField
        error={Boolean(errors?.repassword?.message)}
        helperText={errors?.repassword?.message}
        fullWidth
        size='small'
        margin='dense'
        label='Confirm New password'
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
    </form>
  )
}

export default NewPasswordForm

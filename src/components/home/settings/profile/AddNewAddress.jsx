import PropTypes from 'prop-types'
import Popup from '../../../Popup'
import { Button, Stack, TextField } from '@mui/material'
import Header from '../../../Header'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import server from '../../../../lib/axios'
import { useUser } from '../../../../contexts/UserContext'

AddNewAddress.propTypes = {
  canOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

function AddNewAddress({ canOpen, onClose }) {
  const updateUser = useUser((v) => v.updateUser)
  const {
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      text: '',
      country: '',
      state: '',
      city: '',
      zip_code: null,
    },
  })

  const sendData = async (form) => {
    try {
      const { data } = await server.post('/user/addresses', { address: form })
      return data.addresses
    } catch (error) {
      if (error.name === 'AxiosError') {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  }

  const submitNewAddress = async (data) => {
    try {
      console.log(data)
      const addresses = await sendData(data)
      toast.success('Add address successfully')
      updateUser({ addresses })
      reset()
      onClose()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Popup canOpen={canOpen} onClose={onClose}>
      <Stack>
        <Header title={'Add New Address'} onClick={onClose} size='small' />
        <Stack
          height={'100%'}
          component={'form'}
          onSubmit={handleSubmit(submitNewAddress)}
          flex={1}
        >
          <TextField
            label='Address Text'
            fullWidth
            size='small'
            margin='dense'
            error={Boolean(errors?.text?.message)}
            helperText={errors?.text?.message}
            {...register('text', {
              required: 'Address is required',
            })}
          />
          <TextField
            label='Country'
            fullWidth
            size='small'
            margin='dense'
            error={Boolean(errors?.country?.message)}
            helperText={errors?.country?.message}
            {...register('country', {
              required: 'Country is required',
            })}
          />
          <TextField
            label='State/Region'
            fullWidth
            size='small'
            margin='dense'
            error={Boolean(errors?.state?.message)}
            helperText={errors?.state?.message}
            {...register('state', {
              required: 'State or Region is required',
            })}
          />
          <TextField
            label='City'
            fullWidth
            size='small'
            margin='dense'
            error={Boolean(errors?.city?.message)}
            helperText={errors?.city?.message}
            {...register('city', {
              required: 'City is required',
            })}
          />
          <TextField
            label='Zip Code (Postal code)'
            fullWidth
            size='small'
            margin='dense'
            type='number'
            error={Boolean(errors?.zip_code?.message)}
            helperText={errors?.zip_code?.message}
            {...register('zip_code', {
              required: 'Zip Code is required',
              valueAsNumber: true,
            })}
          />
          <Button
            variant='contained'
            type='submit'
            fullWidth
            disableElevation
            sx={{ mt: 'auto' }}
            disabled={isSubmitting || !isValid}
          >
            Add New Address
          </Button>
        </Stack>
      </Stack>
    </Popup>
  )
}

export default AddNewAddress

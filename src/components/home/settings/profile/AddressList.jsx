import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import AddNewAddress from './AddNewAddress'
import AddressItem from '../../AddressItem'
import { useUser } from '../../../../contexts/UserContext'
import Empty from '../../../Empty'
import { toast } from 'react-toastify'
import server from '../../../../lib/axios'

function AddressList() {
  const addresses = useUser((v) => v?.user?.addresses)
  const updateUser = useUser((v) => v?.updateUser)
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  const [openNewAddress, setOpenNewAddress] = useState(false)

  const closeAddressModal = () => setOpenNewAddress(false)
  const openAddressModal = () => setOpenNewAddress(true)
  const deleteAddress = async (addressId) => {
    try {
      const { data } = await server.delete('/user/addresses', {
        params: { address_id: addressId },
      })
      return data.addresses
    } catch (error) {
      if (error.name === 'AxiosError') {
        throw new Error(error.response.data)
      }
      throw error
    }
  }
  const handleDelete = async (addressId) => {
    try {
      const addresses = await deleteAddress(addressId)
      toast.success('Delete address successfully')
      updateUser({ addresses })
    } catch (error) {
      toast.error(error.message)
    }
  }
  return isLoggedIn ? (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant='subtitle1'>Saved Addresses</Typography>
        <Button
          type='submit'
          disableElevation
          size='small'
          onClick={openAddressModal}
        >
          Add new address
        </Button>
      </Stack>
      {addresses?.length ? (
        addresses?.map((address) => (
          <AddressItem key={address._id} {...address} onClick={handleDelete} />
        ))
      ) : (
        <Empty
          title={'No address'}
          message={
            <>
              <Button type='submit' disableElevation onClick={openAddressModal}>
                Add address
              </Button>
              to easily found you
            </>
          }
        />
      )}
      <AddNewAddress canOpen={openNewAddress} onClose={closeAddressModal} />
    </>
  ) : null
}

export default AddressList

import Header from '../../components/Header'
import AddressList from '../../components/home/settings/profile/AddressList'
import GeneralForm from '../../components/home/settings/profile/GeneralForm'
import NewPasswordForm from '../../components/home/settings/profile/NewPasswordForm'
import server from '../../lib/axios'
import { toast } from 'react-toastify'

function Profile() {
  const changePassword = async ({ password, oldpassword }) => {
    try {
      await server.put('/user/password', {
        password,
        oldpassword,
      })
      toast.success('Password successfully Changed')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      throw error
    }
  }
  return (
    <>
      <Header title='Personal Settings' href={'/settings'} />
      {/* {pageState.message && (
        <Alert color='error'>
          <AlertTitle>Server Error</AlertTitle>
          {pageState.message}
        </Alert>
      )} */}
      <GeneralForm />
      <NewPasswordForm requiredOldPassword onSubmit={changePassword} />
      <AddressList />
    </>
  )
}

export default Profile

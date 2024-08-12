import { Divider, List, Button } from '@mui/material'
import Header from '../../components/Header'
import SettingItem from '../../components/home/settings/SettingItem'
import UserCard from '../../components/home/settings/UserCard'
import { useUser } from '../../contexts/UserContext'
import Empty from '../../components/Empty'
import NoAccountsIcon from '@mui/icons-material/NoAccounts'

function Settings() {
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  const ordersNo = useUser((v) => v?.user?.ordersNo)
  const cardsNo = useUser((v) => v?.user?.cardsNo)
  const reviewNo = useUser((v) => v?.user?.reviewsNo)
  const logOut = useUser((v) => v?.logOut)
  return (
    <>
      <Header title={'My Profile'} hideAction />
      <UserCard />
      <Divider />
      {isLoggedIn ? (
        <List>
          <SettingItem
            text={'My Orders'}
            secondary={`${ordersNo} orders`}
            link='my-orders'
          />
          <SettingItem
            text={'Paymnet methods'}
            secondary={cardsNo ? `${cardsNo} Added` : 'No Cards Added'}
            link='payments'
          />
          <SettingItem
            text={'My Reviews'}
            secondary={`${reviewNo} Reviews`}
            link='my-reviews'
          />
          <SettingItem
            text={'Profile Settings'}
            secondary={'Name, Passwords, Addresses ...'}
            link='profile'
          />

          <Button variant='outlined' sx={{ mt: 2 }} fullWidth onClick={logOut}>
            Logout
          </Button>
        </List>
      ) : (
        <Empty
          title={'Anonymous'}
          message={'Please login to see your settings and statistics'}
          icon={<NoAccountsIcon />}
        />
      )}
    </>
  )
}

export default Settings

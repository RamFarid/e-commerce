import {
  Box,
  Divider,
  Drawer,
  IconButton,
  MenuList,
  Toolbar,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Person2Icon from '@mui/icons-material/Person2'
import NavigationItemWideScreen from './NavigationItemWideScreen'
import UserCard from './UserCard'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ListNavigation from './ListNavigation'
import { useCallback, useState } from 'react'
import Badge from '@mui/material/Badge'
import { useUser } from '../../../contexts/UserContext'

function WideScreenNavigation() {
  const [menues, setMenues] = useState({ storeMenu: false })
  const cart = useUser((v) => v?.cart)

  const toggleStoreMenu = useCallback(() => {
    setMenues((pre) => ({ ...pre, storeMenu: !pre?.storeMenu }))
  }, [])
  return (
    <Drawer
      variant='permanent'
      sx={{ position: 'sticky', top: 0, height: '100dvh' }}
      PaperProps={{ sx: { position: 'relative' } }}
      anchor='left'
    >
      <Box px={1.9} py={1}>
        <Toolbar>
          <Box component={'img'} src='/logo.svg' maxWidth={'100%'} />
        </Toolbar>
        <Divider sx={{ mb: 1.2 }} />
        <UserCard />
        <MenuList
          sx={{
            '& > li': {
              mt: 1.5,
            },
          }}
        >
          <NavigationItemWideScreen icon={<HomeIcon />} title={'Home'} to='/' />
          <NavigationItemWideScreen
            icon={<ShoppingCartIcon />}
            title={'Shopping'}
            to='/store'
            onClick={toggleStoreMenu}
            action={
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation()
                  toggleStoreMenu()
                }}
              >
                <ArrowDropDownIcon
                  fontSize='small'
                  sx={{ rotate: menues?.storeMenu ? '180deg' : '0deg' }}
                />
              </IconButton>
            }
          />
          <ListNavigation open={menues?.storeMenu} />
          <NavigationItemWideScreen
            icon={
              <Badge badgeContent={cart?.length} color='primary'>
                <LocalMallIcon />
              </Badge>
            }
            title={'Bag'}
            to='/cart'
          />
          <NavigationItemWideScreen
            icon={<FavoriteIcon />}
            title={'Favorites'}
            to='/saved-items'
          />
          <NavigationItemWideScreen
            icon={<Person2Icon />}
            title={'Settings'}
            to='/settings'
          />
        </MenuList>
      </Box>
    </Drawer>
  )
}

export default WideScreenNavigation

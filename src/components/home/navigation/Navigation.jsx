import { BottomNavigation, Paper, useMediaQuery } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Person2Icon from '@mui/icons-material/Person2'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { Link, useLocation } from 'react-router-dom'
import NavigationItem from './NavigationItem'
import WideScreenNavigation from './WideScreenNavigation'
function Navigation() {
  const { pathname } = useLocation()
  const isMediumScreen = useMediaQuery('(min-width:900px)')
  return isMediumScreen ? (
    <WideScreenNavigation />
  ) : (
    <BottomNavigation
      showLabels
      component={Paper}
      sx={{
        zIndex: 4,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '12px 12px 0 0',
        boxShadow: 5,
      }}
      value={pathname}
    >
      <NavigationItem
        label='Home'
        LinkComponent={Link}
        to='/'
        value={'/'}
        icon={<HomeIcon />}
      />
      <NavigationItem
        LinkComponent={Link}
        to='/store'
        label='Shopping'
        icon={<ShoppingCartIcon />}
        value={'/store'}
      />
      <NavigationItem
        LinkComponent={Link}
        to='/cart'
        label='Bag'
        icon={<LocalMallIcon />}
        value={'/cart'}
      />
      <NavigationItem
        label='Favorites'
        icon={<FavoriteIcon />}
        LinkComponent={Link}
        to='/saved-items'
        value={'/saved-items'}
      />
      <NavigationItem
        label='Profile'
        icon={<Person2Icon />}
        LinkComponent={Link}
        to='/settings'
        value={'/settings'}
      />
    </BottomNavigation>
  )
}

export default Navigation

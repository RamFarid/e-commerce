import {
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
function NavigationItemWideScreen({ icon, title, to, onClick, action }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const clickHandler = (e) => {
    e.preventDefault()
    if (to) navigate(to)
    if (onClick) onClick()
  }
  return (
    <MenuItem
      to={to}
      onClick={clickHandler}
      sx={{
        bgcolor: (p) => (to === pathname ? p.palette.action.selected : 'unset'),
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
      {action && <ListItemSecondaryAction>{action}</ListItemSecondaryAction>}
    </MenuItem>
  )
}

NavigationItemWideScreen.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  action: PropTypes.element,
}

export default NavigationItemWideScreen

import { ListItemSecondaryAction, ListItemText, MenuItem } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

SettingItem.propTypes = {
  text: PropTypes.string,
  secondary: PropTypes.string,
  link: PropTypes.string,
}

function SettingItem({ text, secondary, link }) {
  return (
    <MenuItem sx={{ my: 2 }} component={Link} to={link}>
      <ListItemText primary={text} secondary={secondary} />
      <ListItemSecondaryAction>
        <ChevronRightIcon />
      </ListItemSecondaryAction>
    </MenuItem>
  )
}

export default SettingItem

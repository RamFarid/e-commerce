import { BottomNavigationAction } from '@mui/material'
// import PropTypes from 'prop-types'

function NavigationItem(props) {
  return (
    <BottomNavigationAction
      {...props}
      sx={{
        '&.Mui-selected svg': {
          fill: (t) => `${t.palette.primary.main} !important`,
          strokeWidth: 0,
        },
        '& svg': {
          fill: 'none',
          strokeWidth: '2px',
          stroke: (t) => t.palette.primary.main,
        },
      }}
    />
  )
}

NavigationItem.propTypes = {}

export default NavigationItem

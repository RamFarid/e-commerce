import HelpIcon from '@mui/icons-material/Help'
import { Avatar, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

Empty.propTypes = {
  message: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.any,
  size: PropTypes.oneOf(['small', 'medium', 'big']),
}

function Empty({ message, title, icon, size }) {
  return (
    <Stack gap={2} textAlign={'center'} p={2.6} mx='auto'>
      <Avatar
        sx={{
          height: size === 'small' ? '80px' : '140px',
          width: size === 'small' ? '80px' : '140px',
          bgcolor: 'transparent',
          mx: 'auto',
        }}
      >
        {icon ? (
          React.cloneElement(icon, {
            sx: { height: '100%', width: '100%' },
            color: 'primary',
          })
        ) : (
          <HelpIcon sx={{ height: '100%', width: '100%' }} color='primary' />
        )}
      </Avatar>
      <Typography
        component={'h3'}
        variant='h4'
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={size === 'small' ? 18 : 34}
      >
        {title}
      </Typography>
      <Typography>{message}</Typography>
    </Stack>
  )
}

export default Empty

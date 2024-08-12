import { IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/ArrowBack'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
function Header({
  title,
  hideAction,
  href,
  onClick,
  secondaryAction,
  centered,
  size = 'large',
}) {
  const navigate = useNavigate()
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      gap={3}
      mb={2.3}
      position={'sticky'}
      top={0}
      py={2}
      zIndex={4}
      bgcolor={'background.default'}
      justifyContent={
        centered ? 'center' : secondaryAction ? 'space-between' : 'unset'
      }
    >
      {!hideAction && (
        <IconButton
          size={size}
          LinkComponent={Link}
          onClick={() => {
            if (href) navigate(href)
            if (onClick) onClick()
          }}
        >
          <CloseIcon fontSize={size} />
        </IconButton>
      )}
      <Typography
        variant='h4'
        component={'h1'}
        align='center'
        noWrap
        fontSize={size === 'small' && 'x-large'}
      >
        {title}
      </Typography>
      {secondaryAction && React.cloneElement(secondaryAction, { size })}
    </Stack>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  hideAction: PropTypes.bool,
  onClick: PropTypes.func,
  secondaryAction: PropTypes.element,
  size: PropTypes.string,
  centered: PropTypes.bool,
}

export default Header

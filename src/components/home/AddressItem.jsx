import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  ButtonBase,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

AddressItem.propTypes = {
  canChange: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  actionText: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  _id: PropTypes.string,
  default: PropTypes.bool,
}

function AddressItem({
  _id,
  name,
  text,
  country,
  city,
  state,
  actionText,
  href,
  default: isDefault,
  onClick,
  canChange = true,
}) {
  const toggleDefaultAddress = useUser((v) => v.toggleDefaultAddress)
  const navigate = useNavigate()
  const handleAction = (e) => {
    e.stopPropagation()
    if (onClick) onClick(_id)
    if (href) navigate(href)
  }
  return (
    <Card
      sx={(t) => ({
        my: 2,
        display: 'block',
        width: '100%',
        textAlign: 'unset',
        border: isDefault ? `3px solid ${t.palette.primary.main}` : '',
      })}
      component={ButtonBase}
      onClick={(e) => {
        if (!canChange) return handleAction(e)

        toggleDefaultAddress(_id, !isDefault)
      }}
    >
      <CardContent>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography component={'h3'} fontSize={16}>
            {name || 'Ram Farid'}
          </Typography>
          <Button
            size='small'
            color='error'
            onClick={handleAction}
            component='div'
            role='button'
          >
            {actionText || 'Delete'}
          </Button>
        </Stack>
        <Typography fontSize={14} component={'address'}>
          {text}
        </Typography>
        <Typography fontSize={14} component={'address'}>
          {country}, {city}, {state}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AddressItem

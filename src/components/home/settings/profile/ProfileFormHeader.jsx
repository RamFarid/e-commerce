import { Button, Stack, Typography, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

ProfileFormHeader.propTypes = {
  title: PropTypes.string,
  disableAction: PropTypes.bool,
  isLoading: PropTypes.bool,
}

function ProfileFormHeader({ title, disableAction, isLoading }) {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Typography variant='subtitle1'>{title}</Typography>
      <Button
        type='submit'
        disableElevation
        disabled={disableAction || isLoading}
        size='small'
        endIcon={isLoading && <CircularProgress size={16} />}
      >
        Submit Chnages
      </Button>
    </Stack>
  )
}

export default ProfileFormHeader

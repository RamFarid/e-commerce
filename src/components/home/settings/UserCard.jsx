import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { useUser } from '../../../contexts/UserContext'
import { Link } from 'react-router-dom'

function UserCard() {
  const user = useUser((v) => v.user)
  return (
    <Stack
      direction={'row'}
      gap={1}
      alignItems={'center'}
      mb={2}
      width={'100%'}
    >
      <Avatar
        src={user?.isLoggedIn ? user?.user_image : ''}
        alt={user?.isLoggedIn ? user?.name : 'Anonymous'}
      />
      <Box flex={1}>
        <Typography component={'h4'} variant='h5'>
          {user?.isLoggedIn ? user?.name : 'Guest'}
        </Typography>
        <Typography fontSize={12} color={'text.secondary'}>
          {user?.isLoggedIn ? (
            user?.email
          ) : (
            <Button
              variant='outlined'
              size='small'
              fullWidth
              LinkComponent={Link}
              to='/login'
            >
              Login
            </Button>
          )}
        </Typography>
      </Box>
    </Stack>
  )
}

export default UserCard

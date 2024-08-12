import { Avatar, Stack, Typography } from '@mui/material'
import Person2Icon from '@mui/icons-material/Person2'
import { useUser } from '../../../contexts/UserContext'
function UserCard() {
  const user = useUser((v) => v.user)
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1.2}>
      <Avatar
        sx={{ bgcolor: 'text.secondary' }}
        src={user?.isLoggedIn ? user?.user_image : ''}
        alt={user?.isLoggedIn ? user?.name : 'Anonymous'}
      >
        <Person2Icon />
      </Avatar>
      <Typography fontWeight={700}>
        {user?.isLoggedIn ? user?.name : 'Guest'}
      </Typography>
    </Stack>
  )
}

export default UserCard

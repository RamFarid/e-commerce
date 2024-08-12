import { Outlet } from 'react-router-dom'
import Navigation from '../../components/home/navigation/Navigation'
import { Container, Stack } from '@mui/material'

function HomeLayout() {
  return (
    <Stack direction={'row'}>
      <Navigation />
      <Container
        maxWidth={'lg'}
        sx={{
          overflow: 'hidden',
          mb: '72px',
          '&:has(.Home__Page__Grid)': {
            mx: 0,
            px: 0,
            mb: 0,
          },
        }}
      >
        <Outlet />
      </Container>
    </Stack>
  )
}

export default HomeLayout

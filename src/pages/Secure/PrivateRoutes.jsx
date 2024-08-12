import { Container } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

function PrivateRoutes() {
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  console.log(isLoggedIn)
  return isLoggedIn ? (
    <Navigate to='/store' replace />
  ) : (
    <Container maxWidth='sm'>
      <Outlet />
    </Container>
  )
}

export default PrivateRoutes

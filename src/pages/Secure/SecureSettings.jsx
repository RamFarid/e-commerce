import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

function SecureSettings() {
  const { pathname } = useLocation()
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  return pathname !== '/settings' && !isLoggedIn ? (
    <Navigate to={'/settings'} replace={true} />
  ) : (
    <Outlet />
  )
}

export default SecureSettings

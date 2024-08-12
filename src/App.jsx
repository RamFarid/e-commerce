import {
  Container,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { useMemo } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import HomeLayout from './pages/Layouts/HomeLayout'
import Cart from './pages/Cart'
import Favs from './pages/Favs'
import Settings from './pages/Settings/Settings'
import ProductsContextProvider from './contexts/ProductsContext'
import UserContextProvider from './contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Shopping from './pages/Shopping'
import SingleProduct from './pages/SingleProduct'
import Orders from './pages/Settings/Orders'
import Payments from './pages/Settings/Payments'
import Reviews from './pages/Settings/Reviews'
import Profile from './pages/Settings/Profile'
import SingleOrder from './pages/Settings/SingleOrder'
import SecureSettings from './pages/Secure/SecureSettings'
import SingleProductContextProvider from './contexts/SingleProductContext'
import CardsContextProvider from './contexts/CardsContext'
import PrivateRoutes from './pages/Secure/PrivateRoutes'
function App() {
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiMenuItem: {
            styleOverrides: {
              root: {
                borderRadius: '10px',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '100px',
              },
            },
          },
        },
        palette: {
          mode: 'dark',
          action: { hover: '#ef365157' },
          primary: { main: '#EF3651' },
          background: {
            default: '#1E1F28',
            paper: '#2A2C36',
          },
        },
      }),
    []
  )
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <CardsContextProvider>
            <CssBaseline />
            <GlobalStyles
              styles={{
                '*::-webkit-scrollbar': {
                  width: '5px',
                },
                '*::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '8px',
                  width: '5px',
                },
                'input:-webkit-autofill': {
                  backgroundColor: 'transparent !important',
                  boxShadow: `0 0 0 100px ${theme.palette.background.default} inset !important`,
                },
              }}
            />

            <Routes>
              <Route element={<HomeLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/saved-items' element={<Favs />} />
                <Route
                  path='/product/:slug'
                  element={
                    <SingleProductContextProvider>
                      <SingleProduct />
                    </SingleProductContextProvider>
                  }
                />
                <Route path='/settings' element={<SecureSettings />}>
                  <Route index element={<Settings />} />
                  <Route path='my-orders'>
                    <Route index element={<Orders />} />
                    <Route path=':orderID' element={<SingleOrder />} />
                  </Route>
                  <Route path='payments' element={<Payments />} />
                  <Route path='my-reviews' element={<Reviews />} />
                  <Route path='profile' element={<Profile />} />
                </Route>
                <Route
                  path='/store'
                  element={
                    <ProductsContextProvider>
                      <Outlet />
                    </ProductsContextProvider>
                  }
                >
                  <Route index element={<Shopping />} />
                  <Route path=':category' element={<Shopping />} />
                </Route>
              </Route>
              <Route element={<PrivateRoutes />}>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/reset-password' element={<ResetPassword />} />
              </Route>
            </Routes>
            <ToastContainer
              position='top-right'
              autoClose={6000}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </CardsContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

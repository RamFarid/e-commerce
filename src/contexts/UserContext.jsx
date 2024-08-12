import { createContext, useContextSelector } from 'use-context-selector'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState, useTransition } from 'react'
import server from '../lib/axios'
import { toast } from 'react-toastify'
import useLocalStorage from '../hooks/useLocalStorage'
import ProductsLoader from '../components/loaders/ProductsLoader'
import useCart from '../hooks/useCart'
import getPriceAfterDiscount from '../utils/getPriceAfterDiscount'
const UserContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (callback) => useContextSelector(UserContext, callback)

function UserContextProvider({ children }) {
  const [isPending, startTransition] = useTransition()
  const [viewMode, setViewMode] = useState('grid')
  const [user, setUser] = useLocalStorage('user', {})
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState({
    progress: {
      data: [],
      pages: 1,
    },
    cancelled: {
      data: [],
      pages: 1,
    },
    completed: {
      data: [],
      pages: 1,
    },
  })
  const Cart = useCart()
  const { setCart } = Cart

  useEffect(() => {
    server
      .get('/products/category')
      .then(({ data }) => setCategories(data.categories))
  }, [])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (user?.token) {
        try {
          const res = await server.get('/auth/check', {
            headers: { Authorization: `Berear ${user?.token}` },
          })

          server.defaults.headers.Authorization = `Berear ${user?.token}`
          const data = {
            ...res.data.user,
            token: user.token,
            isLoggedIn: true,
          }
          setCart(data?.cart)
          delete data?.cart
          setUser(data)
        } catch (error) {
          setUser((u) => ({ ...u, isLoggedIn: false, token: null }))
        } finally {
          setIsLoading(false)
        }
      } else {
        setUser((u) => ({ ...u, isLoggedIn: false, token: null }))
        setIsLoading(false)
      }
    })()
  }, [setCart, setUser, user.token])

  const handleServerFavs = async (type, productID) => {
    try {
      if (type === 'remove') {
        const { data } = await server.delete(
          `/user/saved_items?productID=${productID}`
        )
        return data
      } else {
        const { data } = await server.post(`/user/saved_items`, { productID })
        return data
      }
    } catch (error) {
      console.log(error)
      if (error.name === 'AxiosError')
        throw new Error(error?.response?.data?.message)
      throw error
    }
  }

  const addProductToFav = async (product) => {
    const newUser = user ? { ...user } : {}

    const { saved_product } = await handleServerFavs('add', product._id)
    newUser.saved_items = [
      saved_product,
      ...Array.from(newUser.saved_items || []),
    ]
    setUser(newUser)
  }

  const removeProductToFav = async (product) => {
    const newUser = user ? { ...user } : {}

    await handleServerFavs('remove', product._id)
    newUser.saved_items =
      user?.saved_items?.filter((p) => p._id !== product._id) || []
    setUser(newUser)
  }

  const changeViewMode = (mode) => {
    startTransition(() =>
      setViewMode((p) => (mode ? mode : p === 'list' ? 'grid' : 'list'))
    )
  }

  const login = async (sendData) => {
    try {
      const { data } = await server.post('/auth/login', sendData)
      setUser(data.user)
    } catch (error) {
      console.log(error)
      if (error.name === 'AxiosError') {
        throw error.response.data.message
      }
      toast.error(error.message)
    }
  }

  const toggleDefaultAddress = async (addressID, value) => {
    try {
      await server.put(`/user/addresses/default/${addressID}`, { value })
      const updatedAddresses = user.addresses.map((u) => ({
        ...u,
        default: addressID === u._id ? value : false,
      }))
      updateUser({ addresses: updatedAddresses })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const actionToFav = async (actionName, product) => {
    if (actionName === 'remove') await removeProductToFav(product)
    if (actionName === 'add') await addProductToFav(product)
  }

  const updateUser = (data) =>
    setUser((u) => {
      if (data instanceof Function) {
        return { ...u, ...data(u) }
      } else {
        return { ...u, ...data }
      }
    })

  const logOut = () => {
    setUser({ isLoggedIn: false, token: null })
    setCart([])
  }

  const totalPrice = Cart.cart?.reduce((pre, curr) => {
    if (pre instanceof Number) return pre
    return (
      pre +
      curr.quantity *
        getPriceAfterDiscount(curr.product.price, curr.product?.discount)
    )
  }, 0)

  const getOrders = useCallback(async () => {
    try {
      const { data } = await server.get('/orders')
      setOrders(data.orders)
    } catch (error) {
      toast.error(error.message)
    }
  }, [])

  const updateOrders = (data) => setOrders((pre) => ({ ...pre, ...data }))

  return (
    <UserContext.Provider
      value={{
        user,
        isViewModePending: isPending,
        categories,
        viewMode,
        login,
        changeViewMode,
        actionToFav,
        updateUser,
        totalPrice,
        orders,
        getOrders,
        updateOrders,
        toggleDefaultAddress,
        logOut,
        ...Cart,
      }}
    >
      {isLoading ? <ProductsLoader /> : children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.any,
}

// if (newUser?.saved_items)
//   // newUser.saved_items.unshift({ ...product, cartCount: 1 })
//   newUser.saved_items.unshift(product)
// else newUser.saved_items = [product]

// if (newUser?.saved_items)
//   newUser.saved_items = newUser.saved_items.filter(
//     (p) => p._id !== product._id
//   )
// else newUser.saved_items = []

export default UserContextProvider

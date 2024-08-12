import { useCallback, useReducer, useRef, useState } from 'react'
import {
  ADD_PRODUCT_TO_CART,
  CART_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_CART,
} from '../lib/constants'
import server from '../lib/axios'
import { toast } from 'react-toastify'

function reducer(state, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return [{ product: action.payload, quantity: 1 }, ...state]

    case REMOVE_PRODUCT_FROM_CART:
      return state?.filter((item) => item.product._id !== action.payload)

    case CART_PRODUCT_QUANTITY:
      return state.find((p) => p.product._id === action.payload.productID)
        .quantity === 1 && action.payload.increment === 'dec'
        ? state.filter((p) => p.product._id !== action.payload.productID)
        : state?.map((item) => {
            if (item.product._id !== action.payload.productID) return item
            return {
              ...item,
              quantity:
                action.payload.increment === 'inc'
                  ? item.quantity + 1
                  : item.quantity - 1,
            }
          })

    case UPDATE_CART:
      return action.payload

    default:
      return state
  }
}

function useCart() {
  const [cart, dispatch] = useReducer(reducer, [])
  const [isLoading, setIsLoading] = useState(false)
  const stripePage = useRef(null)

  const addToCart = useCallback(async (product) => {
    try {
      setIsLoading(true)
      await server.post('/cart', { productID: product._id })
      const updatedProduct = { ...product, added_to_cart: true }
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: updatedProduct,
      })
      return updatedProduct
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeFromCart = useCallback(async (productID) => {
    try {
      setIsLoading(true)
      await server.delete('/cart', { params: { productID } })
      dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: productID })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const quantityAction = useCallback(async (actionType, productID) => {
    try {
      console.log(actionType)
      console.log(productID)
      setIsLoading(true)
      await server.put('/cart', { productID, increment: actionType })
      dispatch({
        type: CART_PRODUCT_QUANTITY,
        payload: { productID, increment: actionType },
      })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const setCart = useCallback(
    (payload) => dispatch({ type: UPDATE_CART, payload }),
    []
  )

  const checkoutCart = async () => {
    if (stripePage.current) {
      stripePage.current.destroy()
      stripePage.current = null
    }
    try {
      // const stripe = await loadStripe(
      //   import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY
      // )
      // const result = await stripe.initEmbeddedCheckout({
      //   clientSecret: client_secret,
      // })
      // stripePage.current = result
      // result.mount('#stripe-checkout')
      await server.post('/cart/checkout')
      setCart([])
      toast.success('Congrates! Your order is in Progress.')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  return {
    cart,
    quantityAction,
    removeFromCart,
    addToCart,
    setCart,
    isCartLoading: isLoading,
    checkoutCart,
  }
}

export default useCart

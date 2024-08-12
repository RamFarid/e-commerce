import { createContext, useContextSelector } from 'use-context-selector'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useUser } from './UserContext'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import server from '../lib/axios'

SingleProductContextProvider.propTypes = {
  children: PropTypes.any,
}

const SingleProductContext = createContext()

export const useSingleProductData = (callback) =>
  useContextSelector(SingleProductContext, callback)

function SingleProductContextProvider({ children }) {
  const { slug } = useParams()
  const actionToFav = useUser((v) => v.actionToFav)
  const addToCart = useUser((v) => v.addToCart)
  const removeFromCart = useUser((v) => v.removeFromCart)
  const [product, setProduct] = useState({})
  const [reviews, setReviews] = useState({
    list: [],
    ratings: [0, 0, 0, 0, 0],
  })
  const [pageState, setPageState] = useState({
    isLoading: true,
    isProductAddedLoading: false,
    isReviewsLoading: true,
    currentPageReview: 1,
    message: '',
  })
  const reviewsPages = useRef()

  const addReview = useCallback((newReview, averageRatings) => {
    setReviews((p) => {
      const updatedRatings = p.ratings
      updatedRatings[5 - (newReview.rating - 1) - 1] =
        updatedRatings[5 - (newReview.rating - 1) - 1] + 1

      return { ratings: updatedRatings, list: [newReview, ...p.list] }
    })
    setProduct((p) => ({
      ...p,
      averageRatings,
    }))
  }, [])

  const shareProduct = useCallback(() => {
    navigator.share({
      title: product.title,
      text: 'Come do shopping on Free Store, See this product and You decide',
      url: window.location.href,
    })
  }, [product.title])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const { data } = await server.get(`/products/${slug}`)
        setProduct(data.product)
        const { data: ratingsData } = await server
          .get(`/products/${data.product._id}/ratings`)
          .catch((error) =>
            toast.error(error?.response?.data?.message || error.message)
          )
          .finally(() =>
            setPageState((p) => ({ ...p, isReviewsLoading: false }))
          )
        setReviews({
          list: ratingsData?.ratings_list || [],
          ratings: ratingsData?.ratings?.reverse(),
        })
        reviewsPages.current = ratingsData.pages
      } catch (error) {
        if (error.name === 'AxiosError')
          setPageState({ message: error?.response?.data?.message })
        setPageState((p) => ({ ...p, message: error.message }))
      } finally {
        setPageState((p) => ({ ...p, isLoading: false }))
      }
    })()
  }, [slug])

  const ratingsCount = reviews?.ratings?.reduce((pre, curr) => pre + curr, 0)

  const onFetchMoreReviews = async () => {
    if (pageState.isReviewsLoading) return
    try {
      const { data } = await server.get(`/products/${product?._id}/ratings`, {
        params: { page: pageState.currentPageReview + 1 },
      })
      setReviews((pre) => ({
        ...pre,
        list: [...pre.list, ...data.ratings_list],
      }))
      setPageState((pre) => ({
        ...pre,
        currentPageReview: pre.currentPageReview + 1,
      }))
    } catch (error) {
      console.error(error)
      toast.error(
        'Something happened on fectching more pages. see console for more info'
      )
    }
  }

  const onAddToFav = async () => {
    try {
      setPageState((p) => ({
        ...p,
        isProductAddedLoading: true,
      }))
      if (product?.saved_by_me) await actionToFav('remove', product)
      else await actionToFav('add', product)
      setProduct((p) => ({ ...p, saved_by_me: !p.saved_by_me }))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPageState((p) => ({
        ...p,
        isProductAddedLoading: false,
      }))
    }
  }

  const onAddToCart = async (product) => {
    const updatedOne = await addToCart(product)
    setProduct(updatedOne)
  }

  const onRemoveFromCart = async (productID) => {
    removeFromCart(productID)
    setProduct((p) => ({ ...p, added_to_cart: false }))
  }

  const onToggleToCart = async (product) => {
    if (product.added_to_cart) await onRemoveFromCart(product._id)
    else await onAddToCart(product)
  }

  const canFetchMore = Boolean(
    pageState.currentPageReview < reviewsPages.current
  )

  return (
    <SingleProductContext.Provider
      value={{
        shareProduct,
        addReview,
        onAddToFav,
        onFetchMoreReviews,
        pageState,
        product,
        reviews,
        ratingsCount,
        canFetchMore,
        onToggleToCart,
      }}
    >
      {children}
    </SingleProductContext.Provider>
  )
}

export default SingleProductContextProvider

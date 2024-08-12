import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ReviewCard from '../../components/ReviewCard'
import server from '../../lib/axios'
import ProductsLoader from '../../components/loaders/ProductsLoader'
import Grid from '@mui/material/Grid'

const initState = { isLoading: true, message: '' }

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [pageState, setPageState] = useState(initState)
  useEffect(() => {
    ;(async () => {
      try {
        setPageState(initState)
        const { data } = await server.get('/user/reviews')
        setReviews(data.reviews)
      } catch (error) {
        setPageState((pre) => ({
          ...pre,
          message: error?.response?.data?.message || error.message,
        }))
      } finally {
        setPageState((pre) => ({ ...pre, isLoading: false }))
      }
    })()
  }, [])
  return (
    <>
      <Header title={'My Reviews'} href={'/settings'} />
      {pageState?.message ? (
        pageState.message
      ) : pageState.isLoading ? (
        <ProductsLoader />
      ) : (
        <Grid container spacing={2}>
          {reviews?.map((review) => (
            <ReviewCard key={review._id} {...review} />
          ))}
        </Grid>
      )}
    </>
  )
}

export default Reviews

import { Button, Stack } from '@mui/material'
import Header from '../../../../Header'
import ReviewDataRow from './ReviewData'
import AddReview from './AddReview'
import ReviewList from './ReviewList'
import { useSearchParams } from 'react-router-dom'

function ProductReviews() {
  const [, setSearchParams] = useSearchParams()
  return (
    <Stack mt={5}>
      <Header
        hideAction
        size='small'
        title={'Reviews & Ratings'}
        secondaryAction={
          <Button onClick={() => setSearchParams({ commit_review: 1 })}>
            Add your review
          </Button>
        }
      />
      <ReviewDataRow />
      <ReviewList />
      <AddReview />
    </Stack>
  )
}

export default ProductReviews

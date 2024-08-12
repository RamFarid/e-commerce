import { Stack } from '@mui/material'
import { useSingleProductData } from '../../../../../contexts/SingleProductContext'
import ReviewCard from '../../../../ReviewCard'

function ReviewList() {
  const reviewsList = useSingleProductData((v) => v?.reviews?.list)
  return (
    reviewsList && (
      <Stack spacing={2} mt={3.5}>
        {reviewsList?.map((review) => (
          <ReviewCard key={review._id} {...review} />
        ))}
      </Stack>
    )
  )
}

export default ReviewList

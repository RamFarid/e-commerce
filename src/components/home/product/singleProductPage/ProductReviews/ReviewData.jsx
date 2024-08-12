import { Box, Grid, Stack, Typography } from '@mui/material'
import ReviewDataRow from './ReviewDataRow'
import { useSingleProductData } from '../../../../../contexts/SingleProductContext'
function ReviewData() {
  const averageRatings = useSingleProductData((v) => v?.product?.averageRatings)
  const ratings = useSingleProductData((v) => v?.reviews.ratings)
  const ratingsCount = useSingleProductData((v) => v?.ratingsCount)
  return (
    <Stack direction={'row'}>
      <Box
        flexDirection={'column'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography component={'h4'} variant='h5' fontSize={38}>
          {averageRatings?.toFixed(1)}
        </Typography>
        <Typography
          variant='subtitle2'
          color={'text.secondary'}
          align='center'
          fontSize={12}
        >
          {ratingsCount} Ratings
        </Typography>
      </Box>
      <Grid flexGrow={1} container rowSpacing={1.2} columnSpacing={1.8}>
        {ratings &&
          ratings?.map((no, i) => (
            <ReviewDataRow
              key={i}
              rateNo={ratings?.length - i}
              reviewNo={no}
              value={(no / ratingsCount) * 100}
            />
          ))}
      </Grid>
    </Stack>
  )
}

export default ReviewData

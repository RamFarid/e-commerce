import {
  Avatar,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
  CardMedia,
  Grid,
} from '@mui/material'
import { Box, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useUser } from '../contexts/UserContext'
import getRelativeTime from '../utils/getRelativeTime'
import Price from './home/product/Price'

ReviewCard.propTypes = {
  description: PropTypes.string,
  createdAt: PropTypes.string,
  rating: PropTypes.number,
  reviewer: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    user_image: PropTypes.string,
  }),
  review_to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      brand: PropTypes.string,
      category: PropTypes.string,
      thumbnail: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      discount: PropTypes.number,
      subcategory: PropTypes.string,
      itemsAvaliable: PropTypes.number,
      salesCount: PropTypes.number,
      views: PropTypes.number,
      createdAt: PropTypes.string,
      averageRatings: PropTypes.number,
    }),
  ]),
}

function ReviewCard({ description, createdAt, reviewer, rating, review_to }) {
  const myID = useUser((v) => v?.user?._id)
  const navigate = useNavigate()
  const {
    // _id,
    title,
    slug,
    price,
    brand,
    category,
    thumbnail,
    images,
    discount,
    averageRatings,
  } = review_to
  console.log(review_to)
  return (
    <Grid item xs={typeof review_to === 'string' ? 12 : 6}>
      <Card sx={{ my: 2, position: 'relative', overflow: 'unset' }}>
        {typeof review_to !== 'string' && (
          <>
            <Stack
              component={'div'}
              sx={{
                position: 'relative',
              }}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <CardMedia
                onClick={() => navigate('/product/' + slug)}
                sx={{
                  cursor: 'pointer',
                  height: '150px',
                  width: '155px',
                  backgroundSize: 'contain',
                  borderRadius: '6px',
                }}
                image={thumbnail ? thumbnail : images[0]}
                title={title}
              />
              <CardContent>
                <Rating
                  precision={0.1}
                  defaultValue={averageRatings}
                  size='small'
                  readOnly
                />
                <Box>
                  <Typography
                    variant='subtitle1'
                    color={'text.secondary'}
                    fontSize={12}
                    noWrap
                  >
                    {category} - {brand}
                  </Typography>
                  <Typography
                    variant='h5'
                    component={'h4'}
                    fontSize={{ xs: '14px', md: '18px' }}
                    noWrap
                  >
                    {title}
                  </Typography>
                  <Price discount={discount} price={price} />
                </Box>
              </CardContent>
            </Stack>
            <Divider />
            <Divider />
          </>
        )}
        <Avatar sx={{ position: 'absolute', left: -15, top: -15 }} />
        <CardContent>
          <Typography component={'h3'} variant='h6'>
            {reviewer?.name}
            <Typography
              component={'span'}
              color={'text.secondary'}
              variant='subtitle2'
            >
              {reviewer?._id === myID && ' (You)'}
            </Typography>
          </Typography>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Rating defaultValue={rating || 4} size='small' readOnly />
            <Typography
              variant='caption'
              color={'text.secondary'}
              fontSize={12}
            >
              {getRelativeTime(createdAt)}
            </Typography>
          </Stack>
          <Typography my={2}>{description || `Lorem ipsum dolor`}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ReviewCard

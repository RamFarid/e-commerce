import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Price from './Price'
import { useUser } from '../../../contexts/UserContext'

function ProductItemCard({
  actionToFav,
  product: {
    _id,
    title,
    price,
    category,
    images,
    discount,
    thumbnail,
    brand,
    slug,
    saved_by_me,
    averageRatings,
  },
  // product: {
  //   id,
  //   title,
  //   description,
  //   price,
  //   rating,
  //   category,
  //   images,
  //   discount,
  //   subcategory,
  //   noItemsAvaliable,
  //   salesCount,
  //   thumbnail,
  // },
}) {
  const viewMode = useUser((v) => v.viewMode)
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  const navigate = useNavigate()
  return (
    <Grid
      item
      xs={viewMode === 'list' ? 12 : 6}
      md={viewMode === 'list' ? 12 : 4}
    >
      {/* sx={{ bgcolor: 'transparent', backgroundImage: 'none' }} */}
      <Card
        sx={{
          position: 'relative',
          display: viewMode === 'list' ? 'flex' : 'block',
        }}
      >
        <Chip
          label={`${discount}%`}
          color='primary'
          size='small'
          sx={{ position: 'absolute', top: 10, left: 10 }}
        />
        <CardMedia
          onClick={() => navigate(`/product/${slug}`)}
          sx={{
            cursor: 'pointer',
            height: viewMode === 'list' ? '150px' : '170px',
            width: viewMode === 'list' ? '155px' : 'unset',
            backgroundSize: 'contain',
            borderRadius: '6px',
          }}
          image={thumbnail ? thumbnail : images[0]}
          title={title}
        />
        <CardContent>
          <Box
            position={viewMode === 'list' ? 'absolute' : 'static'}
            mt={'-37px'}
            textAlign={'end'}
            bottom={6}
            right={6}
          >
            <IconButton
              size='small'
              color='primary'
              onClick={async () => {
                try {
                  if (!isLoggedIn) return navigate('/login')
                  await actionToFav(_id, !saved_by_me)
                } catch (error) {
                  if (error.message === 'Missing Token') navigate('/signup')
                }
              }}
              sx={{ bgcolor: 'background.paper' }}
            >
              <FavoriteIcon
                fontSize='small'
                sx={(t) => ({
                  fill: saved_by_me ? t.palette.primary.dark : 'transparent',
                  stroke: t.palette.primary.dark,
                  strokeWidth: '3px',
                })}
              />
            </IconButton>
          </Box>
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
              mt={viewMode === 'list' ? 0.8 : 0}
              fontSize={{ xs: '14px', md: '18px' }}
              noWrap
            >
              {title}
            </Typography>
            <Price discount={discount} price={price} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

ProductItemCard.propTypes = {
  actionToFav: PropTypes.func,
  product: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    category: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    discount: PropTypes.number,
    subcategory: PropTypes.string,
    noItemsAvaliable: PropTypes.number,
    salesCount: PropTypes.number,
    thumbnail: PropTypes.string,
    brand: PropTypes.string,
    slug: PropTypes.string,
    saved_by_me: PropTypes.bool,
    averageRatings: PropTypes.number,
  }),
}

export default ProductItemCard

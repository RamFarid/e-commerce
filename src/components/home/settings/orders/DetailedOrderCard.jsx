import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Price from '../../product/Price'
import PropTypes from 'prop-types'

DetailedOrderCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  images: PropTypes.string,
  discount: PropTypes.number,
  thumbnail: PropTypes.string,
  brand: PropTypes.string,
  quantity: PropTypes.number,
  slug: PropTypes.string,
}

function DetailedOrderCard({
  title,
  price,
  slug,
  category,
  images,
  thumbnail,
  brand,
  quantity,
  discount,
  // _id,
}) {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        my: 2,
      }}
    >
      <CardMedia
        onClick={() => navigate(`/product/${slug}`)}
        sx={{
          height: '150px',
          width: '155px',
          backgroundSize: 'contain',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
        image={thumbnail ? thumbnail : images?.length ? images[0] : undefined}
        title={title}
      />
      <CardContent>
        <Box>
          <Typography
            variant='h5'
            component={'h4'}
            mt={0.8}
            fontSize={{ xs: '14px', md: '18px' }}
            noWrap
          >
            {title}
          </Typography>
          <Typography
            variant='subtitle1'
            color={'text.secondary'}
            fontSize={12}
            noWrap
          >
            {category} - {brand}
          </Typography>
          <Price price={price} discount={discount} />
          <Typography
            variant='caption'
            color={'text.secondary'}
            fontSize={12}
            component={'div'}
          >
            Quantiy: {quantity}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DetailedOrderCard

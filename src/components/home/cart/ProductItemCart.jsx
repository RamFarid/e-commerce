import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Price from '../product/Price'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'

ProductItemCart.propTypes = {
  quantity: PropTypes.number,
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
  }),
}

function ProductItemCart({ product, quantity }) {
  const navigate = useNavigate()
  const quantityAction = useUser((v) => v?.quantityAction)

  const increaseProductAmount = async () => {
    await quantityAction('inc', product._id)
  }

  const decreaseProductAmount = async () => {
    await quantityAction('dec', product._id)
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', my: 2 }}>
      <CardMedia
        image={product.thumbnail || product.images[0] || '/visa.svg'}
        onClick={() => navigate('/product/' + product.slug)}
        sx={{ backgroundSize: 'cover', width: '25%', cursor: 'pointer' }}
      />
      <CardContent sx={{ flex: 1 }}>
        <CardHeader title={product.title || 'Sport Dress'} />
        <Stack
          direction={'row'}
          gap={1.3}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            gap={2}
          >
            <IconButton
              title={quantity === 1 ? 'Remove item' : 'Dec Item'}
              size='small'
              onClick={decreaseProductAmount}
            >
              <RemoveIcon fontSize='small' />
            </IconButton>
            <Typography component={'span'} variant='h6'>
              {quantity}
            </Typography>
            <IconButton
              title='Add item'
              size='small'
              onClick={increaseProductAmount}
            >
              <AddIcon fontSize='small' />
            </IconButton>
          </Stack>
          <Typography component={'div'} fontSize={12}>
            <Price price={product.price} discount={product.discount} />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ProductItemCart

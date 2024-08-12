import { useNavigate, useSearchParams } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import {
  Button,
  CircularProgress,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import Price from '../../Price'
import { useSingleProductData } from '../../../../../contexts/SingleProductContext'
import { useUser } from '../../../../../contexts/UserContext'

function ProductData() {
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const product = useSingleProductData((v) => v.product)
  const ratingsCount = useSingleProductData((v) => v?.ratingsCount)
  const pageState = useSingleProductData((v) => v.pageState)
  const shareProduct = useSingleProductData((v) => v.shareProduct)
  const onAddToFav = useSingleProductData((v) => v.onAddToFav)
  const isCartLoading = useUser((v) => v.isCartLoading)
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  const onToggleToCart = useSingleProductData((v) => v.onToggleToCart)
  return (
    <>
      <Typography
        variant='h5'
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={1}
        component={'div'}
      >
        <Typography variant='inherit' component={'h1'}>
          {product?.title}
        </Typography>
        <Typography variant='inherit'>
          <Price price={product?.price} discount={product?.discount} />
        </Typography>
      </Typography>
      <Stack
        onClick={() => setSearchParams({ commit_review: 1 })}
        alignItems={'center'}
        gap={0.8}
        sx={{ cursor: 'pointer' }}
        direction={'row'}
      >
        <Rating
          name='product-rate'
          readOnly
          defaultValue={Number(product.averageRatings.toFixed(1))}
          precision={0.1}
        />
        <Typography component={'div'}>({ratingsCount || 0})</Typography>
      </Stack>
      {product?.brand && (
        <Typography component='div' color={'text.secondary'} fontSize={12}>
          Brand: {product?.brand}
        </Typography>
      )}
      <Typography component={'div'} variant='caption' color={'text.secondary'}>
        Category: {product?.category}
      </Typography>
      <Typography fontSize={18} mt={3} component={'div'}>
        <Typography variant='inherit' fontSize={12}>
          Description:
        </Typography>
        <Typography variant='inherit'>{product?.description}</Typography>
      </Typography>
      <Stack
        direction={'row'}
        gap={2}
        flexWrap={'wrap'}
        sx={{
          mt: 3,
          '& *': { textTransform: 'none' },
        }}
      >
        <Button
          size='small'
          variant='contained'
          fullWidth
          disableElevation
          onClick={() => {
            if (!isLoggedIn) return navigate('/login')
            onToggleToCart(product)
          }}
          endIcon={
            isCartLoading && (
              <CircularProgress sx={{ height: '100%' }} size={20} />
            )
          }
          color={product?.added_to_cart ? 'inherit' : 'primary'}
          disabled={isCartLoading}
        >
          {isCartLoading
            ? 'Adding to Cart...'
            : product?.added_to_cart
            ? 'Remove from Cart'
            : 'Add to Cart'}
        </Button>
        <Stack direction={'row'} width={'100%'}>
          <Button
            fullWidth
            size='small'
            endIcon={
              pageState.isProductAddedLoading ? (
                <CircularProgress sx={{ height: '100%' }} size={20} />
              ) : (
                <FavoriteIcon
                  fontSize='small'
                  sx={(t) => ({
                    strokeWidth: '2px',
                    stroke: t.palette.error.dark,
                    fill: product?.saved_by_me ? t.palette.error.dark : 'none',
                  })}
                />
              )
            }
            disabled={pageState.isProductAddedLoading}
            onClick={onAddToFav}
          >
            {pageState.isProductAddedLoading
              ? 'Adding to fav...'
              : product?.saved_by_me
              ? 'Remove from fav'
              : 'Add to fav'}
          </Button>
          <Button
            fullWidth
            size='small'
            endIcon={<ShareIcon fontSize='small' />}
            onClick={shareProduct}
          >
            Share
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default ProductData

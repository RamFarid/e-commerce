import Header from '../components/Header'
import ProductsLoader from '../components/loaders/ProductsLoader'
import { Box, Grid, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import GalleryWrapper from '../components/home/product/singleProductPage/GalleryWrapper'
import ProductReviews from '../components/home/product/singleProductPage/ProductReviews/ProductReviews'
import ProductData from '../components/home/product/singleProductPage/ProductData/ProductData'
import { useSingleProductData } from '../contexts/SingleProductContext'
import ReactPullToRefresh from 'react-simple-pull-to-refresh'

function SingleProduct() {
  const pageState = useSingleProductData((v) => v.pageState)
  const product = useSingleProductData((v) => v.product)
  const shareProduct = useSingleProductData((v) => v.shareProduct)
  const onFetchMoreReviews = useSingleProductData((v) => v.onFetchMoreReviews)
  const canFetchMore = useSingleProductData((v) => v.canFetchMore)
  return pageState.isLoading ? (
    <ProductsLoader />
  ) : pageState.message ? (
    <div>{pageState.message}</div>
  ) : (
    <ReactPullToRefresh
      onRefresh={async () => {}}
      canFetchMore={canFetchMore}
      onFetchMore={onFetchMoreReviews}
    >
      <Header
        href={'/'}
        title={product.title}
        secondaryAction={
          <IconButton onClick={shareProduct}>
            <ShareIcon />
          </IconButton>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          {product?.images ? (
            <GalleryWrapper images={product.images} />
          ) : (
            <Box height={'450px'}>
              <Box
                sx={{ objectFit: 'cover' }}
                component={'img'}
                src={product?.images[0]}
                width={'100%'}
                height={'100%'}
                display={'block'}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={7}>
          <Box>
            <ProductData />
            <ProductReviews />
          </Box>
        </Grid>
      </Grid>
    </ReactPullToRefresh>
  )
}

export default SingleProduct

import { Button, Stack, Typography } from '@mui/material'
import Header from '../components/Header'
import ProductItemCart from '../components/home/cart/ProductItemCart'
import Price from '../components/home/product/Price'
import Checkout from '../components/home/cart/Checkout'
import { useSearchParams } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import Empty from '../components/Empty'

function Cart() {
  const [, setSearchParams] = useSearchParams()
  const cart = useUser((v) => v?.cart)
  const totalPrice = useUser((v) => v?.totalPrice)
  const openCheckout = () => setSearchParams({ checkout: 1 })

  return (
    <>
      <Header title={'My Bag'} hideAction />
      {cart?.length ? (
        <>
          {cart.map((item) => (
            <ProductItemCart
              key={item.product._id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            my={2.4}
          >
            <Typography color={'text.secondary'}>Total Amount</Typography>
            <Typography component={'div'}>
              <Price price={totalPrice} />
            </Typography>
          </Stack>
          <Button variant='contained' fullWidth onClick={openCheckout}>
            Check out
          </Button>
        </>
      ) : (
        <Empty
          title={'Empty Cart'}
          message={'Add items in the cart and complete progress from here'}
        />
      )}
      <Checkout />
    </>
  )
}

// const product = {
//   _id: '65d15a1ead6e642631c39cf0',
//   title: 'iPhone 9',
//   slug: 'iphone-9',
//   description: 'An apple mobile which is nothing like apple',
//   price: 549,
//   ratings: [],
//   brand: 'Apple',
//   category: 'techs',
//   thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
//   images: [
//     'https://cdn.dummyjson.com/product-images/1/1.jpg',
//     'https://cdn.dummyjson.com/product-images/1/2.jpg',
//     'https://cdn.dummyjson.com/product-images/1/3.jpg',
//     'https://cdn.dummyjson.com/product-images/1/4.jpg',
//     'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
//   ],
//   discount: 12.96,
//   subcategory: 'techs',
//   itemsAvaliable: 1670,
//   salesCount: 1430,
//   views: 1233,
//   users_saved: [],
//   __v: 0,
//   createdAt: '2024-02-18T01:15:10.469Z',
//   saved_by_me: true,
// }

export default Cart

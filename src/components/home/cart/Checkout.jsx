import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Popup from '../../Popup'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import AddressItem from '../AddressItem'
import Header from '../../Header'
import Price from '../product/Price'
import { useUser } from '../../../contexts/UserContext'
import { useUserCards } from '../../../contexts/CardsContext'
import { useEffect } from 'react'
import Empty from '../../Empty'

function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams()
  const totalPrice = useUser((v) => v?.totalPrice)
  const addresses = useUser((v) => v?.user?.addresses)
  const checkoutCart = useUser((v) => v?.checkoutCart)
  const userCreditCards = useUserCards((v) => v?.userCreditCards)
  const closeCheckout = () => setSearchParams({})
  const defaultCard = userCreditCards?.find((pro) => pro.default)
  const defaultAddress = addresses?.find((pro) => pro.default)
  const getUserCreditCards = useUserCards((v) => v.getUserCreditCards)
  const cart = useUser((v) => v?.cart)

  useEffect(() => {
    getUserCreditCards()
  }, [getUserCreditCards])

  return cart?.length ? (
    <Popup
      canOpen={Boolean(searchParams.get('checkout'))}
      onClose={closeCheckout}
    >
      <Stack sx={{ userSelect: 'none' }}>
        <Stack id='stripe-checkout'></Stack>
        <Header title={'Checkout'} onClick={closeCheckout} size='small' />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h5' component={'h3'}>
            Shipping address
          </Typography>
          {!defaultAddress && (
            <Button LinkComponent={Link} to='/settings/profile'>
              Add
            </Button>
          )}
        </Stack>
        {defaultAddress ? (
          <AddressItem
            canChange={false}
            href={'/settings/profile'}
            {...defaultAddress}
            actionText={'Change'}
          />
        ) : (
          <Empty
            size={'small'}
            title={'You should add shipping address to pay'}
          />
        )}
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h5' component={'h3'}>
            Payment Card
          </Typography>
          <Button LinkComponent={Link} to='/settings/payments'>
            {defaultCard ? 'Change' : 'Add'}
          </Button>
        </Stack>
        {defaultCard ? (
          <Stack direction={'row'} gap={2} alignItems={'center'} mb={4}>
            <Box
              component={'img'}
              src={
                defaultCard?.type === 'visa' ? '/VISA.png' : '/MasterCard.png'
              }
              height={'40px'}
            />
            <Typography component={'span'}>
              **** **** **** {defaultCard?.secure_number}
            </Typography>
          </Stack>
        ) : (
          <Empty size={'small'} title={'You should add credit card to pay'} />
        )}
        <Divider sx={{ mb: 2 }} />
        <TextField
          type='text'
          label='Promo Code'
          placeholder='Enter your promo code'
          fullWidth
          size='small'
          sx={(t) => ({
            maxHeight: '40px',
            backgroundColor: t.palette.background.paper,
          })}
          InputProps={{
            sx: {
              maxHeight: '40px',
            },
            endAdornment: (
              <IconButton size='large'>
                <ArrowForwardIosIcon />
              </IconButton>
            ),
          }}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          my={1}
          mt={3.2}
        >
          <Typography color={'text.secondary'}>Order</Typography>
          <Typography component={'div'}>
            <Price price={totalPrice} />
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          my={1}
        >
          <Typography color={'text.secondary'}>Delivery & fees</Typography>
          <Typography component={'div'}>
            <Price price={45} />
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          my={1}
        >
          <Typography color={'text.secondary'}>Total Price</Typography>
          <Typography component={'div'}>
            <Price price={totalPrice + 45} />
          </Typography>
        </Stack>
        <Button
          variant='contained'
          disableElevation
          sx={{ my: 2 }}
          onClick={checkoutCart}
          disabled={!defaultAddress || !defaultCard}
        >
          Order now
        </Button>
      </Stack>
    </Popup>
  ) : (
    <Navigate to={'/cart'} replace />
  )
}

export default Checkout

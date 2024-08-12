import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import Price from '../../product/Price'
import { useNavigate } from 'react-router-dom'
import getPriceAfterDiscount from '../../../../utils/getPriceAfterDiscount'
import PropTypes from 'prop-types'
import getRelativeTime from '../../../../utils/getRelativeTime'

OrderCard.propTypes = {
  _id: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.object,
      quantity: PropTypes.number,
      discount: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  fee: PropTypes.number,
  status: PropTypes.oneOf(['cancelled', 'progress', 'completed']),
  createdAt: PropTypes.string,
}

function OrderCard({ _id, products, fee, status, createdAt }) {
  const navigate = useNavigate()
  const totalItems = products?.reduce((pre, current) => {
    return pre + current.quantity
  }, 0)
  const totalPrice = (
    products?.reduce((pre, current) => {
      if (pre instanceof Number) return
      console.log('first', pre)
      console.log('Sec', current)
      if (Number(current.product?.discount))
        return (
          pre +
          getPriceAfterDiscount(
            Number(current.product?.price),
            Number(current.product?.discount)
          ) *
            current.quantity
        )
      return pre + Number(current.product?.price) * current.quantity
    }, 0) + fee
  ).toFixed(2)
  return (
    <Stack bgcolor={'background.paper'} my={2} component={Paper} p={2}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        <Typography noWrap component={'h5'}>
          Order: {_id}
        </Typography>
        <Typography component={'time'} fontSize={12}>
          {getRelativeTime(createdAt)}
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        my={1}
      >
        <Box>
          <Typography component={'span'} fontSize={12} color={'text.secondary'}>
            Total Items:{' '}
          </Typography>
          <Typography component={'span'} fontSize={12}>
            {totalItems}
          </Typography>
        </Box>
        <Box>
          <Typography component={'span'} fontSize={12} color={'text.secondary'}>
            Total Price:{' '}
          </Typography>
          <Typography fontSize={12} component={'span'}>
            <Price price={totalPrice} />
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Button
          color='inherit'
          variant='outlined'
          onClick={() => navigate(_id)}
        >
          Details
        </Button>
        <Typography
          color={(p) =>
            status === 'cancelled'
              ? p.palette.error.dark
              : status === 'progress'
              ? p.palette.warning.dark
              : p.palette.success.dark
          }
        >
          {status}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default OrderCard

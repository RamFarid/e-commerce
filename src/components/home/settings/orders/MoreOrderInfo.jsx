import { Box, Stack, Typography } from '@mui/material'
import Price from '../../product/Price'
import PropTypes from 'prop-types'

MoreOrderInfo.propTypes = {
  totalPrice: PropTypes.number,
  fee: PropTypes.number,
  payment_details: PropTypes.object,
  address: PropTypes.array,
}

function MoreOrderInfo({ totalPrice, fee, payment_details, address }) {
  // text: String,
  // country: String,
  // state: String,
  // city: String,
  // zip_code: Number,
  // default: Boolean,
  return (
    <>
      <Typography fontSize={14} color={'text.secondary'}>
        More Info
      </Typography>
      <Stack
        my={1.2}
        direction={'row'}
        gap={1.2}
        justifyContent={'space-between'}
      >
        <Typography color={'text.secondary'} flex={1}>
          Address
        </Typography>
        <Typography flex={1}>
          {address?.text}, {address?.country}, {address?.city}, {address?.state}
        </Typography>
      </Stack>
      <Stack
        my={1.2}
        direction={'row'}
        gap={1.2}
        justifyContent={'space-between'}
      >
        <Typography color={'text.secondary'} flex={1}>
          Payment Method
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={1.2} flex={1}>
          <Box
            component={'img'}
            src={
              payment_details.cardtype === 'master'
                ? '/MasterCard.png'
                : '/VISA.png'
            }
            width={'30px'}
          />
          <Typography>
            **** **** **** {payment_details.secure_number}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        my={1.2}
        direction={'row'}
        gap={1.2}
        justifyContent={'space-between'}
      >
        <Typography color={'text.secondary'} flex={1}>
          Discount
        </Typography>
        <Typography flex={1}>None</Typography>
      </Stack>
      <Stack
        my={1.2}
        direction={'row'}
        gap={1.2}
        justifyContent={'space-between'}
      >
        <Typography color={'text.secondary'} flex={1}>
          Order Amount
        </Typography>
        <Typography fontWeight={300} flex={1}>
          <Price price={totalPrice - fee} />
        </Typography>
      </Stack>
      <Stack
        my={1.2}
        direction={'row'}
        gap={1.2}
        justifyContent={'space-between'}
      >
        <Typography color={'text.secondary'} flex={1}>
          fee
        </Typography>
        <Typography fontWeight={300} flex={1}>
          <Price price={fee} />
        </Typography>
      </Stack>
      <Stack
        my={1.2}
        direction={'row'}
        gap={1.2}
        justifyContent={'space-between'}
      >
        <Typography color={'text.secondary'} flex={1}>
          Total Amount Price
        </Typography>
        <Typography fontWeight={300} flex={1}>
          <Price price={totalPrice} />
        </Typography>
      </Stack>
    </>
  )
}

export default MoreOrderInfo

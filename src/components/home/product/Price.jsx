import { Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { useUser } from '../../../contexts/UserContext'
import getPriceAfterDiscount from '../../../utils/getPriceAfterDiscount'

Price.propTypes = {
  price: PropTypes.number,
  discount: PropTypes.number,
}

function Price({ price, discount }) {
  const viewMode = useUser((v) => v.viewMode)
  return (
    <>
      <Typography component={'sup'} fontSize={'9px'} variant='inherit'>
        EGP
      </Typography>
      <Typography component={'span'} fontWeight={600} variant='inherit'>
        {discount ? getPriceAfterDiscount(price, discount) : price}
      </Typography>
      {discount && (
        <Typography
          color={'text.secondary'}
          fontWeight={700}
          sx={{
            textDecoration: 'line-through',
            marginInlineStart: viewMode === 'list' ? 0 : 1,
            fontSize: 'inherit',
          }}
          component={viewMode === 'list' ? 'div' : 'span'}
        >
          EGP{price}
        </Typography>
      )}
    </>
  )
}

export default Price

import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

Bar.propTypes = {
  value: PropTypes.number,
  reviewNo: PropTypes.number,
}

function Bar({ value, reviewNo }) {
  return (
    <>
      <Box
        width={`${value}%`}
        height={'8px'}
        borderRadius={'4px'}
        bgcolor={(t) => t.palette.primary.dark}
      />
      <Typography component={'span'} fontSize={12} color={'text.secondary'}>
        ({reviewNo})
      </Typography>
    </>
  )
}

export default Bar

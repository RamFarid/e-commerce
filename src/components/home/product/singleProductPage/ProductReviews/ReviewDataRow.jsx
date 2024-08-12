import { Grid } from '@mui/material'
import Bar from './Bar'
import StarIcon from '@mui/icons-material/Star'
import PropTypes from 'prop-types'

ReviewDataRow.propTypes = {
  value: PropTypes.number,
  reviewNo: PropTypes.number,
  rateNo: PropTypes.number,
}

function ReviewDataRow({ value, reviewNo, rateNo }) {
  return (
    <>
      <Grid
        item
        xs={6}
        sx={{
          textAlign: 'end',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {Array(rateNo)
          .fill('')
          .map((_, i) => (
            <StarIcon key={i + 3} fontSize='small' color='warning' />
          ))}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Bar value={value} reviewNo={reviewNo} />
      </Grid>
    </>
  )
}

export default ReviewDataRow

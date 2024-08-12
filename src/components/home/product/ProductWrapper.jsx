import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import ReactPullToRefresh from 'react-simple-pull-to-refresh'

function ProductWrapper({ children, canFetchMore, onRefresh, onFetchMore }) {
  return (
    <ReactPullToRefresh
      onRefresh={onRefresh}
      onFetchMore={onFetchMore}
      canFetchMore={canFetchMore}
      fetchMoreThreshold={100}
    >
      <Grid container spacing={2}>
        {children}
      </Grid>
    </ReactPullToRefresh>
  )
}

ProductWrapper.propTypes = {
  children: PropTypes.any,
  viewMode: PropTypes.oneOf(['list', 'grid']),
  canFetchMore: PropTypes.bool,
  onRefresh: PropTypes.func,
  onFetchMore: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default ProductWrapper

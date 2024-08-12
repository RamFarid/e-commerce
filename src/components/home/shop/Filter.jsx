import { Button, ButtonGroup, Stack } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { useProducts } from '../../../contexts/ProductsContext'
import { useSearchParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

import PropTypes from 'prop-types'
import ToggleViewMode from '../../ToggleViewMode'

Filter.propTypes = {
  filtersForm: PropTypes.shape({
    priceRange: PropTypes.arrayOf(PropTypes.number),
  }),
  dispatch: PropTypes.func,
}

function Filter() {
  const [, setSearchParams] = useSearchParams()
  const applyFilters = useProducts((v) => v.applyFilters)
  const isProductsLoading = useProducts((v) => v.isLoading)
  const dynamicFilters = useProducts((v) => v.filters)

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      my={2}
    >
      <Button
        disabled={isProductsLoading}
        color='inherit'
        startIcon={<FilterListIcon fontSize='small' />}
        size='small'
        sx={{ alignItems: 'center' }}
        onClick={() => setSearchParams({ adjust_filters: 1 })}
      >
        Filters
      </Button>
      <ButtonGroup variant='text' disabled={isProductsLoading}>
        <Button
          color='inherit'
          sx={{ bgcolor: dynamicFilters.sort && 'action.hover' }}
          startIcon={
            !dynamicFilters?.sort ? (
              <SwapVertIcon fontSize='small' />
            ) : dynamicFilters?.sort === '-price' ? (
              <ArrowDownwardIcon fontSize='small' />
            ) : (
              <ArrowUpwardIcon fontSize='small' />
            )
          }
          size='small'
          onClick={() => {
            const filters = {
              ...dynamicFilters,
            }
            if (!dynamicFilters?.sort) {
              filters.sort = '-price'
            } else if (dynamicFilters?.sort === '-price') {
              filters.sort = 'price'
            } else {
              filters.sort = ''
            }
            applyFilters(filters, 'noneForm')
          }}
        >
          Price
          {!dynamicFilters?.sort
            ? ': Sort by price'
            : dynamicFilters?.sort === '-price'
            ? ': Greatest to Lowest'
            : ': Lowest to Greatest'}
        </Button>
        {dynamicFilters?.sort && (
          <Button
            color='inherit'
            onClick={() =>
              applyFilters({ ...dynamicFilters, sort: '' }, 'noneForm')
            }
            sx={{ bgcolor: dynamicFilters?.sort && 'action.hover' }}
          >
            <CloseIcon />
          </Button>
        )}
      </ButtonGroup>
      <ToggleViewMode />
    </Stack>
  )
}

export default Filter

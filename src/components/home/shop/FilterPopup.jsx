import {
  Box,
  Button,
  FormLabel,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import Header from '../../Header'
import { useProducts } from '../../../contexts/ProductsContext'
import PropTypes from 'prop-types'
import Popup from '../../Popup'

FilterPopup.propTypes = {
  dispatch: PropTypes.func,
  filtersForm: PropTypes.shape({
    priceRange: PropTypes.arrayOf(PropTypes.number),
  }),
}

function FilterPopup({ dispatch, filtersForm }) {
  const applyFilters = useProducts((v) => v.applyFilters)
  const priceRange = useProducts((v) => v.priceRange)
  const [searchParams, setSearchParams] = useSearchParams()

  const canOpen = Boolean(searchParams.get('adjust_filters'))
  const onClose = () => setSearchParams({}, { replace: true })
  return (
    <Popup canOpen={canOpen} onClose={onClose}>
      <Box height={'100%'} display={'flex'} flexDirection={'column'} mb={1.2}>
        <Header title={'Filters'} onClick={onClose} />
        <FormLabel sx={{ mb: 2.1 }}>Price Range</FormLabel>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography fontSize={12}>
            {filtersForm.priceRange[0]}
            <Typography component={'sup'} fontSize={9}>
              EGP
            </Typography>
          </Typography>
          <Typography fontSize={12}>
            {filtersForm.priceRange[1]}
            <Typography component={'sup'} fontSize={9}>
              EGP
            </Typography>
          </Typography>
        </Stack>
        <Slider
          valueLabelDisplay='auto'
          min={priceRange[0]}
          max={priceRange[1]}
          step={10}
          getAriaLabel={() => 'Price Range'}
          value={filtersForm.priceRange}
          onChange={(_, value) => {
            dispatch({ type: 'priceRange', value })
          }}
        />
        <Stack direction='row' gap={1} mt='auto'>
          <Button
            variant='outlined'
            sx={{ flex: 1 }}
            onClick={onClose}
            disableElevation
          >
            Discard
          </Button>
          <Button
            variant='contained'
            sx={{ flex: 1 }}
            onClick={() => {
              applyFilters(filtersForm)
              onClose()
            }}
            disableElevation
          >
            Apply
          </Button>
        </Stack>
      </Box>
    </Popup>
  )
}

export default FilterPopup

import { Box, Fade } from '@mui/material'
import PropTypes from 'prop-types'

GalleryItem.propTypes = {
  src: PropTypes.string,
  active: PropTypes.bool,
}

function GalleryItem({ src, active }) {
  return (
    <Fade in={active}>
      <Box height={'450px'} sx={{ display: active ? 'block' : 'none' }}>
        <Box
          sx={{ objectFit: 'contain', objectPosition: 'top' }}
          component={'img'}
          src={src}
          width={'100%'}
          height={'100%'}
          display={'block'}
        />
      </Box>
    </Fade>
  )
}

export default GalleryItem

import { Box, Modal, Slide } from '@mui/material'

import PropTypes from 'prop-types'

Popup.propTypes = {
  children: PropTypes.element,
  canOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

function Popup({ children, canOpen, onClose }) {
  return (
    <Modal
      open={canOpen}
      onClose={onClose}
      sx={{
        display: {
          xs: 'block',
          md: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Slide direction={'up'} unmountOnExit in={canOpen}>
        <Box
          sx={{
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          height={{
            xs: '100dvh',
            md: '500px',
          }}
          width={{
            xs: '100%',
            md: '450px',
          }}
          margin={'auto'}
          bgcolor='background.default'
          pb={2}
          px={2}
          borderRadius='10px'
        >
          {canOpen && children}
        </Box>
      </Slide>
    </Modal>
  )
}

export default Popup

import { Backdrop, Box, ButtonBase, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
function ShowItem({ title, imagePath, xs, height, link }) {
  return (
    <Grid xs={xs} item className='Home__Page__Grid'>
      <ButtonBase
        position={'relative'}
        sx={{ height, width: '100%' }}
        LinkComponent={Link}
        to={link}
      >
        <Box position={'relative'} width={'100%'} height={'100%'}>
          <Box
            component={'img'}
            display={'block'}
            src={imagePath}
            width={'100%'}
            height={'100%'}
            sx={{ objectFit: 'cover' }}
          />
          <Backdrop open sx={{ position: 'absolute' }} />
        </Box>
        <Typography
          variant='h4'
          component={'h4'}
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          sx={{
            textDecoration: 'underline',
            transform: 'translate(-50%, -50%)',
          }}
          fontSize={{ xs: '20px', md: '30px' }}
          textTransform={'uppercase'}
          noWrap
          maxWidth={'100%'}
        >
          {title}
        </Typography>
      </ButtonBase>
    </Grid>
  )
}

ShowItem.propTypes = {
  imagePath: PropTypes.string,
  title: PropTypes.string,
  xs: PropTypes.number,
  height: PropTypes.string,
  link: PropTypes.string,
}

export default ShowItem

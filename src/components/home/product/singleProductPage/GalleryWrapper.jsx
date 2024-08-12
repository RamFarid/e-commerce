import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { Box, Paper, Stack } from '@mui/material'
import GalleryItem from './GalleryItem'

GalleryWrapper.propTypes = {
  images: PropTypes.array,
}

function GalleryWrapper({ images }) {
  const [currectIndex, setCurrectIndex] = useState(0)
  const onHoverImage = (i) => {
    setCurrectIndex(i)
  }

  const filteredImages = useMemo(() => {
    const imagesSet = new Set(images)
    return [...imagesSet]
  }, [images])

  return (
    <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={3}>
      <Stack
        spacing={2}
        direction={{ xs: 'row', md: 'column' }}
        justifyContent={{ xs: 'center', md: 'unset' }}
      >
        {filteredImages?.map((image, i) => {
          return (
            <Paper
              key={i + 1}
              sx={{
                cursor: 'pointer',
                border: '1px solid',
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                boxShadow: 9,
                outlineColor: (p) => p.palette.primary.dark,
                outlineStyle: 'solid',
                outlineWidth: currectIndex === i ? '2px' : '0px',
              }}
              onMouseOver={() => onHoverImage(i)}
            >
              <Box
                component={'img'}
                src={image}
                width={'100%'}
                height={'100%'}
                sx={{ objectFit: 'cover' }}
              />
            </Paper>
          )
        })}
      </Stack>
      {images?.map((image, i) => (
        <GalleryItem key={i} active={currectIndex === i} src={image} />
      ))}
    </Stack>
  )
}

export default GalleryWrapper

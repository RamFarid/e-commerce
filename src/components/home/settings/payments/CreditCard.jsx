import PropTypes from 'prop-types'
import { Box, Button, ButtonBase, ButtonGroup, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import CardDeleteLoader from './CardDeleteLoader'

CreditCard.propTypes = {
  type: PropTypes.oneOf(['visa', 'master']),
  name: PropTypes.string,
  date: PropTypes.string,
  last4Digits: PropTypes.string,
  onRemove: PropTypes.func,
  default: PropTypes.bool,
  id: PropTypes.string,
  onDefaultAction: PropTypes.func,
}

function CreditCard({
  id,
  type,
  name,
  date,
  last4Digits,
  onRemove,
  default: isDefault,
  onDefaultAction,
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const deleteHandler = async (e) => {
    e.stopPropagation()
    try {
      setIsDeleting(true)
      await onRemove(id)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const defaultHandler = async () => {
    console.log('first')
    try {
      await onDefaultAction(id, !isDefault)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Box
      component={ButtonBase}
      display={'block'}
      position={'relative'}
      width={{ xs: '100%', sm: '400px' }}
      mx='auto'
      ref={containerRef}
      mb={3}
      boxShadow={isDefault ? 10 : 0}
      pb={3}
      onClick={defaultHandler}
      border={(p) =>
        `${isDefault ? 3 : 1}px solid ${
          isDefault ? p.palette.info.dark : p.palette.text.primary
        }`
      }
    >
      <Box
        component={'img'}
        src={type?.toLowerCase() === 'visa' ? '/visa.svg' : '/master-card.svg'}
        width={'100%'}
        display={'block'}
      />
      <Typography
        position={'absolute'}
        bottom={'28%'}
        left={'14%'}
        fontSize={(containerWidth * 10) / 400}
      >
        {name}
      </Typography>
      <Typography
        position={'absolute'}
        right={type?.toLowerCase() === 'visa' ? '15%' : '38.4%'}
        bottom={'28%'}
        fontSize={(containerWidth * 10) / 400}
      >
        {date}
      </Typography>
      <Typography
        position={'absolute'}
        top={type?.toLowerCase() === 'visa' ? '32.1%' : '35.29%'}
        right={'19.4%'}
        fontSize={(containerWidth * 26) / 400}
      >
        {last4Digits}
      </Typography>
      <ButtonGroup
        variant='contained'
        disableElevation
        sx={{
          justifyContent: 'center',
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 8,
        }}
        color='inherit'
      >
        <Button endIcon={<DeleteForeverIcon />} onClick={deleteHandler}>
          Remove
        </Button>
      </ButtonGroup>
      {isDeleting && <CardDeleteLoader />}
    </Box>
  )
}

export default CreditCard

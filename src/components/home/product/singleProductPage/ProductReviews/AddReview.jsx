import { useSearchParams } from 'react-router-dom'
import Header from '../../../../Header'
import Popup from '../../../../Popup'
import { Button, Rating, Stack, TextareaAutosize, styled } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import server from '../../../../../lib/axios'
import { toast } from 'react-toastify'
import { useSingleProductData } from '../../../../../contexts/SingleProductContext'

function AddReview() {
  const productID = useSingleProductData((v) => v?.product?._id)
  const addReview = useSingleProductData((v) => v?.addReview)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: { rating: '0', description: '' },
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const canOpen = Boolean(searchParams.get('commit_review'))
  function onClose() {
    setSearchParams({})
  }

  const submitRating = async (formData) => {
    try {
      const parsedFormData = Object.assign(formData || {})
      parsedFormData.rating = Number(formData.rating)
      const { data } = await server.post(
        `/products/${productID}/ratings`,
        parsedFormData
      )
      addReview(data.rating, data.averageRatings)
      toast.success('Review Added successfully')
      onClose()
      reset()
    } catch (error) {
      if (error.name === 'AxiosError') {
        toast.error(error.response.data.message)
      }
      toast.error(error.message)
    }
  }

  return (
    <Popup canOpen={canOpen} onClose={onClose}>
      <Stack component={'form'} onSubmit={handleSubmit(submitRating)}>
        <Header
          title={"What's your opinion?"}
          hideAction
          centered
          onClick={onClose}
        />
        <Controller
          name='rating'
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Rating
              name='rating'
              onChange={onChange}
              value={Number(value)}
              sx={{ fontSize: 44, mx: 'auto', mb: 2 }}
            />
          )}
        />
        <DescriptionField
          placeholder='Your description here...'
          {...register('description')}
        />
        <Button
          sx={{ mt: 2 }}
          variant='contained'
          disableElevation
          type='submit'
          disabled={!dirtyFields.rating}
        >
          Add Rate
        </Button>
      </Stack>
    </Popup>
  )
}

const DescriptionField = styled(TextareaAutosize)(({ theme }) => ({
  maxWidth: '100%',
  minWidth: '100%',
  backgroundColor: theme.palette.background.paper,
  outline: 'none',
  borderRadius: '4px',
  border: 'none',
  minHeight: '200px',
  padding: '12px',
  color: theme.palette.text.primary,
  caretColor: theme.palette.text.primary,
  fontSize: 16,
  fontFamily: theme.typography.fontFamily,
}))

export default AddReview

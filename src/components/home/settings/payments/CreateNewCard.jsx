import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material'
import Popup from '../../../Popup'
import Header from '../../../Header'
import PropTypes from 'prop-types'
import Cards from 'react-credit-cards-2'
import { useState } from 'react'
import {
  isValid,
  isExpirationDateValid,
  getCreditCardNameByNumber,
} from 'creditcard.js'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import server from '../../../../lib/axios'
import { toast } from 'react-toastify'
import { useUserCards } from '../../../../contexts/CardsContext'

CreateNewCard.propTypes = {
  canOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

const initialError = {
  cardname: '',
  cardnumber: '',
  expirationdate: '',
  cvv: '',
}

const initialState = {
  cardname: '',
  cardnumber: '',
  expirationdate: '',
  cvv: '',
  focus: '',
}

function CreateNewCard({ canOpen, onClose }) {
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState(initialError)
  const [isLoading, setIsLoading] = useState(false)
  const setUserCreditCards = useUserCards((v) => v?.setUserCreditCards)
  const userCreditCards = useUserCards((v) => v?.userCreditCards)

  const handleInputChange = (evt) => {
    const { name, value } = evt.target
    setErrors(initialError)

    if (name === 'cardnumber') {
      if (value.length >= 20) return
    }

    if (name === 'expirationdate') {
      if (value.replace('/', '').length > 4) return
      if (value.length === 2 && !state.expirationdate.includes('/'))
        return setState((prev) => ({ ...prev, [name]: value + '/' }))
    }

    if (name === 'cvv') if (value.length > 3) return

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }))
  }

  const createCreditCard = async (card) => {
    try {
      const { data } = await server.post('/cards', card)
      setUserCreditCards((v) => {
        console.log([data.card, ...v])
        return [data.card, ...v]
      })
    } catch (error) {
      if (error.name === 'AxiosError')
        throw new Error(error.response.data.message)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const expirationdate = state.expirationdate.split('/')
    if (!isValid(state.cardnumber))
      return setErrors((p) => ({ ...p, cardnumber: 'Invalid Card Number' }))
    if (!isExpirationDateValid(expirationdate[0], expirationdate[1]))
      return setErrors((p) => ({
        ...p,
        expirationdate: 'Expiration date not valid',
      }))
    const cardType = getCreditCardNameByNumber(state.cardnumber)
    try {
      setIsLoading(true)
      await createCreditCard({
        type: cardType.replace('card', '').toLowerCase(),
        name: state.cardname,
        cvv: state.cvv,
        number: state.cardnumber,
        expiration_date: state.expirationdate,
        default: !userCreditCards?.length,
      })
      toast.success('Added Card')
      setState(initialState)
      setErrors(initialError)
      onClose()
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Popup canOpen={canOpen} onClose={onClose}>
      <Stack height={'100%'}>
        <Header title={'Add new card'} size='small' onClick={onClose} />
        <Stack flex={1} component={'form'} onSubmit={handleSubmit}>
          <Cards
            number={state.cardnumber}
            expiry={state.expirationdate}
            cvc={state.cvv}
            name={state.cardname}
            focused={state.focus}
          />
          <TextField
            sx={{ mt: 4 }}
            name='cardname'
            size='small'
            margin='dense'
            fullWidth
            onChange={handleInputChange}
            value={state.cardname}
            onFocus={handleInputFocus}
            label='Card Name'
            error={Boolean(errors.cardname)}
            helperText={errors.cardname}
          />
          <TextField
            value={state.cardnumber}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            name='cardnumber'
            size='small'
            margin='dense'
            type='number'
            fullWidth
            label='Card Number'
            error={Boolean(errors.cardnumber)}
            helperText={errors.cardnumber}
          />
          <FormControl>
            <TextField
              value={state.expirationdate}
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              name='expirationdate'
              size='small'
              margin='dense'
              fullWidth
              label='Expiration Date'
              helperText='MM/YY'
              error={Boolean(errors.expirationdate)}
            />
            <FormHelperText error>{errors.expirationdate}</FormHelperText>
          </FormControl>
          <TextField
            value={state.cvv}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            name='cvv'
            size='small'
            margin='dense'
            fullWidth
            label='CVV'
            type='number'
            error={Boolean(errors.cvv)}
            helperText={errors.cvv}
          />
          <Button
            sx={{ my: 2 }}
            fullWidth
            type='submit'
            variant='contained'
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={16} />}
          >
            Add card
          </Button>
        </Stack>
      </Stack>
    </Popup>
  )
}

export default CreateNewCard

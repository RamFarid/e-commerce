import { Box } from '@mui/material'
import { forwardRef, useImperativeHandle, useState } from 'react'
import PhoneInput from 'react-phone-number-input'

// eslint-disable-next-line react/display-name
const PhoneNumberInput = forwardRef((_, ref) => {
  const [phonenumber, setPhonenumber] = useState('')
  useImperativeHandle(
    ref,
    () => {
      return {
        getInputValue: () => phonenumber,
      }
    },
    [phonenumber]
  )
  return (
    <Box fullWidth sx={{ my: 1 }}>
      <PhoneInput
        value={phonenumber}
        onChange={(v) => setPhonenumber(v)}
        style={{ width: '100%' }}
        numberInputProps={{
          style: {
            background: 'transparent',
            outline: 'none',
            border: '1px solid #fff',
            width: '100%',
            caretColor: '#fff',
            minHeight: '1.4375em',
            borderRadius: '5px',
            padding: '8.5px 14px',
            color: '#fff',
          },
          placeholder: 'Enter Phone Number',
        }}
        id='phonenumber'
        name='phonenumber'
        defaultCountry='EG'
      />
    </Box>
  )
})

export default PhoneNumberInput

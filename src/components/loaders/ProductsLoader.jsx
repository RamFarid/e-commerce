import { Box, Stack } from '@mui/material'

function ProductsLoader() {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'300px'}
      width={'100%'}
    >
      <Box
        component={'span'}
        sx={{
          position: 'relative',
          width: '48px',
          height: '48px',
          '&::before, &::after': {
            content: "''",
            display: 'block',
            border: '32px solid transparent',
            borderTopColor: '#fff',
            position: 'absolute',
            left: '0',
            top: '0',
            animation: 'weld-rotate 2s infinite ease-in',
          },
          '&::before': {
            borderColor: (t) =>
              `transparent transparent transparent ${t.palette.primary.main}`,
            animationDelay: '0.5s',
          },
          '@keyframes weld-rotate': {
            '0%, 25%': { transform: 'rotate(0deg)' },
            '50%, 75%': { transform: 'rotate(180deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
    </Stack>
  )
}

export default ProductsLoader

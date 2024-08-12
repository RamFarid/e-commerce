import { Backdrop, Box, Stack } from '@mui/material'

function CardDeleteLoader() {
  return (
    <>
      <Backdrop open sx={{ position: 'absolute' }} />
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        position={'absolute'}
        sx={{ inset: 0 }}
        overflow={'hidden'}
      >
        <Box
          component={'span'}
          className='loader'
          sx={(theme) => ({
            position: 'relative',
            background: theme.palette.error.dark,
            width: '80px',
            height: '30px',
            lineHeight: '18px',
            textAlign: 'center',
            color: 'inherit',
            fontWeight: '700',
            letterSpacing: '0.5px',
            fontSize: '14px',
            boxSizing: 'border-box',
            border: '5px groove ' + theme.palette.error.main,
            borderRadius: '0 0 4px 4px',
            boxShadow: '0 5px 7px #0002',
            '&:before': {
              content: "''",
              width: '70px',
              height: '80px',
              background: '#fff',
              boxShadow: '0 0 10px #0003',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 'calc(100% + 6px)',
              animation: 'loadPaper 3s ease-in infinite',
            },
            '&:after': {
              content: "''",
              width: '70px',
              height: '80px',
              background: 'linear-gradient(to right, #fff 50%, #0000 51%)',
              backgroundSize: '9px 80px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 'calc(100% + 6px)',
              animation: 'disposePaper 3s ease-in infinite',
            },
            '@keyframes loadPaper': {
              '0%, 10%': {
                height: '80px',
                bottom: 'calc(100% + 40px)',
              },
              '50%': {
                height: '80px',
                bottom: 'calc(100% + 6px)',
              },
              '75%, 100%': {
                height: '0px',
                bottom: 'calc(100% + 6px)',
              },
            },
            '@keyframes disposePaper': {
              '0%, 50%': {
                height: '0px',
                top: 'calc(100% + 6px)',
              },
              '75%': {
                height: '80px',
                top: 'calc(100% + 6px)',
                opacity: '1',
              },
              '100%': {
                height: '80px',
                top: 'calc(100% + 40px)',
                opacity: '0',
              },
            },
          })}
        >
          Deleting
        </Box>
      </Stack>
    </>
  )
}

export default CardDeleteLoader

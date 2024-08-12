import { Box, IconButton, Link } from '@mui/material'
import CreditCard from '../../components/home/settings/payments/CreditCard'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import CreateNewCard from '../../components/home/settings/payments/CreateNewCard'
import AddIcon from '@mui/icons-material/Add'
import Empty from '../../components/Empty'
import { useUserCards } from '../../contexts/CardsContext'

function Payments() {
  const [openNewCard, setOpenNewCard] = useState(false)
  const closeNewCard = () => setOpenNewCard(false)
  const userCreditCards = useUserCards((v) => v?.userCreditCards)
  const deleteCard = useUserCards((v) => v?.deleteCard)
  const defaultAction = useUserCards((v) => v?.defaultAction)
  const getUserCreditCards = useUserCards((v) => v?.getUserCreditCards)

  useEffect(() => {
    getUserCreditCards()
  }, [getUserCreditCards])

  return (
    <Box sx={{ userSelect: 'none' }}>
      <Header href={'/settings'} title={'Payments Methods'} />
      {/* <CreditCard
        type={'master'}
        last4Digits={'2212'}
        name={'Ram Farid'}
        date={'12/09'}
      /> */}
      {userCreditCards.length ? (
        userCreditCards.map((card) => (
          <CreditCard
            key={card._id}
            type={card.type}
            date={card.expiration_date}
            name={card.name}
            last4Digits={card.secure_number}
            default={card.default}
            onRemove={deleteCard}
            onDefaultAction={defaultAction}
            id={card._id}
          />
        ))
      ) : (
        <Empty
          title={'No cards'}
          message={
            <>
              <Link
                onClick={(s) => {
                  s.preventDefault()
                  setOpenNewCard(true)
                }}
              >
                Add
              </Link>{' '}
              card to complete your shop now!
            </>
          }
        />
      )}
      <CreateNewCard canOpen={openNewCard} onClose={closeNewCard} />
      <IconButton
        sx={{ position: 'fixed', bottom: 'calc(76px + 10px)', right: '10px' }}
        color='primary'
        onClick={() => setOpenNewCard(true)}
        size='large'
      >
        <AddIcon color='primary' fontSize='large' />
      </IconButton>
    </Box>
  )
}

export default Payments

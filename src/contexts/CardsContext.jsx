import { useCallback, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import server from '../lib/axios'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

CardsContextProvider.propTypes = {
  children: PropTypes.any,
}

const CardsContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useUserCards = (callback) =>
  useContextSelector(CardsContext, callback)

function CardsContextProvider({ children }) {
  const [userCreditCards, setUserCreditCards] = useState([])

  const getUserCreditCards = useCallback(async () => {
    try {
      const { data } = await server.get('/cards')
      setUserCreditCards(data.cards)
    } catch (error) {
      if (error.name === 'AxiosError')
        toast.error(error?.response?.data?.message)
      toast.error(error.message)
    }
  }, [])

  const deleteCard = async (id) => {
    try {
      await server.delete('/cards', { params: { cardID: id } })
      setUserCreditCards((v) => v.filter((c) => c._id !== id))
    } catch (error) {
      if (error.name === 'AxiosError')
        throw Error(error?.response?.data?.message)
      throw error
    }
  }

  const defaultAction = async (cardID, value) => {
    try {
      const { data } = await server.patch(`/cards/${cardID}`, {
        default: value,
      })
      setUserCreditCards(data.cards)
    } catch (error) {
      if (error.name === 'AxiosError')
        throw Error(error?.response?.data?.message)
      throw error
    }
  }
  return (
    <CardsContext.Provider
      value={{
        getUserCreditCards,
        defaultAction,
        deleteCard,
        userCreditCards,
        setUserCreditCards,
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}

export default CardsContextProvider

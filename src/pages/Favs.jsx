import { Box } from '@mui/material'
import Header from '../components/Header'
import ProductItemCard from '../components/home/product/ProductItemCard'
import ProductWrapper from '../components/home/product/ProductWrapper'
import ToggleViewMode from '../components/ToggleViewMode'
import { useUser } from '../contexts/UserContext'
import Empty from '../components/Empty'
import { useEffect, useRef, useState } from 'react'
import server from '../lib/axios'
import { toast } from 'react-toastify'
import ProductsLoader from '../components/loaders/ProductsLoader'

function Favs() {
  const savedProducts = useUser((v) => v?.user?.saved_items)
  const userActionToFav = useUser((v) => v?.actionToFav)
  const isLoggedIn = useUser((v) => v?.user?.isLoggedIn)
  const updateUser = useUser((v) => v?.updateUser)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const allPages = useRef(0)

  const actionToFav = (productID, value) => {
    const targetProduct = savedProducts.find((p) => p._id === productID)
    targetProduct.saved_by_me = value
    if (value) userActionToFav('add', targetProduct)
    else userActionToFav('remove', targetProduct)
  }

  async function getData(page) {
    try {
      const { data } = await server.get('/user/saved_items', {
        params: { page },
      })
      allPages.current = data.pages
      return data.saved_items
    } catch (error) {
      if (error.name === 'AxiosError') {
        return toast.error(error?.response?.data?.message)
      }
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function onFetchMore() {
    if (isLoading) return
    try {
      const saved_items = await getData(currentPage + 1)
      updateUser((p) => {
        console.log([...(p?.saved_items || []), ...saved_items])
        return {
          saved_items: [...(p?.saved_items || []), ...saved_items],
        }
      })
      setCurrentPage((pre) => pre + 1)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!savedProducts) {
      ;(async () => {
        try {
          setCurrentPage(1)
          const saved_items = await getData(1)
          updateUser({ saved_items: saved_items })
        } catch (error) {
          console.log(error)
        }
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  return (
    <>
      <Header hideAction title={'My Favourits'} />
      <Box textAlign={'end'} mb={2}>
        <ToggleViewMode />
      </Box>
      <ProductWrapper
        canFetchMore={currentPage < allPages.current}
        onFetchMore={onFetchMore}
        onRefresh={async () => console.log('refereshed')}
        isLoading={isLoading}
      >
        {isLoading ? (
          <ProductsLoader />
        ) : !savedProducts?.length && Array.isArray(savedProducts) ? (
          <Empty
            title={'Empty items'}
            message={'Shopping and saved products to appear here'}
          />
        ) : (
          savedProducts?.map((product) => (
            <ProductItemCard
              key={product._id}
              product={product}
              actionToFav={actionToFav}
            />
          ))
        )}
      </ProductWrapper>
    </>
  )
}

export default Favs

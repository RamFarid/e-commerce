import { Tab, Tabs } from '@mui/material'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import OrderCard from '../../components/home/settings/orders/OrderCard'
import Empty from '../../components/Empty'
import { useUser } from '../../contexts/UserContext'
import PullToRefresh from 'react-simple-pull-to-refresh'
import ProductsLoader from '../../components/loaders/ProductsLoader'
import server from '../../lib/axios'
import { toast } from 'react-toastify'

function Orders() {
  const orders = useUser((v) => v?.orders)
  const getOrders = useUser((v) => v?.getOrders)
  const updateOrders = useUser((v) => v?.updateOrders)
  const [currentTab, setCurrentTab] = useState('completed')
  // ({
  //   completed: { data: [], pages: 0 },
  //   progress: { data: [], pages: 0 },
  //   cancelled: { data: [], pages: 0 },
  // })
  const [isLoading, setIsLoading] = useState(true)
  const [currentPages, setCurrentPages] = useState({
    completed: 1,
    progress: 1,
    cancelled: 1,
  })

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      setIsLoading(true)
      await getOrders()
      setIsLoading(false)
    })()
  }, [getOrders])

  const onFetchMore = async () => {
    if (isLoading) return
    try {
      const { data } = await server.get(`/orders`, {
        params: { status: currentTab, page: currentPages[currentTab] },
      })
      console.log('data', data)
      console.log(currentTab)
      updateOrders({
        [currentTab]: {
          data: data.orders[currentTab].data,
          pages: data.orders[currentTab].pages,
        },
      })
      setCurrentPages((pre) => ({ ...pre, [currentTab]: pre[currentTab] + 1 }))
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <>
      <Header title={'My Orders'} href={'/settings'} />
      <Tabs
        variant='scrollable'
        value={currentTab}
        onChange={(_, v) => setCurrentTab(v)}
        sx={{ mb: 2 }}
      >
        <Tab label={'Completed'} value={'completed'} />
        <Tab label={'Proccessing'} value={'progress'} />
        <Tab label={'Cancelled'} value={'cancelled'} />
      </Tabs>

      {isLoading ? (
        <ProductsLoader />
      ) : orders[currentTab]?.data?.length ? (
        <PullToRefresh
          isPullable={false}
          onFetchMore={onFetchMore}
          className='orders-pull-to-refresh'
          canFetchMore={orders[currentTab]?.pages / currentPages[currentTab]}
        >
          {orders[currentTab]?.data?.map((order) => (
            <OrderCard {...order} key={order._id} />
          ))}
        </PullToRefresh>
      ) : (
        <Empty title={'No Orders have made'} message={'Ship and Order Now'} />
      )}
    </>
  )
}

export default Orders

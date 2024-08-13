import { Divider, Stack, Typography } from '@mui/material'
import Header from '../../components/Header'
import DetailedOrderCard from '../../components/home/settings/orders/DetailedOrderCard'
import MoreOrderInfo from '../../components/home/settings/orders/MoreOrderInfo'
import { useParams } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Empty from '../../components/Empty'
import getPriceAfterDiscount from '../../utils/getPriceAfterDiscount'
import getRelativeTime from '../../utils/getRelativeTime'
import { useEffect, useState } from 'react'
import server from '../../lib/axios'
import ProductsLoader from '../../components/loaders/ProductsLoader'

function SingleOrder() {
  const { orderID } = useParams()
  const orders = useUser((p) => p?.orders)
  const [isLoading, setIsLoading] = useState(true)
  const preOrder = [
    ...orders.progress.data,
    ...orders.completed.data,
    ...orders.cancelled.data,
  ].find((p) => p._id === orderID)
  const [targetOrder, setTargetOrder] = useState(preOrder)

  const totalItems = targetOrder?.products?.reduce((pre, current) => {
    return pre + current.quantity
  }, 0)
  const totalPrice = Number(
    (
      targetOrder?.products?.reduce((pre, current) => {
        if (pre instanceof Number) return
        if (Number(current.product?.discount))
          return (
            pre +
            getPriceAfterDiscount(
              Number(current.product?.price),
              Number(current.product?.discount)
            ) *
              current.quantity
          )
        return pre + Number(current.product?.price) * current.quantity
      }, 0) + targetOrder?.fee
    ).toFixed(2)
  )

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      setIsLoading(true)
      if (targetOrder?._id !== orderID || !preOrder) {
        const {
          data: { order },
        } = await server.get(`/orders/${orderID}`)
        setTargetOrder(order)
      }
      setIsLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderID])

  return isLoading ? (
    <ProductsLoader />
  ) : Object.keys(targetOrder || {}).length ? (
    <>
      <Header
        href={'/settings/my-orders'}
        title={'Order Details'}
        size='small'
      />
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        <Typography noWrap component={'h5'}>
          Order Key: {orderID}
        </Typography>
        <Typography component={'time'} color={'text.secondary'} fontSize={12}>
          Ordered: {getRelativeTime(targetOrder.createdAt)}
        </Typography>
      </Stack>
      <Typography
        textAlign='end'
        color={(p) =>
          targetOrder.status === 'cancelled'
            ? p.palette.error.dark
            : targetOrder.status === 'progress'
            ? p.palette.warning.dark
            : p.palette.success.dark
        }
        fontSize={14}
        my={1.3}
      >
        {targetOrder.status}
      </Typography>

      <Typography fontSize={14} color={'text.secondary'}>
        {totalItems} items
      </Typography>
      {targetOrder.products.map(({ product, quantity }) => {
        return (
          <DetailedOrderCard
            {...product}
            quantity={quantity}
            key={product._id}
          />
        )
      })}
      <Divider sx={{ my: 1 }} />
      <MoreOrderInfo
        totalPrice={totalPrice}
        fee={targetOrder.fee}
        payment_details={targetOrder.payment_details}
        address={targetOrder?.address}
      />
    </>
  ) : (
    <Empty title={'NO ORDER FOUND!'} />
  )
}

export default SingleOrder

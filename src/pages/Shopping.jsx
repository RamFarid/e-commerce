import ProductItemCard from '../components/home/product/ProductItemCard'
import ProductWrapper from '../components/home/product/ProductWrapper'
import Header from '../components/Header'
import Category from '../components/home/shop/Category'
import Filter from '../components/home/shop/Filter'
import FilterPopup from '../components/home/shop/FilterPopup'
import { useProducts } from '../contexts/ProductsContext'
import ProductsLoader from '../components/loaders/ProductsLoader'
import { Box } from '@mui/material'
import { useEffect, useReducer } from 'react'
import Empty from '../components/Empty'

function reducer(state, action) {
  switch (action.type) {
    case 'priceRange':
      return {
        ...state,
        priceRange: action.value,
      }
    default:
      return state
  }
}

function Shopping() {
  const allPages = useProducts((v) => v.pages)
  const products = useProducts((v) => v.products)
  const error = useProducts((v) => v.error)
  const fetchMoreProducts = useProducts((v) => v.onFetchMore)
  const isProductsLoading = useProducts((v) => v.isLoading)
  const currentPage = useProducts((v) => v.currentPage)
  const priceRange = useProducts((v) => v.priceRange)
  const actionToFav = useProducts((v) => v.actionToFav)
  const [filtersForm, dispatch] = useReducer(reducer, {
    priceRange,
  })

  useEffect(() => {
    dispatch({ type: 'priceRange', value: priceRange })
  }, [dispatch, priceRange])

  return (
    <>
      <Header href={'/'} title={'Shop'} />
      <Category />
      <Filter filtersForm={filtersForm} dispatch={dispatch} />
      <Box minHeight={'98vh'}>
        <ProductWrapper
          canFetchMore={currentPage < allPages}
          onFetchMore={fetchMoreProducts}
          onRefresh={async () => console.log('Refresh')}
          isLoading={isProductsLoading}
        >
          {Object.keys(error || {})?.length ? (
            <Empty
              title={error?.status === 404 && 'Not found category'}
              message={error.message}
            />
          ) : isProductsLoading ? (
            <ProductsLoader />
          ) : (
            products.map((product) => (
              <ProductItemCard
                key={product._id}
                product={product}
                actionToFav={actionToFav}
              />
            ))
          )}
        </ProductWrapper>
      </Box>
      <FilterPopup dispatch={dispatch} filtersForm={filtersForm} />
    </>
  )
}

export default Shopping

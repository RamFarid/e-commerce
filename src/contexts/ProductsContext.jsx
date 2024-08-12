import { createContext, useContextSelector } from 'use-context-selector'
import PropTypes from 'prop-types'
import useFetchProducts from '../hooks/useFetchProducts'

const ProductsContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = (callback) => {
  return useContextSelector(ProductsContext, callback)
}

function ProductsContextProvider({ children }) {
  return (
    <ProductsContext.Provider
      value={{
        ...useFetchProducts(),
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

ProductsContextProvider.propTypes = {
  children: PropTypes.any,
}

export default ProductsContextProvider

// setIsLoading(true)
// setCurrentPage(1)
// try {
//   const params = getQueryParams()
//   const data = await getProducts(params)
//   setPages(data.pages)
//   setProducts(data.products)
// } catch (error) {
//   toast.error(error)
//   console.log(error)
// } finally {
//   setIsLoading(false)

// const getQueryParams = (qs) => {
//   let params = {}
//   if (qs?.priceRange) {
//     params.priceRange = qs?.priceRange.join(',')
//   } else if (
//     JSON.stringify(filterForm.priceRange) !== JSON.stringify(priceRange)
//   ) {
//     params.priceRange = filterForm.priceRange.join(',')
//   }
//   if (qs?.sort !== undefined) {
//     params.sort = qs.sort === 0 ? null : qs?.sort === -1 ? '-price' : 'price'
//   } else if (filterForm.sortByPrice) {
//     params.sort = filterForm.sortByPrice === -1 ? '-price' : 'price'
//   }
//   return params
// }

// const getFiltersParams = () => {
//   let params = {};
//   for (const filter in filters) {
//     if (Object.hasOwnProperty.call(filters, filter)) {
//       const value = filters[filter];
//       Object.keys(filters)
//     }
//   }
// }

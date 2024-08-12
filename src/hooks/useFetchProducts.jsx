import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import server from '../lib/axios'
import { toast } from 'react-toastify'
import { useUser } from '../contexts/UserContext'

function useFetchProducts() {
  const isPending = useUser((v) => v.isViewModePending)
  const userActionToFav = useUser((v) => v.actionToFav)
  const [pages, setPages] = useState(0)
  const [categories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState([])
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const { category } = useParams()

  const getProducts = useCallback(
    async (params = {}) => {
      const { data } = await server.get(
        `/products${category ? `/category/${category}` : ''}`,
        { params }
      )
      return data
    },
    [category]
  )

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      setCurrentPage(1)
      setIsLoading(true)
      setError({})
      try {
        const data = await getProducts()
        setProducts(data.products)
        setPages(data.pages)
        setCategories(data.categories)
        setPriceRange(data.priceRange)
      } catch (error) {
        console.log(error)
        setError({
          status: error?.response?.status || 0,
          message: error?.response?.data?.message || error.message,
        })
      } finally {
        setIsLoading(false)
      }
    })()
  }, [getProducts])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        setError({})
        if (isLoading || isPending) return
        setIsLoading(true)
        setCurrentPage(1)
        const data = await getProducts(filters)
        setProducts(data.products)
        setPages(data.pages)
      } catch (error) {
        console.log(error)
        setError({
          status: error?.response?.status || 0,
          message: error?.response?.data?.message || error.message,
        })
      } finally {
        setIsLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const onFetchMore = async () => {
    if (isLoading || isPending) return
    console.log('FetchMore')
    try {
      console.log(filters)
      const data = await getProducts({ ...filters, page: currentPage + 1 })
      setProducts((p) => Array.from(new Set([...p, ...data.products])))
      setCurrentPage((p) => p + 1)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const applyFilters = async (value, formType) => {
    console.log('ApplyFilters')
    let filters = { ...value }
    if (formType !== 'noneForm') {
      if (JSON.stringify(filters.priceRange) !== JSON.stringify(priceRange))
        filters.priceRange = filters.priceRange.join(',')
      else delete filters.priceRange
    }

    setFilters(filters)
  }

  const clearFilters = async () => setFilters({})

  const actionToFav = async (productID, value) => {
    try {
      const targetProduct = products.find((p) => p._id === productID)
      if (value) await userActionToFav('add', targetProduct)
      else await userActionToFav('remove', targetProduct)
      targetProduct.saved_by_me = value
      setProducts(
        products.map((p) => (p._id === productID ? targetProduct : p))
      )
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
      throw error
    }
  }

  return {
    onFetchMore,
    products,
    pages,
    categories,
    priceRange,
    currentPage,
    isLoading,
    clearFilters,
    applyFilters,
    filters,
    actionToFav,
    error,
  }
}

export default useFetchProducts

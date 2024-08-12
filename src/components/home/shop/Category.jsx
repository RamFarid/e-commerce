import { Tab, Tabs, useMediaQuery } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProducts } from '../../../contexts/ProductsContext'
function Category() {
  const { pathname } = useLocation()
  const categories = useProducts((v) => v.categories)
  const isMobileOrTablet = useMediaQuery('(max-width:900px)')
  const navigate = useNavigate()
  return (
    isMobileOrTablet && (
      <Tabs
        variant='scrollable'
        scrollButtons={true}
        value={pathname}
        onChange={(_, v) => navigate(`${v}`)}
        sx={{ mb: 2 }}
      >
        <Tab label={'All'} value={'/store'} />
        {categories.map((category) => (
          <Tab label={category} key={category} value={`/store/${category}`} />
        ))}
      </Tabs>
    )
  )
}

export default Category

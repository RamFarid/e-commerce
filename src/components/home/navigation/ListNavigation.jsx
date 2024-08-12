import { Collapse, MenuList } from '@mui/material'
import NavigationItemWideScreen from './NavigationItemWideScreen'
import PropTypes from 'prop-types'
import DiamondIcon from '@mui/icons-material/Diamond'
import WeekendIcon from '@mui/icons-material/Weekend'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import RollerSkatingIcon from '@mui/icons-material/RollerSkating'
import BlenderIcon from '@mui/icons-material/Blender'
import BiotechIcon from '@mui/icons-material/Biotech'
import { useUser } from '../../../contexts/UserContext'
const categoriesIcons = [
  <DiamondIcon key={'unique-accessoires'} />,
  <WeekendIcon key={'unique-furniture'} />,
  <CheckroomIcon key={'unique-clothes'} />,
  <RollerSkatingIcon key={'unique-shoes'} />,
  <BiotechIcon key={'unique-tech'} />,
  <BlenderIcon key={'unique-more'} />,
]
function ListNavigation({ open }) {
  const categories = useUser((v) => v.categories)
  return (
    <Collapse in={open}>
      <MenuList
        sx={{
          marginInlineStart: 4,
          paddingInlineStart: 0,
          '& > li': {
            // paddingInlineStart: 0,
            // marginInlineStart: 0,
            '&:first-child': {
              '&::before': {
                height: '33px',
              },
            },
            '&::before': {
              content: "''",
              width: '20px',
              height: '45px',
              borderBlockEnd: '2px solid #fff',
              borderInlineStart: '2px solid #fff',
              borderBottomLeftRadius: '11px',
              position: 'absolute',
              left: '-6px',
              top: '50%',
              transform: 'translate(0, -90%)',
            },
          },
        }}
      >
        {categories.map((cat, i) => {
          return (
            <NavigationItemWideScreen
              to={`/store/${cat}`}
              key={cat + 2}
              icon={categoriesIcons[i]}
              title={cat}
            />
          )
        })}
      </MenuList>
    </Collapse>
  )
}

ListNavigation.propTypes = {
  open: PropTypes.bool,
}

export default ListNavigation

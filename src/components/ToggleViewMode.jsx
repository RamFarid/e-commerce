import GridViewIcon from '@mui/icons-material/GridView'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline'
import IconButton from '@mui/material/IconButton'
import { useUser } from '../contexts/UserContext'

function ToggleViewMode() {
  const viewMode = useUser((v) => v.viewMode)
  const changeViewMode = useUser((v) => v.changeViewMode)
  const isPending = useUser((v) => v.isViewModePending)
  return (
    <>
      <IconButton
        color='inherit'
        size='small'
        onClick={() => changeViewMode()}
        disableRipple
        disabled={isPending}
      >
        {isPending ? (
          'Loading..'
        ) : viewMode === 'list' ? (
          <ViewHeadlineIcon />
        ) : (
          <GridViewIcon />
        )}
      </IconButton>
    </>
  )
}

export default ToggleViewMode

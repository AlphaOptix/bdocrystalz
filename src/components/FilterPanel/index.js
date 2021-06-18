import { Button, Container } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { useState } from 'react'
import FilterMenu from '../FilterMenu'

function FilterPanel ({ crystals, setCrystals }) {
  const [anchor, setAnchor] = useState(null)

  const handleClick = event => {
    if (anchor) {
      setAnchor(null)
    } else {
      setAnchor(event.currentTarget)
    }
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingBottom: 10
      }}
      disableGutters
    >
      <Button variant='contained' disableElevation onClick={handleClick}>
        <FilterListIcon /> Filter
      </Button>
      <FilterMenu
        crystals={crystals}
        setCrystals={setCrystals}
        anchor={anchor}
        setAnchor={setAnchor}
      />
    </Container>
  )
}

export default FilterPanel

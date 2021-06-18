import { Container, InputLabel, FormControl, Input } from '@material-ui/core'

function SearchControl ({ searchValue, setSearchValue }) {
  return (
    <Container>
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor='search' shrink>
          Name
        </InputLabel>
        <Input
          placeholder=''
          id='search'
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </FormControl>
    </Container>
  )
}

export default SearchControl

import { Container, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';

function BreakControl ({ breakChance, breakValue, setBreakValue }) {
  return (
    <Container>
      <FormControl style={{ width: '100%' }}>
        <InputLabel id='break-label'>Break Chance</InputLabel>
        <Select
          labelId='break-label'
          autoWidth
          value={breakValue}
          onChange={event => setBreakValue(event.target.value)}
        >
          <MenuItem value='All' key='break-1'>All</MenuItem>
          {breakChance.map((chance, i) => (<MenuItem value={chance} key={`break+${i}`}>{chance}</MenuItem>))}
        </Select>
      </FormControl>
    </Container>
  );
}

export default BreakControl;

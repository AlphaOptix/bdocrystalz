import { Container, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';

function SocketControl ({ sockets, socketValue, setSocketValue }) {
  return (
    <Container>
      <FormControl style={{ width: '100%' }}>
        <InputLabel id='socket-label'>Socket</InputLabel>
        <Select
          labelId='socket-label'
          autoWidth
          value={socketValue}
          onChange={event => setSocketValue(event.target.value)}
        >
          <MenuItem value='All' selected key='socket-1'>All</MenuItem>
          {sockets.map((socket, i) => (<MenuItem value={socket} key={`socket+${i}`}>{socket}</MenuItem>))}
        </Select>
      </FormControl>
    </Container>
  );
}

export default SocketControl;

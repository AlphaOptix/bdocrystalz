import { Container, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';


function EffectControl({effects, effectValue, setEffectValue}){
    return (
        <Container>
            <FormControl style={{width: '100%'}}>
                <InputLabel id="effect-label">Effect</InputLabel>
                <Select 
                    labelId="effect-label"
                    autoWidth={true} 
                    value={effectValue}
                    onChange={event => setEffectValue(event.target.value)}
                >
                    <MenuItem value="All" selected key="effect-1">All</MenuItem>
                    {effects.map((effect, i) => (<MenuItem value={effect} key={`effect+${i}`}>{effect}</MenuItem>))}
                </Select>
            </FormControl>
        </Container>
    );
}

export default EffectControl;
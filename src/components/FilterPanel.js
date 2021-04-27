import { Button, Select, InputLabel, MenuItem, FormControl, Input, Popover } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState, useRef, useEffect } from 'react';


function FilterPanel({crystals, setCrystals}) {
    const [anchorEl, setAnchorEl] = useState(false);
    const [sockets, setSockets] = useState([]);
    const [effects, setEffects] = useState([]);
    const [breakChance, setBreakChance] = useState([]);

    const handleClick = (event) => {
        if(anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    useEffect(()=>{
        const socketList = new Set();
        const effectList = new Set();
        const breakList = new Set();

        crystals.forEach(crystal => {
            breakList.add(crystal.breakChance);
            socketList.add(crystal.socket);
            crystal.effect.split(',').forEach(effect => {
                const plusIndex = effect.indexOf('+');
                effectList.add(effect.substr(0,plusIndex).trim());
            });
            effectList.delete("");
        });

        setBreakChance([...breakList]);
        setSockets([...socketList].sort());
        setEffects([...effectList].sort());
    },[crystals]);
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', paddingBottom: 10 }}>
                <Button variant="contained" disableElevation onClick={handleClick}>
                    <FilterListIcon /> Filter
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    placement="bottom-end"
                    disablePortal={false}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    PaperProps={{
                        style: {
                            width: 450,
                            padding: 15
                        }
                    }}
                >
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <Input placeholder="Search" />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="break-label">Break Chance</InputLabel>
                            <Select labelId="break-label" autoWidth={true}>
                                <MenuItem value="All" selected>All</MenuItem>
                                {breakChance.map(chance => (<MenuItem value={chance}>{chance}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="socket-label">Socket</InputLabel>
                            <Select labelId="socket-label" autoWidth={true}>
                                <MenuItem value="All" selected>All</MenuItem>
                                {sockets.map(socket => (<MenuItem value={socket}>{socket}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="effect-label">Effect</InputLabel>
                            <Select labelId="effect-label" autoWidth={true}>
                                <MenuItem value="All" selected>All</MenuItem>
                                {effects.map(effect => (<MenuItem value={effect}>{effect}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
              </Popover>
        </div>
    )
}

export default FilterPanel;
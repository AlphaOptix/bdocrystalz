import { Button, Select, InputLabel, MenuItem, FormControl, Input, Popover } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState, useEffect, useRef } from 'react';


function FilterPanel({crystals, setCrystals}) {
    const [state, setState] = useState({
        anchorEl: false,
        sockets: [],
        effects: [],
        breakChance: [],
    });
    const [searchValue, setSearchValue] = useState(""),
          [socketValue, setSocketValue] = useState("All"),
          [breakValue, setBreakValue]   = useState("All"),
          [effectValue, setEffectValue] = useState("All");

    const filterTimeout = useRef();

    const handleClick = (event) => {
        if(state.anchorEl) {
            setState({ 
                ...state, 
                anchorEl: null
            });
        } else {
            setState({ 
                ...state,
                anchorEl: event.currentTarget 
            });
        }
    };

    useEffect(() => {
        function handleKeyUp(e) {
            console.log(e);
            if(e.code === "Enter" || e.code === "Escape") {
                setState(s => ({
                    ...s,
                    anchorEl: null
                }));
            }
        }

        document.addEventListener('keyup', handleKeyUp);

        return function cleanup() {
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    useEffect(() => {
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

        setState(s => ({
            ...s,
            breakChance: [...breakList],
            sockets: [...socketList].sort(),
            effects: [...effectList].sort()
        }));
    },[crystals]);
  
    const handleClose = () => {
      setState({
          ...state,
          anchorEl: null
      });
    };

    useEffect(() => {
        clearTimeout(filterTimeout.current);
        let filteredCrystals = [];
        filterTimeout.current = setTimeout(() => {
            filteredCrystals = crystals.filter(crystal => {
                if (!crystal.name.toUpperCase().includes(searchValue.toUpperCase())) return false;
                if (socketValue !== 'All' && crystal.socket !== socketValue) return false;
                if (breakValue !== 'All' && crystal.breakChance !== breakValue) return false;
                let hasEffect = false;
                crystal.effect.split(',').forEach(effect => {
                    const plusIndex = effect.indexOf('+');
                    if (effect.substr(0,plusIndex).trim() === effectValue) hasEffect = true;
                });
                if (effectValue !== 'All' && hasEffect === false) return false;
                return true;
            });
            setCrystals(filteredCrystals);
        }, 250);
    }, [searchValue, breakValue, effectValue, socketValue, crystals, setCrystals]);

    const open = Boolean(state.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', paddingBottom: 10 }}>
                <Button variant="contained" disableElevation onClick={handleClick}>
                    <FilterListIcon /> Filter
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={state.anchorEl}
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
                            <InputLabel htmlFor="search" shrink={true}>Name</InputLabel>
                            <Input
                                placeholder=""
                                id="search"
                                value={searchValue} 
                                onChange={event => setSearchValue(event.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="effect-label">Effect</InputLabel>
                            <Select 
                                labelId="effect-label"
                                autoWidth={true} 
                                value={effectValue}
                                onChange={event => setEffectValue(event.target.value)}
                            >
                                <MenuItem value="All" selected key="effect-1">All</MenuItem>
                                {state.effects.map((effect, i) => (<MenuItem value={effect} key={`effect+${i}`}>{effect}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="break-label">Break Chance</InputLabel>
                            <Select 
                                labelId="break-label" 
                                autoWidth={true} 
                                value={breakValue}
                                onChange={event => setBreakValue(event.target.value)}
                            >
                                <MenuItem value="All" key="break-1">All</MenuItem>
                                {state.breakChance.map((chance, i) => (<MenuItem value={chance} key={`break+${i}`}>{chance}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="socket-label">Socket</InputLabel>
                            <Select 
                                labelId="socket-label" 
                                autoWidth={true} 
                                value={socketValue}
                                onChange={event => setSocketValue(event.target.value)}
                            >
                                <MenuItem value="All" selected key="socket-1">All</MenuItem>
                                {state.sockets.map((socket, i) => (<MenuItem value={socket} key={`socket+${i}`}>{socket}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ textAlign: 'right', paddingTop: 10 }}>
                        <Button color="secondary" onClick={() => {
                            setSearchValue('');
                            setEffectValue('All');
                            setBreakValue('All');
                            setSocketValue('All');
                        }}>Clear All</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
              </Popover>
        </div>
    )
}

export default FilterPanel;
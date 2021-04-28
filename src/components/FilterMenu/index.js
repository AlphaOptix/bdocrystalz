import { Button, Popover, Container, CircularProgress } from '@material-ui/core';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';

const EffectControl = lazy(() => import('./EffectControl'));
const GradeControl = lazy(() => import('./GradeControl'));
const SearchControl = lazy(() => import('./SearchControl'));
const SocketControl = lazy(() => import('./SocketControl'));

function FilterMenu({crystals, setCrystals, anchor, setAnchor}){
    const [state, setState] = useState({
        sockets: [],
        effects: [],
        breakChance: [],
        grades: [
            {
                name: "White",
                value: "0"
            },
            {
                name: "Green",
                value: "1"
            },
            {
                name: "Blue",
                value: "2"
            },
            {
                name: "Yellow",
                value: "3"
            },
            {
                name: "Orange",
                value: "4"
            }
        ]
    });

    const [searchValue, setSearchValue] = useState(""),
    [socketValue, setSocketValue] = useState("All"),
    [breakValue, setBreakValue]   = useState("All"),
    [effectValue, setEffectValue] = useState("All"),
    [gradeValue, setGradeValue]   = useState("All");

    const filterTimeout = useRef();

    useEffect(() => {
        function handleKeyUp(e) {
            if(e.code === "Enter" || e.code === "Escape") {
                setAnchor(null);
            }
        }

        document.addEventListener('keyup', handleKeyUp);

        return function cleanup() {
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [setAnchor]);

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
        setAnchor(null);
    };

    useEffect(() => {
        clearTimeout(filterTimeout.current);
        let filteredCrystals = [];
        filterTimeout.current = setTimeout(() => {
            filteredCrystals = crystals.filter(crystal => {
                if (!crystal.name.toUpperCase().includes(searchValue.toUpperCase())) return false;
                if (socketValue !== 'All' && crystal.socket !== socketValue) return false;
                if (breakValue !== 'All' && crystal.breakChance !== breakValue) return false;
                if (gradeValue !== 'All' && crystal.grade !== gradeValue) return false;
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
    }, [searchValue, breakValue, effectValue, socketValue, gradeValue, crystals, setCrystals]);


    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    return(
        <Popover
            id={id}
            open={open}
            anchorEl={anchor}
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
                    padding: '20px 0'
                }
            }}
        >
            <Suspense fallback={
                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress disableShrink size={40} />
                </Container>
            }>
                <SearchControl searchValue={searchValue} setSearchValue={setSearchValue} /> 
                <GradeControl grades={state.grades} gradeValue={gradeValue} setGradeValue={setGradeValue} />
                <EffectControl effects={state.effects} effectValue={effectValue} setEffectValue={setEffectValue} />
                <SocketControl sockets={state.sockets} socketValue={socketValue} setSocketValue={setSocketValue} />
                <Container style={{ textAlign: 'right', paddingTop: 10 }}>
                    <Button color="secondary" onClick={() => {
                        setSearchValue('');
                        setEffectValue('All');
                        setBreakValue('All');
                        setSocketValue('All');
                        setGradeValue('All');
                    }}>Clear All</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Container>
            </Suspense>
        </Popover>
    );
}

export default FilterMenu;
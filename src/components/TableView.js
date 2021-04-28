import { 
    makeStyles, 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer,
    TableHead, 
    TableRow,
    withStyles
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    icon: {
        margin: '10px 10px 10px 5px'
    },
    name: {
        fontWeight: 'bold',
        textDecoration: 'none !important',
        '&:hover': {
            textDecoration: 'underline !important'
        } 
    },
    'rarity-4': {
        color: '#d36300 !important'
    },
    'rarity-3': {
        color: '#f6c232 !important'
    },
    'rarity-2': {
        color: '#0391c4 !important'
    },
    'rarity-1': {
        color: '#5ff369 !important'
    },
    'rarity-0': {
        color: '#fff !important'
    }
})

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function TableView({crystals}){
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow key="header-row">
                        <TableCell width="5%"></TableCell>
                        <TableCell width="40%">Crystal</TableCell>
                        <TableCell>Effect</TableCell>
                        <TableCell width="10%">Break Chance</TableCell>
                        <TableCell width="15%">Socket</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {crystals.map((crystal) => {
                        return (
                            <StyledTableRow key={`crystal-${crystal.id}`}>
                                <TableCell><img className={classes['icon']} src={crystal.icon} alt="icon" /></TableCell>
                                <TableCell><a className={`${classes['name']} ${classes["rarity-" + crystal.grade]}`} target="_blank" rel="noreferrer" href={`https://bdocodex.com/us/item/${crystal.id}`}>{crystal.name}</a></TableCell>
                                <TableCell>
                                    {crystal.effect.split(',').map((effect, i) => {
                                        return (
                                            <div key={`effect${effect + i}`}>
                                                {effect}&nbsp;
                                            </div>
                                        )
                                    })}
                                </TableCell>
                                <TableCell>{crystal.breakChance}</TableCell>
                                <TableCell>{crystal.socket}</TableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableView;
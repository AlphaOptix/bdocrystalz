import React from 'react';
import { 
    Card, 
    CardHeader, 
    CardContent, 
    Avatar, 
    makeStyles, 
    Typography, 
    CardActionArea,
    Grid
} from '@material-ui/core';

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
    bottomGutter: {
        marginBottom: 10
    },
    noBottomPad: {
        paddingBottom: 0
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

function CardComponent({crystals}) {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            {crystals.map((crystal) => {
                return (
                    <Card className={classes.bottomGutter}>
                        <CardActionArea target="_blank" rel="noreferrer" href={`https://bdocodex.com/us/item/${crystal.id}`}>
                            <CardHeader 
                                avatar={
                                    <Avatar alt="crysal icon" src={crystal.icon} />
                                }
                                title={
                                    <Typography className={`${classes['name']} ${classes["rarity-" + crystal.grade]}`} variant="body2">{crystal.name}</Typography>
                                }
                                className={classes.noBottomPad}
                            />
                            <CardContent>
                                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">
                                            <b>Effect:</b>
                                            <br />
                                            {crystal.effect.split(',').map((effect) => {
                                                return (
                                                    <React.Fragment>
                                                        {effect}<br />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body2">
                                            <b>Break Chance:</b>
                                            <br />
                                            {crystal.breakChance}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body2">
                                            <b>Socket:</b>
                                            <br />
                                            {crystal.socket}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
        </React.Fragment>
    );
}

export default CardComponent;
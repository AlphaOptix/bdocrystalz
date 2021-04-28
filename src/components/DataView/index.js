import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import crystalData from '../../data/crystals.json';
import TableView from '../TableView';
import CardView from '../CardView';
import FilterPanel from '../FilterPanel';
import { useState } from 'react';

function DataView({width}) {
    const view = [];
    const [crystals, setCrystals] = useState(crystalData);

    view.push((<FilterPanel crystals={crystalData} setCrystals={setCrystals} key="filterpanel" />))

    if(isWidthDown('xs', width)) {
        view.push((<CardView crystals={crystals} key="cardview" />));
    } else {
        view.push((<TableView crystals={crystals} key="tableview" />));
    }

    return view;
}
           
export default withWidth()(DataView);
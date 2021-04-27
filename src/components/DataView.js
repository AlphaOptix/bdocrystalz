import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import crystalData from '../data/crystals.json';
import TableView from './TableView';
import CardView from './CardView';
import FilterPanel from './FilterPanel';
import { useState } from 'react';

function DataView({width}) {
    const view = [];
    const [crystals, setCrystals] = useState(crystalData);

    view.push((<FilterPanel crystals={crystalData} setCrystals={setCrystals} />))

    if(isWidthDown('xs', width)) {
        view.push((<CardView crystals={crystals} />));
    }
    view.push((<TableView crystals={crystals} />));

    return view;
}
           
export default withWidth()(DataView);
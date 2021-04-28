import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Container, CircularProgress } from '@material-ui/core';
import crystalData from '../../data/crystals.json';
import { useState, Suspense, lazy } from 'react';

const TableView = lazy(() => import('../TableView'));
const CardView = lazy(() => import('../CardView'));
const FilterPanel = lazy(() => import('../FilterPanel'));

function DataView({width}) {
    const view = [];
    const [crystals, setCrystals] = useState(crystalData);

    view.push((<FilterPanel crystals={crystalData} setCrystals={setCrystals} key="filterpanel" />))

    if(isWidthDown('xs', width)) {
        view.push((<CardView crystals={crystals} key="cardview" />));
    } else {
        view.push((<TableView crystals={crystals} key="tableview" />));
    }

    return (
        <Suspense fallback={
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress disableShrink size={40} />
            </Container>
          }>
            {view}
        </Suspense>
    );
}
           
export default withWidth()(DataView);
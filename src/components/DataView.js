import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import crystals from '../data/crystals.json';
import TableView from './TableView';
import CardView from './CardView';

function DataView({width}) {
    if(isWidthDown('xs', width)) {
        return <CardView crystals={crystals} />;
    }
    return <TableView crystals={crystals} />;
}
           
export default withWidth()(DataView);
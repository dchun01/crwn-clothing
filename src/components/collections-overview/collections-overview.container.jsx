import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// harder to read:
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

//easer to read:
//compose evaluates from right-to-left and curries
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
        WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;


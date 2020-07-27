import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

// import CollectionPage from '../collection/collection.component';
import CollectionPageContainer from '../collection/collection.container';


// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);


const ShopPage = ({fetchCollectionsStart, match}) => {

        useEffect(()=> { fetchCollectionsStart();}, [fetchCollectionsStart]);

        
        return(<div className='shop-page'>
                <Route exact path={`${match.path}`} component ={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component = {CollectionPageContainer} />
        </div>)
}



// class ShopPage extends React.Component {

//         componentDidMount() {
//                 const {fetchCollectionsStart} = this.props;
//                 fetchCollectionsStart();
//         }

//    render() {
//         const {match } = this.props;
//         return(<div className='shop-page'>
//                 <Route exact path={`${match.path}`} component ={CollectionsOverviewContainer} />
//                 <Route path={`${match.path}/:collectionId`} component = {CollectionPageContainer} />
//         </div>)
//         }

// }
  
// const mapStateToProps = createStructuredSelector({
//         isCollectionsLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
        fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage) ;





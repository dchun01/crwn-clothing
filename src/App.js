import React,{useEffect} from 'react';

import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selector'
import {checkUserSession} from './redux/user/user.actions';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { Route, Switch, Redirect } from 'react-router-dom';

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => { 
    checkUserSession();
  }, [checkUserSession])

      return (
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin' render={() => {
              return (currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />)}}/>
          </Switch>
        </div>
      );

}


// class App extends React.Component {

//   unsubscribeFromAuth = null;

//   componentDidMount() {

//     const {checkUserSession} = this.props;
    
//     checkUserSession();
//     // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//     //   if (userAuth) {

//     //     const userRef = await createUserProfileDocument(userAuth);

//     //     userRef.onSnapshot(snapshot => {

//     //       setCurrentUser({
//     //         id: snapshot.id,
//     //         ...snapshot.data()
//     //       })
        
//     //     })
//     //   }
//     //     setCurrentUser(userAuth);
//     // })
//   }

//   componentWillUnmount() {
//     // this.unsubscribeFromAuth();
//   }

//   render() {

//     console.log("this.props.currrentUser", this.props.currentUser);
//     return (
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path='/' component={HomePage} />
//           <Route path='/checkout' component={CheckoutPage} />
//           <Route path='/shop' component={ShopPage} />
//           <Route exact path='/signin' render={() => {
//             return (this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />)}}/>
//         </Switch>
//       </div>
//     );
//   }
// }


const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})




export default connect(mapStateToProps, mapDispatchToProps)(App);

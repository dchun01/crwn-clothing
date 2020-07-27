import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component'

// import {auth,  signInWithGoogle } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';


const SignIn = ({emailSignInStart, googleSignInStart}) => {
    
    const [credentials, setCredentials] = useState({email: '', password: ''});

   
    const {email, password} = credentials;
    
    const handleSubmit = async event => {
        event.preventDefault();


        emailSignInStart(email, password);

        // try {

        //     await auth.signInWithEmailAndPassword(email, password)
        //     this.state = {
        //         email: '',
        //         password: ''
        //     }

        // } catch(error) {
        //     console.error(error);
        // }
        }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...credentials, [name]: value});
    }
    
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
            
                <form onSubmit={handleSubmit}>
                    <FormInput 
                    name="email" 
                    type ="email" 
                    value={email} 
                    handleChange={handleChange}
                    label='email'
                    required />
                    <FormInput name="password" 
                    type="password" 
                    value={password}
                    handleChange={handleChange} 
                    label='password'
                    required 
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In with Google </CustomButton>
                    </div>
                  
                </form>

            </div>
            
        )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);
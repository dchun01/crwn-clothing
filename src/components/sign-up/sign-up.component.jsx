import React, {useState} from 'react';

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions';

import {connect} from 'react-redux';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

const SignUp = ({signUpStart}) => {

    const [signUpCredentials, setSignUpCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const {displayName, email, password, confirmPassword} = signUpCredentials

    const handleSubmit = async event => {
        event.preventDefault();

        // const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        signUpStart(displayName, email, password, confirmPassword);

    }

    const handleChange = event => {
        const {name, value} = event.target;

        setSignUpCredentials({...signUpCredentials, [name] : value})
    }



        return(
        <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>)

}


const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password, confirmPassword) => dispatch(signUpStart({displayName, email, password, confirmPassword}))
})

export default connect(null, mapDispatchToProps)(SignUp);
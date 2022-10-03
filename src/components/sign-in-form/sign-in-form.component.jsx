import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signInWithGoooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

const defaultformFields = {
    email: "",
    password: "",
}


const SignInForm = () => {
    const signInWithGoogle = async () => {
        const { user } = await signInWithGoooglePopup();
        await createUserDocumentFromAuth(user);     
    }

    const [signInFields, setSignInFields] = useState(defaultformFields);
    const {email, password} = signInFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSignInFields({
            ...signInFields,
            [name]: value,
        })
    }

    const resetFormFields = () => {
        setSignInFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();

        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user found associated with this email')
                    break
                default:
                    console.log(error)
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <p>Sign with email and password</p>
            <form onSubmit={handleSubmit}>  
                <FormInput label='Email' type='email' name='email' onChange={handleChange} value={email} required />

                <FormInput label='Password' type='password' name='password' onChange={handleChange} value={password} required/>
                <div className="buttons-container">
                    <Button type='submit' >Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle} >Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
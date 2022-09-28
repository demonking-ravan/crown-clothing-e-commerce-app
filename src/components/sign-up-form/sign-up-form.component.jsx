import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

const defaultformFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountred an error', error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields, 
            [name]: value,
        });
    };

    return (
        <div>
            <h1>Sign up with Email</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='text' name="displayName" onChange={handleChange} value={displayName} required/>

                <label>Email</label>
                <input type='email' name="email" onChange={handleChange} value={email} required/>

                <label>Password</label>
                <input type='password' name="password" onChange={handleChange} value={password} required/>

                <label>Confirm Password</label>
                <input type='password' name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>

                <button type='submit' >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;
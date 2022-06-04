import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'
const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,


}
const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);

    const { user, isLoading, showAlert, displayAlert, loginUser } = useAppContext()
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    //global state and useNavigate
    const handleChange = (e) => { setValues({ ...values, [e.target.name]: e.target.value }) }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }

        const currentUser = { name, email, password }
        loginUser(currentUser)

    }
    useEffect(() => {
        if (user) {
            setTimeout(() => { navigate('/') }, 1000)
        }
    }, [user, navigate])
    return (<Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo />
            <h3>Login</h3>
            {showAlert && <Alert />}
            <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
            <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
            <button type="submit" className='btn btn-block'>submit</button>
        </form>
    </Wrapper>);
}
export default Login;
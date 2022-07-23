import React from 'react';
import Togglable from './Togglable';
import PropTypes from 'prop-types';



// export default function LoginForm(handleLogin, ...props) {
// export default function LoginForm({handleLogin,userName, password, handleUserNameChange,handlePasswordChange}) {
export default function LoginForm(props) {



    // <form className="row text-center px-5 pt-2" onSubmit={handleLogin} >
    return (
        <Togglable buttonLabel='Show Login'>


            <form className="row text-center px-5 pt-2" onSubmit={props.handleLogin} >
                <input type="text" value={props.userName} name='Username' placeholder='Username' onChange={props.handleUserNameChange} />
                <input type="password" value={props.password} name='Pasword' placeholder='Password' onChange={props.handlePasswordChange} />
                <button type="submit" className="btn btn-primary d-block mt-2" > Login </button>

            </form>


        </Togglable >
    );
}

LoginForm.propTypes = {
    handleLogin: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    handleUserNameChange: PropTypes.func,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func

}
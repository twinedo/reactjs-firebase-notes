import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/atoms/Button';
import { actionUserName, loginUserAPI } from '../../../config/redux/action';

const Login = ({ isLoading, loginAPI }) => {
	const history = useHistory();
	const [state, setstate] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setstate({ ...state, [e.target.id]: e.target.value });
	};

	const handleLoginSubmit = async () => {
		console.log('state', state);

		const res = await loginAPI(state).catch((err) => err);

		if (res) {
			console.log('login success', res);
			setstate({ email: '', password: '' });
			localStorage.setItem('@user', JSON.stringify(res));

			history.replace('/');
		} else {
			console.log('login failed');
		}
	};

	return (
		<div>
			<p>Login Page</p>
			<input
				id='email'
				placeholder='Email'
				type='text'
				onChange={handleChange}
				value={state.email}
			/>
			<input
				id='password'
				placeholder='Password'
				type='password'
				onChange={handleChange}
				value={state.password}
			/>
			<Button onClick={handleLoginSubmit} title='Login' loading={isLoading} />
			<button>Go to Dashboard</button>
		</div>
	);
};

const reduxState = (state) => ({
	isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
	loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);

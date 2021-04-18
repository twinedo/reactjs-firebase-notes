import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import firebase from '../../../config/firebase';
import { registerUserAPI } from '../../../config/redux/action';

const Register = ({ registerAPI, isLoading }) => {
	const [state, setstate] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setstate({ ...state, [e.target.id]: e.target.value });
	};

	const handleRegisterSubmit = async () => {
		console.log('state', state);

		const res = await registerAPI(state).catch((err) => err);
		if (res) {
			setstate({ email: '', password: '' });
		} else {
			console.log('gagal');
		}
	};

	return (
		<div>
			<p>Register Page</p>
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
			<Button
				onClick={handleRegisterSubmit}
				title='Register'
				loading={isLoading}
			/>
			{/* <button onClick={handleRegisterSubmit}>Register</button> */}
			<button>Go to Dashboard</button>
		</div>
	);
};

const reduxState = (state) => ({
	isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
	registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);

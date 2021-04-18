import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	addDataToAPI,
	deleteDataAPI,
	getDataFromAPI,
	updateDataAPI,
} from '../../../config/redux/action';

const Dashboard = ({ addData, getData, notes, updateNotes, deleteNotes }) => {
	const [state, setState] = useState({
		title: '',
		content: '',
		date: new Date().getTime(),
		noteId: '',
	});

	const [txtButton, setTxtButton] = useState('SIMPAN');

	const onInputChange = (e) => {
		setState({ ...state, [e.target.id]: e.target.value });
	};

	const handleSaveNotes = () => {
		console.log('state', state);
		const user = JSON.parse(localStorage.getItem('@user'));
		const data = {
			...state,
			userId: user.uid,
			date: new Date().getTime(),
		};
		if (txtButton === 'SIMPAN') {
			addData(data);
		} else {
			data.noteId = state.noteId;
			updateNotes(data);
		}
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('@user'));
		getData(user.uid);

		return () => {};
	}, []);

	console.log('notes', notes);

	const updateNotesHandle = (note) => {
		console.log('note', note);
		setState({
			...state,
			title: note.data.title,
			content: note.data.content,
			noteId: note.id,
		});
		setTxtButton('UPDATE');
	};

	const handleCancelUpdate = () => {
		setState({ ...state, title: '', content: '' });
		setTxtButton('SIMPAN');
	};

	const deleteNoteHandler = (e, note) => {
		const user = JSON.parse(localStorage.getItem('@user'));
		e.stopPropagation();
		const data = {
			userId: user.uid,
			noteId: note.id,
		};
		deleteNotes(data);
		alert('test del');
	};

	return (
		<div>
			<p>Dashboard Page</p>
			<div>
				<input
					id='title'
					placeholder='Title'
					value={state.title}
					onChange={onInputChange}
				/>
				<textarea
					id='content'
					placeholder='Content'
					value={state.content}
					onChange={onInputChange}
				></textarea>
			</div>

			{txtButton === 'UPDATE' ? (
				<button onClick={handleCancelUpdate}>CANCEL</button>
			) : null}
			<button onClick={handleSaveNotes}>{txtButton}</button>
			{notes.length > 0 ? (
				<Fragment>
					{notes.map((val) => {
						return (
							<div
								key={val.id}
								style={{ border: '1px solid black', cursor: 'pointer' }}
								onClick={() => updateNotesHandle(val)}
							>
								<p>{val.data.title}</p>
								<p>{val.data.date}</p>
								<p>{val.data.content}</p>
								<button onClick={(e) => deleteNoteHandler(e, val)}>
									Delete
								</button>
							</div>
						);
					})}
				</Fragment>
			) : null}
		</div>
	);
};

const reduxState = (state) => ({
	userData: state.user,
	notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
	addData: (data) => dispatch(addDataToAPI(data)),
	getData: (data) => dispatch(getDataFromAPI(data)),
	updateNotes: (data) => dispatch(updateDataAPI(data)),
	deleteNotes: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);

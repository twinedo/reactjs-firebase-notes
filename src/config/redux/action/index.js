import firebase, { database } from '../../firebase';

export const actionUserName = () => {
	return { type: 'CHANGE_USER', value: 'Twin Edo' };
};

export const registerUserAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: 'CHANGE_ISLOADING', value: true });
		firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				console.log('res', user);
				dispatch({ type: 'CHANGE_ISLOADING', value: false });
				resolve(true);
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log('errorCode', errorCode);
				console.log('errorMessage', errorMessage);
				dispatch({ type: 'CHANGE_ISLOADING', value: false });
				reject(false);
				// ..
			});
	});
};

export const loginUserAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: 'CHANGE_ISLOADING', value: true });
		firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				var userData = {
					email: user.email,
					uid: user.uid,
					isVerified: user.emailVerified,
					refreshToken: user.refreshToken,
				};
				console.log('res', user);
				dispatch({ type: 'CHANGE_ISLOADING', value: false });
				dispatch({ type: 'CHANGE_ISLOGIN', value: true });
				dispatch({ type: 'CHANGE_USER', value: userData });
				resolve(userData);
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log('errorCode', errorCode);
				console.log('errorMessage', errorMessage);
				dispatch({ type: 'CHANGE_ISLOADING', value: false });
				dispatch({ type: 'CHANGE_ISLOGIN', value: false });
				reject(false);
				// ..
			});
	});
};

export const addDataToAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		database.ref('notes/' + data.userId).push({
			title: data.title,
			content: data.content,
			date: data.date,
		});
	});
};

export const getDataFromAPI = (userId) => (dispatch) => {
	const urlNotes = database.ref('notes/' + userId);
	return new Promise((resolve, reject) => {
		urlNotes.on('value', (snapshot) => {
			const data = snapshot.val();
			// updateStarCount(postElement, data);
			console.log('dataget', data);
			const newArr = [];
			Object.keys(data).map((key) => {
				newArr.push({
					id: key,
					data: snapshot.val()[key],
				});
			});

			dispatch({ type: 'SET_NOTES', value: newArr });
			resolve(newArr);
		});
	});
};

export const updateDataAPI = (data) => (dispatch) => {
	const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
	return new Promise((resolve, reject) => {
		urlNotes.set(
			{
				title: data.title,
				content: data.content,
				date: data.date,
			},
			(err) => {
				if (err) {
					reject(false);
				} else {
					resolve(true);
				}
			}
		);
	});
};

export const deleteDataAPI = (data) => (dispatch) => {
	const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
	return new Promise((resolve, reject) => {
		urlNotes.remove();
	});
};

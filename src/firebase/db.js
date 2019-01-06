import { db } from './firebase';

export const doCreateUser = (token, displayName, email, emailReff, photoURL, name, phoneNumber, pic1, pic2, pic3, beverages1, beverages2, beverages3, duration1, duration2, duration3, myLat, myLng) =>
	db.ref(`users/${emailReff}`).set({
		token,
		displayName,
		email,
		emailReff,
		photoURL,
		name,
		phoneNumber,
		pic1,
		pic2,
		pic3,
		beverages1,
		beverages2,
		beverages3,
		duration1,
		duration2,
		duration3,
		myLat,
		myLng,
	});

export const doUpdateUser = (displayName, email, emailReff, photoURL, name, phoneNumber, pic1, pic2, pic3, beverages1, beverages2, beverages3, duration1, duration2, duration3, myLat, myLng) =>
	db.ref(`users/${emailReff}`).update({

		displayName,
		email,
		emailReff,
		photoURL,
		name,
		phoneNumber,
		pic1,
		pic2,
		pic3,
		beverages1,
		beverages2,
		beverages3,
		duration1,
		duration2,
		duration3,
		myLat,
		myLng,
	});

export const ifUserLogin = (emailReff) =>
	db.ref(`users/${emailReff}`).once('value');

export const onceGetUsers = () =>
	db.ref('users').once('value');

export const meetingDataSave = (emailReff, pickTimeDate, placeLat, placeLng, placeName, meetUserName, meetUserEmail) =>
	db.ref(`users/${emailReff}/meetingObj/${meetUserEmail}`).set({
		emailReff,
		pickTimeDate,
		placeLat,
		placeLng,
		placeName,
		meetUserName,
		meetUserEmail,
		statuses: 'PENDING',
	});

export const meetingInviteDataSave = (emailReff, pickTimeDate, placeLat, placeLng, placeName, meetUserName, meetUserEmail, displayName, meetingDuration) =>
	db.ref(`users/${meetUserEmail}/meetingInvitationObj/${emailReff}`).set({
		emailReff,
		pickTimeDate,
		placeLat,
		placeLng,
		placeName,
		meetUserName,
		meetUserEmail,
		statuses: 'PENDING',
		displayName,
		meetingDuration,
	});

export const meetingUsersData = (emailReff) =>
	db.ref(`users/${emailReff}/meetingObj`).once('value');

export const meetingUsersPic = (meetUserEmail) =>
	db.ref(`users/${meetUserEmail}/pic1`).once('value');

export const meetingInvitationData = (emailReff) =>
	db.ref(`users/${emailReff}/meetingInvitationObj`).once('value');

export const meetingInviteObjStatusChange = (emailReff, meetUserEmail, status) =>
	db.ref(`users/${emailReff}/meetingInvitationObj/${meetUserEmail}`).update({
		statuses: status,
	});

export const meetingObjStatusChange = (emailReff, meetUserEmail, status) =>
	db.ref(`users/${meetUserEmail}/meetingObj/${emailReff}`).update({
		statuses: status,
	});






export const createMeetingRef = (key, value, emailRef) =>
	db.ref(`users/${emailRef}/meetUsers/${key}`).set({
		value,
	});



export const getUsers = (source) =>
	db.ref(`users/${source}`).once('value');

export const meetUsersData = (emailRef) =>
	db.ref(`users/${emailRef}/meetUsers`).once('value');

export const messagePopup = (recieverEmail, recieverName, emailSender) =>
	db.ref(`users/${recieverEmail}/message/${emailSender}`).set({
		emailSender,
		recieverName,
	});










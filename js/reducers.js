import { SET_DATE, CONFIGURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOAD_ENTRIES_FAILURE, LOAD_ENTRIES_SUCCESS } from './redux_actions'

const DEFAULT_SETTINGS = {
	hoursPerWeek: 40,

	// not changeable at the moment
	workingDays: [ 1, 2, 3, 4, 5 ],
	locale: 'de',
	holidayQualifier: '',
};

const DEFAULT_CREDENTIALS = {
	account: '',
	apiKey: '',
	valid: false
};

function settings( state = DEFAULT_SETTINGS, action ) {
	switch ( action.type ) {
		case CONFIGURE:
			// TODO: Filter allowed fields from payload
			return Object.assign( {}, state, action.payload );
		default:
			return state;
	}
}

function credentials( state = DEFAULT_CREDENTIALS, action ) {
	switch ( action.type ) {
		case LOGIN_SUCCESS:
			console.log("login succeeded in store", action.payload);
			return Object.assign({}, state, action.payload, { valid: true } );
		case LOGIN_FAILURE:
			console.log("login failed in store", action.payload);
			return Object.assign({}, state, action.payload, { valid: false } );
		case LOGOUT:
			return Object.assign({}, state, { valid: false } );
		default:
			return state;
	}
}

function currentDate( state = null, action ) {
	switch ( action.type ) {
		case SET_DATE:
			const newDate = new Date(action.payload);
			const now = new Date();
			if ( newDate.getFullYear() > now.getFullYear() ||
				( newDate.getFullYear() == now.getFullYear() && newDate.getMonth() > now.getMonth() ) ) {
				return state;
			}
			return action.payload;
		default:
			return state;
	}
}

function entries( state = [], action ) {
	switch ( action.type ) {
		case LOAD_ENTRIES_FAILURE:
			return [];
		case LOAD_ENTRIES_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}

function loadError( state = '', action ) {
	switch ( action.type ) {
		case LOAD_ENTRIES_FAILURE:
			return action.payload;
		case LOAD_ENTRIES_SUCCESS:
			return '';
		default:
			return state;
	}
}

const miteOvertimeApp = {
	credentials,
	entries,
	settings,
	currentDate,
	loadError
} ;

export default miteOvertimeApp
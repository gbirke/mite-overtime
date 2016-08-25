import { SET_DATE, CONFIGURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOAD_ENTRIES_FAILURE, LOAD_ENTRIES_SUCCESS } from './redux_actions'

const DEFAULT_STATE = {
	hoursPerWeek: 40,
	apiUrl: '',

	// not changeable at the moment
	workingDays: [ 1, 2, 3, 4, 5 ],
	locale: 'de',
	holidayFunction: null
};

const DEFAULT_CREDENTIALS = {
	account: '',
	apiKey: '',
	valid: false
};

function settings( state = DEFAULT_STATE, action ) {
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
			return Object.assign({}, state, { valid: true }, action.payload);
		case LOGIN_FAILURE:
			return Object.assign({}, state, { valid: false }, action.payload);
		default:
			return state;
	}
}

function currentDate( state = null, action ) {
	switch ( action.type ) {
		case SET_DATE:
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
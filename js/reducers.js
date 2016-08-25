import { SET_DATE, CONFIGURE, CHANGE_CREDENTIALS, LOAD_ENTRIES_FAILURE, LOAD_ENTRIES_SUCCESS } from './redux_actions'

const DEFAULT_STATE = {
	hoursPerWeek: 40,
	credentials: {
		account: '',
		apiKey: ''
	},
	apiUrl: '',

	// not changeable at the moment
	workingDays: [ 1, 2, 3, 4, 5 ],
	locale: 'de',
	holidayFunction: null
};

function settings( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case CONFIGURE:
			// TODO: Filter allowed fields from payload, don't allow credentials
			return Object.assign( {}, state, action.payload );
		case CHANGE_CREDENTIALS:
			return Object.assign( {}, state, { credentials: action.payload } );
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
	entries,
	settings,
	currentDate,
	loadError
} ;

export default miteOvertimeApp
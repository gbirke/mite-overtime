import { CONFIGURE } from './redux_actions'

export function getSettingsFromLocalStorage( window ) {
	let settings = {};
	if ( window.localStorage.getItem( 'hoursPerWeek' ) ) {
		settings.hoursPerWeek = window.localStorage.getItem( 'hoursPerWeek' );
	}
	return settings;
}

export function saveSettingsMiddleware() {
	return next => action => {
		let result = next( action );
		if ( action.type === CONFIGURE && ( 'hoursPerWeek' in action.payload ) ) {
			window.localStorage.setItem( 'hoursPerWeek', action.payload.hoursPerWeek );
		}
		return result;
	}
}
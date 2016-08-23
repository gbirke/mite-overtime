export function stateHasChanged( props, state ) {
	for ( let k of Object.keys( props ) ) {
		if ( !( k in state ) || state[ k ] !== props[ k ] ) {
			return true;
		}
	}
	return false;
}

export function	updateProperties( props, state ) {
	for ( let k of Object.keys( props ) ) {
		props[ k ] = state[ k ];
	}
	return props;
}

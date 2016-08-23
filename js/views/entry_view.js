import { stateHasChanged, updateProperties } from './util/property_watcher'

export default class EntriesView {
	constructor( renderer, store, entryConverter ) {
		this.store = store;
		this.renderer = renderer;
		this.entryConverter = entryConverter;
		this.props = {
			entries: [],
			currentDate: null
		};
		store.subscribe( this.update.bind( this ) );
	}

	update () {
		const state = this.store.getState();
		if ( !stateHasChanged( this.props, state ) ) {
			return;
		}
		this.props = updateProperties( this.props, state );
		this.renderer.render.apply(
			this.renderer,
			this.entryConverter.getDataForRenderer(
				state.entries,
				this.props.currentDate,
				state.settings.workingDays,
				state.settings.hoursPerWeek,
				state.settings.holidayFunction,
				state.settings.locale
			)
		);
	}

}

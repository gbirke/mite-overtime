module.exports = {
	create: function ( renderer, entriesStore ) {
		return Object.create( {
			init: function() {
				entriesStore.listen( this.update );
			},
			update: function( data ) {
				renderer.render( data.calendarData, data.overtimeData );
			}
		} );
	},
	createAndInit: function( renderer, entriesStore ) {
		var view = this.create( renderer, entriesStore );
		view.init();
		return view;
	}
};

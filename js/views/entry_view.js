var HtmlRenderer = require( '../html_renderer' );

module.exports = {
	create: function ( entriesStore ) {
		return Object.create( {
			init: function() {
				entriesStore.listen( this.update.bind(this) );
				this.renderer = new HtmlRenderer();
			},
			update: function( data ) {
				this.renderer.render( data.calendarData, data.overtimeData );
			}
		} );
	},
	createAndInit: function( entriesStore ) {
		var view = this.create( entriesStore );
		view.init();
		return view;
	}
}

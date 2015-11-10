var HtmlRenderer = require( '../html_renderer' ),
	entriesStore = require( '../stores/entries' )
	;

module.exports = {
	init: function() {
		entriesStore.listen( this.update.bind(this) );
		this.renderer = new HtmlRenderer();
	},
	update: function( data ) {
		console.log("update");
		console.log(this);
		this.renderer.render( data.calendarData, data.overtimeData );
	}
}

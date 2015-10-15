var d3 = require( 'd3' ),
	moment = require( 'moment' );

function HtmlRenderer( overtimeData ) {
	this.overtimeData = overtimeData;
}

HtmlRenderer.prototype.render = function () {
	var data = [ 25 ],
		displayContainer, total;
	displayContainer = d3.select( '#displayContainer' );
	displayContainer.selectAll( 'div' ).remove();
	total = displayContainer.append( 'div' );
	total.attr( { id: 'totalOvertime' } )
		.text( this.overtimeData.total );
};

module.exports = HtmlRenderer;

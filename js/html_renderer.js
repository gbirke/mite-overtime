var d3 = require( 'd3' ),
	moment = require( 'moment' ),
	WeeklyDateRangeFormatter = require( './formatters/date_range_formatter' ).default,
	longFormatter, shortFormatter;

require( 'moment-duration-format' );

// jscs:disable disallowDanglingUnderscores

function DurationFormatter( positiveFormat, negativeFormat, absoluteValue ) {
	this.positiveFormat = positiveFormat;
	this.negativeFormat = negativeFormat;
	this.absoluteValue = absoluteValue;
}

DurationFormatter.prototype.format = function ( duration ) {
	var fmt = duration > 0 ? this.positiveFormat : this.negativeFormat;
	if ( this.absoluteValue ) {
		duration = Math.abs( duration );
	}
	return moment.duration( duration, 'minutes' )
		.format( fmt, { trim: false } );
};

longFormatter = new DurationFormatter( 'h:mm [overtime]', 'h:mm [missing]', true );
shortFormatter = new DurationFormatter( 'h:mm', 'h:mm', false );

/**
 * Create a weekly date range formatter that shows only weekdays of current month
 *
 * @return {Function}
 */
function createMonthlyWeekRangesFormatter( currentMonth ) {
	const formatter = new WeeklyDateRangeFormatter( currentMonth );
	return formatter.formatWeek.bind( formatter );
}

function HtmlRenderer( elementName ) {
	this.elementName = elementName;
}

HtmlRenderer.prototype.render = function ( overtimeData ) {
	var	displayContainer;

	displayContainer = d3.select( this.elementName ).data( [ overtimeData ] );
	displayContainer.selectAll( 'div, h1' )
		.remove();

	this._renderTotal( displayContainer );
	this._renderWeeks( displayContainer );
};

HtmlRenderer.prototype._renderTotal = function ( displayContainer ) {
	var self = this,
		totalElement;

	displayContainer.append( 'h1' ).text( function ( d ) {
		var headingTime;
		headingTime = moment( [ d.year, d.monthNumber ] ).locale( 'en' ); // use english locale to display english month names

		return 'Total for ' + headingTime.format( 'MMMM YYYY' );
	} );
	totalElement = displayContainer.append( 'div' )
		.attr( { id: 'totalOvertime' } )
		.text( function ( d ) {
			if ( d.timeDelta ) {
				return longFormatter.format( d.timeDelta );
			}
		} );
	return totalElement;
};

HtmlRenderer.prototype._renderWeeks = function ( displayContainer ) {
	var weekContainer = displayContainer.append( 'div' ).classed( 'weeks', true ),
		self = this,
		weekDateFormatter = null,
		weeks = weekContainer.selectAll( '.week' )
			.data( function ( overtimeData ) {
				weekDateFormatter = createMonthlyWeekRangesFormatter( overtimeData.monthNumber );
				// TODO instead of using d3.values, write filter function that does:
				// - get ordered weeks for weeks spanning > 1 year (so week 53 from previous year is not at the end)
				// - filter weeks consisting of 1 day that was not worked and is a holiday (see May 1st 2016)
				return d3.values( overtimeData.weeks );
			} )
			.enter()
			.append( 'div' )
			.classed( 'week', true );

	weeks.append( 'h2' )
		.text( function ( week ) {
			return 'Week ' + week.weekNumber;
		} )
		.classed( 'weekNumber', true );

	weeks.append( 'h3' )
			.text( weekDateFormatter )
			.classed( 'weekDates', true );

	weeks.append( 'div' )
		.classed( 'total', true )
		.text( function ( week ) {
			return longFormatter.format( week.timeDelta )
		} );
	return weeks;
};

module.exports = HtmlRenderer;

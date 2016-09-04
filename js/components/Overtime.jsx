import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactFauxDOM from 'react-faux-dom'
import EntryConverter from '../views/util/entry_converter'
import { withRouter } from 'react-router'

const OvertimeFactory = require( '../overtime_factory' ),
	HtmlRenderer = require( '../html_renderer' ),
	moment = require('moment');

class OvertimeDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { entries, currentDate, workingDays, hoursPerWeek, holidayFunction, locale, router } = this.props;
		const converter = new EntryConverter( this.props.overtimeFactory );

		function createPaginationHandler( monthDifference ) {
			return function ( evt ) {
				evt.preventDefault();
				const d = moment( currentDate ).add( monthDifference, 'month' );
				router.push( [ '/overtime', d.year(), d.month() ].join( '/' ) );
			}
		}

		function renderEntries(entries) {
			let el = ReactFauxDOM.createElement( 'div' );
			const renderer = new HtmlRenderer(el);
			renderer.render.apply(
				renderer,
				converter.getDataForRenderer( entries, currentDate, workingDays, hoursPerWeek, holidayFunction, locale )
			);
			return el.toReact();
		}

		return (
			<Row>
				<Col md={1}>
					<a href="#" onClick={createPaginationHandler( -1 )} className="pagination-nav">◀</a>
				</Col>
				<Col md={10}>
					<div>{renderEntries(entries)}</div>
				</Col>
				<Col md={1}>
					<a href="#" onClick={createPaginationHandler( 1 )} className="pagination-nav">▶</a>
				</Col>
			</Row>
		);
	}
}

OvertimeDisplay.propTypes = {
	entries: React.PropTypes.array,
	currentDate: React.PropTypes.string,
	workingDays: React.PropTypes.array,
	hoursPerWeek: React.PropTypes.number,
	holidayFunction: React.PropTypes.func,
	locale: React.PropTypes.string,
	overtimeFactory: React.PropTypes.func,
	htmlRenderer: React.PropTypes.object
};

OvertimeDisplay.defaultProps = {
	entries: [],
	workingDays: [1,2,3,4,5],
	hoursPerWeek: 40,
	holidayFunction: null,
	locale: 'de_DE',
	overtimeFactory: OvertimeFactory.createOvertimeFactory
};

const mapStateToProps = (state) => {
	return {
		entries: state.entries,
		currentDate: state.currentDate,
		workingDays: state.settings.workingDays,
		hoursPerWeek: state.settings.hoursPerWeek,
		locale: state.settings.locale
	};
};

const VisibleOvertimeDisplay = withRouter( connect( mapStateToProps )( OvertimeDisplay ) );

export default VisibleOvertimeDisplay;
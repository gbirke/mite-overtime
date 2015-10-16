var HtmlRenderer = require( './html_renderer' ),
	testData = [ {
		total: 80,
		weeks: [
			{ total: 100, number: 42 },
			{ total: -20, number: 43 }
		]
	} ],
	renderer = new HtmlRenderer( testData );

renderer.render();


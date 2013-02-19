def.view('StreamTileView', function() {

def.m.StreamTile = Backbone.Model.extend({

	defaults: {
		width: 4,
		height: 2,
		title: '',
		description: '',
		tools: []
	}

});

def.resolveModel('StreamTile');

});
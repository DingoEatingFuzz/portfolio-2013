def.model('StreamTile', function() {

def.c.TileCollection = Backbone.Collection.extend({
	
	model: def.m.StreamTile,

	matches: function( text ) {
		return this.filter(function(tile) {
			return tile.get('title').toLowerCase().indexOf(text.toLowerCase()) !== -1;
		});
	},
	comparator: function( tile ) {
		return +(tile.get('date'));
	}
});

def.resolveCollection('TileCollection');

});
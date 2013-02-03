def.templates([ 'tile' ], function() {

def.v.StreamTileView = Backbone.View.extend({
    width:    4,
    height:   2,
    tagName:  'li',
    template: _.template(def.t.tile),

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ));
      return this;
    }
});

def.resolveView('StreamTileView');

});
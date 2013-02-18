def.templates([ 'tile' ], function() {

def.v.StreamTileView = Backbone.View.extend({
    width:    4,
    height:   2,
    tagName:  'li',
    template: _.template(def.t.tile),

    initialize: function() {
      this.model.on('change', this.render, this);
      this.listenTo(this.model, 'show', this.show);
      this.listenTo(this.model, 'hide', this.hide);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() )).addClass('w' + this.width + 'h' + this.height);
      return this;
    },

    hide: function() {
      this.$el.css({ height:0, opacity:0, display:'none' });
    },

    show:function() {
      this.$el.show().css({ height:'', opacity:1, display:'block' });
    }
});

def.resolveView('StreamTileView');

});
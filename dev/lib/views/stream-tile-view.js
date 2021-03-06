def.template('tile', function() {

def.v.StreamTileView = Backbone.View.extend({
    width:    4,
    height:   2,
    tagName:  'li',
    template: _.template(def.t.tile),

    events: {
        'click': 'open',
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.listenTo(this.model, 'show', this.show);
      this.listenTo(this.model, 'hide', this.hide);
      this.listenTo(this.model, 'fadeOut', this.fadeOut);
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
    },

    fadeOut:function() {
      this.$el.css('opacity', 0.2);
    },

    open:function() {
      // all other views in collection fade out
      def.router.navigate('work/' + this.model.get('slug'));
      this.$el.css('opacity', 1);
      var thisModel = this.model;
      this.collection
        .filter(function(model) { return model !== thisModel })
        .forEach(function(model) { model.trigger('fadeOut'); });
      // content loads in the article panel
      // article panel show ups
      // route to article
    },

    close:function() {
      // route to projects
    }
});

def.resolveView('StreamTileView');

});
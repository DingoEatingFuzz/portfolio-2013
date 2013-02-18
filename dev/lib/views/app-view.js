def.collection('TileCollection', function() {
def.template('siteFrame', function() {
$.getJSON('content/projects.json', function(appData) {

def.v.AppView = Backbone.View.extend({
    el: '#container',
    template: _.template(def.t.siteFrame),

    events: {
        'click #resume-link': 'gotoResume',
        'click #contact-link': 'gotoContact',
        'keyup #search-field': 'filterStream'
    },

    initialize: function() {
        this.$el.html(this.template());

        this.adjustSize();
        $(window).resize(this.adjustSize);

        window.tc = this.stream = new def.c.TileCollection();
        this.stream.on('add', this.addTile, this);
        this.stream.add(appData.projects);
    },

    gotoResume: function(e) {
        console.log('resume event');
    },
    gotoContact: function(e) {
        console.log('contact event');
    },
    filterStream: function(e) {
        var pattern = $(e.target).val().toLowerCase();
        this.stream.forEach(function(model) {
            if(model.get('title').toLowerCase().indexOf(pattern) !== -1 || model.get('description').toLowerCase().indexOf(pattern) !== -1) {
                model.trigger('show');
            } else {
                model.trigger('hide');
            }
        });
    },
    adjustSize: function(e) {
        if ($(window).height() >= $(document).height()) {
            $('.navigation.bottom').addClass('hide');
        } else {
            $('.navigation.bottom').removeClass('hide');
        }
    },

    addTile: function(tile) {
        // construct view for tile
        var view = new def.v.StreamTileView({ model: tile });
        $('#tile-list').append( view.render().el );
    }
});

def.resolveView('AppView');

});
});
});
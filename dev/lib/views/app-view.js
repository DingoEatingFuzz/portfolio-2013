def.collection('TileCollection', function() {
def.model('Article', function() {
def.template('siteFrame', function() {
$.getJSON('/content/projects.json', function(appData) {

def.v.AppView = Backbone.View.extend({
    el: '#container',
    template: _.template(def.t.siteFrame),

    events: {
        'click #resume-link':  'gotoResume',
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
        e.preventDefault();
        def.router.navigate('resume', { trigger: true });
    },
    gotoContact: function(e) {
        e.preventDefault();
        def.router.navigate('contact');
    },
    filterStream: function(e) {
        // close open article
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
        var view = new def.v.StreamTileView({ model: tile, collection:this.stream });
        $('#tile-list').append( view.render().el );
    }
});

def.resolveView('AppView');

});
});
});
});
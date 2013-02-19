def.Routes = Backbone.Router.extend({

    routes: {
        '':                     'index',
        'resume':               'resume',
        'contact':              'contact',
        'work':                 'workList',
        'work/:entry':          'work',
    },

    initialize: function() {
        // Build index template
        // I should watch some videos on backbone or something
        // I think I need to instantiate the AppView, which will construct the left controls
        // Then leave the work stream to the index function
        var self = this;
        console.log('init router');
        def.view('AppView', function() {
            console.log('loading up app')
            this.app = new def.v.AppView();
        });

    },

    index: function() {
        console.log('index loaded');
    },

    resume: function() {
        console.log('resume loaded');
    },

    contact: function() {
        console.log('contact loaded');
    },

    workList: function() {

    },

    work: function(entry) {

    }

});
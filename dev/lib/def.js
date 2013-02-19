(function($) {
'use strict';

var defUtils = {
    hyphenize: function(str) {
        return str.replace(/[A-Z]/g, function(term, index) {
            return index ? '-' + term.toLowerCase() : term.toLowerCase();
        });
    }
};

window.def = {
	options: {
        homePageTemplate: 'standard'
	},
    jsRoot:          '/lib/',
    modelsRoot:      '/lib/models/',
    viewsRoot:       '/lib/views/',
    collectionsRoot: '/lib/collections/',
    templatesRoot:   '/templates/',
    utils: defUtils,

    template: function(templateName, callback) {
        return this.templates([ templateName ], callback);
    },

    templates: function(templateNames, callback) {
        var templateName, deferring = 0;
        for (var i = 0, len = templateNames.length; i < len; ++i) {
            templateName = templateNames[i];
            if (def.t[templateName] === undefined) {
                var templateURL = def.templatesRoot + def.utils.hyphenize(templateName) + '.template';
                deferring++;
                $.get(templateURL, {cb: (+ new Date())}, (function(name) {
                    return function(data) {
                        def.t[name] = data;
                        deferring--;
                        if (!deferring) {
                            callback(data);
                        }
                    }
                })(templateName));
            }
            if (deferring === 0) {
                callback();
            }
        }
    },

    collections: function(collectionNames, callback) {
        this._loadFiles(collectionNames, def.collectionsRoot, def.c, def.deferring.c, callback);
    },

    collection: function(collectionName, callback) {
        return this.collections([collectionName], callback);
    },

    views: function(viewNames, callback) {
        this._loadFiles(viewNames, def.viewsRoot, def.v, def.deferring.v, callback);
    },

    view: function(view, callback) {
        return this.views([view], callback);
    },

    models: function(modelNames, callback) {
        this._loadFiles(modelNames, def.modelsRoot, def.m, def.deferring.m, callback);
    },

    model: function(modelName, callback) {
        return this.models([modelName], callback);
    },

    _loadFiles: function(files, prefix, loadList, deferList, callback) {
        var unloadedObjects = [],
            unloadedFiles  = []
        ;
        for (var i = 0, len = files.length; i < len; ++i) {
            var type = files[i];
            if (!loadList[type]) {
                unloadedFiles.push(prefix + def.utils.hyphenize(type) + '.js' + '?cb=' + (+ new Date()));
                unloadedObjects.push(type);
            }
        }
        // Load the files necesary, and keep track of them with deferred
        // objects that are talked to in the models
        if (unloadedObjects) {
            var deferrables = $.map(unloadedObjects, function(val) {
                    deferList[val] = new $.Deferred();
                    return deferList[val];
                }),
                defer = $.when.apply(null, deferrables)
            ;
            defer.done(callback);
            console.log(unloadedFiles);
            head.js.apply(null, unloadedFiles);
            return defer;
        } else {
            // everything required is already loaded, so do stuff now
            callback();
        }
    },

    resolveModel: function(modelName) {
        return this._resolveDeferred(modelName, this.deferring.m);
    },

    resolveCollection: function(collectionName) {
        return this._resolveDeferred(collectionName, this.deferring.c);
    },

    resolveView: function(viewName) {
        return this._resolveDeferred(viewName, this.deferring.v);
    },

    _resolveDeferred: function(deferredName, dictionary) {
        console.log('resolving ' + deferredName);
        var deferred = dictionary[deferredName];
        if (deferred) {
            deferred.resolve();
        }
    },

    error: function(message) {
        throw message;
    },

    deferring: {
        m: [],
        c: [],
        v: []
    },

    m: {},
    c: {},
    v: {},
    t: {}
};

})(jQuery);
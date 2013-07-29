/*global Ember, DS */

var Fitagift = window.Fitagift = Ember.Application.create({

	//@member {string} constant holds the dom element which the application be injected to
    rootElement: '#wrap'
    
});

//application files
require('scripts/views/nerdeez-view');
require('scripts/views/application-view');

//routes
require('scripts/routes/nerdeez-routes');

//store
require('scripts/nerdeez-ember/tastypie_serializer');
require('scripts/nerdeez-ember/tastypie_adapter');
require('scripts/nerdeez-ember/porthole.min');
require('scripts/nerdeez-ember/wormhole');
require('scripts/store/fitagift-store');


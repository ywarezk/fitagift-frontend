/*global Ember, DS */

var Fitagift = window.Fitagift = Ember.Application.create({

    /**
     * constant holds the dom element which the application be injected to
     * @property
     * @type {string}
     * @private
     */
    rootElement: '#wrap',
    
    /**
     * holds the array of answers the user chose
     * @property
     * @type {Array}
     * @public
     */
    answers: [],
    
    /**
     * holds the next 10 questions
     * @property
     * @type {DS.RecordArray}
     * @public
     */
    questions: null,
    
    /**
     * the current question we are at
     * @property
     * @type {DS.Model}
     */
    currentQuestion: null,
    
    /**
     * will put a global loading screen
     * @property
     * @type {boolean}
     * @public
     */
     isLoading: true
    
});

/**
* application init function will get the first questions
*/
var readyFunction = function(){
    questions = Fitagift.Question.find({order_by: '-grade'});
    questions.one('didLoad', function(){
        Fitagift.set('isLoading', false); 
        Fitagift.set('questions', questions);
    });
}
Fitagift.set('ready', readyFunction);

//application files
require('scripts/views/nerdeez-view');
require('scripts/views/flatpage-view');
require('scripts/views/questions-id-view');
require('scripts/models/flatpage-model');
require('scripts/models/question-model');
require('scripts/models/answer-model');
require('scripts/controllers/contact-controller');
require('scripts/controllers/question-controller');
require('scripts/views/contact-view');

//routes
require('scripts/routes/fitagift-routes');

//store
require('scripts/nerdeez-ember/tastypie_serializer');
require('scripts/nerdeez-ember/handlebars_helpers');
require('scripts/nerdeez-ember/tastypie_adapter');
require('scripts/nerdeez-ember/porthole.min');
require('scripts/nerdeez-ember/wormhole');
require('scripts/store/fitagift-store');


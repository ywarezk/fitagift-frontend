(function() {

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


})();

(function() {

/**
* all views in the application will extend this master view
*
* @copyright: nerdeez.com Ltd.
* @author: Yariv Katz
* @version: 1.0
*/

/**
 * change the view to hold common elements in all my applications
 */
Ember.View.reopen({
    
    /**
     * holds the static url
     * @type {{string}}
     * @public
     */
    staticUrl: STATIC_URL,
    
    /**
     * will init the validation in all the forms containing validation class
     */
    didInsertElement: function(){
        $('form.nerdeez-validation').validationEngine('attach');
        
        //$('.absolute-center').flexVerticalCenter();
    },
    
});




})();

(function() {

/**
 * views for the flat pages will be here
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 * @author: Yariv Katz
 * 
 */
 
Fitagift.NerdeezFlatpage = Ember.View.extend({
    templateName: 'flatpage'
});

Fitagift.AboutView = Fitagift.NerdeezFlatpage.extend({
});

Fitagift.PrivacyView = Fitagift.NerdeezFlatpage.extend({
});

Fitagift.TermsView = Fitagift.NerdeezFlatpage.extend({
});

})();

(function() {

/**
 * creates the model for the flat pages
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 * 
 */
 
/**
* the flatpage model
*/
Fitagift.Flatpage = DS.Model.extend({
    title:DS.attr('string'),
    html: DS.attr('string')
})

})();

(function() {

/**
 * the model for a single question
 * 
 * Created August 4th, 2013
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 */
 
var Fitagift = window.Fitagift;
var DS = window.DS;
Fitagift.Question = DS.Model.extend({
    title: DS.attr('string'),
    text: DS.attr('string'),
    grade: DS.attr('number'),
    answers: DS.hasMany('Fitagift.Answer'),
    question_type: DS.attr('number'),
    
    /**
     * return true if the type of question is a buttons type of question
     * @returns {Boolean}
     */
    isButtons: function(){
        return this.get('question_type') == 1;
    }.property('question_type'),
    
    /**
     * return true if the type of question is a combobox question
     * @returns {Boolean}
     */
    isCombobox: function(){
        return this.get('question_type') == 2;
    }.property('question_type'),
    
    /**
     * return true if the type of question is a combobox question
     * @returns {Boolean}
     */
    isOpenQuestion: function(){
        return this.get('question_type') == 3;
    }.property('question_type'),
    
    /**
     * return true if i need to display the next button when the question is displayed
     * @returns {Boolean}
     */
    isNextButton: function(){
        return this.get('question_type') == 2;
    }.property('question_type'),
    
    isShowOther: function(){
        return this.get('answers.length') > 6 && this.get('isButtons');
    }.property()
});

})();

(function() {

/**
 * the model for  a single answer for a question
 * 
 * Created August 4th, 2013
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 */
 
var Fitagift = window.Fitagift;
var DS = window.DS;
Fitagift.Answer = DS.Model.extend({
    title: DS.attr('string'),
    words: DS.attr('string'),
    query_relevent_question: DS.attr('string'),
    goto_question: DS.attr('number'),
    icon_class: DS.attr('string'),
    is_other: DS.attr('boolean'),
    placeholder: DS.attr('string')
});

})();

(function() {

/**
 * controller for the contact us page
 * 
 * Created August 2nd, 2013
 * @version: 1.0
 * @copyright: Nerdeez Ltd.
 * @author: Yariv Katz
 */
 
Fitagift.ContactController = Ember.Controller.extend({
    
    /**
     * binded to the message of the contact form
     * @property
     * @type string
     */
    message: null,
    
    /**
     * binded to the email of the contact form
     * @property
     * @type string
     */
    email: null,
    
    /**
     * used to pass message from server transaction
     * @property
     * @private
     * @type {string}
     */
    statusMessage: 'test',
    
    /**
     * used to inform on success transaction
     * @property
     * @private
     * @type {boolean}
     */
    isSuccess: true,
    
    /**
     * should i show the transaction status
     * @property
     * @private
     * @type {boolean}
     */
    isShowStatus: false,
    
    /**
     * set to true if we are moving to the loading state
     * @property
     * @private
     * @type {boolean}
     */
    isLoading: false,
    
    /**
     * when the user clicks the send message
     */
    sendMessage: function(){
        this.set('isLoading', true);
        adapter = Fitagift.get('store.adapter');  
        xthis = this;
        var success = function(json){
            xthis.set('isSuccess', json['success']);
            xthis.set('isShowStatus', true);
            xthis.set('isLoading', false);
            xthis.set('statusMessage', json['message']);
        }
        var error = function(json){
            if (json.hasOwnProperty('message')){
                xthis.set('statusMessage', json['message']);
            }
            else{
                xthis.set('statusMessage', 'Server communication error');
            }
            xthis.set('isSuccess', false);
            xthis.set('isShowStatus', true);
            xthis.set('isLoading', false);
        }
        adapter.ajax(SERVER_URL + '/api/v1/utilities/contact/', 'POST', {data: {mail: this.get('email'), message: this.get('message')}, success: success, error: error});
    }
    
});

})();

(function() {

/**
 * controller for a question page
 * 
 * Created August 4th, 2013
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 */

var Fitagift = window.Fitagift;
var Ember = window.Ember;
Fitagift.QuestionController = Ember.ObjectController.extend({
    currentAnswer: null,
    otherText: null,
    isShowOtherText: false,
    placeholder: null,
    openAnswer: null,
    pickAnswer: function(answer){
        if(answer == null){
            answer = this.get('currentAnswer');
        }
        
        if(answer && answer.get('is_other')){
            answer.set('words', this.get('otherText'));
        }
        
        //push the current answer to the answers bank
        var answers = Fitagift.get('answers');
        answers.push(answer);
        Fitagift.set('answers', answers);
        
        if(!answer){
            this.transitionToRoute('questions');
            return;
        }
        
        this.set('isShowOtherText', false);
        
        //if the answer has a redirection then redirect
        var gotoQuestion = answer.get('goto_question');
        if(gotoQuestion !== null){
            questions = Fitagift.get('questions');
            for(var i=0; i<questions.get('length'); i++){
                if(questions.objectAt(i).get('id') == gotoQuestion){
                    this.transitionToRoute('question', questions.objectAt(i));
                    return;
                }
            }
        }
        else{
            this.transitionToRoute('questions');
        }
    },
    
    selectAnswer: function(){
        this.set('isShowOtherText', this.get('currentAnswer.is_other'));
        this.set('placeholder', this.get('currentAnswer.placeholder'));
    }.observes('currentAnswer'),
    
    toggleOtherText: function(){
        isShow = this.get('isShowOtherText');
        this.set('isShowOtherText', !isShow);
    }
    
});

})();

(function() {

/**
 * the view for the contact page
 * 
 * Created August 3rd, 2013
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 * @author: Yariv Katz
 */
 
Fitagift.ContactView = Ember.View.extend({
    sendMessage: function(){
        if($('#' + this.elementId + ' form.nerdeez-validation').validationEngine('validate')){
            controller = this.get('controller');
            controller.sendMessage();
        }
    }
});

})();

(function() {

//routes


})();

(function() {

/**
* this file will hold fit a gift application routes
*
* @copyright: nerdeez.com Ltd.
* @version: 1.0
* @author: Yariv Katz
*/

/**
 * define the routes urls here
 */
var Fitagift = window.Fitagift;
var Ember = window.Ember;
Fitagift.Router.map(function () {
    this.route('about');
    this.route('contact');
    this.route('terms');
    this.route('privacy');
    this.route('question', {path: '/question/:question_id'});
    this.route('questions');
});


/**
* route to about page
*/
Fitagift.AboutRoute = Ember.Route.extend({
    model: function(param){
        return Fitagift.Flatpage.find({'title' : 'about'});
    }
});

/**
* route to privacy page
*/
Fitagift.PrivacyRoute = Ember.Route.extend({
    model: function(param){
        return Fitagift.Flatpage.find({'title' : 'privacy'});
    }
});

/**
* route to terms page
*/
Fitagift.TermsRoute = Ember.Route.extend({
    model: function(param){
        return Fitagift.Flatpage.find({'title': 'terms'});
    }
});

/**
 * route to a question page
 */
Fitagift.QuestionRoute = Ember.Route.extend({
    model: function(param){
        var question = Fitagift.Question.find(param.question_id);
        Fitagift.set('currentQuestion', question);
        return question;
    }
});

/**
 * this will redirect to the correct question based on the current question and the previous questions
 */
Fitagift.QuestionsRoute = Ember.Route.extend({
    redirect: function(){
        var questions = Fitagift.get('questions');
        var currentQuestion = Fitagift.get('currentQuestion');
        var nextQuestion = null;
        if(currentQuestion == null){
            nextQuestion = questions.objectAt(0);
        }
        else{
            for(var i=0; i< questions.get('length') - 1; i++){
                var question = questions.objectAt(i);
                if(question.get('id') == currentQuestion.get('id')){
                    nextQuestion = questions.objectAt(i+1);
                }
            }
        }
        Fitagift.set('currentQuestion', nextQuestion);
        this.transitionTo('question', nextQuestion);
    }
});



})();

(function() {

//store


})();

(function() {

/**
 * django-tastypie serializer - used to communicate with a rest server implemented in tastypie
 * usually works with tastypie adapter
 * 
 * Example
 * 
 * ```javascript
 * app.store = DS.Store.create(
 *     {
 * 	       adapter: DS.DjangoTastypieAdapter.extend({
 *              serializer: DS.DjangoTastypieSerializer.extend({
 * 	                . . .
 *              }) 	  	
 *         })
 *     } 	
 * );
 * ```
 * 
 * @requires ember.js
 * @requires ember-data.js
 * @version 1.0
 * @copyright nerdeez.com
 * @author Yariv Katz
 * 
 */

var get = Ember.get, set = Ember.set;

//create the namespace if the namespace doesnt exist
if (typeof window.Nerdeez === "undefined"){
	var Nerdeez = window.Nerdeez = Ember.Namespace.create();
}
else{
	var Nerdeez = window.Nerdeez;
}

/**
 * this class knows how to handle with the json response of a django-tastypie server
 * @class DjangoTastypieSerializer
 * @namespace Nerdeez
 * @extends DS.JSONSerializer
 * @requires ember.js
 * @requires ember-data.js 
 */
Nerdeez.DjangoTastypieSerializer = DS.JSONSerializer.extend({

	type: null,

	/**
	 * @private
	 * from the meta return a url
	 * @param {Object} meta the meta recieved from the server response
	 * @param {number} id
	 * @return {string}
	 */
	getItemUrl: function(meta, id){
	    var url;
	
	    url = get(this, 'adapter').rootForType(meta.type);
	    return ["", get(this, 'namespace'), url, id, ""].join('/');
	},

	/**
	 * @see {DS.Serializer}
	 */
	keyForBelongsTo: function(type, name) {
	    //return this.keyForAttributeName(type, name) + "_id";
	    return this.keyForAttributeName(type, name);
	},

	/**
	 * @see {DS.Serializer}
	 */
	addBelongsTo: function(hash, record, key, relationship) {
	    var id,
	        related = get(record, relationship.key);
	    if(related != null)
	        id = get(related, this.primaryKey(related));
	
	    if (!Ember.isNone(id)) { hash[key] = this.getItemUrl(relationship, id); }
	},

	/**
	 * @see {DS.Serializer}
	 */
	addHasMany: function(hash, record, key, relationship) {
	    var self = this,
	        serializedValues = [],
	        id = null;
	
	    key = this.keyForHasMany(relationship.type, key);
	
	    value = record.get(key) || [];
	
	    value.forEach(function(item) {
	      id = get(item, self.primaryKey(item));
	      serializedValues.push(self.getItemUrl(relationship, id));
	    });
	
	    hash[key] = serializedValues;
	},

	/**
	 * @see {DS.Serializer}
	 */
	extract: function(loader, json, type, record) {
	    this.extractMeta(loader, type, json);
	    this.sideload(loader, type, json);
	
	    if (json) {
	      if (record) { loader.updateId(record, json); }
	      this.extractRecordRepresentation(loader, type, json);
	    }
	},

	/**
	 * @see {DS.Serializer}
	 */
	extractMany: function(loader, json, type, records) {
	    this.sideload(loader, type, json);
	    //this.extractMeta(loader, type, json);
	
	    if (json.objects) {
	      var objects = json.objects, references = [];
	      if (records) { records = records.toArray(); }
	
	      for (var i = 0; i < objects.length; i++) {
	        if (records) { loader.updateId(records[i], objects[i]); }
	        var reference = this.extractRecordRepresentation(loader, type, objects[i]);
	        references.push(reference);
	      }
	      references.set('totalCount', json.meta.total_count);
	      loader.populateArray(references);
	    }
	},

	/**
	 * @see {DS.Serializer}
	 */
	extractMeta: function(loader, type, json) {
	    var meta = json.meta,
	      since = this.extractSince(meta);
	
	    // this registers the id with the store, so it will be passed
	    // into the next call to `findAll`
	    if (since) { loader.sinceForType(type, since); }
	},

	/**
	 * @see {DS.Serializer}
	 */
	extractSince: function(meta) {
	    if (meta) {
	      return meta.next;
	    }
	},
  
	/**
     * Tastypie default does not support sideloading
     */
	sideload: function(loader, type, json, root) {

	},

	/**
     * ASSOCIATIONS: DESERIALIZATION
     * Transforms the association fields from Resource URI django-tastypie format
     */
	_deurlify: function(value) {
	    if (typeof value === "string") {
	      return value.split('/').reverse()[1];
	    } else {
	      return value;
	    }
	},

	/**
	 * @see {DS.Serializer}
	 */
	extractHasMany: function(type, hash, key) {
	    var value,
	      self = this;
	
	    value = hash[key];
	    //var xtype = type;
	    self.typeFromAlias();
	    this.set('type', self.aliases.get(key));
	    if (!!value) {
	      value.forEach(function(item, i, collection) {
	        collection[i] = self._deurlify(item);
	        collection[i].type = self.get('type');
	      });
	    }
	
	    return value;
	},

	/**
	 * @see {DS.Serializer}
	 */
	extractBelongsTo: function(type, hash, key) {
	    var value = hash[key];
	
	    if (!!value) {
	      value = this._deurlify(value);
	    }
	    return value;
	}

});



})();

(function() {

var Ember = window.Ember;

/**
 * put this in each handlebar block to see if this is not the first item of the array
 * 
 * usage
 * 
 * ```handlebar
 * {{#each controller}}
 *    {{notFirst this controller.content html="<div>Not the fist item in array</div>"}}
 * {{/each}}
 * ```
 * 
 * @param {DS.Model} item teh object to check in the each
 * @param {DS.RecordArray} array - the arrays of objects to check from
 * @param {Object} options {html: "the html if this is true"}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('notFirst', function(item, array, options) {
  var firstObject = array.objectAt(0);
  if(item != firstObject){
          return new Ember.Handlebars.SafeString(options.hash.html);
  }
  return '';
});

/**
 * put this in each handlebar block to check every time you reached the nth item 
 * 
 * usage
 * 
 * ```handlebar
 * {{#each controller}}
 *    {{modZero this controller.content mod="4" html='<div class="row-fluid">'}}
 * {{/each}}
 * ```
 * 
 * @param {DS.Model} item teh object to check in the each
 * @param {DS.RecordArray} array - the arrays of objects to check from
 * @param {Object} options {html: "the html if this is true", mod: "4"}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('modZero', function(item, array, options) {
	var whichItem = 0;
	var mod = options.hash.mod;
	for(var i=0; i<array.get('length'); i++){
		var currentObject = array.objectAt(i);
		if(item == currentObject){
			whichItem = i;
		}
	}
	if(whichItem%mod == 0){
		return new Ember.Handlebars.SafeString(options.hash.html);
	}
	return '';
});

/**
 * put this in each handlebar block to check every time you reached the nth item but if zero then ignore
 * 
 * usage
 * 
 * ```handlebar
 * {{#each controller}}
 *    {{modZero this controller.content mod="4" html='<div class="row-fluid">'}}
 * {{/each}}
 * ```
 * 
 * @param {DS.Model} item teh object to check in the each
 * @param {DS.RecordArray} array - the arrays of objects to check from
 * @param {Object} options {html: "the html if this is true", mod: "4"}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('modZeroExcludeFirst', function(item, array, options) {
	var whichItem = 0;
	var mod = options.hash.mod;
	for(var i=0; i<array.get('length'); i++){
		var currentObject = array.objectAt(i);
		if(item == currentObject){
			whichItem = i;
		}
	}
	if(whichItem%mod == 0 && whichItem != 0){
		//console.log('modZeroExcludeFirst');
		return new Ember.Handlebars.SafeString(options.hash.html);
	}
	return '';
});

/**
 * put this in each handlebar block to check every time you reached the last item 
 * 
 * usage
 * 
 * ```handlebar
 * {{#each controller}}
 *    {{isLast this controller.content html="</div>"}}
 * {{/each}}
 * ```
 * 
 * @param {DS.Model} item teh object to check in the each
 * @param {DS.RecordArray} array - the arrays of objects to check from
 * @param {Object} options {html: "the html if this is true"}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('isLast', function(item, array, options) {
	if(item == array.objectAt(array.get('length') - 1) && array.get('isUpdating') == false){
		return new Ember.Handlebars.SafeString(options.hash.html);
	}
	return '';	
});

/**
 * put this in each handlebar block to check every time you're in the first item 
 * 
 * usage
 * 
 * ```handlebar
 * {{#each controller}}
 *    {{isFirst this controller.content html="<div>The first item of an array</div>"}}
 * {{/each}}
 * ```
 * 
 * @param {DS.Model} item teh object to check in the each
 * @param {DS.RecordArray} array - the arrays of objects to check from
 * @param {Object} options {html: "the html if this is true"}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('isFirst', function(item, array, options) {
	var firstObject = array.objectAt(0);
	if(item == firstObject){
		//console.log('isFirst');
		return new Ember.Handlebars.SafeString(options.hash.html);
	}
	return '';
});

/**
 * put this in each handlebar block usually before the end of the form element
 * to return the status from the form submition
 * 
 * usage
 * 
 * ```handlebar
 * {{status controller messageBinding="message" isSuccessBinding="isSuccess" isShowBinding="isShowStatus"}}
 * ```
 * 
 * the above will create a status info bind it to the controller and in the controller bind the properties: message, isSuccess, isShowStatus
 * 
 * @param {Ember.Object} the item which is bounded to the status paramaters
 * @param {Object} options inside the hash we have {isShow: "true if need to show the status", isSuccess: "true if its a success status", message: 'the message to display'}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('status', function(item, options) {
    var isShow = options.hash.isShow;
    var isSuccess = options.hash.isSuccess;
    var message = options.hash.message;
    var html = '';
    if(isShow){
        html = '<div class="info">';
        if(isSuccess){
            html+='<div class="alert alert-success"><i class="icon-ok"></i>' + message + '<a class="close" data-dismiss="alert">x</a></div>';
        }
        else{
            html+='<div class="alert alert-danger"><i class="icon-remove"></i>' + message + '<a class="close" data-dismiss="alert">x</a></div>';
        }
        html+='</div>';
    }
    return new Handlebars.SafeString(html);
});

/**
 * 
 * will put a loading roller and bind it to what is sent to the handlebar
 * 
 * usage
 * 
 * ```handlebar
 * {{loading controller isLoadingBinding="isLoading"}}
 * ```
 * 
 * the above will bind the loading screen to the controller isLoading property
 * 
 * @param {Ember.Object} the item which is bounded to the status paramaters
 * @param {Object} options inside the hash we have {isLoading: "true if need to show the loading"}
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerBoundHelper('loading', function(item, options) {
    var isLoading = options.hash.isLoading;
    var html = '';
    if(isLoading){
        html = '<div class="loading"><i class="icon-spin icon-spinner"></i></div>';
    }
    return new Handlebars.SafeString(html);
});

/**
 * 
 * will check if 2 vars are equal
 * 
 * usage
 * 
 * ```handlebar
 * {{#ifCond v1 v2}}
 * {{/ifCond}}
 * ```
 * 
 * 
 * @param {number|string} v1 the first variable
 * @param {number|string} v2 the second variable
 * @return {Handlebars.SafeString}
 */
Ember.Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if (Ember.typeOf(v2) === "string"){    
        if(this.get(v1) == v2 || this.get(v1) == this.get(v2)) {
            return options.fn(this);
        }
    }
    else{
        if(this.get(v1) == v2) {
            return options.fn(this);
        }
    }
    return options.inverse(this);
});


})();

(function() {

/**
 * ember store adapter for server that returns a django - tastypie response
 * 
 * Example
 * 
 * ```javascript
 * 
 * app.store = DS.Store.create(
 *     {
 * 	       adapter: DS.DjangoTastypieAdapter.extend({
 *              . . .  	
 *         })
 *     } 	
 * );
 * 
 * ``` 
 * 
 * @requires ember.js
 * @requires ember-data.js
 * @requires tastypie_serializer.js
 * @version 1.0
 * @copyright nerdeez.com
 * @author Yariv Katz
 */

var get = Ember.get, set = Ember.set;

//create the namespace if the namespace doesnt exist
if (typeof window.Nerdeez === "undefined"){
	var Nerdeez = Ember.Namespace.create();
}
else{
	var Nerdeez = window.Nerdeez;
}

/**
 * extending the rest adapter - this will create an adapter for django - tastypie
 * @class DjangoTastypieAdapter
 * @extends DS.RESTAdapter
 * @requires ember.js
 * @requires ember-data.js
 * @requires tastypie_serializer.js
 */
Nerdeez.DjangoTastypieAdapter = DS.RESTAdapter.extend({
	
	/**
	 * Set this parameter if you are planning to do cross-site
	 * requests to the destination domain. Remember trailing slash 
	 * @property serverDomain
	 * @public
	 * @type string
	 */
	serverDomain: null,

	/**
	 * This is the default Tastypie namespace found in the documentation.
	 * You may change it if necessary when creating the adapter
	 * @property namespace
	 * @public
	 * @type string 
	 */ 
	namespace: "api/v1",

	/**
	 * Bulk commits are not supported at this time by the adapter.
	 * Changing this setting will not work
	 * @property bulkCommit
	 * @type Boolean
	 * @private 
	 */
	bulkCommit: false,

	/**
	 * Tastypie returns the next URL when all the elements of a type
	 * cannot be fetched inside a single request. Unless you override this
	 * feature in Tastypie, you don't need to change this value. Pagination
	 * will work out of the box for findAll requests
	 * @property since
	 * @type string
	 * @public   
	 */
	since: 'next',

	/**
	 * Serializer object to manage JSON transformations
	 * @property serializer
	 * @type DS.JSONSerializer
	 * @public
	 */
	serializer: Nerdeez.DjangoTastypieSerializer,
	
	/**
	 * will append this to the url for tastypie api key authentication
	 * @property api_key
	 * @type string
	 * @public
	 */
	api_key: null,
	
	/**
	 * will append this to the url for tastypie authentication
	 * @property username
	 * @type string
	 * @public
	 */
	username: null,
	
	/**
	 * hook for crossDomain communication.
	 * for example you can use Nerdeez.Wormhole (wormhole.js)
	 * if not set the default ajax will be set
	 */
	wormhole: null,
	
	/**
	 * hook to set the loading function to call when ajax starts
	 * @type {Function}
	 * @property
	 * @public 
	 */
	loadingFunction: null,
	
	/**
	 * hook to set the stop loading function to call when ajax finishes
	 * @type {Function}
	 * @property
	 * @public 
	 */
	stopLoadingFunction: null,

	/**
	 * @private
	 * @return void
	 */
	init: function() {
	    var serializer,
	        namespace;
	
	    this._super();
	
	    namespace = get(this, 'namespace');
	    Em.assert("tastypie namespace parameter is mandatory.", !!namespace);
	
	    // Make the adapter available for the serializer
	    serializer = get(this, 'serializer');
	    set(serializer, 'adapter', this);
	    set(serializer, 'namespace', namespace);
	    
	    //create wormhole instance
	    wormhole = this.get('wormhole');
	    if(wormhole != null)
		    this.set('wormhole', wormhole.create({serverUrl: this.get('serverDomain')}));
	},
	
	/**
     * override the ajax for cross domain communications
     * @private
     * @param {string} url ajax url
     * @param {string} type 'POST', 'PUT', 'DELETE'
     * @param {Object} hash {data: {holds the dicionary to post}, success: {holds success function}, error: {holds the error function}}
     * @return void
     */
    ajax: function (url, type, hash) {
    	
		// if the api key and username are set then append them to url	    	
        if(this.get('api_key') != null && this.get('username') != null){
            api_key = this.get('api_key');
            username = this.get('username');
            url = url + '?username=' + username + '&api_key=' + api_key;
        }
        
        //if its post put request then prepare the data
        pass_data = hash.data;
        if (type.toLowerCase() == "post" || type.toLowerCase() == "put"){
            pass_data = JSON.stringify(hash.data);
        }
        
        //call wormhole ajax or super ajax if wormhole not set
        if(this.get('wormhole') == null){
	        	this._super(url, type, hash);
        }
        else{
	        	if(this.get('loadingFunction') != null && this.get('stopLoadingFunction') != null)
		        	this.get('loadingFunction')();
	        this.get('wormhole').ajax(
		        	{
		        		url: url, 
		        		type: type, 
		        		data: pass_data, 
		        		dataType: 'json', 
		        		contentType: 'application/json', 
		        		successFunction: hash.success, 
		        		failFunction: hash.error, 
		        		alwaysFunction: this.get('stopLoadingFunction')
		        	});	
        }
    },

	/**
	 * create a record in the server - sends a post request
	 * @param {DS.Store} store our store instance
	 * @param {subclass of DS.Model} type
	 * @param {subclass of DS.Model} record the record that called this function
	 * @return void 
	 */
	createRecord: function(store, type, record) {
	    var data,
	        root = this.rootForType(type);
	
	    data = record.serialize();
	    xthis = this;
	    this.ajax(this.buildURL(root), "POST", {
		      data: data,
		      success: function(json) {
		        xthis.didCreateRecord(store, type, record, json);
		      },
		      error: function(xhr){
		      	xthis.didError(store, type, record, xhr);
		      }
	    });
	},

	/**
	 * sends a put update request to the server
	 * @param {DS.Store} store our store instance
	 * @param {subclass of DS.Model} type
	 * @param {subclass of DS.Model} record the record that invoke this function
	 * @return void
	 */  
	updateRecord: function(store, type, record) {
	    var id,
	        data;
	
	    id = Em.get(record, 'id');
	    root = this.rootForType(type);
	
	    data = record.serialize();
	    xthis = this;
	    this.ajax(this.buildURL(root, id), "PUT", {
		    data: data,
		    success: function(json) {
		        xthis.didSaveRecord(store, type, record, json);
		    },
		    error: function(xhr){
			    xthis.didError(store, type, record, xhr);
		    }
	    });
	},

	/**
	 * sends a delete request to the server
	 * @param {DS.Store} store our store instance
	 * @param {subclass of DS.Model} type
	 * @param {subclass of DS.Model} record the record that invoke this function
	 * @return void
	 */
	deleteRecord: function(store, type, record) {
	    var id,
	        root;

	    id = get(record, 'id');
	    root = this.rootForType(type);
	    xthis = this;
	    this.ajax(this.buildURL(root, id), "DELETE", {
		    success: function(json) {
		        xthis.didDeleteRecord(store, type, record, json);
		    },
		    error: function(xhr){
			    xthis.didError(store, type, record, xhr);
		    }
	    });
	},
	
	/**
	 * if we have a has many relationship this will help find
	 * the data from the server based on the ids on the objects
	 * @param {DS.Store} store our store instance
	 * @param {subclass of DS.Model} type
	 * @param {string|Array} ids the id to return
	 * @return void
	 */
	findMany: function(store, type, ids) {
	    var url,
	        root = this.rootForType(type);
	
	    ids = this.serializeIds(ids);
	
	    // FindMany array through subset of resources
	    if (ids instanceof Array) {
	      ids = "set/" + ids.join(";") + '/';
	    }
	
	    url = this.buildURL(root);
	    url += ids;
	    xthis = this;
	    this.ajax(url, "GET", {
	      success: function(json) {
	        xthis.didFindMany(store, type, json);
	      }
	    });
	},

	/**
	 * will return the server api url
	 * @param {subclass of DS.Model} record the url for this record
	 * @param {string} suffix used to append a string to the url
	 * @return {string} the url
	 */
	buildURL: function(record, suffix) {
	    var url = this._super(record, suffix);

	    // Add the trailing slash to avoid setting requirement in Django.settings
	    if (url.charAt(url.length -1) !== '/') {
	      url += '/';
	    }
	
	    // Add the server domain if any
	    if (!!this.serverDomain) {
	      url = this.removeTrailingSlash(this.serverDomain) + url;
	    }
	
	    return url;
	},

	/**
	 * The actual nextUrl is being stored. The offset must be extracted from
	 * the string to do a new call.
	 * When there are remaining objects to be returned, Tastypie returns a
	 * `next` URL that in the meta header. Whenever there are no
	 * more objects to be returned, the `next` paramater value will be null.
	 * Instead of calculating the next `offset` each time, we store the nextUrl
	 * from which the offset will be extrated for the next request 
	 */
	sinceQuery: function(since) {
	    var offsetParam,
	        query;
	
	    query = {};
	
	    if (!!since) {
	      offsetParam = since.match(/offset=(\d+)/);
	      offsetParam = (!!offsetParam && !!offsetParam[1]) ? offsetParam[1] : null;
	      query.offset = offsetParam;
	    }
	
	    return offsetParam ? query : null;
	},

	/**
	 * if there is a slash at the end of the url then remove it
	 * @private
	 * @param {string} url 
	 * @return {string} the new url
	 */
	removeTrailingSlash: function(url) {
	    if (url.charAt(url.length -1) === '/') {
	      return url.slice(0, -1);
	    }
	    return url;
	},

	/**
	 * django-tastypie does not pluralize names for lists 
	 * @param {string} name
	 */
	pluralize: function(name) {
	    return name;
	},
  
	/**
	 * find all records
	 * @param {DS.Store} store
	 * @param {subclass of DS.Model} type
	 * @param {DS.Model} record
	 * @return void
	 */
	findAll: function(store, type, record){
	    var json = {}
	    , root = this.rootForType(type)
	    , plural = this.pluralize(root);
	    xthis = this;
	    this.ajax(this.buildURL(root), "GET", {
	        data: null,
	        success: function(json) {
	                xthis.didFindAll(store, type, json);
	                
	        }
	    });
	},

	/**
	 * pass a query to the server
	 * @param {DS.Store} store
	 * @param {subclass of DS.Model} type
	 * @param {Object} query dictionary to send to the server
	 * @param {Object} recordArray
	 */
    findQuery: function(store, type, query, recordArray) {
        var json = {}
        , root = this.rootForType(type)
        , plural = this.pluralize(root);
        xthis = this;
        data = query;
        this.ajax(this.buildURL(root), "GET", {
            data: data,
            success: function(json) {
                    xthis.didFindQuery(store, type, json, recordArray);
            }
        });
    },
    
    /**
     * 
	 * @param {DS.Store} store
	 * @param {subclass of DS.Model} type
	 * @param {string} id the id of the user we want to return
	 * @return void
     */
    find: function(store, type, id) {
        var json = {}
        , root = this.rootForType(type);
        xthis = this;
        this.ajax(this.buildURL(root, id), "GET", {
            success: function(json) {
                    xthis.didFindRecord(store, type, json, id);
            }
        });
    },
    
    /**
     * will handle the error
     * 
	 * @param {DS.Store} application store
	 * @param {submodule of DS.Model} type the class we are performing the action on
	 * @param {Object} record the problematic record
	 * @param {Object} xhr json response from the server
     */
    didError: function(store, type, record, xhr){
	    	//var json = JSON.parse(xhr.responseText),
	    	//var json = xhr;
		//var serializer = this.get('serializer');
		//errors = serializer.extractValidationErrors(type, json);
		//errors = {error: json.responseText}
		record.set('errors', xhr.responseText);
		store.recordWasError(record);
		//this._super(store, type, record, xhr);
    },
});


})();

(function() {

(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&this.init){this.init.apply(this,arguments)}}c.prototype=e;c.prototype.constructor=c;c.extend=arguments.callee;return c}})();(function(c){var b={trace:function(d){if(c.console!==undefined){c.console.log("Porthole: "+d)}},error:function(d){if(c.console!==undefined){c.console.error("Porthole: "+d)}}};b.WindowProxy=function(){};b.WindowProxy.prototype={post:function(e,d){},addEventListener:function(d){},removeEventListener:function(d){}};b.WindowProxyBase=Class.extend({init:function(d){if(d===undefined){d=""}this.targetWindowName=d;this.origin=c.location.protocol+"//"+c.location.host;this.eventListeners=[]},getTargetWindowName:function(){return this.targetWindowName},getOrigin:function(){return this.origin},getTargetWindow:function(){return b.WindowProxy.getTargetWindow(this.targetWindowName)},post:function(e,d){if(d===undefined){d="*"}this.dispatchMessage({data:e,sourceOrigin:this.getOrigin(),targetOrigin:d,sourceWindowName:c.name,targetWindowName:this.getTargetWindowName()})},addEventListener:function(d){this.eventListeners.push(d);return d},removeEventListener:function(g){var d;try{d=this.eventListeners.indexOf(g);this.eventListeners.splice(d,1)}catch(h){this.eventListeners=[]}},dispatchEvent:function(f){var d;for(d=0;d<this.eventListeners.length;d++){try{this.eventListeners[d](f)}catch(g){}}}});b.WindowProxyLegacy=b.WindowProxyBase.extend({init:function(d,e){this._super(e);if(d!==null){this.proxyIFrameName=this.targetWindowName+"ProxyIFrame";this.proxyIFrameLocation=d;this.proxyIFrameElement=this.createIFrameProxy()}else{this.proxyIFrameElement=null;throw new Error("proxyIFrameUrl can't be null")}},createIFrameProxy:function(){var d=document.createElement("iframe");d.setAttribute("id",this.proxyIFrameName);d.setAttribute("name",this.proxyIFrameName);d.setAttribute("src",this.proxyIFrameLocation);d.setAttribute("frameBorder","1");d.setAttribute("scrolling","auto");d.setAttribute("width",30);d.setAttribute("height",30);d.setAttribute("style","position: absolute; left: -100px; top:0px;");if(d.style.setAttribute){d.style.setAttribute("cssText","position: absolute; left: -100px; top:0px;")}document.body.appendChild(d);return d},dispatchMessage:function(e){var d=c.encodeURIComponent;if(this.proxyIFrameElement){var f=this.proxyIFrameLocation+"#"+d(b.WindowProxy.serialize(e));this.proxyIFrameElement.setAttribute("src",f);this.proxyIFrameElement.height=this.proxyIFrameElement.height>50?50:100}}});b.WindowProxyHTML5=b.WindowProxyBase.extend({init:function(d,e){this._super(e);this.eventListenerCallback=null},dispatchMessage:function(d){this.getTargetWindow().postMessage(b.WindowProxy.serialize(d),d.targetOrigin)},addEventListener:function(e){if(this.eventListeners.length===0){var d=this;this.eventListenerCallback=function(f){d.eventListener(d,f)};c.addEventListener("message",this.eventListenerCallback,false)}return this._super(e)},removeEventListener:function(d){this._super(d);if(this.eventListeners.length===0){c.removeEventListener("message",this.eventListenerCallback);this.eventListenerCallback=null}},eventListener:function(e,d){var f=b.WindowProxy.unserialize(d.data);if(f&&(e.targetWindowName==""||f.sourceWindowName==e.targetWindowName)){e.dispatchEvent(new b.MessageEvent(f.data,d.origin,e))}}});if(typeof c.postMessage!=="function"){b.trace("Using legacy browser support");b.WindowProxy=b.WindowProxyLegacy.extend({})}else{b.trace("Using built-in browser support");b.WindowProxy=b.WindowProxyHTML5.extend({})}b.WindowProxy.serialize=function(d){if(typeof JSON==="undefined"){throw new Error("Porthole serialization depends on JSON!")}return JSON.stringify(d)};b.WindowProxy.unserialize=function(g){if(typeof JSON==="undefined"){throw new Error("Porthole unserialization dependens on JSON!")}try{var d=JSON.parse(g)}catch(f){return false}return d};b.WindowProxy.getTargetWindow=function(d){if(d===""){return top}else{if(d==="top"||d==="parent"){return c[d]}}return parent.frames[d]};b.MessageEvent=function a(f,d,e){this.data=f;this.origin=d;this.source=e};b.WindowProxyDispatcher={forwardMessageEvent:function(i){var g,h=c.decodeURIComponent,f,d;if(document.location.hash.length>0){g=b.WindowProxy.unserialize(h(document.location.hash.substr(1)));f=b.WindowProxy.getTargetWindow(g.targetWindowName);d=b.WindowProxyDispatcher.findWindowProxyObjectInWindow(f,g.sourceWindowName);if(d){if(d.origin===g.targetOrigin||g.targetOrigin==="*"){d.dispatchEvent(new b.MessageEvent(g.data,g.sourceOrigin,d))}else{b.error("Target origin "+d.origin+" does not match desired target of "+g.targetOrigin)}}else{b.error("Could not find window proxy object on the target window")}}},findWindowProxyObjectInWindow:function(d,g){var f;if(d.RuntimeObject){d=d.RuntimeObject()}if(d){for(f in d){if(d.hasOwnProperty(f)){try{if(d[f]!==null&&typeof d[f]==="object"&&d[f] instanceof d.Porthole.WindowProxy&&d[f].getTargetWindowName()===g){return d[f]}}catch(h){}}}}return null},start:function(){if(c.addEventListener){c.addEventListener("resize",b.WindowProxyDispatcher.forwardMessageEvent,false)}else{if(document.body.attachEvent){c.attachEvent("onresize",b.WindowProxyDispatcher.forwardMessageEvent)}else{b.error("Cannot attach resize event")}}}};if(typeof c.exports!=="undefined"){c.exports.Porthole=b}else{c.Porthole=b}})(this);

})();

(function() {

/**
 * creates an ember object for cross domain communication
 * 
 * Example:
 * 
 * ```javascript
 * 
 * wormhole = Nerdeez.Wormhole.create({serverUrl: 'http://foo.com'});
 * wormhole.ajax({url: url, type: type, data: pass_data, dataType: 'json', contentType: 'application/json', successFunction: successFunction, failFunction: failFunction});
 * ```
 * @requires porthole.js
 * @version 1.0
 * @copyright nerdeez.com
 * @author Yariv Katz
 */

//create the namespace if the namespace doesnt exist
if (typeof window.Nerdeez === "undefined"){
	var Nerdeez = window.Nerdeez = Ember.Namespace.create();
}
else{
	var Nerdeez = window.Nerdeez;
}

/**
 * using porthole.js this will be used to create crossdomain ajax communications using iframes
 * 
 * @class Wormhole
 * @namespace Nerdeez
 * @requires porthole.js
 * @extends Ember.Object
 */
Nerdeez.Wormhole = Ember.Object.extend({
	
	/**
	 * did i finish to create the porthole communication
	 * 
	 * @property linked
	 * @type Boolean
	 * @default false
	 * @private
	 */
	linked: false,
	
	/**
	 * if didn't finish iframe communication setup then 
	 * pend the request to use after communication is ready
	 * 
	 * @property pending
	 * @type Array
	 * @private
	 */
    pending: [],
    
    /**
     * pointing head to the current request
     * 
     * @property nextRequest
     * @type Number
     * @private
     */
    nextRequest: 1,
    
    /**
     * hold jquery defered objects
     * @property
     * @private
     * @type Object
     */
    deferreds: {},
    
    /**
     * holds the success functions for an ajax requests
     * @property
     * @private
     * @type Object
     */
    successFunction: {},
    
    /**
     * holds the fail functions for an ajax requests
     * @property
     * @private
     * @type Object
     */
    failFunction: {},
    
    /**
     * holds the ajax always function
     * @property
     * @private
     * @type Object
     */
    alwaysFunction: {},
    
    /**
     * holds the server url
     * set this property to change the default connection url
     * @property
     * @public
     * @type strng
     */
    serverUrl: 'http://localhost:8000/',
    
	/**
	 * @private
	 * 
	 * - creates an iframe
	 * - init porthole to communicate with this iframe
	 * - capture response events
	 * important: set the serverUrl property to change the default server
	 *  
	 * @method init
	 */
    init: function() {
	    	this._super();
    	
        // create the iframe
        var target = "wormhole_iframe";
        this.iframe = $('<iframe id="' + target +
            '" name="' + target +
            '" src="' + this.get('serverUrl') +
            '" style="width: 0; height: 0; border: none; display: none;"></iframe>');
            $('body').append(this.iframe);
            
        // create a porthole.js proxy window to send and receive message from the vault iframe
        this.windowProxy = new Porthole.WindowProxy(this.get('serverUrl'), target);
 
        // handle messages based on their type
        var self = this;
        this.windowProxy.addEventListener(function(message) {
            var data = $.parseJSON(message.data);
            switch (data.type) {
                case "ready": return self.onReady(data);
                case "response":
	                console.log('test response'); 
	                return self.onResponse(data);
                default: throw Error("unknown message type: " + data.type);
            }
        });
        
    },

	/**
	 * creates an ajax request through the porthole to the server
	 * @param {Object} params
	 * @return {Object} the promise for the ajax request
	 */    
    ajax: function(params) {
        var requestId = this.nextRequest;
        this.nextRequest += 1;
 
        var deferred = $.Deferred();
        this.deferreds[requestId] = deferred;
        this.successFunction[requestId] = params.successFunction;
        this.failFunction[requestId] = params.failFunction;
        this.alwaysFunction[requestId] = params.alwaysFunction;
        var request = {requestId: requestId, params: params};
        if (this.linked) {
            this.sendRequest(request);
        } else {
            this.pending.push(request);
        }
        return deferred.promise();
    },
    
    /**
     * send the request through the porthole 
	 * @param {Object} request
     */
    sendRequest: function(request) {
        try{
            this.windowProxy.post(JSON.stringify(request));
        }
        catch(err){
            console.log(err);
        }
    },
 
    /**
     * finished opening communication portal with the server
     * now we can send all the pending requests
	 * @param {Object} data
     */
    onReady: function(data) {
        this.linked = true;
        for (var i = 0; i < this.pending.length; i++) {
            this.sendRequest(this.pending[i]);
            //this.pending = this.pending.splice(i, 1);
            //this.sendRequest(this.pending.pop());
        }
        this.pending = [];
    },
    // handle responses to requests made through the wormhole
    
    /**
     * the server returned an answer run the success or fail function
	 * @param {Object} data
     */
    onResponse: function(data) {
        var deferred = this.deferreds[data.requestId];
        delete this.deferreds[data.requestId];
        
        if (data.success) {
            deferred.resolve(data.data.hash, data.textStatus);
            this.successFunction[data.requestId](data.data.hash);
        } else {
            deferred.reject(data.data.textStatus, data.errorThrown);
            //alert('Communication error');
            this.alwaysFunction[data.requestId]();
            this.failFunction[data.requestId]({status: data.data.jqXHR.status, responseText: data.data.jqXHR.responseText});
        }
        this.alwaysFunction[data.requestId]();
    }
});



})();

(function() {

/**
* this file will hold store settings for proper communication with the backend
*
* @copyright: nerdeez.com Ltd.
* @version: 1.0
* @author: Yariv Katz
* @copyright: nerdeez.com Ltd.
*/

/**
 * create the adapter type class
 */
var Fitagift = window.Fitagift;
var Nerdeez = window.Nerdeez;
var SERVER_URL = window.SERVER_URL;
var DS = window.DS;
Fitagift.Adapter = Nerdeez.DjangoTastypieAdapter.extend({
    /**
     * adapter hook to set the server url
     */
    serverDomain : SERVER_URL,
    
    /**
     * hook if we want to use cross domain communication
     */
    wormhole: Nerdeez.Wormhole,
    
    /**
     * our serializer
     */
    serializer: Nerdeez.DjangoTastypieSerializer.extend({
        init: function(){
            this._super();
            this.mappings.set( 'Fitagift.Question', { answers: { embedded: 'load' } } );
            this.mappings.set( 'Fitagift.Answer', { goto_question: { embedded: 'load' } } );
        }
    }),
    
    stopLoadingFunction: function(){}
});

/**
 * create instance of adapter
 */
var adapter = Fitagift.Adapter.create();


/**
 * handles backend communication
 */
Fitagift.store = DS.Store.create({
	
	/**
	 * our adapter
	 */
	adapter: adapter
});

var serializer = adapter.get('serializer');

serializer.configure('Fitagift.Answer', {
    alias: 'answers'
});

})();
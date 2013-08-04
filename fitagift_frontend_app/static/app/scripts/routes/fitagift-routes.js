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
        return Fitagift.Question.find(param.question_id);
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
            for(var i=0; i< questions.get('length'); i++){
                question = quesitons.objectAt(i);
                if(question.get('id') == currentQuestion.get('id')){
                    nextQuestion = quesitons.objectAt(i+1);
                }
            }
        }
        this.transitionTo('question', nextQuestion);
    }
});


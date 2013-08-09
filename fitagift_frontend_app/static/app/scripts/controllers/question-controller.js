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
    pickAnswer: function(answer){
        
        //push the current answer to the answers bank
        var answers = Fitagift.get('answers');
        answers.push(answer);
        Fitagift.set('answers', answers);
        
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
    }
});
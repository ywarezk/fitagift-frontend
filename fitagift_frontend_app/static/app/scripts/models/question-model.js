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
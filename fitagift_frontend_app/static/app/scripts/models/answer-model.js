/**
 * the model for  a single answer for a question
 * 
 * Created August 4th, 2013
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 */
 
Fitagift.Answer = DS.Model.extend({
    title: DS.attr('string'),
    words: DS.attr('string'),
    query_relevent_question: DS.attr('string'),
    goto_question: DS.belongsTo('Fitagift.Question'),
    belong_to_question: DS.belongsTo('Fitagift.Question'),
    answer_to_question_relevent: DS.belongsTo('Fitagift.Question')
});
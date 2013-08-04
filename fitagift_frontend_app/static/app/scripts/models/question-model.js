/**
 * the model for a single question
 * 
 * Created August 4th, 2013
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: nerdeez Ltd.
 */
 
Fitagift.Question = DS.Model.extend({
    title: DS.attr('string'),
    text: DS.attr('string'),
    grade: DS.attr('number'),
    answers: DS.hasMany('Fitagift.Answer')
});
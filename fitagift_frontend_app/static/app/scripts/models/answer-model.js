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
    icon_class: DS.attr('string')
});
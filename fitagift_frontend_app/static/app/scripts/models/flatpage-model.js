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
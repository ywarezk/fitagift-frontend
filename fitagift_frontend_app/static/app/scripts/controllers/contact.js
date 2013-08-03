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
     * when the user clicks the send message
     */
    sendMessage: function(){
        if(Fitagift.get('isValid') == false)return;
        console.log('sendMessage');    
    }
    
});
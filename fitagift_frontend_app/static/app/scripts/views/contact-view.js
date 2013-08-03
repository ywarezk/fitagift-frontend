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
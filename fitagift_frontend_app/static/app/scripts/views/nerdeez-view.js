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
    },
    
});



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
     * used to pass message from server transaction
     * @property
     * @private
     * @type {string}
     */
    statusMessage: 'test',
    
    /**
     * used to inform on success transaction
     * @property
     * @private
     * @type {boolean}
     */
    isSuccess: true,
    
    /**
     * should i show the transaction status
     * @property
     * @private
     * @type {boolean}
     */
    isShowStatus: false,
    
    /**
     * set to true if we are moving to the loading state
     * @property
     * @private
     * @type {boolean}
     */
    isLoading: false,
    
    /**
     * when the user clicks the send message
     */
    sendMessage: function(){
        this.set('isLoading', true);
        adapter = Fitagift.get('store.adapter');  
        xthis = this;
        var success = function(json){
            xthis.set('isSuccess', json['success']);
            xthis.set('isShowStatus', true);
            xthis.set('isLoading', false);
            xthis.set('statusMessage', json['message']);
        }
        var error = function(json){
            if (json.hasOwnProperty('message')){
                xthis.set('statusMessage', json['message']);
            }
            else{
                xthis.set('statusMessage', 'Server communication error');
            }
            xthis.set('isSuccess', false);
            xthis.set('isShowStatus', true);
            xthis.set('isLoading', false);
        }
        adapter.ajax(SERVER_URL + '/api/v1/utilities/contact/', 'POST', {data: {mail: this.get('email'), message: this.get('message')}, success: success, error: error});
    }
    
});
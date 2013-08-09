/**
* this file will hold store settings for proper communication with the backend
*
* @copyright: nerdeez.com Ltd.
* @version: 1.0
* @author: Yariv Katz
* @copyright: nerdeez.com Ltd.
*/

/**
 * create the adapter type class
 */
var Fitagift = window.Fitagift;
var Nerdeez = window.Nerdeez;
var SERVER_URL = window.SERVER_URL;
var DS = window.DS;
Fitagift.Adapter = Nerdeez.DjangoTastypieAdapter.extend({
    /**
     * adapter hook to set the server url
     */
    serverDomain : SERVER_URL,
    
    /**
     * hook if we want to use cross domain communication
     */
    wormhole: Nerdeez.Wormhole,
    
    /**
     * our serializer
     */
    serializer: Nerdeez.DjangoTastypieSerializer.extend({
        init: function(){
            this._super();
            this.mappings.set( 'Fitagift.Question', { answers: { embedded: 'load' } } );
            this.mappings.set( 'Fitagift.Answer', { goto_question: { embedded: 'load' } } );
        }
    }),
    
    stopLoadingFunction: function(){}
});

/**
 * create instance of adapter
 */
var adapter = Fitagift.Adapter.create();


/**
 * handles backend communication
 */
Fitagift.store = DS.Store.create({
	
	/**
	 * our adapter
	 */
	adapter: adapter
});

var serializer = adapter.get('serializer');

serializer.configure('Fitagift.Answer', {
    alias: 'answers'
});
(function() {

/*global Ember, DS */

var Fitagift = window.Fitagift = Ember.Application.create({

	//@member {string} constant holds the dom element which the application be injected to
    rootElement: '#wrap'
    
});

//application files


})();

(function() {

/**
* all views in the application will extend this master view
*
* @copyright: nerdeez.com Ltd.
* @author: Yariv Katz
* @version: 1.0
*/

Fitagift.NerdeezView = Ember.View.extend({
 
/**
* holds the static url
* @type {{string}}
* @public
*/
staticUrl: STATIC_URL,

});



})();

(function() {

//routes


})();

(function() {

//store


})();

(function() {

/**
* this file will hold store settings for proper communication with the backend
*
* @copyright: nerdeez.com Ltd.
* @version: 1.0
* @author: Yariv Katz
* @copyright: nerdeez.com Ltd.
*/


/**
 * handles backend communication
 */
Fitagift.Store = DS.Store.extend({
	
	/**
	 * our adapter
	 */
	adapter: Nerdeez.DjangoTastypieAdapter.extend({
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
	    serializer: Nerdeez.DjangoTastypieSerializer.extend({})
	})
});

})();
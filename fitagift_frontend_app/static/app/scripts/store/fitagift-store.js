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
    serializer: Nerdeez.DjangoTastypieSerializer.extend({})
})

/**
 * create instance of adapter
 */
adapter = Fitagift.Adapter.create();


/**
 * handles backend communication
 */
Fitagift.store = DS.Store.create({
	
	/**
	 * our adapter
	 */
	adapter: adapter
});
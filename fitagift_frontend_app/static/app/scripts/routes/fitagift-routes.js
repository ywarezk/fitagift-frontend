/**
* this file will hold fit a gift application routes
*
* @copyright: nerdeez.com Ltd.
* @version: 1.0
* @author: Yariv Katz
*/

/**
 * define the routes urls here
 */
Fitagift.Router.map(function () {
    this.route('about');
    this.route('contact');
    this.route('terms');
    this.route('privacy');
});

/**
* route to about page
*/
Fitagift.AboutRoute = Ember.Route.extend({
    model: function(param){
        return Fitagift.Flatpage.find({'title' : 'about'});
    }
});

/**
* route to privacy page
*/
Fitagift.PrivacyRoute = Ember.Route.extend({
    model: function(param){
        return Fitagift.Flatpage.find({'title' : 'privacy'});
    }
});

/**
* route to terms page
*/
Fitagift.TermsRoute = Ember.Route.extend({
    model: function(param){
        return Fitagift.Flatpage.find({'title': 'terms'});
    }
});


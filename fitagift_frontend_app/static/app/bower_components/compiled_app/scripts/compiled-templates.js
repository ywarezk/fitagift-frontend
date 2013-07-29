Ember.TEMPLATES["_header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<!--\n\nHolds the html of the application header\nauthor: Yariv Katz\ncopyright: nerdeez.com\nversion: 1.0\n\n-->\n\n<div class=\"_header\" id=\"header\">\n    <div class=\"container\">\n    	<div class=\"row\">\n            <a class=\"pull-left logo\" href=\"/#/\">\n                <img src=");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "view.staticUrl", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("img/logo.png>\n                <span>Fitting your gifts</span>\n            </a>\n    	\n    		<div class=\"nav-collapse menu\">\n    			<ul class=\"nav pull-right\" id=\"main-nav\">\n    				<li class=\"nav-icon active\">\n    					<a href=\"./index.html\">\n    						<i class=\"icon-home\"></i>\n    						<span>Home</span>        					\n    					</a>\n    				</li>\n    				\n    				<li class=\"dropdown\">					\n    					<a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"javascript:;\">\n    						<i class=\"icon-th\"></i>\n    						<span>Components</span> \n    						<b class=\"caret\"></b>\n    					</a>	\n    				\n    					<ul class=\"dropdown-menu\">\n    						<li><a href=\"./elements.html\">Elements</a></li>\n    						<li><a href=\"./validation.html\">Validation</a></li>\n    						<li><a href=\"./jqueryui.html\">jQuery UI</a></li>\n    						<li><a href=\"./charts.html\">Charts</a></li>\n    						<li><a href=\"./bonus.html\">Bonus Elements</a></li>\n    						<li class=\"dropdown-submenu\">\n    		                  <a href=\"#\" tabindex=\"-1\">Dropdown menu</a>\n    		                  <ul class=\"dropdown-menu\">\n    		                    <li><a href=\"#\" tabindex=\"-1\">Second level link</a></li>\n    		                    <li><a href=\"#\" tabindex=\"-1\">Second level link</a></li>\n    		                    <li><a href=\"#\" tabindex=\"-1\">Second level link</a></li>\n    		                  </ul>\n    		                </li>\n    					</ul>    				\n    				</li>\n    				\n    				<li class=\"dropdown\">					\n    					<a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"javascript:;\">\n    						<i class=\"icon-copy\"></i>\n    						<span>Sample Pages</span> \n    						<b class=\"caret\"></b>\n    					</a>	\n    				\n    					<ul class=\"dropdown-menu\">\n    						<li><a href=\"./faq.html\">FAQ</a></li>\n    						<li><a href=\"./gallery.html\">Image Gallery</a></li>\n    						<li><a href=\"./pricing.html\">Pricing Plans</a></li>\n    						<li><a href=\"./reports.html\">Reports</a></li>\n    						<li><a href=\"./settings.html\">Settings</a></li>\n    					</ul>    				\n    				</li>\n    				\n    				<li class=\"dropdown\">					\n    					<a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"javascript:;\">\n    						<i class=\"icon-external-link\"></i>\n    						<span>Extras</span> \n    						<b class=\"caret\"></b>\n    					</a>	\n    				\n    					<ul class=\"dropdown-menu\">							\n    						<li><a href=\"./login.html\">Login</a></li>\n    						<li><a href=\"./signup.html\">Signup</a></li>\n    						<li><a href=\"./error.html\">Error</a></li>\n    						<li><a href=\"./skins.html\">Skins</a></li>\n    						<li><a href=\"./sticky.html\">Sticky Footer</a></li>\n    					</ul>    				\n    				</li>\n    			</ul>\n    			\n    		</div> <!-- /.nav-collapse -->\n            \n    	</div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "header", options) : helperMissing.call(depth0, "partial", "header", options))));
  data.buffer.push("\n<div class=\"container\">\n    <div class=\"container top-buffer\">\n	    <div class=\"row\">\n		    <div class=\"span12\">\n			    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n</div>\n<div id=\"push\"></div>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<h1>Homepage</h1>\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  
});
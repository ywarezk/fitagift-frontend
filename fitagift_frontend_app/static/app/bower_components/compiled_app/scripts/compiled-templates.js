Ember.TEMPLATES["_header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        						<i class=\"icon-home\"></i>\n        						<span>Home</span>        					\n        					");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                            <i class=\"icon-info\"></i>\n                            <span>About</span>\n                            ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                            <i class=\"icon-envelope\"></i>\n                            <span>Contact Us</span>\n                            ");
  }

  data.buffer.push("<!--\n\nHolds the html of the application header\nauthor: Yariv Katz\ncopyright: nerdeez.com\nversion: 1.0\n\n-->\n\n<div class=\"_header\" id=\"header\">\n    <div class=\"container\">\n    	<div class=\"row\">\n            <div class=\"span12\">\n                <a class=\"pull-left logo\" href=\"/#/\">\n                    <img src=");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "view.staticUrl", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("img/logo.png>\n                    <span>Fitting your gifts</span>\n                </a>\n        	\n        		<div class=\"nav-collapse menu\">\n        			<ul class=\"nav pull-right\" id=\"main-nav\">\n        				<li class=\"nav-icon\">\n        					");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "linkTo", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        				</li>\n        				<li>\n                            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "about", options) : helperMissing.call(depth0, "linkTo", "about", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </li>\n                        <li>\n                            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "contact", options) : helperMissing.call(depth0, "linkTo", "contact", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </li>\n        				\n        			</ul>\n        			\n        		</div> <!-- /.nav-collapse -->\n            </div>\n            \n    	</div>\n    </div>\n</div>");
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

Ember.TEMPLATES["contact"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"contact\">\n    <div class=\"account-container login stacked\">\n	    <div class=\"content clearfix\">\n    		<form class=\"nerdeez-validation\">\n    			<h1>Contact Us</h1>		\n    			<div class=\"login-fields\">\n    				<p>\n                        We would love to hear your thoughts on the site or bugs you found.\n                    </p>\n    				<div class=\"field\">\n    					<label for=\"email\">Email:</label>\n                        ");
  hashContexts = {'placeholder': depth0,'name': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'placeholder': "STRING",'name': "STRING",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'placeholder': ("email"),
    'name': ("email"),
    'valueBinding': ("email"),
    'class': ("validate[custom[email]]")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    				</div> <!-- /field -->\n    				<div class=\"field\">\n    					<label for=\"password\">Message:</label>\n                        ");
  hashContexts = {'placeholder': depth0,'name': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'placeholder': "STRING",'name': "STRING",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'placeholder': ("Message"),
    'name': ("message"),
    'valueBinding': ("message"),
    'class': ("validate[required]")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    				</div>\n    			</div> <!-- /login-fields -->\n    			<div class=\"login-actions\">\n                    ");
  hashContexts = {'isLoadingBinding': depth0};
  hashTypes = {'isLoadingBinding': "STRING"};
  options = {hash:{
    'isLoadingBinding': ("isLoading")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.loading),stack1 ? stack1.call(depth0, "controller", options) : helperMissing.call(depth0, "loading", "controller", options))));
  data.buffer.push("\n    				<button class=\"button btn btn-primary btn-large\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendMessage", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                    <i class=\"icon-envelope\"></i>\n                    Send\n                    </button>\n    			</div> <!-- .actions -->\n                ");
  hashContexts = {'messageBinding': depth0,'isSuccessBinding': depth0,'isShowBinding': depth0};
  hashTypes = {'messageBinding': "STRING",'isSuccessBinding': "STRING",'isShowBinding': "STRING"};
  options = {hash:{
    'messageBinding': ("statusMessage"),
    'isSuccessBinding': ("isSuccess"),
    'isShowBinding': ("isShowStatus")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.status),stack1 ? stack1.call(depth0, "controller", options) : helperMissing.call(depth0, "status", "controller", options))));
  data.buffer.push("\n    		</form>\n	    </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["flatpage"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\n                    <div class=\"top-buffer\">\n                        ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "html", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"flatpage\">\n    <div class=\"account-container login stacked\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"span12 content\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "controller", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                <i class=\"icon-flag-checkered\"></i>\n                START\n                ");
  }

  data.buffer.push("<div class=\"index\">\n    <div class=\"account-container login stacked\">\n        <div class=\"\">\n            <div class=\"\">\n                <div class=\"explain top-buffer\">\n                    <h1>\n                    Find the perfect gift!\n                    </h1>\n                    <h5>\n                    Click Start, Answer the following questions, and find out the perfect gift for your loved ones.\n                    </h5>\n                </div>\n                <div class=\"button-container top-buffer\">\n                ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large btn-primary btn-block btn-big-block")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "linkTo", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
  return buffer;
  
});
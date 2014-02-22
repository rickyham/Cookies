/*
                              .-'''''-.
                               |'-----'|
                               |-.....-|
                               |       |
                               |       |
              _,._             |       |
         __.o`   o`"-.         |       |
      .-O o `"-.o   O )_,._    |       |
     ( o   O  o )--.-"`O   o"-.`'-----'`
      '--------'  (   o  O    o)  
                   `----------`
*/

var App = App || {};

App.Cookie = (function(){
    
    var _private = {},
        _public = {};
    
    _private.setCookie = function(cname, cvalue, exdays){
		var date = new Date();
		date.setTime(date.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + date.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};
        
    _private.getCookie = function(cname){
        var name = cname + "=",
            ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++){
            var c = ca[i].trim();
            
            if (c.indexOf(name) === 0){
              return c.substring(name.length, c.length);
            }
        }
		return "";
    };
        
    _private.createCookieMessage = function(settings){
        // Create message container
		var container = document.createElement("div");
		container.id = "cookie-policy";
        container.className = "display-none";
		
		// Create close button
		var closeButtonContainer = document.createElement("div");
		closeButtonContainer.id = "close";
		closeButtonContainer.appendChild(document.createTextNode(settings.closeButtonText));
		container.appendChild(closeButtonContainer);

		// Create link
		var a = document.createElement("a");
		a.title = settings.linkTitle;
		a.href = settings.policyLink;
		a.appendChild(document.createTextNode(settings.linkText));

		// Create message
		var messageContainer = document.createElement("p");
		messageContainer.appendChild(document.createTextNode(settings.cookieMessage + " "));
		messageContainer.appendChild(a);

		container.appendChild(messageContainer);

		return container;
        
    };
        
    _private.showCookieMessage = function(element){
        element.className.replace("display-none");
        element.className = "display-block";
    };
        
    _private.removeCookieMessage = function(node){
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
    };

    _private.cookieSetUp = function(settings){
        // Cookie policy setup    
        var isCookieSet = _private.getCookie(settings.cookieName);
        
        if(isCookieSet === "" || isCookieSet === undefined){        
            var appendTo = (settings.appendTo === "default" || settings.appendTo === "undefiend" || settings.appendTo === "") ? document.body : appendTo = document.getElementById(settings.appendTo),
                appendToParent = appendTo.parentNode,
                cookieMessage = _private.createCookieMessage(settings);
            
            // Insert cookie message into the page
            appendToParent.insertBefore(cookieMessage, appendTo);

            // Get cookie message & close button
            var cookieContainer = document.getElementById("cookie-policy"),
                closeButton = document.getElementById("close");
            
            _private.showCookieMessage(cookieContainer);

            closeButton.addEventListener("click", function(){
                _private.setCookie(settings.cookieName, settings.cookieValue, settings.cookieExpireDays);
                _private.removeCookieMessage(cookieContainer);
            });
            
        }
        
    };
        
    _public.init = function(settings){
        _private.cookieSetUp(settings);
    };
          
    return _public;

}());
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([,,,,,,,function(e,t,n){n(8),n(9),n(10),n(11),n(12),e.exports=n(13)},function(e,t,n){"use strict";window.__firefox__||Object.defineProperty(window,"__firefox__",{enumerable:!1,configurable:!1,writable:!1,value:{userScripts:{},includeOnce:function(e,t){return!!__firefox__.userScripts[e]||(__firefox__.userScripts[e]=!0,"function"==typeof t&&t(),!1)}}})},function(e,t,n){"use strict";window.__firefox__.includeOnce("ContextMenu",(function(){window.addEventListener("touchstart",(function(e){var t=e.target,n=t.closest("a"),r=t.closest("img");if(n||r){var i={};i.touchX=e.changedTouches[0].pageX-window.scrollX,i.touchY=e.changedTouches[0].pageY-window.scrollY,n&&(i.link=n.href,i.title=n.textContent),r&&(i.image=r.src,i.title=i.title||r.title,i.alt=r.alt),(i.link||i.image)&&webkit.messageHandlers.contextMenuMessageHandler.postMessage(i)}}),!0)}))},function(e,t,n){"use strict";void 0===window.__firefox__.download&&Object.defineProperty(window.__firefox__,"download",{enumerable:!1,configurable:!1,writable:!1,value:function(e,t){if(t===SECURITY_TOKEN){if(e.startsWith("blob:")){var n=new XMLHttpRequest;return n.open("GET",e,!0),n.responseType="blob",n.onload=function(){if(200===this.status){var n=function(e){return e.split("/").pop()}(e),r=this.response;!function(e,t){var n=new FileReader;n.onloadend=function(){t(this.result.split(",")[1])},n.readAsDataURL(e)}(r,(function(e){webkit.messageHandlers.downloadManager.postMessage({securityToken:t,filename:n,mimeType:r.type,size:r.size,base64String:e})}))}},void n.send()}var r=document.createElement("a");r.href=e,r.dispatchEvent(new MouseEvent("click"))}}})},function(e,t,n){"use strict";window.__firefox__.includeOnce("FocusHelper",(function(){var e=function(e){var t=e.type,n=e.target.nodeName;("INPUT"===n||"TEXTAREA"===n||e.target.isContentEditable)&&(function(e){if("INPUT"!==e.nodeName)return!1;var t=e.type.toUpperCase();return"BUTTON"==t||"SUBMIT"==t||"FILE"==t}(e.target)||webkit.messageHandlers.focusHelper.postMessage({eventType:t,elementType:n}))},t={capture:!0,passive:!0},n=window.document.body;["focus","blur"].forEach((function(r){n.addEventListener(r,e,t)}))}))},function(e,t,n){"use strict";window.__firefox__.includeOnce("LoginsHelper",(function(){function e(e){}var t={_getRandomId:function(){return Math.round(Math.random()*(Number.MAX_VALUE-Number.MIN_VALUE)+Number.MIN_VALUE).toString()},_messages:["RemoteLogins:loginsFound"],_requests:{},_takeRequest:function(e){var t=e,n=this._requests[t.requestId];return this._requests[t.requestId]=void 0,n},_sendRequest:function(e,t){var n=this._getRandomId();t.requestId=n,webkit.messageHandlers.loginsManagerMessageHandler.postMessage(t);var r=this;return new Promise((function(t,i){e.promise={resolve:t,reject:i},r._requests[n]=e}))},receiveMessage:function(e){var t=this._takeRequest(e);switch(e.name){case"RemoteLogins:loginsFound":t.promise.resolve({form:t.form,loginsFound:e.logins});break;case"RemoteLogins:loginsAutoCompleted":t.promise.resolve(e.logins)}},_asyncFindLogins:function(e,t){var i=this._getFormFields(e,!1);if(!i[0]||!i[1])return Promise.reject("No logins found");i[0].addEventListener("blur",r);var o=n._getPasswordOrigin(e.ownerDocument.documentURI),s=n._getActionOrigin(e);if(null==s)return Promise.reject("Action origin is null");var a={form:e},u={securityToken:SECURITY_TOKEN,type:"request",formOrigin:o,actionOrigin:s};return this._sendRequest(a,u)},loginsFound:function(e,t){this._fillForm(e,!0,!1,!1,!1,t)},onUsernameInput:function(t){var n=t.target;if(n.ownerDocument instanceof HTMLDocument&&this._isUsernameFieldType(n)){var r=n.form;if(r&&n.value){t.type;var i=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,i=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(i)throw o}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(this._getFormFields(r,!1),3),o=i[0],s=i[1];if(i[2],o==n&&s){var a=this;this._asyncFindLogins(r,{showMasterPassword:!1}).then((function(e){a._fillForm(e.form,!0,!0,!0,!0,e.loginsFound)})).then(null,e)}}}},_getPasswordFields:function(e,t){for(var n=[],r=0;r<e.elements.length;r++){var i=e.elements[r];i instanceof HTMLInputElement&&"password"==i.type&&(t&&!i.value||(n[n.length]={index:r,element:i}))}return 0==n.length?null:n.length>3?(n.length,null):n},_isUsernameFieldType:function(e){if(!(e instanceof HTMLInputElement))return!1;var t=e.hasAttribute("type")?e.getAttribute("type").toLowerCase():e.type;return"text"==t||"email"==t||"url"==t||"tel"==t||"number"==t},_getFormFields:function(e,t){var n,r,i=null,o=this._getPasswordFields(e,t);if(!o)return[null,null,null];for(var s=o[0].index-1;s>=0;s--){var a=e.elements[s];if(this._isUsernameFieldType(a)){i=a;break}}if(!t||1==o.length)return[i,o[0].element,null];var u=o[0].element.value,l=o[1].element.value,c=o[2]?o[2].element.value:null;if(3==o.length)if(u==l&&l==c)r=o[0].element,n=null;else if(u==l)r=o[0].element,n=o[2].element;else if(l==c)n=o[0].element,r=o[2].element;else{if(u!=c)return[null,null,null];r=o[0].element,n=o[1].element}else u==l?(r=o[0].element,n=null):(n=o[0].element,r=o[1].element);return[i,r,n]},_isAutocompleteDisabled:function(e){return!(!e||!e.hasAttribute("autocomplete")||"off"!=e.getAttribute("autocomplete").toLowerCase())},_onFormSubmit:function(e){var t=e.ownerDocument,r=t.defaultView,i=n._getPasswordOrigin(t.documentURI);if(i){var o=n._getActionOrigin(e),s=this._getFormFields(e,!0),a=s[0],u=s[1],l=s[2];if(null!=u){this._isAutocompleteDisabled(e)||this._isAutocompleteDisabled(a)||this._isAutocompleteDisabled(u)||this._isAutocompleteDisabled(l);var c=a?{name:a.name,value:a.value}:null,f={name:u.name,value:u.value};l&&(l.name,l.value),r.opener&&r.opener.top,webkit.messageHandlers.loginsManagerMessageHandler.postMessage({securityToken:SECURITY_TOKEN,type:"submit",hostname:i,username:c.value,usernameField:c.name,password:f.value,passwordField:f.name,formSubmitURL:o})}}},_fillForm:function(e,t,n,r,i,o){var s=this._getFormFields(e,!1),u=s[0],l=s[1];if(null==l)return[!1,o];if(l.disabled||l.readOnly)return[!1,o];var c=Number.MAX_VALUE,f=Number.MAX_VALUE;u&&u.maxLength>=0&&(c=u.maxLength),l.maxLength>=0&&(f=l.maxLength);var d=(o=function(e,t){var n,r,i;if(null==e)throw new TypeError("Array is null or not defined");var o=Object(e),s=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(n=e),r=new Array(s),i=0;i<s;){var a,u;i in o&&(a=o[i],u=t.call(n,a,i,o),r[i]=u),i++}return r}(o,(function(e){return{hostname:e.hostname,formSubmitURL:e.formSubmitURL,httpRealm:e.httpRealm,username:e.username,password:e.password,usernameField:e.usernameField,passwordField:e.passwordField}}))).filter((function(e){var t=e.username.length<=c&&e.password.length<=f;return t||e.username,t}),this);if(0==d.length)return[!1,o];if(l.value&&!r)return[!1,o];var m=!1;!n&&(this._isAutocompleteDisabled(e)||this._isAutocompleteDisabled(u)||this._isAutocompleteDisabled(l))&&(m=!0);var g=null;if(u&&(u.value||u.disabled||u.readOnly)){var v=u.value.toLowerCase();if((h=d.filter((function(e){return e.username.toLowerCase()==v}))).length){for(var p=0;p<h.length;p++){var _=h[p];_.username==u.value&&(g=_)}g||(g=h[0])}}else if(1==d.length)g=d[0];else{var h;g=(h=u?d.filter((function(e){return e.username})):d.filter((function(e){return!e.username})))[0]}var w=!1;if(g&&t&&!m){if(u){var b=u.disabled||u.readOnly,y=g.username!=u.value,F=i&&y&&u.value.toLowerCase()==g.username.toLowerCase();b||F||!y||(u.value=g.username,a(u,"keydown",40),a(u,"keyup",40))}l.value!=g.password&&(l.value=g.password,a(l,"keydown",40),a(l,"keyup",40)),w=!0}return[w,o]}},n={_getPasswordOrigin:function(e,t){return e},_getActionOrigin:function(e){var t=e.action;return""==t&&(t=e.baseURI),this._getPasswordOrigin(t,!0)}};function r(e){t.onUsernameInput(e)}var i=document.body;function o(e){for(var t=0;t<e.length;t++){var n=e[t];"FORM"===n.nodeName?s(n):n.hasChildNodes()&&o(n.childNodes)}return!1}function s(n){try{t._asyncFindLogins(n,{}).then((function(e){t.loginsFound(e.form,e.loginsFound)})).then(null,e)}catch(e){}}function a(e,t,n){var r=document.createEvent("KeyboardEvent");r.initKeyboardEvent(t,!0,!0,window,0,0,0,0,0,n),e.dispatchEvent(r)}new MutationObserver((function(e){for(var t=0;t<e.length;++t)o(e[t].addedNodes)})).observe(i,{attributes:!1,childList:!0,characterData:!1,subtree:!0}),window.addEventListener("load",(function(e){for(var t=0;t<document.forms.length;t++)s(document.forms[t])})),window.addEventListener("submit",(function(e){try{t._onFormSubmit(e.target)}catch(e){}})),Object.defineProperty(window.__firefox__,"logins",{enumerable:!1,configurable:!1,writable:!1,value:Object.freeze(new function(){this.inject=function(e){try{t.receiveMessage(e)}catch(e){}}})})}))},function(e,t,n){"use strict";window.__firefox__.includeOnce("PrintHandler",(function(){window.print=function(){webkit.messageHandlers.printHandler.postMessage({})}}))}]);
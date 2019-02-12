(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{250:function(e,t,n){e.exports=n(452)},450:function(e,t,n){},452:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(31),s=n.n(o),c=n(15),i=n.n(c),u=n(17),l=n(217),p=n(60),m=n(61),d=n(65),f=n(62),g=n(66),h=n(106),w=n(467),v=n(453),b=n(474),E=n(469),y=(a.Component,{modal:{marginTop:"-250px",display:"fixed !important"}}),k=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(d.a)(this,Object(f.a)(t).call(this,e))).onMarkerClick=function(e,t,a){return n.setState({selectedPlace:e,activeMarker:t,showingInfoWindow:!0,modalOpen:!0})},n.onClose=function(e){n.state.showingInfoWindow&&n.setState({showingInfoWindow:!1,activeMarker:null})},n.onMapClicked=function(e,t,a){var r=a.latLng,o=r.lat(),s=r.lng();n.setState({markers:n.state.markers.concat({title:"T\xe4ss\xe4 on nuppi!",name:"T\xe4h\xe4n tulee vaikka mink\xe4laista teksti\xe4",position:{lat:o,lng:s}})})},n.renderMarkers=function(){return n.state.markers.map(function(e){return r.a.createElement(h.Marker,{name:e.name,position:e.position,onClick:n.onMarkerClick})})},n.handleOpen=function(){return n.setState({modalOpen:!0})},n.handleClose=function(){return n.setState({modalOpen:!1})},n.state={user:n.props.user,showingInfoWindow:!1,activeMarker:{},selectedPlace:{},modalOpen:!1,markers:[{title:"T\xe4ss\xe4 on nuppi",name:"The marker`s title will appear as a tooltip.",position:{lat:37.778519,lng:-122.40564}}]},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{height:350,width:"100%",display:"flex",flexFlow:"row nowrap",justifyContent:"center",padding:0}},r.a.createElement(w.a,{open:this.state.modalOpen,onClose:this.handleClose,style:y.modal,closeIcon:!0},r.a.createElement(w.a.Header,null,"Select a Photo"),r.a.createElement(w.a.Content,{image:!0},r.a.createElement(v.a,{wrapped:!0,size:"medium",src:"https://react.semantic-ui.com/images/avatar/large/rachel.png"}),r.a.createElement(w.a.Description,null,r.a.createElement(b.a,null,"Owner: ",this.state.user.username),r.a.createElement("p",null,"We've found the following gravatar image associated with your e-mail address."),r.a.createElement("p",null,"Is it okay to use this photo?")))),r.a.createElement(h.Map,{google:this.props.google,zoom:2,initialCenter:{lat:0,lng:0},onClick:this.onMapClicked},this.renderMarkers()))}}]),t}(a.Component),x=Object(h.GoogleApiWrapper)(function(e){return{apiKey:e.apiKey,language:e.language}})(k),O=n(465),C=n(472),S=n(477),j=n(461),P=n(54),I=n.n(P),A=(n(471),n(462)),M=(n(463),r.a.createElement(j.a,null),n(475)),U=(n(464),n(468),n(105)),T=n(466),z=n(476),W=n(470),L=function(e){var t=e.onSubmit,n=e.handleChange,a=e.username,o=e.password;return r.a.createElement("div",{className:"login-form"},r.a.createElement("style",null,"\n      body > div,\n      body > div > div,\n      body > div > div > div.login-form {\n        height: 100%;\n      }\n    "),r.a.createElement(M.a,{textAlign:"center",style:{height:"100%"},verticalAlign:"middle"},r.a.createElement(M.a.Column,{style:{maxWidth:450}},r.a.createElement(b.a,{as:"h2",color:"blue",textAlign:"center"},r.a.createElement(U.a,{name:"plane"})," Log in to account"),r.a.createElement(T.a,{onSubmit:t,size:"large"},r.a.createElement(z.a,null,r.a.createElement(T.a.Input,{fluid:!0,icon:"user",name:"username",iconPosition:"left",placeholder:"Username",value:a,onChange:n}),r.a.createElement(T.a.Input,{fluid:!0,icon:"lock",name:"password",iconPosition:"left",placeholder:"Password",type:"password",value:o,onChange:n}),r.a.createElement(W.a,{color:"blue",fluid:!0,size:"large",type:"submit"},"Login"))),r.a.createElement(E.a,null,r.a.createElement(A.a,{to:"/create"},"Create new account")))))},G=function(e){var t=e.onSubmit,n=e.handleChange,a=e.username,o=e.password,s=e.password2;return r.a.createElement("div",{className:"login-form"},r.a.createElement("style",null,"\n      body > div,\n      body > div > div,\n      body > div > div > div.login-form {\n        height: 100%;\n      }\n    "),r.a.createElement(M.a,{textAlign:"center",style:{height:"100%"},verticalAlign:"middle"},r.a.createElement(M.a.Column,{style:{maxWidth:450}},r.a.createElement(b.a,{as:"h2",color:"blue",textAlign:"center"},r.a.createElement(U.a,{name:"user circle"})," Create new account"),r.a.createElement(T.a,{onSubmit:t,size:"large"},r.a.createElement(z.a,null,r.a.createElement(T.a.Input,{fluid:!0,icon:"user",name:"newUsername",iconPosition:"left",placeholder:"Username",value:a,onChange:n}),r.a.createElement(T.a.Input,{fluid:!0,icon:"lock",name:"newPassword",iconPosition:"left",placeholder:"Password",type:"password",value:o,onChange:n}),r.a.createElement(T.a.Input,{fluid:!0,icon:"lock",name:"newPassword2",iconPosition:"left",placeholder:"Repeat password",type:"password",value:s,onChange:n}),r.a.createElement(W.a,{color:"blue",fluid:!0,size:"large",type:"submit"},"Submit"))),r.a.createElement(E.a,null,r.a.createElement(A.a,{to:"/login"},"Login to account")))))},D=null,F={getAll:function(){var e=Object(u.a)(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("/api/blogs");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(u.a)(i.a.mark(function e(t){var n,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:D}},e.next=3,I.a.post("/api/blogs",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(u.a)(i.a.mark(function e(t,n){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.put("".concat("/api/blogs","/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),remove:function(){var e=Object(u.a)(i.a.mark(function e(t){var n,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:D}},e.next=3,I.a.delete("".concat("/api/blogs","/").concat(t),n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){D="bearer ".concat(e)}},J={login:function(){var e=Object(u.a)(i.a.mark(function e(t){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},N={getAll:function(){var e=Object(u.a)(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("/api/users");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(u.a)(i.a.mark(function e(t){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=I.a.post("/api/users",t),e.abrupt("return",n.data);case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(u.a)(i.a.mark(function e(t,n){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.put("".concat("/api/users","/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),remove:function(){var e=Object(u.a)(i.a.mark(function e(t){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.delete("".concat("/api/users","/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},K=function(e){var t=e.message,n=e.color,a="red"===n?"warning sign":"thumbs up",o="red"===n?"Warning!":"Success!";return t?r.a.createElement(E.a,{icon:a,size:"big",color:n,header:o,content:t,warning:!0}):null},H=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={user:null,username:"",newUsername:"",newPassword:"",newPassword2:"",password:"",color:"",message:""},n.handleFieldChange=function(e){console.log(e.target.value),n.setState(Object(l.a)({},e.target.name,e.target.value))},n.componentDidMount=Object(u.a)(i.a.mark(function e(){var t,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(t=window.localStorage.getItem("loggedInUser"))&&(a=JSON.parse(t),n.setState({user:a}),F.setToken(a.token));case 2:case"end":return e.stop()}},e,this)})),n.logout=function(){F.setToken(null),window.localStorage.removeItem("loggedInUser"),n.notify("".concat(n.state.user.username," logged out succesfully!"),"green"),n.setState({user:null}),console.log("hoidettu")},n.notify=function(e,t){n.setState({message:e,color:t}),setTimeout(function(){n.setState({message:null,color:null})},2e3)},n.login=function(){var e=Object(u.a)(i.a.mark(function e(t){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,J.login({username:n.state.username,password:n.state.password});case 4:a=e.sent,window.localStorage.setItem("loggedInUser",JSON.stringify(a)),F.setToken(a.token),n.setState({username:"",password:"",user:a}),n.notify("".concat(n.state.user.username," logged in succesfully!"),"green"),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),n.notify("invalid username or password, try again!","red"),n.setState({username:"",password:""});case 16:case"end":return e.stop()}},e,this,[[1,11]])}));return function(t){return e.apply(this,arguments)}}(),n.register=function(){var e=Object(u.a)(i.a.mark(function e(t){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),(a=n.state.newPassword)!==n.state.newPassword2?n.notify("Passwords don't match!","red"):a.length<3?n.notify("Password must be at least 3 characters long!","red"):n.createAccount();case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.createAccount=Object(u.a)(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.create({username:n.state.newUsername,password:n.state.newPassword});case 3:e.sent,n.notify("account ".concat(n.state.newUsername," created!"),"green"),n.setState({newUsername:"",newPassword:"",newPassword2:""}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),n.notify("server error!","red");case 12:n.props.history.push("/login");case 13:case"end":return e.stop()}},e,this,[[0,8]])})),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;console.log("THE USER IS",this.state.user);var t=null!==this.state.user;return r.a.createElement(j.a,null,r.a.createElement(K,{message:this.state.message,color:this.state.color}),r.a.createElement(O.a,{exact:!0,path:"/",render:t?function(){return r.a.createElement(C.a,{to:"/map"})}:function(){return r.a.createElement(C.a,{to:"/login"})}}),r.a.createElement(O.a,{path:"/login",render:t?function(){return r.a.createElement(C.a,{to:"/map"})}:function(){return r.a.createElement(L,{onSubmit:e.login,handleChange:e.handleFieldChange,username:e.state.username,password:e.state.password})}}),r.a.createElement(O.a,{path:"/create",render:t?function(){return r.a.createElement(C.a,{to:"/map"})}:function(){return r.a.createElement(G,{onSubmit:e.register.bind(e),handleChange:e.handleFieldChange,username:e.state.newUsername,password:e.state.newPassword,password2:e.state.newPassword2})}}),r.a.createElement(O.a,{path:"/map",render:t?function(){return r.a.createElement(R,{user:e.state.user,logout:e.logout,settings:e.logout})}:function(){return r.a.createElement(C.a,{to:"/"})}}))}}]),t}(a.Component),R=function(e){var t=e.user;e.logout,e.settings;return r.a.createElement("div",{style:{width:"100%",marginLeft:0}},r.a.createElement(x,{user:t,apiKey:"AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE",language:"en"}))},q=Object(S.a)(H),B=n(473);n(450);s.a.render(r.a.createElement(B.a,null,r.a.createElement(q,null)),document.getElementById("root"))}},[[250,2,1]]]);
//# sourceMappingURL=main.878a729d.chunk.js.map
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=React},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";n.r(t);var r=n(0),s=n(1);n(3);class o{}class a{}class c{}n(5),n(6);var l=({site:e})=>r.createElement("div",{className:"header"},r.createElement("h1",{className:"blog-title"},e?e.name:""));n(7);var i=()=>r.createElement("div",{className:"footer"},r.createElement("div",null,"Powered by WordPress & React"));n(8);var u=({post:e,authors:t})=>r.createElement("div",{key:e.id,className:"post",id:String(e.id)},r.createElement("h2",{className:"post-title"},e.title.rendered),r.createElement("div",{className:"post-meta"},new Date(e.date).toLocaleString()+" by "+t.get(e.author).name),r.createElement("div",{className:"post-content",dangerouslySetInnerHTML:{__html:e.content.rendered}}));n(9);var p=({site:e,posts:t,authors:n})=>r.createElement("div",{className:"page"},r.createElement(l,{site:e}),r.createElement("div",{className:"posts"},t?t.map(e=>r.createElement(u,{post:e,authors:n})):""),r.createElement(i,null));s.render(r.createElement(class extends r.PureComponent{constructor(e){super(e),this.state=null}componentDidMount(){const{baseUri:e}=this.props;fetch(e).then(e=>e.json()).then(t=>{const n=Object.assign(new o,t);fetch(e+"wp/v2/posts?per_page=5").then(e=>e.json()).then(t=>{let r=new Set,s=[];for(let e of t){const t=Object.assign(new c,e);s.push(t),r.add(t.author)}let o=new Map,l=[];r.forEach(t=>{l.push(fetch(e+"wp/v2/users/"+t).then(e=>e.json()).then(e=>{const n=Object.assign(new a,e);o.set(t,n)}).catch(e=>console.error(e)))}),Promise.all(l).then(()=>this.setState({site:n,posts:s,authors:o}))}).catch(e=>console.error(e))}).catch(e=>console.error(e))}render(){if(!this.state)return"";const{site:e,posts:t,authors:n}=this.state;return r.createElement(p,{site:e,posts:t,authors:n})}},{baseUri:"http://isouth.org/wp-json/"}),document.getElementById("app"))},function(e,t){},,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){}]);
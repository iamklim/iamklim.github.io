(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a.p+"static/media/empty-poster.b9aba793.png"},18:function(e,t,a){e.exports=a(35)},24:function(e,t,a){},26:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(8),s=a.n(i),c=(a(24),a(15)),o=a(1),m=a.n(o),l=a(7),u=a(2),p=a(4),d=a(3),_=a(5),h=a(6);function b(e){return fetch(e,{method:"GET"}).then(function(e){return e.json()}).then(function(e){return e}).catch(function(e){return console.error("Ajax request error:",e)})}a(26);var f=a(37),v=a(16),g=(a(27),a(28),a(29),a(12)),w=a.n(g),E=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(_.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=r.a.createElement(r.a.Fragment,null,this.props.movie.genres.map(function(e){return r.a.createElement("div",{key:e.id,className:"item__genre-element"},r.a.createElement("div",{className:"item__genre-icon item__genre-icon--".concat(e.id)}),r.a.createElement("div",{className:"item__genre-name"},e.name))})),t=null!==this.props.movie.poster?this.props.movie.poster:w.a;return r.a.createElement("div",{className:"swiper-slide item"},r.a.createElement("div",{className:"item__description item__title"},r.a.createElement("span",null,"".concat(this.props.movie.title," (").concat(this.props.movie.year,")"))),r.a.createElement("div",{className:"item__img"},r.a.createElement("img",{src:t,alt:"Poster"}),r.a.createElement("div",{className:"item__shadow item__shadow--left"}),r.a.createElement("div",{className:"item__shadow item__shadow--right"}),r.a.createElement("div",{className:"item__description item__marks"},r.a.createElement("div",{className:" item__sidebar item__sidebar--imdb"},r.a.createElement("span",{className:"item__sidebar-title"},"IMDb"),r.a.createElement("span",{className:"item__sidebar-number"},this.props.movie.imdbRating)),!isNaN(this.props.movie.metascore)&&r.a.createElement("div",{className:"item__sidebar item__sidebar--metascore"},r.a.createElement("span",{className:"item__sidebar-title item__sidebar-title--sm"},"\u041a\u0440\u0438\u0442\u0438\u043a\u0438"),r.a.createElement("span",{className:"item__sidebar-number"},this.props.movie.metascore+"%")),this.props.movie.trailer_url.length>0&&r.a.createElement("div",{className:"item__sidebar item__sidebar--trailer"},r.a.createElement("span",{className:"item__sidebar-title item__sidebar-title--sm"},"\u0422\u0440\u0435\u0439\u043b\u0435\u0440"),r.a.createElement("span",{className:"item__sidebar-icon item__sidebar-icon--youtube"}),r.a.createElement("a",{className:"item__sidebar-link",href:this.props.movie.trailer_url},"Youtube")),r.a.createElement("div",{className:"item__genre"},r.a.createElement("div",{className:"item__sidebar item__genre-box item__genre-box--sm"},e),r.a.createElement("div",{className:"item__sidebar item__genre-box item__genre-box--lg"},e)))),r.a.createElement("div",{className:"item__description item__bottom"},r.a.createElement("div",{className:"item__cast"},r.a.createElement("span",{className:"item__director"},"\u0420\u0435\u0436\u0438\u0441\u0441\u0435\u0440: ",r.a.createElement("span",null,this.props.movie.director)),r.a.createElement("span",{className:"item__actors"},"\u0412 \u0440\u043e\u043b\u044f\u0445: ",r.a.createElement("span",null,this.props.movie.actors))),r.a.createElement("div",{className:"item__overview"},r.a.createElement("span",null,this.props.movie.overview))))}}]),t}(r.a.Component),N=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(_.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"swiper-container"},r.a.createElement("div",{className:"swiper-wrapper"},this.props.movies.map(function(e){return r.a.createElement(E,{key:e.id,movie:e})})))}}]),t}(r.a.Component),y=(a(30),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(_.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"loader"},r.a.createElement("div",{className:"loader__spinner"},r.a.createElement("div",{className:"loader__spinner-square"})))}}]),t}(r.a.Component)),k=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(_.a)(t).call(this,e))).state={movies:[],contentLoading:!0},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=[],t="3b07521ea25bf66106a9525b3054c8e9",a="55018c43",n=this;function r(){return i.apply(this,arguments)}function i(){return(i=Object(l.a)(m.a.mark(function a(){var n;return m.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n="https://api.themoviedb.org/3/movie/now_playing?region=UA&language=ru-RU&api_key=".concat(t),"https://image.tmdb.org/t/p/original",a.next=4,Promise.all([b(n),b("".concat(n,"&page=2"))]).then(function(t){var a=Object(c.a)(t,2),n=a[0],r=a[1],i=n.results,s=r.results.slice(0,r.results.length-2);i.concat(s).forEach(function(t){null===t.poster_path?t.poster=null:t.poster="https://image.tmdb.org/t/p/original"+t.poster_path,e.push(t)})});case 4:case"end":return a.stop()}},a)}))).apply(this,arguments)}function s(){return o.apply(this,arguments)}function o(){return(o=Object(l.a)(m.a.mark(function a(){var n,r,i,s,c,o,l;return m.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:n=0;case 1:if(!(n<e.length)){a.next=15;break}return r=e[n].id,i="https://api.themoviedb.org/3/movie/".concat(r,"?api_key=").concat(t,"&append_to_response=external_ids,videos&language=ru-RU"),a.next=6,b(i);case 6:s=a.sent,c=s.videos.results,o="",c.length>0&&"YouTube"===(l=c[c.length-1]).site&&(o="https://www.youtube.com/watch?v=".concat(l.key)),e[n].imdb_id=s.imdb_id,e[n].trailer_url=o,e[n].genres=s.genres;case 12:n++,a.next=1;break;case 15:case"end":return a.stop()}},a)}))).apply(this,arguments)}function u(){return p.apply(this,arguments)}function p(){return(p=Object(l.a)(m.a.mark(function t(){var n,r,i,s;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=0;case 1:if(!(n<e.length)){t.next=16;break}return r=e[n].imdb_id,i="https://www.omdbapi.com/?i=".concat(r,"&apikey=").concat(a),t.next=6,b(i);case 6:s=t.sent,isNaN(s.imdbRating)&&(s.imdbRating="-"),e[n].imdbRating=s.imdbRating,e[n].director=s.Director,e[n].actors=s.Actors,e[n].metascore=s.Metascore,e[n].year=s.Year;case 13:n++,t.next=1;break;case 16:case"end":return t.stop()}},t)}))).apply(this,arguments)}function d(){return _.apply(this,arguments)}function _(){return(_=Object(l.a)(m.a.mark(function t(){return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.sort(function(e,t){return e.imdbRating>t.imdbRating?-1:e.imdbRating<t.imdbRating?1:0});case 1:case"end":return t.stop()}},t)}))).apply(this,arguments)}function h(){return f.apply(this,arguments)}function f(){return(f=Object(l.a)(m.a.mark(function t(){return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(function(t,a){JSON.stringify(e),t(n.setState({movies:e}))}));case 1:case"end":return t.stop()}},t)}))).apply(this,arguments)}function g(){return w.apply(this,arguments)}function w(){return(w=Object(l.a)(m.a.mark(function e(){return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e,t){new v.a(".swiper-container",{effect:"coverflow",centeredSlides:!0,slidesPerView:"auto",mousewheel:!0,keyboard:!0,coverflowEffect:{rotate:20,stretch:0,depth:100,modifier:1,slideShadows:!1},on:{init:function(){e(n.setState({contentLoading:!1}))}}})}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}Object(l.a)(m.a.mark(function e(){return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r();case 2:return e.next=4,s();case 4:return e.next=6,u();case 6:return e.next=8,d();case 8:return e.next=10,h();case 10:return e.next=12,g();case 12:case"end":return e.stop()}},e)}))()}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{in:this.state.contentLoading,timeout:500,classNames:"animation",unmountOnExit:!0},r.a.createElement(y,null)),r.a.createElement(f.a,{in:!this.state.contentLoading,timeout:1e3,classNames:"animation"},r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"credentials"},r.a.createElement("p",null,"Made by Vladyslav Klymenko"),r.a.createElement("a",{href:"https://www.linkedin.com/in/vladklymenko/"},"LinkedIn"),"\xa0",r.a.createElement("a",{href:"mailto:drkleem@gmail.com"},"drkleem@gmail.com")),r.a.createElement(N,{movies:this.state.movies})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.113c1c31.chunk.js.map
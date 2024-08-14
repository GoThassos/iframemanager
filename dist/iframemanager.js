/*!
 * iframemanager v1.2.5
 * Author Orest Bida
 * Released under the MIT License
 */
(()=>{const e='api',t='click',o='{data-id}',n='accept',c='reject',i='c-h-n',s='c-h-b',r='show-ph';let a,l,d,f,v,u={},m={},p={},b='',h={},w=new Map,_=e;const g=['onload','onerror','src','params'],$=e=>'function'==typeof e,S=e=>'string'==typeof e,T=e=>l.createElement(e),x=()=>T('div'),y=()=>{const e=T('button');return e.type='button',e},I=(e,t)=>e.className=t,P=(e,t)=>e.classList.add(t),D=(e,t)=>e.appendChild(t),M=e=>e&&Object.keys(e)||[],O=(e,t)=>{for(const o in t)L(e,o,t[o])},j=e=>{const t=e.dataset,o={},n='data-iframe-',c=e.getAttributeNames().filter((e=>e.slice(0,12)===n)).map((e=>e.slice(12))),i=e.querySelector('[data-placeholder]'),s=i&&i.hasAttribute('data-visible');s&&i.removeAttribute('data-visible');const r=i&&i.cloneNode(!0);for(const a of c)o[a]=e.getAttribute(n+a);return{t:t.id,o:t.title,i:t.thumbnail,l:t.params,v:e,u:null,m:i,p:r,h:null,_:!1,g:!1,$:!0,S:'widget'in t,T:s,I:o}},k=(e,t)=>{const o=u[e];if('IntersectionObserver'in a){const e=new IntersectionObserver((n=>{for(const c of n)c.isIntersecting&&(E(t,o[c.target.dataset.index]),e.unobserve(c.target))}));for(const t of o)e.observe(t.v)}},E=(e,t)=>{const n=e=>{t.h.style.backgroundImage=`url('${e}')`;const o=new Image;o.onload=()=>P(t.h,'loaded'),o.src=e};if(S(t.i))''!==t.i&&n(t.i);else if($(e))e(t.t,(e=>n(e)));else if(S(e)){const c=e.replace(o,t.t);n(c)}},C=(e,t)=>{if(e._)return;if(e._=!0,e.m){const t=e.p.cloneNode(!0);e.m.replaceWith(t),e.m=t}const n=t.iframe;if($(t.onAccept))return void t.onAccept(e.v,(t=>{if(!(t instanceof HTMLIFrameElement))return!1;O(t,n),O(t,e.I),e.P=t,e._=!0,P(e.v,s),(!e.T||e.S)&&P(e.v,r)}));e.P=T('iframe');const c=t.iframe,i=e.l||c&&c.params;let a=(t.embedUrl||'').replace(o,e.t);e.o&&(e.P.title=e.o),i&&S(i)&&(a+='?'===i.slice(0,1)?i:`?${i}`),e.P.onload=()=>{P(e.v,s),e.P.onload=void 0,$(n&&n.onload)&&n.onload(e.t,e.P)},O(e.P,n),O(e.P,e.I),e.P.src=a,D(e.u,e.P)},L=(e,t,o)=>{g.includes(t)||e.setAttribute(t,o)},N=e=>{P(e.v,i),e.$=!1},A=e=>{e.v.classList.remove(i,s,r),e.$=!0},F=e=>(e=l.cookie.match(`(^|;)\\s*${e}\\s*=\\s*([^;]+)`))?e.pop():'',G=(e,o,n)=>{const c=u[e],s=o.languages;c.forEach((c=>{if(!c.g&&s){const r=s[b],a=r&&r.loadBtn,d=r&&r.notice,f=r&&r.loadAllBtn,v=l.createElement('div'),u=x(),m=x(),p=x(),h=x();I(v,'cll'),c.u=v;const w=()=>{N(c),C(c,o)};if(a){const e=y();e.textContent=a,I(e,'c-l-b'),e.addEventListener(t,w),D(h,e)}if(f){const o=y();o.textContent=f,I(o,a?'c-la-b':'c-l-b'),o.addEventListener(t,(()=>{w(),_=t,z.acceptService(e)})),D(h,o)}const g=x(),$=x(),M=x(),O=x(),j=x();I(g,'cc-text'),I(O,'c-bg-i'),c.h=O,I(M,'c-ld'),S(c.i)&&''===c.i||I($,'c-bg');const k=c.o,E=l.createDocumentFragment();if(k){const e=T('span');I(e,'c-tl'),e.insertAdjacentHTML('beforeend',k),D(E,e)}D(g,E),u&&g.insertAdjacentHTML('beforeend',d||''),D(m,g),I(j,'c-t-cn'),I(m,'c-n-t'),I(p,'c-n-c'),I(u,'c-nt'),I(h,'c-n-a'),D(j,m),(a||f)&&D(j,h),D(p,j),D(u,p),D($,O),D(v,u),(o.thumbnailUrl||c.i)&&D(v,$),D(v,M),n&&P(c.v,i),c.v.prepend(v),c.g=!0,setTimeout((()=>P(c.v,'c-an')),20)}}))},H=(e,t)=>{const o=u[e];o.forEach((n=>{n._||((e,n)=>{m[n]||(m[n]=new IntersectionObserver((e=>{if(p[n])m[n].disconnect();else for(let c=0;c<e.length;++c)e[c].isIntersecting&&(c=>{const i=e[c].target,s=i.dataset.index;C(o[s],t),setTimeout((()=>{N(o[s])}),50*c),m[n].unobserve(i)})(c)}))),m[n].observe(e)})(n.v,e)}))},J=(e,t)=>e in t?e:M(t).length>0?b in t?b:M(t)[0]:void 0,V=(e,t)=>{const{cookie:o}=t;F(o.name)||(e=>{const{hostname:t,protocol:o}=location,n=e.name,c=new Date,i=e.path||'/',s=864e5*(e.expiration||182),r=e.sameSite||'Lax',a=e.domain||t;c.setTime(c.getTime()+s);let d=n+'=1'+(0!==s?`; Expires=${c.toUTCString()}`:'')+`; Path=${i}`+`; SameSite=${r}`;a.indexOf('.')>-1&&(d+=`; Domain=${a}`),'https:'===o&&(d+='; Secure'),l.cookie=d})(o),H(e,t)},W=(e,t)=>{const{cookie:o}=t;F(o.name)&&(e=>{const t=e.name,o=e.path||'/',n=e.domain||location.hostname;l.cookie=`${t}=; Path=${o}; Domain=${n}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`})(o),((e,t)=>{const o=u[e];for(let n=0;n<o.length;n++)(e=>{var n;o[e]._&&($(t.onReject)?(t.onReject(o[e].P,o[e].v,(()=>A(o[e]))),o[e]._=!1):((n=o[e]).P&&n.P.remove(),n._=!1)),A(o[e])})(n)})(e,t)},q=(e,t,o)=>{$(v)&&v({eventSource:{type:_,service:e,action:t},changedServices:o})},z={acceptService:t=>{const o=[];if('all'===t){for(const e of f)p[e]=!1,w.get(e)||(w.set(e,!0),V(e,h[e]),o.push(e));o.length>0&&q(t,n,o)}else f.includes(t)&&(p[t]=!1,w.get(t)||(w.set(t,!0),V(t,h[t]),o.push(t),q(t,n,o)));_=e},rejectService:e=>{const t=[];if('all'===e){for(const e of f)p[e]=!0,W(e,h[e]),w.get(e)&&(w.set(e,!1),t.push(e));t.length>0&&q(e,c,t)}else f.includes(e)&&(p[e]=!0,W(e,h[e]),w.get(e)&&(w.set(e,!1),t.push(e),q(e,c,t)))},childExists:async({parent:e=a,childProperty:t,childSelector:o='iframe',timeout:n=1e3,maxTimeout:c=15e3})=>{let i=1;const s=t?()=>e[t]:()=>e.querySelector(o);return new Promise((e=>{const t=()=>{if(s()||i++*n>c)return e(void 0!==s());setTimeout(t,n)};t()}))},getState:()=>({services:new Map(w),acceptedServices:[...w].filter((([,e])=>!!e)).map((([e])=>e))}),getConfig:()=>d,reset:()=>{(()=>{for(const e in m)Object.hasOwnProperty.call(m,e)&&m[e].disconnect()})(),a=void 0,l=void 0,d=void 0,h=void 0,v=void 0,u={},m={},p={},b='',h={},f=void 0,w=new Map,_=e,v=void 0},run:e=>{if(l=document,a=window,d=e,h=d.services,v=d.onChange,f=M(h),0===f.length)return;b=d.currLang;const t=h[f[0]].languages;!0===d.autoLang?b=J(navigator.language.slice(0,2).toLowerCase(),t):S(d.currLang)&&(b=J(d.currLang,t));for(const o of f){const e=h[o],t=e.cookie=e.cookie||{},n=t.name=t.name||`im_${o}`,c=F(n);w.set(o,!!c),u[o]=[];const i=l.querySelectorAll(`div[data-service="${o}"]`),s=i.length;if(0!==s){for(let e=0;e<s;e++)i[e].dataset.index=e,u[o].push(j(i[e]));c?(G(o,e,!0),H(o,e)):G(o,e,!1),k(o,e.thumbnailUrl)}}}},B='iframemanager';'undefined'==typeof window||$(window[B])||(window[B]=()=>z)})();

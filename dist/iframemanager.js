/*!
 * iframemanager v1.2.1
 * Author Orest Bida
 * Released under the MIT License
 */
(()=>{'use strict';const e='click',t='{data-id}',n='accept',o='reject',c='c-h-n',i='c-h-b',s='show-ph';let r,a,l,f,d,u={},v=!1,m='',p={},b=new Map,h='api';const w=['onload','onerror','src'],_=e=>'function'==typeof e,g=e=>'string'==typeof e,$=e=>a.createElement(e),S=()=>$('div'),I=()=>{const e=$('button');return e.type='button',e},T=(e,t)=>e.className=t,x=(e,t)=>e.classList.add(t),y=(e,t)=>e.appendChild(t),P=e=>e&&Object.keys(e)||[],D=(e,t)=>{for(const n in t)j(e,n,t[n])},O=e=>{const t=e.dataset,n={},o='data-iframe-',c=e.getAttributeNames().filter((e=>e.slice(0,12)===o)).map((e=>e.slice(12))),i=e.querySelector('[data-placeholder]'),s=i?.hasAttribute('data-visible');s&&i.removeAttribute('data-visible');const r=i?.cloneNode(!0);for(const t of c)n[t]=e.getAttribute(o+t);return{t:t.id,o:t.title,i:t.thumbnail,l:t.params,u:e,v:null,m:i,p:r,h:null,_:!1,g:!1,$:!0,S:'widget'in t,I:s,T:n}},k=(e,t)=>{const n=u[e];if('IntersectionObserver'in r){const e=new IntersectionObserver((o=>{for(const c of o)c.isIntersecting&&(E(t,n[c.target.dataset.index]),e.unobserve(c.target))}));for(const t of n)e.observe(t.u)}},E=(e,n)=>{const o=e=>{n.h.style.backgroundImage=`url('${e}')`;const t=new Image;t.onload=()=>x(n.h,'loaded'),t.src=e};if(g(n.i))''!==n.i&&o(n.i);else if(_(e))e(n.t,(e=>o(e)));else if(g(e)){const c=e.replace(t,n.t);o(c)}},M=(e,n)=>{if(e._)return;if(e._=!0,e.m){const t=e.p.cloneNode(!0);e.m.replaceWith(t),e.m=t}const o=n.iframe;if(_(n.onAccept))return void n.onAccept(e.u,(t=>{if(!(t instanceof HTMLIFrameElement))return!1;D(t,o),D(t,e.T),e.P=t,e._=!0,x(e.u,i),(!e.I||e.S)&&x(e.u,s)}));e.P=$('iframe');const c=e.l||n?.iframe?.params;let r=(n.embedUrl||'').replace(t,e.t);e.o&&(e.P.title=e.o),c&&g(c)&&(r+='?'===c.slice(0,1)?c:`?${c}`),e.P.onload=()=>{x(e.u,i),e.P.onload=void 0,_(o?.onload)&&o.onload(e.t,e.P)},D(e.P,o),D(e.P,e.T),e.P.src=r,y(e.v,e.P)},j=(e,t,n)=>{w.includes(t)||e.setAttribute(t,n)},C=e=>{x(e.u,c),e.$=!1},L=e=>{e.u.classList.remove(c,i,s),e.$=!0},N=e=>(e=a.cookie.match(`(^|;)\\s*${e}\\s*=\\s*([^;]+)`))?e.pop():'',A=(t,n,o)=>{const i=u[t],s=n.languages;i.forEach((i=>{if(!i.g&&s){const r=s[m]?.loadBtn,l=s[m]?.notice,f=s[m]?.loadAllBtn,d=a.createElement('div'),u=S(),v=S(),p=S(),b=S();T(d,'cll'),i.v=d;const w=()=>{C(i),M(i,n)};if(r){const t=I();t.textContent=r,T(t,'c-l-b'),t.addEventListener(e,w),y(b,t)}if(f){const n=I();n.textContent=f,T(n,r?'c-la-b':'c-l-b'),n.addEventListener(e,(()=>{w(),h=e,W.acceptService(t)})),y(b,n)}const _=S(),P=S(),D=S(),O=S(),k=S();T(_,'cc-text'),T(O,'c-bg-i'),i.h=O,T(D,'c-ld'),g(i.i)&&''===i.i||T(P,'c-bg');const E=i.o,j=a.createDocumentFragment();if(E){const e=$('span');T(e,'c-tl'),e.insertAdjacentHTML('beforeend',E),y(j,e)}y(_,j),u&&_.insertAdjacentHTML('beforeend',l||''),y(v,_),T(k,'c-t-cn'),T(v,'c-n-t'),T(p,'c-n-c'),T(u,'c-nt'),T(b,'c-n-a'),y(k,v),(r||f)&&y(k,b),y(p,k),y(u,p),y(P,O),y(d,u),(n.thumbnailUrl||i.i)&&y(d,P),y(d,D),o&&x(i.u,c),i.u.prepend(d),i.g=!0,setTimeout((()=>x(i.u,'c-an')),20)}}))},F=(e,t)=>{const n=u[e];if('IntersectionObserver'in r){const e=new IntersectionObserver((o=>{if(v)e.disconnect();else for(let c=0;c<o.length;++c)o[c].isIntersecting&&(c=>{const i=o[c].target;setTimeout((()=>{const e=i.dataset.index;M(n[e],t),C(n[e])}),50*c),e.unobserve(i)})(c)}));n.forEach((t=>{t._||e.observe(t.u)}))}},G=(e,t)=>e in t?e:P(t).length>0?m in t?m:P(t)[0]:void 0,H=(e,t)=>{const{cookie:n}=t;N(n.name)||(e=>{const{hostname:t,protocol:n}=location,o=e.name,c=new Date,i=e.path||'/',s=864e5*(e.expiration||182),r=e.sameSite||'Lax',l=e.domain||t;c.setTime(c.getTime()+s);let f=o+'=1'+(0!==s?`; Expires=${c.toUTCString()}`:'')+`; Path=${i}`+`; SameSite=${r}`;l.indexOf('.')>-1&&(f+=`; Domain=${l}`),'https:'===n&&(f+='; Secure'),a.cookie=f})(n),F(e,t)},J=(e,t)=>{const{cookie:n}=t;N(n.name)&&(e=>{const t=e.name,n=e.path||'/',o=e.domain||location.hostname;a.cookie=`${t}=; Path=${n}; Domain=${o}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`})(n),((e,t)=>{const n=u[e];for(let e=0;e<n.length;e++)(e=>{var o;n[e]._&&(_(t.onReject)?(t.onReject(n[e].P||n[e].u),n[e]._=!1):((o=n[e]).P.parentNode.removeChild(o.P),o._=!1)),L(n[e])})(e)})(e,t)},V=(e,t,n)=>{_(d)&&d({eventSource:{type:h,service:e,action:t},changedServices:n})},W={acceptService:e=>{v=!1;const t=[];if('all'===e){for(const e of f)b.get(e)||(b.set(e,!0),H(e,p[e]),t.push(e));t.length>0&&V(e,n,t)}else f.includes(e)&&(b.get(e)||(b.set(e,!0),H(e,p[e]),t.push(e),V(e,n,t)));h='api'},rejectService:e=>{const t=[];if('all'===e){v=!0;for(const e of f)J(e,p[e]),b.get(e)&&(b.set(e,!1),t.push(e));t.length>0&&V(e,o,t)}else f.includes(e)&&(J(e,p[e]),b.get(e)&&(b.set(e,!1),t.push(e),V(e,o,t)))},childExists:async({parent:e=r,childProperty:t,childSelector:n='iframe',timeout:o=1e3,maxTimeout:c=15e3})=>{let i=1;const s=t?()=>e[t]:()=>e.querySelector(n);return new Promise((e=>{const t=()=>{if(s()||i++*o>c)return e(void 0!==s());setTimeout(t,o)};t()}))},getState:()=>({services:new Map(b),acceptedServices:[...b].filter((([e,t])=>!!t)).map((([e])=>e))}),getConfig:()=>l,run:e=>{if(a=document,r=window,l=e,p=l.services,d=l.onChange,f=P(p),0===f.length)return;m=l.currLang;const t=p[f[0]].languages;!0===l.autoLang?m=G(navigator.language.slice(0,2).toLowerCase(),t):g(l.currLang)&&(m=G(l.currLang,t));for(const e of f){const t=p[e],n=t.cookie||={},o=n.name||=`im_${e}`,c=N(o);b.set(e,!!c),u[e]=[];const i=a.querySelectorAll(`div[data-service="${e}"]`),s=i.length;if(0!==s){for(let t=0;t<s;t++)i[t].dataset.index=t,u[e].push(O(i[t]));c?(A(e,t,!0),F(e,t)):A(e,t,!1),k(e,t.thumbnailUrl)}}}},q='iframemanager';'undefined'==typeof window||_(window[q])||(window[q]=()=>W)})();
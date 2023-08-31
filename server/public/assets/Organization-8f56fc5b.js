import{r as l,h as Fe,i as U,k as Le,_ as C,l as me,m as oe,n as K,o as G,p as $e,j as h,q,s as W,t as Y,v as J,w as Re,a as Oe,u as He,H as ze,E as Ae,L as re,C as Ue}from"./index-e6c64e51.js";import{N as be,P as Be}from"./NotFound-493fafad.js";import{u as Ke}from"./useQuery-f2eb694e.js";function Ge(t={}){const{disabled:e=!1,focusableWhenDisabled:n,href:s,rootRef:o,tabIndex:r,to:a,type:d}=t,u=l.useRef(),[c,m]=l.useState(!1),{isFocusVisibleRef:i,onFocus:f,onBlur:b,ref:x}=Fe(),[v,I]=l.useState(!1);e&&!n&&v&&I(!1),l.useEffect(()=>{i.current=v},[v,i]);const[R,L]=l.useState(""),w=p=>g=>{var P;v&&g.preventDefault(),(P=p.onMouseLeave)==null||P.call(p,g)},T=p=>g=>{var P;b(g),i.current===!1&&I(!1),(P=p.onBlur)==null||P.call(p,g)},D=p=>g=>{var P;if(u.current||(u.current=g.currentTarget),f(g),i.current===!0){var F;I(!0),(F=p.onFocusVisible)==null||F.call(p,g)}(P=p.onFocus)==null||P.call(p,g)},$=()=>{const p=u.current;return R==="BUTTON"||R==="INPUT"&&["button","submit","reset"].includes(p==null?void 0:p.type)||R==="A"&&(p==null?void 0:p.href)},H=p=>g=>{if(!e){var P;(P=p.onClick)==null||P.call(p,g)}},O=p=>g=>{var P;e||(m(!0),document.addEventListener("mouseup",()=>{m(!1)},{once:!0})),(P=p.onMouseDown)==null||P.call(p,g)},z=p=>g=>{var P;if((P=p.onKeyDown)==null||P.call(p,g),!g.defaultMuiPrevented&&(g.target===g.currentTarget&&!$()&&g.key===" "&&g.preventDefault(),g.target===g.currentTarget&&g.key===" "&&!e&&m(!0),g.target===g.currentTarget&&!$()&&g.key==="Enter"&&!e)){var F;(F=p.onClick)==null||F.call(p,g),g.preventDefault()}},A=p=>g=>{var P;if(g.target===g.currentTarget&&m(!1),(P=p.onKeyUp)==null||P.call(p,g),g.target===g.currentTarget&&!$()&&!e&&g.key===" "&&!g.defaultMuiPrevented){var F;(F=p.onClick)==null||F.call(p,g)}},V=l.useCallback(p=>{var g;L((g=p==null?void 0:p.tagName)!=null?g:"")},[]),M=U(V,o,x,u),k={};return R==="BUTTON"?(k.type=d??"button",n?k["aria-disabled"]=e:k.disabled=e):R!==""&&(!s&&!a&&(k.role="button",k.tabIndex=r??0),e&&(k["aria-disabled"]=e,k.tabIndex=n?r??0:-1)),{getRootProps:(p={})=>{const g=Le(t),P=C({},g,p);return delete P.onFocusVisible,C({type:d},P,k,{onBlur:T(P),onClick:H(P),onFocus:D(P),onKeyDown:z(P),onKeyUp:A(P),onMouseDown:O(P),onMouseLeave:w(P),ref:M})},focusVisible:v,setFocusVisible:I,active:c,rootRef:M}}const j={blur:"list:blur",focus:"list:focus",itemClick:"list:itemClick",itemHover:"list:itemHover",itemsChange:"list:itemsChange",keyDown:"list:keyDown",resetHighlight:"list:resetHighlight",textNavigation:"list:textNavigation"};function qe(t,e,n,s,o,r){if(n.length===0||!s&&n.every((d,u)=>o(d,u)))return-1;let a=t;for(;;){if(!r&&e==="next"&&a===n.length||!r&&e==="previous"&&a===-1)return-1;if(s?!1:o(n[a],a))a+=e==="next"?1:-1,r&&(a=(a+n.length)%n.length);else return a}}function _(t,e,n){var s;const{items:o,isItemDisabled:r,disableListWrap:a,disabledItemsFocusable:d,itemComparer:u,focusManagement:c}=n,m=c==="DOM"?0:-1,i=o.length-1,f=t==null?-1:o.findIndex(R=>u(R,t));let b,x,v=!a;switch(e){case"reset":if(m===-1)return null;b=0,x="next",v=!1;break;case"start":b=0,x="next",v=!1;break;case"end":b=i,x="previous",v=!1;break;default:{const R=f+e;R<0?!v&&f!==-1||Math.abs(e)>1?(b=0,x="next"):(b=i,x="previous"):R>i?!v||Math.abs(e)>1?(b=i,x="previous"):(b=0,x="next"):(b=R,x=e>=0?"next":"previous")}}const I=qe(b,x,o,d,r,v);return I===-1&&t!==null&&!r(t,f)?t:(s=o[I])!=null?s:null}function We(t,e,n,s){return n==="none"?[]:n==="single"?s(e[0],t)?e:[t]:e.some(o=>s(o,t))?e.filter(o=>!s(o,t)):[...e,t]}function Ie(t,e,n){const{itemComparer:s,isItemDisabled:o,selectionMode:r,items:a}=n,{selectedValues:d}=e,u=a.findIndex(m=>s(t,m));if(o(t,u))return e;const c=We(t,d,r,s);return C({},e,{selectedValues:c,highlightedValue:t})}function Ye(t,e,n){const s=e.highlightedValue,{orientation:o,pageSize:r}=n;switch(t){case"Home":return C({},e,{highlightedValue:_(s,"start",n)});case"End":return C({},e,{highlightedValue:_(s,"end",n)});case"PageUp":return C({},e,{highlightedValue:_(s,-r,n)});case"PageDown":return C({},e,{highlightedValue:_(s,r,n)});case"ArrowUp":if(o!=="vertical")break;return C({},e,{highlightedValue:_(s,-1,n)});case"ArrowDown":if(o!=="vertical")break;return C({},e,{highlightedValue:_(s,1,n)});case"ArrowLeft":{if(o==="vertical")break;return C({},e,{highlightedValue:_(s,o==="horizontal-ltr"?-1:1,n)})}case"ArrowRight":{if(o==="vertical")break;return C({},e,{highlightedValue:_(s,o==="horizontal-ltr"?1:-1,n)})}case"Enter":case" ":return e.highlightedValue===null?e:Ie(e.highlightedValue,e,n)}return e}function Je(t,e){return e.focusManagement==="DOM"?t:C({},t,{highlightedValue:null})}function Qe(t,e,n){var s;const o=(s=n(t))==null?void 0:s.trim().toLowerCase();return!o||o.length===0?!1:o.indexOf(e)===0}function Xe(t,e,n){const{items:s,isItemDisabled:o,disabledItemsFocusable:r,getItemAsString:a}=n,d=e.length>1;let u=d?t.highlightedValue:_(t.highlightedValue,1,n);for(let c=0;c<s.length;c+=1){if(!u||!d&&t.highlightedValue===u)return t;if(Qe(u,e,a)&&(!o(u,s.indexOf(u))||r))return C({},t,{highlightedValue:u});u=_(u,1,n)}return t}function Ze(t,e,n,s){var o;const{itemComparer:r,focusManagement:a}=s;let d=null;if(n.highlightedValue!=null){var u;d=(u=t.find(i=>r(i,n.highlightedValue)))!=null?u:null}else a==="DOM"&&e.length===0&&(d=_(null,"reset",s));const m=((o=n.selectedValues)!=null?o:[]).filter(i=>t.some(f=>r(f,i)));return C({},n,{highlightedValue:d,selectedValues:m})}function et(t,e){return C({},t,{highlightedValue:_(null,"reset",e)})}function ye(t,e){const{type:n,context:s}=e;switch(n){case j.keyDown:return Ye(e.key,t,s);case j.itemClick:return Ie(e.item,t,s);case j.blur:return Je(t,s);case j.textNavigation:return Xe(t,e.searchString,s);case j.itemsChange:return Ze(e.items,e.previousItems,t,s);case j.resetHighlight:return et(t,s);default:return t}}function tt(){const t=new Map;function e(s,o){let r=t.get(s);return r?r.add(o):(r=new Set([o]),t.set(s,r)),()=>{r.delete(o),r.size===0&&t.delete(s)}}function n(s,...o){const r=t.get(s);r&&r.forEach(a=>a(...o))}return{subscribe:e,publish:n}}function nt(){const t=l.useRef();return t.current||(t.current=tt()),t.current}const xe="select:change-selection",pe="select:change-highlight";function st(){const t=nt(),e=l.useCallback(r=>{t.publish(xe,r)},[t]),n=l.useCallback(r=>{t.publish(pe,r)},[t]),s=l.useCallback(r=>t.subscribe(xe,r),[t]),o=l.useCallback(r=>t.subscribe(pe,r),[t]);return{notifySelectionChanged:e,notifyHighlightChanged:n,registerSelectionChangeHandler:s,registerHighlightChangeHandler:o}}function ot(t,e){return t===e}const te={},Ce=()=>{};function le(t,e){const n=C({},t);return Object.keys(e).forEach(s=>{e[s]!==void 0&&(n[s]=e[s])}),n}function rt(t){const{nextState:e,initialState:n,stateComparers:s,onStateChange:o,controlledProps:r,lastActionRef:a}=t,d=l.useRef(n);l.useEffect(()=>{if(a.current===null)return;const u=le(d.current,r);Object.keys(e).forEach(c=>{var m;const i=(m=s[c])!=null?m:ot,f=e[c],b=u[c];if(b==null&&f!=null||b!=null&&f==null||b!=null&&f!=null&&!i(f,b)){var x,v;o==null||o((x=a.current.event)!=null?x:null,c,f,(v=a.current.type)!=null?v:"",e)}}),d.current=e,a.current=null},[d,e,a,o,s,r])}function lt(t){const e=l.useRef(null),{reducer:n,initialState:s,controlledProps:o=te,stateComparers:r=te,onStateChange:a=Ce,actionContext:d}=t,u=l.useCallback((f,b)=>{e.current=b;const x=le(f,o);return n(x,b)},[o,n]),[c,m]=l.useReducer(u,s),i=l.useCallback(f=>{m(C({},f,{context:d}))},[d]);return rt({nextState:c,initialState:s,stateComparers:r??te,onStateChange:a??Ce,controlledProps:o,lastActionRef:e}),[le(c,o),i]}function ve(t,e){const n=l.useRef(t);return l.useEffect(()=>{n.current=t},e??[t]),n}const at=500;function it(t){const e=l.useRef({searchString:"",lastTime:null});return l.useCallback(n=>{if(n.key.length===1&&n.key!==" "){const s=e.current,o=n.key.toLowerCase(),r=performance.now();s.searchString.length>0&&s.lastTime&&r-s.lastTime>at?s.searchString=o:(s.searchString.length!==1||o!==s.searchString)&&(s.searchString+=o),s.lastTime=r,t(s.searchString,n)}},[t])}const Pe={},ut=()=>{},ct=(t,e)=>t===e,dt=()=>!1,ft=t=>typeof t=="string"?t:String(t),gt=()=>({highlightedValue:null,selectedValues:[]});function ht(t){const{controlledProps:e=Pe,disabledItemsFocusable:n=!1,disableListWrap:s=!1,focusManagement:o="activeDescendant",getInitialState:r=gt,getItemDomElement:a,getItemId:d,isItemDisabled:u=dt,rootRef:c,onStateChange:m=ut,items:i,itemComparer:f=ct,getItemAsString:b=ft,onChange:x,onHighlightChange:v,onItemsChange:I,orientation:R="vertical",pageSize:L=5,reducerActionContext:w=Pe,selectionMode:T="single",stateReducer:D}=t,$=l.useRef(null),H=U(c,$),O=l.useCallback((S,y,E)=>{if(v==null||v(S,y,E),o==="DOM"&&y!=null&&(E===j.itemClick||E===j.keyDown||E===j.textNavigation)){var N;a==null||(N=a(y))==null||N.focus()}},[a,v,o]),z=l.useMemo(()=>({highlightedValue:f,selectedValues:(S,y)=>me(S,y,f)}),[f]),A=l.useCallback((S,y,E,N,ee)=>{switch(m==null||m(S,y,E,N,ee),y){case"highlightedValue":O(S,E,N);break;case"selectedValues":x==null||x(S,E,N);break}},[O,x,m]),V=l.useMemo(()=>({disabledItemsFocusable:n,disableListWrap:s,focusManagement:o,isItemDisabled:u,itemComparer:f,items:i,getItemAsString:b,onHighlightChange:O,orientation:R,pageSize:L,selectionMode:T,stateComparers:z}),[n,s,o,u,f,i,b,O,R,L,T,z]),M=r(),k=D??ye,ie=l.useMemo(()=>C({},w,V),[w,V]),[p,g]=lt({reducer:k,actionContext:ie,initialState:M,controlledProps:e,stateComparers:z,onStateChange:A}),{highlightedValue:P,selectedValues:F}=p,Me=it((S,y)=>g({type:j.textNavigation,event:y,searchString:S})),ue=ve(F),X=ve(P),Z=l.useRef([]);l.useEffect(()=>{me(Z.current,i,f)||(g({type:j.itemsChange,event:null,items:i,previousItems:Z.current}),Z.current=i,I==null||I(i))},[i,f,g,I]);const{notifySelectionChanged:ce,notifyHighlightChanged:de,registerHighlightChangeHandler:fe,registerSelectionChangeHandler:ge}=st();l.useEffect(()=>{ce(F)},[F,ce]),l.useEffect(()=>{de(P)},[P,de]);const Ee=S=>y=>{var E;if((E=S.onKeyDown)==null||E.call(S,y),y.defaultMuiPrevented)return;const N=["Home","End","PageUp","PageDown"];R==="vertical"?N.push("ArrowUp","ArrowDown"):N.push("ArrowLeft","ArrowRight"),o==="activeDescendant"&&N.push(" ","Enter"),N.includes(y.key)&&y.preventDefault(),g({type:j.keyDown,key:y.key,event:y}),Me(y)},Ne=S=>y=>{var E,N;(E=S.onBlur)==null||E.call(S,y),!y.defaultMuiPrevented&&((N=$.current)!=null&&N.contains(y.relatedTarget)||g({type:j.blur,event:y}))},je=(S={})=>C({},S,{"aria-activedescendant":o==="activeDescendant"&&P!=null?d(P):void 0,onBlur:Ne(S),onKeyDown:Ee(S),tabIndex:o==="DOM"?-1:0,ref:H}),he=l.useCallback(S=>{var y;const E=i.findIndex(B=>f(B,S)),N=((y=ue.current)!=null?y:[]).some(B=>B!=null&&f(S,B)),ee=u(S,E),_e=X.current!=null&&f(S,X.current);return{disabled:ee,focusable:o==="DOM",highlighted:_e,index:E,selected:N}},[i,u,f,ue,X,o]),De=l.useMemo(()=>({dispatch:g,getItemState:he,registerHighlightChangeHandler:fe,registerSelectionChangeHandler:ge}),[g,he,fe,ge]);return l.useDebugValue({state:p}),{contextValue:De,dispatch:g,getRootProps:je,rootRef:H,state:p}}function mt(){const[,t]=l.useState({});return l.useCallback(()=>{t({})},[])}const Te=l.createContext(null);function bt(t){const{handlePointerOverEvents:e=!1,item:n,rootRef:s}=t,o=l.useRef(null),r=U(o,s),a=l.useContext(Te);if(!a)throw new Error("useListItem must be used within a ListProvider");const{dispatch:d,getItemState:u,registerHighlightChangeHandler:c,registerSelectionChangeHandler:m}=a,{highlighted:i,selected:f,focusable:b}=u(n),x=mt();oe(()=>{function w(T){(T===n&&!i||T!==n&&i)&&x()}return c(w)}),oe(()=>{function w(T){f?T.includes(n)||x():T.includes(n)&&x()}return m(w)},[m,x,f,n]);const v=l.useCallback(w=>T=>{var D;(D=w.onClick)==null||D.call(w,T),!T.defaultPrevented&&d({type:j.itemClick,item:n,event:T})},[d,n]),I=l.useCallback(w=>T=>{var D;(D=w.onMouseOver)==null||D.call(w,T),!T.defaultPrevented&&d({type:j.itemHover,item:n,event:T})},[d,n]);let R;return b&&(R=i?0:-1),{getRootProps:(w={})=>C({},w,{onClick:v(w),onPointerOver:e?I(w):void 0,ref:r,tabIndex:R}),highlighted:i,rootRef:r,selected:f}}const Q=l.createContext(null);Q.displayName="CompoundComponentContext";function xt(t){const e=Array.from(t.keys()).map(n=>{const s=t.get(n);return{key:n,subitem:s}});return e.sort((n,s)=>{const o=n.subitem.ref.current,r=s.subitem.ref.current;return o===null||r===null||o===r?0:o.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}),new Map(e.map(n=>[n.key,n.subitem]))}function Se(){const[t,e]=l.useState(new Map),n=l.useRef(new Set),s=l.useCallback(function(c){n.current.delete(c),e(m=>{const i=new Map(m);return i.delete(c),i})},[]),o=l.useCallback(function(c,m){let i;return typeof c=="function"?i=c(n.current):i=c,n.current.add(i),e(f=>{const b=new Map(f);return b.set(i,m),b}),{id:i,deregister:()=>s(i)}},[s]),r=l.useMemo(()=>xt(t),[t]),a=l.useCallback(function(c){return Array.from(r.keys()).indexOf(c)},[r]);return{contextValue:l.useMemo(()=>({getItemIndex:a,registerItem:o,totalSubitemCount:t.size}),[a,o,t.size]),subitems:r}}function we(t,e){const n=l.useContext(Q);if(n===null)throw new Error("useCompoundItem must be used within a useCompoundParent");const{registerItem:s}=n,[o,r]=l.useState(typeof t=="function"?void 0:t);return oe(()=>{const{id:a,deregister:d}=s(t,e);return r(a),d},[s,e,t]),{id:o,index:o!==void 0?n.getItemIndex(o):-1,totalItemCount:n.totalSubitemCount}}function pt(t){return K("MuiTabPanel",t)}G("MuiTabPanel",["root","hidden"]);function Ct(t){return K("MuiTabs",t)}G("MuiTabs",["root","horizontal","vertical"]);function vt(t){const{value:e,defaultValue:n,onChange:s,orientation:o,direction:r,selectionFollowsFocus:a}=t,[d,u]=$e({controlled:e,default:n,name:"Tabs",state:"value"}),c=l.useCallback((I,R)=>{u(R),s==null||s(I,R)},[s,u]),{subitems:m,contextValue:i}=Se(),f=l.useRef(()=>{}),b=l.useCallback(I=>{var R;return(R=m.get(I))==null?void 0:R.id},[m]),x=l.useCallback(I=>f.current(I),[]),v=l.useCallback(I=>{f.current=I},[]);return{contextValue:C({direction:r,getTabId:x,getTabPanelId:b,onSelected:c,orientation:o,registerTabIdLookup:v,selectionFollowsFocus:a,value:d},i)}}const Ve=l.createContext(null);function ae(){const t=l.useContext(Ve);if(t==null)throw new Error("No TabsContext provided");return t}const Pt=Ve;function Rt(t){const{value:e,children:n}=t,{direction:s,getItemIndex:o,onSelected:r,orientation:a,registerItem:d,registerTabIdLookup:u,selectionFollowsFocus:c,totalSubitemCount:m,value:i,getTabId:f,getTabPanelId:b}=e,x=l.useMemo(()=>({getItemIndex:o,registerItem:d,totalSubitemCount:m}),[d,o,m]),v=l.useMemo(()=>({direction:s,getTabId:f,getTabPanelId:b,onSelected:r,orientation:a,registerTabIdLookup:u,selectionFollowsFocus:c,value:i}),[s,f,b,r,a,u,c,i]);return h.jsx(Q.Provider,{value:x,children:h.jsx(Pt.Provider,{value:v,children:n})})}const It=["children","value","defaultValue","orientation","direction","onChange","selectionFollowsFocus","slotProps","slots"],yt=t=>{const{orientation:e}=t;return Y({root:["root",e]},J(Ct))},Tt=l.forwardRef(function(e,n){var s;const{children:o,orientation:r="horizontal",direction:a="ltr",slotProps:d={},slots:u={}}=e,c=q(e,It),{contextValue:m}=vt(e),i=C({},e,{orientation:r,direction:a}),f=yt(i),b=(s=u.root)!=null?s:"div",x=W({elementType:b,externalSlotProps:d.root,externalForwardedProps:c,additionalProps:{ref:n},ownerState:i,className:f.root});return h.jsx(b,C({},x,{children:h.jsx(Rt,{value:m,children:o})}))}),St=Tt;function wt(t){return t.size}function Vt(t){const{value:e,id:n,rootRef:s}=t,o=ae();if(o===null)throw new Error("No TabContext provided");const{value:r,getTabId:a}=o,d=Re(n),u=l.useRef(null),c=U(u,s),m=l.useMemo(()=>({id:d,ref:u}),[d]),{id:i}=we(e??wt,m),f=i!==r,b=i!==void 0?a(i):void 0;return{hidden:f,getRootProps:()=>({"aria-labelledby":b??void 0,hidden:f,id:d??void 0,ref:c}),rootRef:c}}const kt=["children","value","slotProps","slots"],Mt=t=>{const{hidden:e}=t;return Y({root:["root",e&&"hidden"]},J(pt))},Et=l.forwardRef(function(e,n){var s;const{children:o,slotProps:r={},slots:a={}}=e,d=q(e,kt),{hidden:u,getRootProps:c}=Vt(e),m=C({},e,{hidden:u}),i=Mt(m),f=(s=a.root)!=null?s:"div",b=W({elementType:f,getSlotProps:c,externalSlotProps:r.root,externalForwardedProps:d,additionalProps:{role:"tabpanel",ref:n},ownerState:m,className:i.root});return h.jsx(f,C({},b,{children:!u&&o}))}),ne=Et;function Nt(t){return K("MuiTabsList",t)}G("MuiTabsList",["root","horizontal","vertical"]);const ke={valueChange:"valueChange"};function jt(t,e){if(e.type===ke.valueChange)return C({},t,{highlightedValue:e.value});const n=ye(t,e),{context:{selectionFollowsFocus:s}}=e;if(e.type===j.itemsChange){if(n.selectedValues.length>0)return C({},n,{highlightedValue:n.selectedValues[0]});_(null,"reset",e.context)}return s&&n.highlightedValue!=null?C({},n,{selectedValues:[n.highlightedValue]}):n}function Dt(t){var e;const{rootRef:n}=t,{direction:s="ltr",onSelected:o,orientation:r="horizontal",value:a,registerTabIdLookup:d,selectionFollowsFocus:u}=ae(),{subitems:c,contextValue:m}=Se(),i=l.useCallback(V=>{var M;return(M=c.get(V))==null?void 0:M.id},[c]);d(i);const f=l.useMemo(()=>Array.from(c.keys()),[c]),b=l.useCallback(V=>{var M,k;return V==null?null:(M=(k=c.get(V))==null?void 0:k.ref.current)!=null?M:null},[c]),x=s==="rtl";let v;r==="vertical"?v="vertical":v=x?"horizontal-rtl":"horizontal-ltr";const I=l.useCallback((V,M)=>{var k;o(V,(k=M[0])!=null?k:null)},[o]),R=l.useMemo(()=>a===void 0?{}:a!=null?{selectedValues:[a]}:{selectedValues:[]},[a]),L=l.useCallback(V=>{var M,k;return(M=(k=c.get(V))==null?void 0:k.disabled)!=null?M:!1},[c]),{contextValue:w,dispatch:T,getRootProps:D,state:{highlightedValue:$,selectedValues:H},rootRef:O}=ht({controlledProps:R,disabledItemsFocusable:!u,focusManagement:"DOM",getItemDomElement:b,isItemDisabled:L,items:f,rootRef:n,onChange:I,orientation:v,reducerActionContext:l.useMemo(()=>({selectionFollowsFocus:u||!1}),[u]),selectionMode:"single",stateReducer:jt});l.useEffect(()=>{a!==void 0&&a!=null&&T({type:ke.valueChange,value:a})},[T,a]);const z=(V={})=>C({},V,D(V),{"aria-orientation":r==="vertical"?"vertical":void 0,role:"tablist"});return{contextValue:l.useMemo(()=>C({},m,w),[m,w]),dispatch:T,getRootProps:z,highlightedValue:$,isRtl:x,orientation:r,rootRef:O,selectedValue:(e=H[0])!=null?e:null}}function _t(t){const{value:e,children:n}=t,{dispatch:s,getItemIndex:o,getItemState:r,registerHighlightChangeHandler:a,registerSelectionChangeHandler:d,registerItem:u,totalSubitemCount:c}=e,m=l.useMemo(()=>({dispatch:s,getItemState:r,getItemIndex:o,registerHighlightChangeHandler:a,registerSelectionChangeHandler:d}),[s,o,r,a,d]),i=l.useMemo(()=>({getItemIndex:o,registerItem:u,totalSubitemCount:c}),[u,o,c]);return h.jsx(Q.Provider,{value:i,children:h.jsx(Te.Provider,{value:m,children:n})})}const Ft=["children","slotProps","slots"],Lt=t=>{const{orientation:e}=t;return Y({root:["root",e]},J(Nt))},$t=l.forwardRef(function(e,n){var s;const{children:o,slotProps:r={},slots:a={}}=e,d=q(e,Ft),{isRtl:u,orientation:c,getRootProps:m,contextValue:i}=Dt({rootRef:n}),f=C({},e,{isRtl:u,orientation:c}),b=Lt(f),x=(s=a.root)!=null?s:"div",v=W({elementType:x,getSlotProps:m,externalSlotProps:r.root,externalForwardedProps:d,ownerState:f,className:b.root});return h.jsx(_t,{value:i,children:h.jsx(x,C({},v,{children:o}))})}),Ot=$t;function Ht(t){return K("MuiTab",t)}G("MuiTab",["root","selected","disabled"]);function zt(t){return t.size}function At(t){const{value:e,rootRef:n,disabled:s=!1,id:o}=t,r=l.useRef(null),a=Re(o),{value:d,selectionFollowsFocus:u,getTabPanelId:c}=ae(),m=l.useMemo(()=>({disabled:s,ref:r,id:a}),[s,r,a]),{id:i,index:f,totalItemCount:b}=we(e??zt,m),{getRootProps:x,rootRef:v,highlighted:I,selected:R}=bt({item:i}),{getRootProps:L,rootRef:w,active:T,focusVisible:D,setFocusVisible:$}=Ge({disabled:s,focusableWhenDisabled:!u,type:"button"}),H=U(r,n,v,w),O=i!==void 0?c(i):void 0;return{getRootProps:(A={})=>{const V=C({},A,x(A)),M=C({},V,L(V));return C({},M,{role:"tab","aria-controls":O,"aria-selected":R,id:a,ref:H})},active:T,focusVisible:D,highlighted:I,index:f,rootRef:H,selected:R||i===d,setFocusVisible:$,totalTabsCount:b}}const Ut=["action","children","value","disabled","onChange","onClick","onFocus","slotProps","slots"],Bt=t=>{const{selected:e,disabled:n}=t;return Y({root:["root",e&&"selected",n&&"disabled"]},J(Ht))},Kt=l.forwardRef(function(e,n){var s;const{children:o,disabled:r=!1,slotProps:a={},slots:d={}}=e,u=q(e,Ut),c=l.useRef(),m=U(c,n),{active:i,highlighted:f,selected:b,getRootProps:x}=At(C({},e,{rootRef:m})),v=C({},e,{active:i,disabled:r,highlighted:f,selected:b}),I=Bt(v),R=(s=d.root)!=null?s:"button",L=W({elementType:R,getSlotProps:x,externalSlotProps:a.root,externalForwardedProps:u,additionalProps:{ref:n},ownerState:v,className:I.root});return h.jsx(R,C({},L,{children:o}))}),se=Kt;function Gt(t){return Ke({queryKey:["organization_page",t.query],staleTime:1e3*60,queryFn:async()=>{const{data:e}=await Oe.get("/api/organization-pages?name="+t.query);return e},onError(e){console.error("Error when fetching search results: ",e)},onSuccess(e){console.log("Succesfully fetched search results: ",e)}})}const qt=(t,e)=>t.length===0&&e.length===0?h.jsx(h.Fragment,{children:" "}):h.jsxs("div",{className:"pb-4 grid",children:[h.jsx("h4",{children:"Ota yhteyttä"}),t.length===0?h.jsx(h.Fragment,{children:" "}):h.jsx(re,{to:"tel:"+t,children:t}),e.length===0?h.jsx(h.Fragment,{children:" "}):h.jsx(re,{to:"mailto:"+e,children:e})]}),Wt=h.jsx("main",{className:"grid h-screen place-items-center text-white","aria-busy":!0,children:h.jsx(Ue,{color:"inherit"})});function Zt(){const{organization_name:t}=He();if(!t)return h.jsx(l.Suspense,{children:h.jsx(be,{})});const{data:e,isLoading:n,isError:s}=Gt({query:decodeURI(t.replace(/-/g," "))});if(n)return Wt;if(!e||s)return h.jsx(l.Suspense,{children:h.jsx(be,{})});const o="https://www.google.com/maps/dir/?api=1&destination="+encodeURI(`${e.organization.address.street} ${e.organization.address.zipcode} ${e.organization.address.city} ${e.organization.address.state} ${e.organization.address.country}`),r=qt(e.organization.contact_info.phone,e.organization.contact_info.email),a="?s="+decodeURI(t.replace(/-/g," "));return h.jsxs(h.Fragment,{children:[h.jsx(ze,{}),h.jsxs("main",{className:"max-w-4xl m-auto",children:[h.jsx("div",{children:h.jsx(Be,{image_id:e.image_id,width:820,height:312})}),h.jsxs("div",{className:"text-white m-4 min-h-screen",children:[h.jsx("h1",{className:" text-center",children:e.organization.name}),h.jsxs(St,{defaultValue:1,className:" m-2",children:[h.jsxs(Ot,{className:"flex justify-evenly gap-2 md:gap-4",children:[h.jsx(se,{value:1,className:"w-[100%] p-1 bg-primary-main rounded-lg",children:"Yleistä"}),h.jsx(se,{value:2,className:"w-[100%] p-1 bg-primary-main rounded-lg",children:"Tapahtumat"}),h.jsx(se,{value:3,className:"w-[100%] p-1 bg-primary-main rounded-lg",children:"Yhteystiedot"})]}),h.jsx(ne,{value:1,children:h.jsx("section",{className:"mt-8 bg-white text-black p-4 rounded-2xl",children:h.jsx("div",{className:"w-fit m-auto",dangerouslySetInnerHTML:{__html:e.data}})})}),h.jsx(ne,{value:2,children:h.jsx("section",{className:"mt-8",children:h.jsx(Ae,{query:a})})}),h.jsx(ne,{value:3,children:h.jsx("section",{className:"mt-8 bg-white text-black p-4 rounded-2xl",children:h.jsxs("div",{className:"w-fit m-auto",children:[r,h.jsxs("h4",{children:[e.organization.address.street,", ",e.organization.address.zipcode," ",e.organization.address.city]}),h.jsxs("p",{children:[e.organization.address.state,", ",e.organization.address.country]}),h.jsx(re,{to:o,children:"Reittiohjeet"})]})})})]})]})]})]})}export{Zt as default};
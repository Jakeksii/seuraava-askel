import{r as l,_ as p,g as K,d as G,j as m,a as W,e as q,K as Le,L as oe,D as Fe}from"./index-61f7dc01.js";import{a as $e,H as Oe}from"./Header-863b29e6.js";import{N as me,P as He}from"./NotFound-c14e9b1d.js";import{u as ze}from"./useQuery-236a5edc.js";import{u as Ae,a as U,e as Ue,b as re,c as Be,d as Y,f as J,g as Re}from"./App-e5d30cbc.js";function be(t,e,n=(s,o)=>s===o){return t.length===e.length&&t.every((s,o)=>n(s,e[o]))}function Ke(t={}){const{disabled:e=!1,focusableWhenDisabled:n,href:s,rootRef:o,tabIndex:r,to:a,type:d}=t,u=l.useRef(),[c,h]=l.useState(!1),{isFocusVisibleRef:i,onFocus:f,onBlur:b,ref:x}=Ae(),[v,I]=l.useState(!1);e&&!n&&v&&I(!1),l.useEffect(()=>{i.current=v},[v,i]);const[R,F]=l.useState(""),w=C=>g=>{var P;v&&g.preventDefault(),(P=C.onMouseLeave)==null||P.call(C,g)},S=C=>g=>{var P;b(g),i.current===!1&&I(!1),(P=C.onBlur)==null||P.call(C,g)},D=C=>g=>{var P;if(u.current||(u.current=g.currentTarget),f(g),i.current===!0){var L;I(!0),(L=C.onFocusVisible)==null||L.call(C,g)}(P=C.onFocus)==null||P.call(C,g)},$=()=>{const C=u.current;return R==="BUTTON"||R==="INPUT"&&["button","submit","reset"].includes(C==null?void 0:C.type)||R==="A"&&(C==null?void 0:C.href)},H=C=>g=>{if(!e){var P;(P=C.onClick)==null||P.call(C,g)}},O=C=>g=>{var P;e||(h(!0),document.addEventListener("mouseup",()=>{h(!1)},{once:!0})),(P=C.onMouseDown)==null||P.call(C,g)},z=C=>g=>{var P;if((P=C.onKeyDown)==null||P.call(C,g),!g.defaultMuiPrevented&&(g.target===g.currentTarget&&!$()&&g.key===" "&&g.preventDefault(),g.target===g.currentTarget&&g.key===" "&&!e&&h(!0),g.target===g.currentTarget&&!$()&&g.key==="Enter"&&!e)){var L;(L=C.onClick)==null||L.call(C,g),g.preventDefault()}},A=C=>g=>{var P;if(g.target===g.currentTarget&&h(!1),(P=C.onKeyUp)==null||P.call(C,g),g.target===g.currentTarget&&!$()&&!e&&g.key===" "&&!g.defaultMuiPrevented){var L;(L=C.onClick)==null||L.call(C,g)}},V=l.useCallback(C=>{var g;F((g=C==null?void 0:C.tagName)!=null?g:"")},[]),M=U(V,o,x,u),k={};return R==="BUTTON"?(k.type=d??"button",n?k["aria-disabled"]=e:k.disabled=e):R!==""&&(!s&&!a&&(k.role="button",k.tabIndex=r??0),e&&(k["aria-disabled"]=e,k.tabIndex=n?r??0:-1)),{getRootProps:(C={})=>{const g=Ue(t),P=p({},g,C);return delete P.onFocusVisible,p({type:d},P,k,{onBlur:S(P),onClick:H(P),onFocus:D(P),onKeyDown:z(P),onKeyUp:A(P),onMouseDown:O(P),onMouseLeave:w(P),ref:M})},focusVisible:v,setFocusVisible:I,active:c,rootRef:M}}const j={blur:"list:blur",focus:"list:focus",itemClick:"list:itemClick",itemHover:"list:itemHover",itemsChange:"list:itemsChange",keyDown:"list:keyDown",resetHighlight:"list:resetHighlight",textNavigation:"list:textNavigation"};function Ge(t,e,n,s,o,r){if(n.length===0||!s&&n.every((d,u)=>o(d,u)))return-1;let a=t;for(;;){if(!r&&e==="next"&&a===n.length||!r&&e==="previous"&&a===-1)return-1;if(s?!1:o(n[a],a))a+=e==="next"?1:-1,r&&(a=(a+n.length)%n.length);else return a}}function _(t,e,n){var s;const{items:o,isItemDisabled:r,disableListWrap:a,disabledItemsFocusable:d,itemComparer:u,focusManagement:c}=n,h=c==="DOM"?0:-1,i=o.length-1,f=t==null?-1:o.findIndex(R=>u(R,t));let b,x,v=!a;switch(e){case"reset":if(h===-1)return null;b=0,x="next",v=!1;break;case"start":b=0,x="next",v=!1;break;case"end":b=i,x="previous",v=!1;break;default:{const R=f+e;R<0?!v&&f!==-1||Math.abs(e)>1?(b=0,x="next"):(b=i,x="previous"):R>i?!v||Math.abs(e)>1?(b=i,x="previous"):(b=0,x="next"):(b=R,x=e>=0?"next":"previous")}}const I=Ge(b,x,o,d,r,v);return I===-1&&t!==null&&!r(t,f)?t:(s=o[I])!=null?s:null}function We(t,e,n,s){return n==="none"?[]:n==="single"?s(e[0],t)?e:[t]:e.some(o=>s(o,t))?e.filter(o=>!s(o,t)):[...e,t]}function Ie(t,e,n){const{itemComparer:s,isItemDisabled:o,selectionMode:r,items:a}=n,{selectedValues:d}=e,u=a.findIndex(h=>s(t,h));if(o(t,u))return e;const c=We(t,d,r,s);return p({},e,{selectedValues:c,highlightedValue:t})}function qe(t,e,n){const s=e.highlightedValue,{orientation:o,pageSize:r}=n;switch(t){case"Home":return p({},e,{highlightedValue:_(s,"start",n)});case"End":return p({},e,{highlightedValue:_(s,"end",n)});case"PageUp":return p({},e,{highlightedValue:_(s,-r,n)});case"PageDown":return p({},e,{highlightedValue:_(s,r,n)});case"ArrowUp":if(o!=="vertical")break;return p({},e,{highlightedValue:_(s,-1,n)});case"ArrowDown":if(o!=="vertical")break;return p({},e,{highlightedValue:_(s,1,n)});case"ArrowLeft":{if(o==="vertical")break;return p({},e,{highlightedValue:_(s,o==="horizontal-ltr"?-1:1,n)})}case"ArrowRight":{if(o==="vertical")break;return p({},e,{highlightedValue:_(s,o==="horizontal-ltr"?1:-1,n)})}case"Enter":case" ":return e.highlightedValue===null?e:Ie(e.highlightedValue,e,n)}return e}function Ye(t,e){return e.focusManagement==="DOM"?t:p({},t,{highlightedValue:null})}function Je(t,e,n){var s;const o=(s=n(t))==null?void 0:s.trim().toLowerCase();return!o||o.length===0?!1:o.indexOf(e)===0}function Qe(t,e,n){const{items:s,isItemDisabled:o,disabledItemsFocusable:r,getItemAsString:a}=n,d=e.length>1;let u=d?t.highlightedValue:_(t.highlightedValue,1,n);for(let c=0;c<s.length;c+=1){if(!u||!d&&t.highlightedValue===u)return t;if(Je(u,e,a)&&(!o(u,s.indexOf(u))||r))return p({},t,{highlightedValue:u});u=_(u,1,n)}return t}function Xe(t,e,n,s){var o;const{itemComparer:r,focusManagement:a}=s;let d=null;if(n.highlightedValue!=null){var u;d=(u=t.find(i=>r(i,n.highlightedValue)))!=null?u:null}else a==="DOM"&&e.length===0&&(d=_(null,"reset",s));const h=((o=n.selectedValues)!=null?o:[]).filter(i=>t.some(f=>r(f,i)));return p({},n,{highlightedValue:d,selectedValues:h})}function Ze(t,e){return p({},t,{highlightedValue:_(null,"reset",e)})}function Te(t,e){const{type:n,context:s}=e;switch(n){case j.keyDown:return qe(e.key,t,s);case j.itemClick:return Ie(e.item,t,s);case j.blur:return Ye(t,s);case j.textNavigation:return Qe(t,e.searchString,s);case j.itemsChange:return Xe(e.items,e.previousItems,t,s);case j.resetHighlight:return Ze(t,s);default:return t}}function et(){const t=new Map;function e(s,o){let r=t.get(s);return r?r.add(o):(r=new Set([o]),t.set(s,r)),()=>{r.delete(o),r.size===0&&t.delete(s)}}function n(s,...o){const r=t.get(s);r&&r.forEach(a=>a(...o))}return{subscribe:e,publish:n}}function tt(){const t=l.useRef();return t.current||(t.current=et()),t.current}const xe="select:change-selection",Ce="select:change-highlight";function nt(){const t=tt(),e=l.useCallback(r=>{t.publish(xe,r)},[t]),n=l.useCallback(r=>{t.publish(Ce,r)},[t]),s=l.useCallback(r=>t.subscribe(xe,r),[t]),o=l.useCallback(r=>t.subscribe(Ce,r),[t]);return{notifySelectionChanged:e,notifyHighlightChanged:n,registerSelectionChangeHandler:s,registerHighlightChangeHandler:o}}function st(t,e){return t===e}const te={},pe=()=>{};function le(t,e){const n=p({},t);return Object.keys(e).forEach(s=>{e[s]!==void 0&&(n[s]=e[s])}),n}function ot(t){const{nextState:e,initialState:n,stateComparers:s,onStateChange:o,controlledProps:r,lastActionRef:a}=t,d=l.useRef(n);l.useEffect(()=>{if(a.current===null)return;const u=le(d.current,r);Object.keys(e).forEach(c=>{var h;const i=(h=s[c])!=null?h:st,f=e[c],b=u[c];if(b==null&&f!=null||b!=null&&f==null||b!=null&&f!=null&&!i(f,b)){var x,v;o==null||o((x=a.current.event)!=null?x:null,c,f,(v=a.current.type)!=null?v:"",e)}}),d.current=e,a.current=null},[d,e,a,o,s,r])}function rt(t){const e=l.useRef(null),{reducer:n,initialState:s,controlledProps:o=te,stateComparers:r=te,onStateChange:a=pe,actionContext:d}=t,u=l.useCallback((f,b)=>{e.current=b;const x=le(f,o);return n(x,b)},[o,n]),[c,h]=l.useReducer(u,s),i=l.useCallback(f=>{h(p({},f,{context:d}))},[d]);return ot({nextState:c,initialState:s,stateComparers:r??te,onStateChange:a??pe,controlledProps:o,lastActionRef:e}),[le(c,o),i]}function ve(t,e){const n=l.useRef(t);return l.useEffect(()=>{n.current=t},e??[t]),n}const lt=500;function at(t){const e=l.useRef({searchString:"",lastTime:null});return l.useCallback(n=>{if(n.key.length===1&&n.key!==" "){const s=e.current,o=n.key.toLowerCase(),r=performance.now();s.searchString.length>0&&s.lastTime&&r-s.lastTime>lt?s.searchString=o:(s.searchString.length!==1||o!==s.searchString)&&(s.searchString+=o),s.lastTime=r,t(s.searchString,n)}},[t])}const Pe={},it=()=>{},ut=(t,e)=>t===e,ct=()=>!1,dt=t=>typeof t=="string"?t:String(t),ft=()=>({highlightedValue:null,selectedValues:[]});function gt(t){const{controlledProps:e=Pe,disabledItemsFocusable:n=!1,disableListWrap:s=!1,focusManagement:o="activeDescendant",getInitialState:r=ft,getItemDomElement:a,getItemId:d,isItemDisabled:u=ct,rootRef:c,onStateChange:h=it,items:i,itemComparer:f=ut,getItemAsString:b=dt,onChange:x,onHighlightChange:v,onItemsChange:I,orientation:R="vertical",pageSize:F=5,reducerActionContext:w=Pe,selectionMode:S="single",stateReducer:D}=t,$=l.useRef(null),H=U(c,$),O=l.useCallback((y,T,N)=>{if(v==null||v(y,T,N),o==="DOM"&&T!=null&&(N===j.itemClick||N===j.keyDown||N===j.textNavigation)){var E;a==null||(E=a(T))==null||E.focus()}},[a,v,o]),z=l.useMemo(()=>({highlightedValue:f,selectedValues:(y,T)=>be(y,T,f)}),[f]),A=l.useCallback((y,T,N,E,ee)=>{switch(h==null||h(y,T,N,E,ee),T){case"highlightedValue":O(y,N,E);break;case"selectedValues":x==null||x(y,N,E);break}},[O,x,h]),V=l.useMemo(()=>({disabledItemsFocusable:n,disableListWrap:s,focusManagement:o,isItemDisabled:u,itemComparer:f,items:i,getItemAsString:b,onHighlightChange:O,orientation:R,pageSize:F,selectionMode:S,stateComparers:z}),[n,s,o,u,f,i,b,O,R,F,S,z]),M=r(),k=D??Te,ie=l.useMemo(()=>p({},w,V),[w,V]),[C,g]=rt({reducer:k,actionContext:ie,initialState:M,controlledProps:e,stateComparers:z,onStateChange:A}),{highlightedValue:P,selectedValues:L}=C,Me=at((y,T)=>g({type:j.textNavigation,event:T,searchString:y})),ue=ve(L),X=ve(P),Z=l.useRef([]);l.useEffect(()=>{be(Z.current,i,f)||(g({type:j.itemsChange,event:null,items:i,previousItems:Z.current}),Z.current=i,I==null||I(i))},[i,f,g,I]);const{notifySelectionChanged:ce,notifyHighlightChanged:de,registerHighlightChangeHandler:fe,registerSelectionChangeHandler:ge}=nt();l.useEffect(()=>{ce(L)},[L,ce]),l.useEffect(()=>{de(P)},[P,de]);const Ne=y=>T=>{var N;if((N=y.onKeyDown)==null||N.call(y,T),T.defaultMuiPrevented)return;const E=["Home","End","PageUp","PageDown"];R==="vertical"?E.push("ArrowUp","ArrowDown"):E.push("ArrowLeft","ArrowRight"),o==="activeDescendant"&&E.push(" ","Enter"),E.includes(T.key)&&T.preventDefault(),g({type:j.keyDown,key:T.key,event:T}),Me(T)},Ee=y=>T=>{var N,E;(N=y.onBlur)==null||N.call(y,T),!T.defaultMuiPrevented&&((E=$.current)!=null&&E.contains(T.relatedTarget)||g({type:j.blur,event:T}))},je=(y={})=>p({},y,{"aria-activedescendant":o==="activeDescendant"&&P!=null?d(P):void 0,onBlur:Ee(y),onKeyDown:Ne(y),tabIndex:o==="DOM"?-1:0,ref:H}),he=l.useCallback(y=>{var T;const N=i.findIndex(B=>f(B,y)),E=((T=ue.current)!=null?T:[]).some(B=>B!=null&&f(y,B)),ee=u(y,N),_e=X.current!=null&&f(y,X.current);return{disabled:ee,focusable:o==="DOM",highlighted:_e,index:N,selected:E}},[i,u,f,ue,X,o]),De=l.useMemo(()=>({dispatch:g,getItemState:he,registerHighlightChangeHandler:fe,registerSelectionChangeHandler:ge}),[g,he,fe,ge]);return l.useDebugValue({state:C}),{contextValue:De,dispatch:g,getRootProps:je,rootRef:H,state:C}}function ht(){const[,t]=l.useState({});return l.useCallback(()=>{t({})},[])}const Se=l.createContext(null);function mt(t){const{handlePointerOverEvents:e=!1,item:n,rootRef:s}=t,o=l.useRef(null),r=U(o,s),a=l.useContext(Se);if(!a)throw new Error("useListItem must be used within a ListProvider");const{dispatch:d,getItemState:u,registerHighlightChangeHandler:c,registerSelectionChangeHandler:h}=a,{highlighted:i,selected:f,focusable:b}=u(n),x=ht();re(()=>{function w(S){(S===n&&!i||S!==n&&i)&&x()}return c(w)}),re(()=>{function w(S){f?S.includes(n)||x():S.includes(n)&&x()}return h(w)},[h,x,f,n]);const v=l.useCallback(w=>S=>{var D;(D=w.onClick)==null||D.call(w,S),!S.defaultPrevented&&d({type:j.itemClick,item:n,event:S})},[d,n]),I=l.useCallback(w=>S=>{var D;(D=w.onMouseOver)==null||D.call(w,S),!S.defaultPrevented&&d({type:j.itemHover,item:n,event:S})},[d,n]);let R;return b&&(R=i?0:-1),{getRootProps:(w={})=>p({},w,{onClick:v(w),onPointerOver:e?I(w):void 0,ref:r,tabIndex:R}),highlighted:i,rootRef:r,selected:f}}const Q=l.createContext(null);Q.displayName="CompoundComponentContext";function bt(t){const e=Array.from(t.keys()).map(n=>{const s=t.get(n);return{key:n,subitem:s}});return e.sort((n,s)=>{const o=n.subitem.ref.current,r=s.subitem.ref.current;return o===null||r===null||o===r?0:o.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}),new Map(e.map(n=>[n.key,n.subitem]))}function ye(){const[t,e]=l.useState(new Map),n=l.useRef(new Set),s=l.useCallback(function(c){n.current.delete(c),e(h=>{const i=new Map(h);return i.delete(c),i})},[]),o=l.useCallback(function(c,h){let i;return typeof c=="function"?i=c(n.current):i=c,n.current.add(i),e(f=>{const b=new Map(f);return b.set(i,h),b}),{id:i,deregister:()=>s(i)}},[s]),r=l.useMemo(()=>bt(t),[t]),a=l.useCallback(function(c){return Array.from(r.keys()).indexOf(c)},[r]);return{contextValue:l.useMemo(()=>({getItemIndex:a,registerItem:o,totalSubitemCount:t.size}),[a,o,t.size]),subitems:r}}function we(t,e){const n=l.useContext(Q);if(n===null)throw new Error("useCompoundItem must be used within a useCompoundParent");const{registerItem:s}=n,[o,r]=l.useState(typeof t=="function"?void 0:t);return re(()=>{const{id:a,deregister:d}=s(t,e);return r(a),d},[s,e,t]),{id:o,index:o!==void 0?n.getItemIndex(o):-1,totalItemCount:n.totalSubitemCount}}function xt(t){return K("MuiTabPanel",t)}G("MuiTabPanel",["root","hidden"]);function Ct(t){return K("MuiTabs",t)}G("MuiTabs",["root","horizontal","vertical"]);function pt(t){const{value:e,defaultValue:n,onChange:s,orientation:o,direction:r,selectionFollowsFocus:a}=t,[d,u]=Be({controlled:e,default:n,name:"Tabs",state:"value"}),c=l.useCallback((I,R)=>{u(R),s==null||s(I,R)},[s,u]),{subitems:h,contextValue:i}=ye(),f=l.useRef(()=>{}),b=l.useCallback(I=>{var R;return(R=h.get(I))==null?void 0:R.id},[h]),x=l.useCallback(I=>f.current(I),[]),v=l.useCallback(I=>{f.current=I},[]);return{contextValue:p({direction:r,getTabId:x,getTabPanelId:b,onSelected:c,orientation:o,registerTabIdLookup:v,selectionFollowsFocus:a,value:d},i)}}const Ve=l.createContext(null);function ae(){const t=l.useContext(Ve);if(t==null)throw new Error("No TabsContext provided");return t}const vt=Ve;function Pt(t){const{value:e,children:n}=t,{direction:s,getItemIndex:o,onSelected:r,orientation:a,registerItem:d,registerTabIdLookup:u,selectionFollowsFocus:c,totalSubitemCount:h,value:i,getTabId:f,getTabPanelId:b}=e,x=l.useMemo(()=>({getItemIndex:o,registerItem:d,totalSubitemCount:h}),[d,o,h]),v=l.useMemo(()=>({direction:s,getTabId:f,getTabPanelId:b,onSelected:r,orientation:a,registerTabIdLookup:u,selectionFollowsFocus:c,value:i}),[s,f,b,r,a,u,c,i]);return m.jsx(Q.Provider,{value:x,children:m.jsx(vt.Provider,{value:v,children:n})})}const Rt=["children","value","defaultValue","orientation","direction","onChange","selectionFollowsFocus","slotProps","slots"],It=t=>{const{orientation:e}=t;return q({root:["root",e]},J(Ct))},Tt=l.forwardRef(function(e,n){var s;const{children:o,orientation:r="horizontal",direction:a="ltr",slotProps:d={},slots:u={}}=e,c=W(e,Rt),{contextValue:h}=pt(e),i=p({},e,{orientation:r,direction:a}),f=It(i),b=(s=u.root)!=null?s:"div",x=Y({elementType:b,externalSlotProps:d.root,externalForwardedProps:c,additionalProps:{ref:n},ownerState:i,className:f.root});return m.jsx(b,p({},x,{children:m.jsx(Pt,{value:h,children:o})}))}),St=Tt;function yt(t){return t.size}function wt(t){const{value:e,id:n,rootRef:s}=t,o=ae();if(o===null)throw new Error("No TabContext provided");const{value:r,getTabId:a}=o,d=Re(n),u=l.useRef(null),c=U(u,s),h=l.useMemo(()=>({id:d,ref:u}),[d]),{id:i}=we(e??yt,h),f=i!==r,b=i!==void 0?a(i):void 0;return{hidden:f,getRootProps:()=>({"aria-labelledby":b??void 0,hidden:f,id:d??void 0,ref:c}),rootRef:c}}const Vt=["children","value","slotProps","slots"],kt=t=>{const{hidden:e}=t;return q({root:["root",e&&"hidden"]},J(xt))},Mt=l.forwardRef(function(e,n){var s;const{children:o,slotProps:r={},slots:a={}}=e,d=W(e,Vt),{hidden:u,getRootProps:c}=wt(e),h=p({},e,{hidden:u}),i=kt(h),f=(s=a.root)!=null?s:"div",b=Y({elementType:f,getSlotProps:c,externalSlotProps:r.root,externalForwardedProps:d,additionalProps:{role:"tabpanel",ref:n},ownerState:h,className:i.root});return m.jsx(f,p({},b,{children:!u&&o}))}),ne=Mt;function Nt(t){return K("MuiTabsList",t)}G("MuiTabsList",["root","horizontal","vertical"]);const ke={valueChange:"valueChange"};function Et(t,e){if(e.type===ke.valueChange)return p({},t,{highlightedValue:e.value});const n=Te(t,e),{context:{selectionFollowsFocus:s}}=e;if(e.type===j.itemsChange){if(n.selectedValues.length>0)return p({},n,{highlightedValue:n.selectedValues[0]});_(null,"reset",e.context)}return s&&n.highlightedValue!=null?p({},n,{selectedValues:[n.highlightedValue]}):n}function jt(t){var e;const{rootRef:n}=t,{direction:s="ltr",onSelected:o,orientation:r="horizontal",value:a,registerTabIdLookup:d,selectionFollowsFocus:u}=ae(),{subitems:c,contextValue:h}=ye(),i=l.useCallback(V=>{var M;return(M=c.get(V))==null?void 0:M.id},[c]);d(i);const f=l.useMemo(()=>Array.from(c.keys()),[c]),b=l.useCallback(V=>{var M,k;return V==null?null:(M=(k=c.get(V))==null?void 0:k.ref.current)!=null?M:null},[c]),x=s==="rtl";let v;r==="vertical"?v="vertical":v=x?"horizontal-rtl":"horizontal-ltr";const I=l.useCallback((V,M)=>{var k;o(V,(k=M[0])!=null?k:null)},[o]),R=l.useMemo(()=>a===void 0?{}:a!=null?{selectedValues:[a]}:{selectedValues:[]},[a]),F=l.useCallback(V=>{var M,k;return(M=(k=c.get(V))==null?void 0:k.disabled)!=null?M:!1},[c]),{contextValue:w,dispatch:S,getRootProps:D,state:{highlightedValue:$,selectedValues:H},rootRef:O}=gt({controlledProps:R,disabledItemsFocusable:!u,focusManagement:"DOM",getItemDomElement:b,isItemDisabled:F,items:f,rootRef:n,onChange:I,orientation:v,reducerActionContext:l.useMemo(()=>({selectionFollowsFocus:u||!1}),[u]),selectionMode:"single",stateReducer:Et});l.useEffect(()=>{a!==void 0&&a!=null&&S({type:ke.valueChange,value:a})},[S,a]);const z=(V={})=>p({},V,D(V),{"aria-orientation":r==="vertical"?"vertical":void 0,role:"tablist"});return{contextValue:l.useMemo(()=>p({},h,w),[h,w]),dispatch:S,getRootProps:z,highlightedValue:$,isRtl:x,orientation:r,rootRef:O,selectedValue:(e=H[0])!=null?e:null}}function Dt(t){const{value:e,children:n}=t,{dispatch:s,getItemIndex:o,getItemState:r,registerHighlightChangeHandler:a,registerSelectionChangeHandler:d,registerItem:u,totalSubitemCount:c}=e,h=l.useMemo(()=>({dispatch:s,getItemState:r,getItemIndex:o,registerHighlightChangeHandler:a,registerSelectionChangeHandler:d}),[s,o,r,a,d]),i=l.useMemo(()=>({getItemIndex:o,registerItem:u,totalSubitemCount:c}),[u,o,c]);return m.jsx(Q.Provider,{value:i,children:m.jsx(Se.Provider,{value:h,children:n})})}const _t=["children","slotProps","slots"],Lt=t=>{const{orientation:e}=t;return q({root:["root",e]},J(Nt))},Ft=l.forwardRef(function(e,n){var s;const{children:o,slotProps:r={},slots:a={}}=e,d=W(e,_t),{isRtl:u,orientation:c,getRootProps:h,contextValue:i}=jt({rootRef:n}),f=p({},e,{isRtl:u,orientation:c}),b=Lt(f),x=(s=a.root)!=null?s:"div",v=Y({elementType:x,getSlotProps:h,externalSlotProps:r.root,externalForwardedProps:d,ownerState:f,className:b.root});return m.jsx(Dt,{value:i,children:m.jsx(x,p({},v,{children:o}))})}),$t=Ft;function Ot(t){return K("MuiTab",t)}G("MuiTab",["root","selected","disabled"]);function Ht(t){return t.size}function zt(t){const{value:e,rootRef:n,disabled:s=!1,id:o}=t,r=l.useRef(null),a=Re(o),{value:d,selectionFollowsFocus:u,getTabPanelId:c}=ae(),h=l.useMemo(()=>({disabled:s,ref:r,id:a}),[s,r,a]),{id:i,index:f,totalItemCount:b}=we(e??Ht,h),{getRootProps:x,rootRef:v,highlighted:I,selected:R}=mt({item:i}),{getRootProps:F,rootRef:w,active:S,focusVisible:D,setFocusVisible:$}=Ke({disabled:s,focusableWhenDisabled:!u,type:"button"}),H=U(r,n,v,w),O=i!==void 0?c(i):void 0;return{getRootProps:(A={})=>{const V=p({},A,x(A)),M=p({},V,F(V));return p({},M,{role:"tab","aria-controls":O,"aria-selected":R,id:a,ref:H})},active:S,focusVisible:D,highlighted:I,index:f,rootRef:H,selected:R||i===d,setFocusVisible:$,totalTabsCount:b}}const At=["action","children","value","disabled","onChange","onClick","onFocus","slotProps","slots"],Ut=t=>{const{selected:e,disabled:n}=t;return q({root:["root",e&&"selected",n&&"disabled"]},J(Ot))},Bt=l.forwardRef(function(e,n){var s;const{children:o,disabled:r=!1,slotProps:a={},slots:d={}}=e,u=W(e,At),c=l.useRef(),h=U(c,n),{active:i,highlighted:f,selected:b,getRootProps:x}=zt(p({},e,{rootRef:h})),v=p({},e,{active:i,disabled:r,highlighted:f,selected:b}),I=Ut(v),R=(s=d.root)!=null?s:"button",F=Y({elementType:R,getSlotProps:x,externalSlotProps:a.root,externalForwardedProps:u,additionalProps:{ref:n},ownerState:v,className:I.root});return m.jsx(R,p({},F,{children:o}))}),se=Bt;function Kt(t){return ze({queryKey:["organization_page",t.query],staleTime:1e3*60,queryFn:async()=>{const{data:e}=await $e.get("/api/organization-pages?name="+t.query);return e},onError(e){console.error("Error when fetching search results: ",e)},onSuccess(e){console.log("Succesfully fetched search results: ",e)}})}const Gt=(t,e)=>t.length===0&&e.length===0?m.jsx(m.Fragment,{children:" "}):m.jsxs("div",{className:"pb-4 grid",children:[m.jsx("h4",{children:"Ota yhteyttä"}),t.length===0?m.jsx(m.Fragment,{children:" "}):m.jsx(oe,{to:"tel:"+t,children:t}),e.length===0?m.jsx(m.Fragment,{children:" "}):m.jsx(oe,{to:"mailto:"+e,children:e})]}),Wt=m.jsx("main",{className:"grid h-screen place-items-center text-white","aria-busy":!0,children:m.jsx(Fe,{color:"inherit"})});function en(){const{organization_name:t}=Le();if(!t)return m.jsx(l.Suspense,{children:m.jsx(me,{})});const{data:e,isLoading:n,isError:s}=Kt({query:decodeURI(t.replace(/-/g," "))});if(n)return Wt;if(!e||s)return m.jsx(l.Suspense,{children:m.jsx(me,{})});const o="https://www.google.com/maps/dir/?api=1&destination="+encodeURI(`${e.organization.address.street} ${e.organization.address.zipcode} ${e.organization.address.city} ${e.organization.address.state} ${e.organization.address.country}`),r=Gt(e.organization.contact_info.phone,e.organization.contact_info.email);return m.jsxs(m.Fragment,{children:[m.jsx(Oe,{}),m.jsxs("main",{className:"max-w-4xl m-auto",children:[m.jsx("div",{children:m.jsx(He,{image_id:e.image_id,width:820,height:312})}),m.jsxs("div",{className:"text-white m-4 min-h-screen",children:[m.jsx("h1",{className:" text-center",children:e.organization.name}),m.jsxs(St,{defaultValue:1,className:" m-2",children:[m.jsxs($t,{className:"flex justify-evenly gap-2 md:gap-4",children:[m.jsx(se,{value:1,className:"w-[100%] p-1 bg-blue-500 rounded-lg",children:"Yleistä"}),m.jsx(se,{value:2,className:"w-[100%] p-1 bg-blue-500 rounded-lg",children:"Tapahtumat"}),m.jsx(se,{value:3,className:"w-[100%] p-1 bg-blue-500 rounded-lg",children:"Yhteystiedot"})]}),m.jsx(ne,{value:1,children:m.jsx("section",{className:"mt-8 bg-white text-black p-4 rounded-2xl",children:m.jsx("div",{className:"w-fit m-auto",dangerouslySetInnerHTML:{__html:e.data}})})}),m.jsx(ne,{value:2,children:m.jsx("section",{className:"mt-8",children:"Event feed"})}),m.jsx(ne,{value:3,children:m.jsx("section",{className:"mt-8 bg-white text-black p-4 rounded-2xl",children:m.jsxs("div",{className:"w-fit m-auto",children:[r,m.jsxs("h4",{children:[e.organization.address.street,", ",e.organization.address.zipcode," ",e.organization.address.city]}),m.jsxs("p",{children:[e.organization.address.state,", ",e.organization.address.country]}),m.jsx(oe,{to:o,children:"Reittiohjeet"})]})})})]})]})]})]})}export{en as default};

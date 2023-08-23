import{r,h as Fe,i as U,k as Le,_ as p,l as oe,m as K,n as G,o as $e,j as h,p as q,q as W,s as Y,t as J,v as Re,a as Oe,u as He,w as ze,H as Ae,E as Ue,L as le,C as Be}from"./index-d4fd8919.js";import{N as me,P as Ke}from"./NotFound-b3050bfc.js";import{u as Ge}from"./useQuery-135ef443.js";function be(t,e,n=(s,o)=>s===o){return t.length===e.length&&t.every((s,o)=>n(s,e[o]))}function qe(t={}){const{disabled:e=!1,focusableWhenDisabled:n,href:s,rootRef:o,tabIndex:l,to:a,type:d}=t,u=r.useRef(),[c,m]=r.useState(!1),{isFocusVisibleRef:i,onFocus:f,onBlur:b,ref:x}=Fe(),[v,I]=r.useState(!1);e&&!n&&v&&I(!1),r.useEffect(()=>{i.current=v},[v,i]);const[R,L]=r.useState(""),w=C=>g=>{var P;v&&g.preventDefault(),(P=C.onMouseLeave)==null||P.call(C,g)},S=C=>g=>{var P;b(g),i.current===!1&&I(!1),(P=C.onBlur)==null||P.call(C,g)},D=C=>g=>{var P;if(u.current||(u.current=g.currentTarget),f(g),i.current===!0){var F;I(!0),(F=C.onFocusVisible)==null||F.call(C,g)}(P=C.onFocus)==null||P.call(C,g)},$=()=>{const C=u.current;return R==="BUTTON"||R==="INPUT"&&["button","submit","reset"].includes(C==null?void 0:C.type)||R==="A"&&(C==null?void 0:C.href)},H=C=>g=>{if(!e){var P;(P=C.onClick)==null||P.call(C,g)}},O=C=>g=>{var P;e||(m(!0),document.addEventListener("mouseup",()=>{m(!1)},{once:!0})),(P=C.onMouseDown)==null||P.call(C,g)},z=C=>g=>{var P;if((P=C.onKeyDown)==null||P.call(C,g),!g.defaultMuiPrevented&&(g.target===g.currentTarget&&!$()&&g.key===" "&&g.preventDefault(),g.target===g.currentTarget&&g.key===" "&&!e&&m(!0),g.target===g.currentTarget&&!$()&&g.key==="Enter"&&!e)){var F;(F=C.onClick)==null||F.call(C,g),g.preventDefault()}},A=C=>g=>{var P;if(g.target===g.currentTarget&&m(!1),(P=C.onKeyUp)==null||P.call(C,g),g.target===g.currentTarget&&!$()&&!e&&g.key===" "&&!g.defaultMuiPrevented){var F;(F=C.onClick)==null||F.call(C,g)}},V=r.useCallback(C=>{var g;L((g=C==null?void 0:C.tagName)!=null?g:"")},[]),M=U(V,o,x,u),k={};return R==="BUTTON"?(k.type=d??"button",n?k["aria-disabled"]=e:k.disabled=e):R!==""&&(!s&&!a&&(k.role="button",k.tabIndex=l??0),e&&(k["aria-disabled"]=e,k.tabIndex=n?l??0:-1)),{getRootProps:(C={})=>{const g=Le(t),P=p({},g,C);return delete P.onFocusVisible,p({type:d},P,k,{onBlur:S(P),onClick:H(P),onFocus:D(P),onKeyDown:z(P),onKeyUp:A(P),onMouseDown:O(P),onMouseLeave:w(P),ref:M})},focusVisible:v,setFocusVisible:I,active:c,rootRef:M}}const j={blur:"list:blur",focus:"list:focus",itemClick:"list:itemClick",itemHover:"list:itemHover",itemsChange:"list:itemsChange",keyDown:"list:keyDown",resetHighlight:"list:resetHighlight",textNavigation:"list:textNavigation"};function We(t,e,n,s,o,l){if(n.length===0||!s&&n.every((d,u)=>o(d,u)))return-1;let a=t;for(;;){if(!l&&e==="next"&&a===n.length||!l&&e==="previous"&&a===-1)return-1;if(s?!1:o(n[a],a))a+=e==="next"?1:-1,l&&(a=(a+n.length)%n.length);else return a}}function _(t,e,n){var s;const{items:o,isItemDisabled:l,disableListWrap:a,disabledItemsFocusable:d,itemComparer:u,focusManagement:c}=n,m=c==="DOM"?0:-1,i=o.length-1,f=t==null?-1:o.findIndex(R=>u(R,t));let b,x,v=!a;switch(e){case"reset":if(m===-1)return null;b=0,x="next",v=!1;break;case"start":b=0,x="next",v=!1;break;case"end":b=i,x="previous",v=!1;break;default:{const R=f+e;R<0?!v&&f!==-1||Math.abs(e)>1?(b=0,x="next"):(b=i,x="previous"):R>i?!v||Math.abs(e)>1?(b=i,x="previous"):(b=0,x="next"):(b=R,x=e>=0?"next":"previous")}}const I=We(b,x,o,d,l,v);return I===-1&&t!==null&&!l(t,f)?t:(s=o[I])!=null?s:null}function Ye(t,e,n,s){return n==="none"?[]:n==="single"?s(e[0],t)?e:[t]:e.some(o=>s(o,t))?e.filter(o=>!s(o,t)):[...e,t]}function Ie(t,e,n){const{itemComparer:s,isItemDisabled:o,selectionMode:l,items:a}=n,{selectedValues:d}=e,u=a.findIndex(m=>s(t,m));if(o(t,u))return e;const c=Ye(t,d,l,s);return p({},e,{selectedValues:c,highlightedValue:t})}function Je(t,e,n){const s=e.highlightedValue,{orientation:o,pageSize:l}=n;switch(t){case"Home":return p({},e,{highlightedValue:_(s,"start",n)});case"End":return p({},e,{highlightedValue:_(s,"end",n)});case"PageUp":return p({},e,{highlightedValue:_(s,-l,n)});case"PageDown":return p({},e,{highlightedValue:_(s,l,n)});case"ArrowUp":if(o!=="vertical")break;return p({},e,{highlightedValue:_(s,-1,n)});case"ArrowDown":if(o!=="vertical")break;return p({},e,{highlightedValue:_(s,1,n)});case"ArrowLeft":{if(o==="vertical")break;return p({},e,{highlightedValue:_(s,o==="horizontal-ltr"?-1:1,n)})}case"ArrowRight":{if(o==="vertical")break;return p({},e,{highlightedValue:_(s,o==="horizontal-ltr"?1:-1,n)})}case"Enter":case" ":return e.highlightedValue===null?e:Ie(e.highlightedValue,e,n)}return e}function Qe(t,e){return e.focusManagement==="DOM"?t:p({},t,{highlightedValue:null})}function Xe(t,e,n){var s;const o=(s=n(t))==null?void 0:s.trim().toLowerCase();return!o||o.length===0?!1:o.indexOf(e)===0}function Ze(t,e,n){const{items:s,isItemDisabled:o,disabledItemsFocusable:l,getItemAsString:a}=n,d=e.length>1;let u=d?t.highlightedValue:_(t.highlightedValue,1,n);for(let c=0;c<s.length;c+=1){if(!u||!d&&t.highlightedValue===u)return t;if(Xe(u,e,a)&&(!o(u,s.indexOf(u))||l))return p({},t,{highlightedValue:u});u=_(u,1,n)}return t}function et(t,e,n,s){var o;const{itemComparer:l,focusManagement:a}=s;let d=null;if(n.highlightedValue!=null){var u;d=(u=t.find(i=>l(i,n.highlightedValue)))!=null?u:null}else a==="DOM"&&e.length===0&&(d=_(null,"reset",s));const m=((o=n.selectedValues)!=null?o:[]).filter(i=>t.some(f=>l(f,i)));return p({},n,{highlightedValue:d,selectedValues:m})}function tt(t,e){return p({},t,{highlightedValue:_(null,"reset",e)})}function Te(t,e){const{type:n,context:s}=e;switch(n){case j.keyDown:return Je(e.key,t,s);case j.itemClick:return Ie(e.item,t,s);case j.blur:return Qe(t,s);case j.textNavigation:return Ze(t,e.searchString,s);case j.itemsChange:return et(e.items,e.previousItems,t,s);case j.resetHighlight:return tt(t,s);default:return t}}function nt(){const t=new Map;function e(s,o){let l=t.get(s);return l?l.add(o):(l=new Set([o]),t.set(s,l)),()=>{l.delete(o),l.size===0&&t.delete(s)}}function n(s,...o){const l=t.get(s);l&&l.forEach(a=>a(...o))}return{subscribe:e,publish:n}}function st(){const t=r.useRef();return t.current||(t.current=nt()),t.current}const xe="select:change-selection",Ce="select:change-highlight";function ot(){const t=st(),e=r.useCallback(l=>{t.publish(xe,l)},[t]),n=r.useCallback(l=>{t.publish(Ce,l)},[t]),s=r.useCallback(l=>t.subscribe(xe,l),[t]),o=r.useCallback(l=>t.subscribe(Ce,l),[t]);return{notifySelectionChanged:e,notifyHighlightChanged:n,registerSelectionChangeHandler:s,registerHighlightChangeHandler:o}}function lt(t,e){return t===e}const te={},pe=()=>{};function re(t,e){const n=p({},t);return Object.keys(e).forEach(s=>{e[s]!==void 0&&(n[s]=e[s])}),n}function rt(t){const{nextState:e,initialState:n,stateComparers:s,onStateChange:o,controlledProps:l,lastActionRef:a}=t,d=r.useRef(n);r.useEffect(()=>{if(a.current===null)return;const u=re(d.current,l);Object.keys(e).forEach(c=>{var m;const i=(m=s[c])!=null?m:lt,f=e[c],b=u[c];if(b==null&&f!=null||b!=null&&f==null||b!=null&&f!=null&&!i(f,b)){var x,v;o==null||o((x=a.current.event)!=null?x:null,c,f,(v=a.current.type)!=null?v:"",e)}}),d.current=e,a.current=null},[d,e,a,o,s,l])}function at(t){const e=r.useRef(null),{reducer:n,initialState:s,controlledProps:o=te,stateComparers:l=te,onStateChange:a=pe,actionContext:d}=t,u=r.useCallback((f,b)=>{e.current=b;const x=re(f,o);return n(x,b)},[o,n]),[c,m]=r.useReducer(u,s),i=r.useCallback(f=>{m(p({},f,{context:d}))},[d]);return rt({nextState:c,initialState:s,stateComparers:l??te,onStateChange:a??pe,controlledProps:o,lastActionRef:e}),[re(c,o),i]}function ve(t,e){const n=r.useRef(t);return r.useEffect(()=>{n.current=t},e??[t]),n}const it=500;function ut(t){const e=r.useRef({searchString:"",lastTime:null});return r.useCallback(n=>{if(n.key.length===1&&n.key!==" "){const s=e.current,o=n.key.toLowerCase(),l=performance.now();s.searchString.length>0&&s.lastTime&&l-s.lastTime>it?s.searchString=o:(s.searchString.length!==1||o!==s.searchString)&&(s.searchString+=o),s.lastTime=l,t(s.searchString,n)}},[t])}const Pe={},ct=()=>{},dt=(t,e)=>t===e,ft=()=>!1,gt=t=>typeof t=="string"?t:String(t),ht=()=>({highlightedValue:null,selectedValues:[]});function mt(t){const{controlledProps:e=Pe,disabledItemsFocusable:n=!1,disableListWrap:s=!1,focusManagement:o="activeDescendant",getInitialState:l=ht,getItemDomElement:a,getItemId:d,isItemDisabled:u=ft,rootRef:c,onStateChange:m=ct,items:i,itemComparer:f=dt,getItemAsString:b=gt,onChange:x,onHighlightChange:v,onItemsChange:I,orientation:R="vertical",pageSize:L=5,reducerActionContext:w=Pe,selectionMode:S="single",stateReducer:D}=t,$=r.useRef(null),H=U(c,$),O=r.useCallback((y,T,E)=>{if(v==null||v(y,T,E),o==="DOM"&&T!=null&&(E===j.itemClick||E===j.keyDown||E===j.textNavigation)){var N;a==null||(N=a(T))==null||N.focus()}},[a,v,o]),z=r.useMemo(()=>({highlightedValue:f,selectedValues:(y,T)=>be(y,T,f)}),[f]),A=r.useCallback((y,T,E,N,ee)=>{switch(m==null||m(y,T,E,N,ee),T){case"highlightedValue":O(y,E,N);break;case"selectedValues":x==null||x(y,E,N);break}},[O,x,m]),V=r.useMemo(()=>({disabledItemsFocusable:n,disableListWrap:s,focusManagement:o,isItemDisabled:u,itemComparer:f,items:i,getItemAsString:b,onHighlightChange:O,orientation:R,pageSize:L,selectionMode:S,stateComparers:z}),[n,s,o,u,f,i,b,O,R,L,S,z]),M=l(),k=D??Te,ie=r.useMemo(()=>p({},w,V),[w,V]),[C,g]=at({reducer:k,actionContext:ie,initialState:M,controlledProps:e,stateComparers:z,onStateChange:A}),{highlightedValue:P,selectedValues:F}=C,Me=ut((y,T)=>g({type:j.textNavigation,event:T,searchString:y})),ue=ve(F),X=ve(P),Z=r.useRef([]);r.useEffect(()=>{be(Z.current,i,f)||(g({type:j.itemsChange,event:null,items:i,previousItems:Z.current}),Z.current=i,I==null||I(i))},[i,f,g,I]);const{notifySelectionChanged:ce,notifyHighlightChanged:de,registerHighlightChangeHandler:fe,registerSelectionChangeHandler:ge}=ot();r.useEffect(()=>{ce(F)},[F,ce]),r.useEffect(()=>{de(P)},[P,de]);const Ee=y=>T=>{var E;if((E=y.onKeyDown)==null||E.call(y,T),T.defaultMuiPrevented)return;const N=["Home","End","PageUp","PageDown"];R==="vertical"?N.push("ArrowUp","ArrowDown"):N.push("ArrowLeft","ArrowRight"),o==="activeDescendant"&&N.push(" ","Enter"),N.includes(T.key)&&T.preventDefault(),g({type:j.keyDown,key:T.key,event:T}),Me(T)},Ne=y=>T=>{var E,N;(E=y.onBlur)==null||E.call(y,T),!T.defaultMuiPrevented&&((N=$.current)!=null&&N.contains(T.relatedTarget)||g({type:j.blur,event:T}))},je=(y={})=>p({},y,{"aria-activedescendant":o==="activeDescendant"&&P!=null?d(P):void 0,onBlur:Ne(y),onKeyDown:Ee(y),tabIndex:o==="DOM"?-1:0,ref:H}),he=r.useCallback(y=>{var T;const E=i.findIndex(B=>f(B,y)),N=((T=ue.current)!=null?T:[]).some(B=>B!=null&&f(y,B)),ee=u(y,E),_e=X.current!=null&&f(y,X.current);return{disabled:ee,focusable:o==="DOM",highlighted:_e,index:E,selected:N}},[i,u,f,ue,X,o]),De=r.useMemo(()=>({dispatch:g,getItemState:he,registerHighlightChangeHandler:fe,registerSelectionChangeHandler:ge}),[g,he,fe,ge]);return r.useDebugValue({state:C}),{contextValue:De,dispatch:g,getRootProps:je,rootRef:H,state:C}}function bt(){const[,t]=r.useState({});return r.useCallback(()=>{t({})},[])}const Se=r.createContext(null);function xt(t){const{handlePointerOverEvents:e=!1,item:n,rootRef:s}=t,o=r.useRef(null),l=U(o,s),a=r.useContext(Se);if(!a)throw new Error("useListItem must be used within a ListProvider");const{dispatch:d,getItemState:u,registerHighlightChangeHandler:c,registerSelectionChangeHandler:m}=a,{highlighted:i,selected:f,focusable:b}=u(n),x=bt();oe(()=>{function w(S){(S===n&&!i||S!==n&&i)&&x()}return c(w)}),oe(()=>{function w(S){f?S.includes(n)||x():S.includes(n)&&x()}return m(w)},[m,x,f,n]);const v=r.useCallback(w=>S=>{var D;(D=w.onClick)==null||D.call(w,S),!S.defaultPrevented&&d({type:j.itemClick,item:n,event:S})},[d,n]),I=r.useCallback(w=>S=>{var D;(D=w.onMouseOver)==null||D.call(w,S),!S.defaultPrevented&&d({type:j.itemHover,item:n,event:S})},[d,n]);let R;return b&&(R=i?0:-1),{getRootProps:(w={})=>p({},w,{onClick:v(w),onPointerOver:e?I(w):void 0,ref:l,tabIndex:R}),highlighted:i,rootRef:l,selected:f}}const Q=r.createContext(null);Q.displayName="CompoundComponentContext";function Ct(t){const e=Array.from(t.keys()).map(n=>{const s=t.get(n);return{key:n,subitem:s}});return e.sort((n,s)=>{const o=n.subitem.ref.current,l=s.subitem.ref.current;return o===null||l===null||o===l?0:o.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}),new Map(e.map(n=>[n.key,n.subitem]))}function ye(){const[t,e]=r.useState(new Map),n=r.useRef(new Set),s=r.useCallback(function(c){n.current.delete(c),e(m=>{const i=new Map(m);return i.delete(c),i})},[]),o=r.useCallback(function(c,m){let i;return typeof c=="function"?i=c(n.current):i=c,n.current.add(i),e(f=>{const b=new Map(f);return b.set(i,m),b}),{id:i,deregister:()=>s(i)}},[s]),l=r.useMemo(()=>Ct(t),[t]),a=r.useCallback(function(c){return Array.from(l.keys()).indexOf(c)},[l]);return{contextValue:r.useMemo(()=>({getItemIndex:a,registerItem:o,totalSubitemCount:t.size}),[a,o,t.size]),subitems:l}}function we(t,e){const n=r.useContext(Q);if(n===null)throw new Error("useCompoundItem must be used within a useCompoundParent");const{registerItem:s}=n,[o,l]=r.useState(typeof t=="function"?void 0:t);return oe(()=>{const{id:a,deregister:d}=s(t,e);return l(a),d},[s,e,t]),{id:o,index:o!==void 0?n.getItemIndex(o):-1,totalItemCount:n.totalSubitemCount}}function pt(t){return K("MuiTabPanel",t)}G("MuiTabPanel",["root","hidden"]);function vt(t){return K("MuiTabs",t)}G("MuiTabs",["root","horizontal","vertical"]);function Pt(t){const{value:e,defaultValue:n,onChange:s,orientation:o,direction:l,selectionFollowsFocus:a}=t,[d,u]=$e({controlled:e,default:n,name:"Tabs",state:"value"}),c=r.useCallback((I,R)=>{u(R),s==null||s(I,R)},[s,u]),{subitems:m,contextValue:i}=ye(),f=r.useRef(()=>{}),b=r.useCallback(I=>{var R;return(R=m.get(I))==null?void 0:R.id},[m]),x=r.useCallback(I=>f.current(I),[]),v=r.useCallback(I=>{f.current=I},[]);return{contextValue:p({direction:l,getTabId:x,getTabPanelId:b,onSelected:c,orientation:o,registerTabIdLookup:v,selectionFollowsFocus:a,value:d},i)}}const Ve=r.createContext(null);function ae(){const t=r.useContext(Ve);if(t==null)throw new Error("No TabsContext provided");return t}const Rt=Ve;function It(t){const{value:e,children:n}=t,{direction:s,getItemIndex:o,onSelected:l,orientation:a,registerItem:d,registerTabIdLookup:u,selectionFollowsFocus:c,totalSubitemCount:m,value:i,getTabId:f,getTabPanelId:b}=e,x=r.useMemo(()=>({getItemIndex:o,registerItem:d,totalSubitemCount:m}),[d,o,m]),v=r.useMemo(()=>({direction:s,getTabId:f,getTabPanelId:b,onSelected:l,orientation:a,registerTabIdLookup:u,selectionFollowsFocus:c,value:i}),[s,f,b,l,a,u,c,i]);return h.jsx(Q.Provider,{value:x,children:h.jsx(Rt.Provider,{value:v,children:n})})}const Tt=["children","value","defaultValue","orientation","direction","onChange","selectionFollowsFocus","slotProps","slots"],St=t=>{const{orientation:e}=t;return Y({root:["root",e]},J(vt))},yt=r.forwardRef(function(e,n){var s;const{children:o,orientation:l="horizontal",direction:a="ltr",slotProps:d={},slots:u={}}=e,c=q(e,Tt),{contextValue:m}=Pt(e),i=p({},e,{orientation:l,direction:a}),f=St(i),b=(s=u.root)!=null?s:"div",x=W({elementType:b,externalSlotProps:d.root,externalForwardedProps:c,additionalProps:{ref:n},ownerState:i,className:f.root});return h.jsx(b,p({},x,{children:h.jsx(It,{value:m,children:o})}))}),wt=yt;function Vt(t){return t.size}function kt(t){const{value:e,id:n,rootRef:s}=t,o=ae();if(o===null)throw new Error("No TabContext provided");const{value:l,getTabId:a}=o,d=Re(n),u=r.useRef(null),c=U(u,s),m=r.useMemo(()=>({id:d,ref:u}),[d]),{id:i}=we(e??Vt,m),f=i!==l,b=i!==void 0?a(i):void 0;return{hidden:f,getRootProps:()=>({"aria-labelledby":b??void 0,hidden:f,id:d??void 0,ref:c}),rootRef:c}}const Mt=["children","value","slotProps","slots"],Et=t=>{const{hidden:e}=t;return Y({root:["root",e&&"hidden"]},J(pt))},Nt=r.forwardRef(function(e,n){var s;const{children:o,slotProps:l={},slots:a={}}=e,d=q(e,Mt),{hidden:u,getRootProps:c}=kt(e),m=p({},e,{hidden:u}),i=Et(m),f=(s=a.root)!=null?s:"div",b=W({elementType:f,getSlotProps:c,externalSlotProps:l.root,externalForwardedProps:d,additionalProps:{role:"tabpanel",ref:n},ownerState:m,className:i.root});return h.jsx(f,p({},b,{children:!u&&o}))}),ne=Nt;function jt(t){return K("MuiTabsList",t)}G("MuiTabsList",["root","horizontal","vertical"]);const ke={valueChange:"valueChange"};function Dt(t,e){if(e.type===ke.valueChange)return p({},t,{highlightedValue:e.value});const n=Te(t,e),{context:{selectionFollowsFocus:s}}=e;if(e.type===j.itemsChange){if(n.selectedValues.length>0)return p({},n,{highlightedValue:n.selectedValues[0]});_(null,"reset",e.context)}return s&&n.highlightedValue!=null?p({},n,{selectedValues:[n.highlightedValue]}):n}function _t(t){var e;const{rootRef:n}=t,{direction:s="ltr",onSelected:o,orientation:l="horizontal",value:a,registerTabIdLookup:d,selectionFollowsFocus:u}=ae(),{subitems:c,contextValue:m}=ye(),i=r.useCallback(V=>{var M;return(M=c.get(V))==null?void 0:M.id},[c]);d(i);const f=r.useMemo(()=>Array.from(c.keys()),[c]),b=r.useCallback(V=>{var M,k;return V==null?null:(M=(k=c.get(V))==null?void 0:k.ref.current)!=null?M:null},[c]),x=s==="rtl";let v;l==="vertical"?v="vertical":v=x?"horizontal-rtl":"horizontal-ltr";const I=r.useCallback((V,M)=>{var k;o(V,(k=M[0])!=null?k:null)},[o]),R=r.useMemo(()=>a===void 0?{}:a!=null?{selectedValues:[a]}:{selectedValues:[]},[a]),L=r.useCallback(V=>{var M,k;return(M=(k=c.get(V))==null?void 0:k.disabled)!=null?M:!1},[c]),{contextValue:w,dispatch:S,getRootProps:D,state:{highlightedValue:$,selectedValues:H},rootRef:O}=mt({controlledProps:R,disabledItemsFocusable:!u,focusManagement:"DOM",getItemDomElement:b,isItemDisabled:L,items:f,rootRef:n,onChange:I,orientation:v,reducerActionContext:r.useMemo(()=>({selectionFollowsFocus:u||!1}),[u]),selectionMode:"single",stateReducer:Dt});r.useEffect(()=>{a!==void 0&&a!=null&&S({type:ke.valueChange,value:a})},[S,a]);const z=(V={})=>p({},V,D(V),{"aria-orientation":l==="vertical"?"vertical":void 0,role:"tablist"});return{contextValue:r.useMemo(()=>p({},m,w),[m,w]),dispatch:S,getRootProps:z,highlightedValue:$,isRtl:x,orientation:l,rootRef:O,selectedValue:(e=H[0])!=null?e:null}}function Ft(t){const{value:e,children:n}=t,{dispatch:s,getItemIndex:o,getItemState:l,registerHighlightChangeHandler:a,registerSelectionChangeHandler:d,registerItem:u,totalSubitemCount:c}=e,m=r.useMemo(()=>({dispatch:s,getItemState:l,getItemIndex:o,registerHighlightChangeHandler:a,registerSelectionChangeHandler:d}),[s,o,l,a,d]),i=r.useMemo(()=>({getItemIndex:o,registerItem:u,totalSubitemCount:c}),[u,o,c]);return h.jsx(Q.Provider,{value:i,children:h.jsx(Se.Provider,{value:m,children:n})})}const Lt=["children","slotProps","slots"],$t=t=>{const{orientation:e}=t;return Y({root:["root",e]},J(jt))},Ot=r.forwardRef(function(e,n){var s;const{children:o,slotProps:l={},slots:a={}}=e,d=q(e,Lt),{isRtl:u,orientation:c,getRootProps:m,contextValue:i}=_t({rootRef:n}),f=p({},e,{isRtl:u,orientation:c}),b=$t(f),x=(s=a.root)!=null?s:"div",v=W({elementType:x,getSlotProps:m,externalSlotProps:l.root,externalForwardedProps:d,ownerState:f,className:b.root});return h.jsx(Ft,{value:i,children:h.jsx(x,p({},v,{children:o}))})}),Ht=Ot;function zt(t){return K("MuiTab",t)}G("MuiTab",["root","selected","disabled"]);function At(t){return t.size}function Ut(t){const{value:e,rootRef:n,disabled:s=!1,id:o}=t,l=r.useRef(null),a=Re(o),{value:d,selectionFollowsFocus:u,getTabPanelId:c}=ae(),m=r.useMemo(()=>({disabled:s,ref:l,id:a}),[s,l,a]),{id:i,index:f,totalItemCount:b}=we(e??At,m),{getRootProps:x,rootRef:v,highlighted:I,selected:R}=xt({item:i}),{getRootProps:L,rootRef:w,active:S,focusVisible:D,setFocusVisible:$}=qe({disabled:s,focusableWhenDisabled:!u,type:"button"}),H=U(l,n,v,w),O=i!==void 0?c(i):void 0;return{getRootProps:(A={})=>{const V=p({},A,x(A)),M=p({},V,L(V));return p({},M,{role:"tab","aria-controls":O,"aria-selected":R,id:a,ref:H})},active:S,focusVisible:D,highlighted:I,index:f,rootRef:H,selected:R||i===d,setFocusVisible:$,totalTabsCount:b}}const Bt=["action","children","value","disabled","onChange","onClick","onFocus","slotProps","slots"],Kt=t=>{const{selected:e,disabled:n}=t;return Y({root:["root",e&&"selected",n&&"disabled"]},J(zt))},Gt=r.forwardRef(function(e,n){var s;const{children:o,disabled:l=!1,slotProps:a={},slots:d={}}=e,u=q(e,Bt),c=r.useRef(),m=U(c,n),{active:i,highlighted:f,selected:b,getRootProps:x}=Ut(p({},e,{rootRef:m})),v=p({},e,{active:i,disabled:l,highlighted:f,selected:b}),I=Kt(v),R=(s=d.root)!=null?s:"button",L=W({elementType:R,getSlotProps:x,externalSlotProps:a.root,externalForwardedProps:u,additionalProps:{ref:n},ownerState:v,className:I.root});return h.jsx(R,p({},L,{children:o}))}),se=Gt;function qt(t){return Ge({queryKey:["organization_page",t.query],staleTime:1e3*60,queryFn:async()=>{const{data:e}=await Oe.get("/api/organization-pages?name="+t.query);return e},onError(e){console.error("Error when fetching search results: ",e)},onSuccess(e){console.log("Succesfully fetched search results: ",e)}})}const Wt=(t,e)=>t.length===0&&e.length===0?h.jsx(h.Fragment,{children:" "}):h.jsxs("div",{className:"pb-4 grid",children:[h.jsx("h4",{children:"Ota yhteyttä"}),t.length===0?h.jsx(h.Fragment,{children:" "}):h.jsx(le,{to:"tel:"+t,children:t}),e.length===0?h.jsx(h.Fragment,{children:" "}):h.jsx(le,{to:"mailto:"+e,children:e})]}),Yt=h.jsx("main",{className:"grid h-screen place-items-center text-white","aria-busy":!0,children:h.jsx(Be,{color:"inherit"})});function en(){const{organization_name:t}=He(),e=ze();if(!t)return h.jsx(r.Suspense,{children:h.jsx(me,{})});const{data:n,isLoading:s,isError:o}=qt({query:decodeURI(t.replace(/-/g," "))});if(s)return Yt;if(!n||o)return h.jsx(r.Suspense,{children:h.jsx(me,{})});const l="https://www.google.com/maps/dir/?api=1&destination="+encodeURI(`${n.organization.address.street} ${n.organization.address.zipcode} ${n.organization.address.city} ${n.organization.address.state} ${n.organization.address.country}`),a=Wt(n.organization.contact_info.phone,n.organization.contact_info.email);return e.setQuery("?s="+decodeURI(t.replace(/-/g," "))),h.jsxs(h.Fragment,{children:[h.jsx(Ae,{}),h.jsxs("main",{className:"max-w-4xl m-auto",children:[h.jsx("div",{children:h.jsx(Ke,{image_id:n.image_id,width:820,height:312})}),h.jsxs("div",{className:"text-white m-4 min-h-screen",children:[h.jsx("h1",{className:" text-center",children:n.organization.name}),h.jsxs(wt,{defaultValue:1,className:" m-2",children:[h.jsxs(Ht,{className:"flex justify-evenly gap-2 md:gap-4",children:[h.jsx(se,{value:1,className:"w-[100%] p-1 bg-blue-500 rounded-lg",children:"Yleistä"}),h.jsx(se,{value:2,className:"w-[100%] p-1 bg-blue-500 rounded-lg",children:"Tapahtumat"}),h.jsx(se,{value:3,className:"w-[100%] p-1 bg-blue-500 rounded-lg",children:"Yhteystiedot"})]}),h.jsx(ne,{value:1,children:h.jsx("section",{className:"mt-8 bg-white text-black p-4 rounded-2xl",children:h.jsx("div",{className:"w-fit m-auto",dangerouslySetInnerHTML:{__html:n.data}})})}),h.jsx(ne,{value:2,children:h.jsx("section",{className:"mt-8",children:h.jsx(Ue,{})})}),h.jsx(ne,{value:3,children:h.jsx("section",{className:"mt-8 bg-white text-black p-4 rounded-2xl",children:h.jsxs("div",{className:"w-fit m-auto",children:[a,h.jsxs("h4",{children:[n.organization.address.street,", ",n.organization.address.zipcode," ",n.organization.address.city]}),h.jsxs("p",{children:[n.organization.address.state,", ",n.organization.address.country]}),h.jsx(le,{to:l,children:"Reittiohjeet"})]})})})]})]})]})]})}export{en as default};

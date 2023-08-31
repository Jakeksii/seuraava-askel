import{r as d,n as re,o as se,i as ae,k as K,_ as h,B as le,q as ue,s as Y,D as ie,j as l,t as ce,v as de,S as pe,F as fe,G as me,a as he,I as xe,b as Ce,J as ge,K as ye,M as be,N as Re,O as ve}from"./index-e6c64e51.js";import{u as we}from"./useQuery-f2eb694e.js";const Ee=d.createContext(void 0),Pe=Ee;function Se(){return d.useContext(Pe)}function Fe(a){return re("MuiInput",a)}se("MuiInput",["root","formControl","focused","disabled","error","multiline","input","inputMultiline","inputTypeSearch","adornedStart","adornedEnd"]);function je(a){const{defaultValue:o,disabled:x=!1,error:c=!1,onBlur:u,onChange:f,onFocus:i,required:R=!1,value:v,inputRef:P}=a,e=Se();let w,m,C,g,y;if(e){var r,p,j;w=void 0,m=(r=e.disabled)!=null?r:!1,C=(p=e.error)!=null?p:!1,g=(j=e.required)!=null?j:!1,y=e.value}else w=o,m=x,C=c,g=R,y=v;const{current:N}=d.useRef(y!=null),_=d.useCallback(t=>{},[]),E=d.useRef(null),I=ae(E,P,_),[S,F]=d.useState(!1);d.useEffect(()=>{!e&&m&&S&&(F(!1),u==null||u())},[e,m,S,u]);const k=t=>s=>{var n;if(e!=null&&e.disabled){s.stopPropagation();return}if((n=t.onFocus)==null||n.call(t,s),e&&e.onFocus){var b;e==null||(b=e.onFocus)==null||b.call(e)}else F(!0)},B=t=>s=>{var n;(n=t.onBlur)==null||n.call(t,s),e&&e.onBlur?e.onBlur():F(!1)},q=t=>(s,...n)=>{var b,T;if(!N&&(s.target||E.current)==null)throw new Error(le(17));e==null||(b=e.onChange)==null||b.call(e,s),(T=t.onChange)==null||T.call(t,s,...n)},A=t=>s=>{var n;E.current&&s.currentTarget===s.target&&E.current.focus(),(n=t.onClick)==null||n.call(t,s)};return{disabled:m,error:C,focused:S,formControlContext:e,getInputProps:(t={})=>{const n=h({},{onBlur:u,onChange:f,onFocus:i},K(t)),b=h({},t,n,{onBlur:B(n),onChange:q(n),onFocus:k(n)});return h({},b,{"aria-invalid":C||void 0,defaultValue:w,ref:I,value:y,required:g,disabled:m})},getRootProps:(t={})=>{const s=K(a,["onBlur","onChange","onFocus"]),n=h({},s,K(t));return h({},t,n,{onClick:A(n)})},inputRef:I,required:g,value:y}}const Ie=["aria-describedby","aria-label","aria-labelledby","autoComplete","autoFocus","className","defaultValue","disabled","endAdornment","error","id","multiline","name","onClick","onChange","onKeyDown","onKeyUp","onFocus","onBlur","placeholder","readOnly","required","startAdornment","value","type","rows","slotProps","slots","minRows","maxRows"],Te=a=>{const{disabled:o,error:x,focused:c,formControlContext:u,multiline:f,startAdornment:i,endAdornment:R}=a;return ce({root:["root",o&&"disabled",x&&"error",c&&"focused",!!u&&"formControl",f&&"multiline",!!i&&"adornedStart",!!R&&"adornedEnd"],input:["input",o&&"disabled",f&&"multiline"]},de(Fe))},Ne=d.forwardRef(function(o,x){var c,u,f;const{"aria-describedby":i,"aria-label":R,"aria-labelledby":v,autoComplete:P,autoFocus:e,className:w,defaultValue:m,disabled:C,endAdornment:g,error:y,id:r,multiline:p=!1,name:j,onClick:N,onChange:_,onKeyDown:E,onKeyUp:I,onFocus:S,onBlur:F,placeholder:k,readOnly:B,required:q,startAdornment:A,value:U,type:H,rows:t,slotProps:s={},slots:n={},minRows:b,maxRows:T}=o,D=ue(o,Ie),{getRootProps:W,getInputProps:z,focused:J,formControlContext:Q,error:Z,disabled:X}=je({disabled:C,defaultValue:m,error:y,onBlur:F,onClick:N,onChange:_,onFocus:S,required:q,value:U}),O=p?void 0:H??"text",L=h({},o,{disabled:X,error:Z,focused:J,formControlContext:Q,multiline:p,type:O}),$=Te(L),ee={"aria-describedby":i,"aria-label":R,"aria-labelledby":v,autoComplete:P,autoFocus:e,id:r,onKeyDown:E,onKeyUp:I,name:j,placeholder:k,readOnly:B,type:O},M=(c=n.root)!=null?c:"div",te=Y({elementType:M,getSlotProps:W,externalSlotProps:s.root,externalForwardedProps:D,additionalProps:{ref:x},ownerState:L,className:[$.root,w]}),V=p?(u=n.textarea)!=null?u:"textarea":(f=n.input)!=null?f:"input",ne=Y({elementType:V,getSlotProps:oe=>z(h({},ee,oe)),externalSlotProps:s.input,additionalProps:h({rows:p?t:void 0},p&&!ie(V)&&{minRows:t||b,maxRows:t||T}),ownerState:L,className:$.input});return l.jsxs(M,h({},te,{children:[A,l.jsx(V,h({},ne)),g]}))}),_e=Ne;function G(a,o){var x=a.split(new RegExp(`(${o})`,"gi"));return x.map((c,u)=>l.jsx(d.Fragment,{children:c.toLowerCase()===o.toLowerCase()?l.jsx("b",{className:"bg-secondary-main text-white rounded-sm",children:c}):c},u))}function ke(a){switch(a){case me:return"Kaupunki";case fe:return"Seurakunta";case pe:return"Tapahtuma";default:return""}}function Be(a){return we({queryKey:["search-results",a.query],enabled:a.enabled,staleTime:1e3*60,queryFn:async()=>{const{data:o}=await he.get("/api/events/search?search="+a.query);return o},onError(o){console.error("Error when fetching search results: ",o)},onSuccess(o){console.log("Succesfully fetched search results: ",o)}})}function He(a){const o=xe(),x=Ce(),c=d.useRef(null),[u,f]=d.useState(!0),[i,R]=d.useState("");let v;const{isLoading:P,data:e,isError:w}=Be({query:encodeURI(i.replace(/\s+/g," ").trim()),enabled:!u&&i.length>=3});d.useEffect(()=>(u&&i.length>=3&&(v=setTimeout(()=>{f(!1)},500)),()=>{clearTimeout(v)}),[u,i]);const m=r=>{R(r.target.value),u||f(!0)};function C(){var r;(r=c.current)==null||r.select()}const g=r=>{x.clearLocation();const p="?s="+r.data+"&type="+r.type;o.setValues({...o.values,query:p,search:r.data}),a.close()},y=()=>{if(P)return l.jsx(be,{size:40});if(w)return l.jsxs("h5",{className:"pt-2 text-center text-info-main",children:[" ",Re," "]},0);if(e&&e.length===0)return l.jsxs("h5",{className:"pt-2 text-center text-info-main",children:[" ",G(i,i)," "," ei tuottanut tuloksia."," "]},0);if(e)return l.jsx("ul",{children:e.map((r,p)=>l.jsx("li",{className:"pb-1",children:l.jsx(ve,{variant:"contained",color:"info",fullWidth:!0,onClick:()=>g(r),children:l.jsxs("div",{className:"flex flex-col md:flex-row",children:[l.jsx("p",{className:"pl-1 pr-1 text-primary-main",children:ke(r.type)}),l.jsx("p",{className:"text-primary-main",children:G(r.data,i)})]})})},p))})};return l.jsxs(ge,{children:[l.jsxs("section",{onClick:C,className:"mb-2 w-full flex justify-center items-center p-3 rounded-lg text-info-main shadow-md bg-secondary-main",children:[l.jsx(ye,{color:"info"}),l.jsx(_e,{onFocus:C,className:"w-full pl-1",slotProps:{input:{autoFocus:!0,ref:c,className:"bg-transparent outline-0 w-full placeholder-[#f5cca8] rounded-sm"}},"aria-label":"search",placeholder:"Etsi tapahtumia...",onChange:m,value:i,onKeyDown:r=>{r.key==="Enter"&&e&&g(e[0])}})]}),y()]})}export{He as default};
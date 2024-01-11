import{r as d,p as se,q as ae,m as le,n as K,_ as x,G as ue,t as ie,v as Y,I as ce,j as l,w as de,x as pe,J as fe,K as me,M as he,a as xe,N as ge,O as ye,P as Ce,z as U,k as be,Q as Re,R as ve}from"./index-e6e478f9.js";import{u as we}from"./useQuery-5b9e98eb.js";const Pe=d.createContext(void 0),Ee=Pe;function Se(){return d.useContext(Ee)}function Fe(a){return se("MuiInput",a)}ae("MuiInput",["root","formControl","focused","disabled","error","multiline","input","inputMultiline","inputTypeSearch","adornedStart","adornedEnd"]);function je(a){const{defaultValue:o,disabled:m=!1,error:i=!1,onBlur:c,onChange:u,onFocus:v,required:C=!1,value:P,inputRef:h}=a,e=Se();let w,p,g,b,t;if(e){var f,R,j;w=void 0,p=(f=e.disabled)!=null?f:!1,g=(R=e.error)!=null?R:!1,b=(j=e.required)!=null?j:!1,t=e.value}else w=o,p=m,g=i,b=C,t=P;const{current:k}=d.useRef(t!=null),N=d.useCallback(n=>{},[]),E=d.useRef(null),I=le(E,h,N),[S,F]=d.useState(!1);d.useEffect(()=>{!e&&p&&S&&(F(!1),c==null||c())},[e,p,S,c]);const _=n=>s=>{var r;if(e!=null&&e.disabled){s.stopPropagation();return}if((r=n.onFocus)==null||r.call(n,s),e&&e.onFocus){var y;e==null||(y=e.onFocus)==null||y.call(e)}else F(!0)},B=n=>s=>{var r;(r=n.onBlur)==null||r.call(n,s),e&&e.onBlur?e.onBlur():F(!1)},q=n=>(s,...r)=>{var y,T;if(!k&&(s.target||E.current)==null)throw new Error(ue(17));e==null||(y=e.onChange)==null||y.call(e,s),(T=n.onChange)==null||T.call(n,s,...r)},A=n=>s=>{var r;E.current&&s.currentTarget===s.target&&E.current.focus(),(r=n.onClick)==null||r.call(n,s)};return{disabled:p,error:g,focused:S,formControlContext:e,getInputProps:(n={})=>{const r=x({},{onBlur:c,onChange:u,onFocus:v},K(n)),y=x({},n,r,{onBlur:B(r),onChange:q(r),onFocus:_(r)});return x({},y,{"aria-invalid":g||void 0,defaultValue:w,ref:I,value:t,required:b,disabled:p})},getRootProps:(n={})=>{const s=K(a,["onBlur","onChange","onFocus"]),r=x({},s,K(n));return x({},n,r,{onClick:A(r)})},inputRef:I,required:b,value:t}}const Ie=["aria-describedby","aria-label","aria-labelledby","autoComplete","autoFocus","className","defaultValue","disabled","endAdornment","error","id","multiline","name","onClick","onChange","onKeyDown","onKeyUp","onFocus","onBlur","placeholder","readOnly","required","startAdornment","value","type","rows","slotProps","slots","minRows","maxRows"],Te=a=>{const{disabled:o,error:m,focused:i,formControlContext:c,multiline:u,startAdornment:v,endAdornment:C}=a;return de({root:["root",o&&"disabled",m&&"error",i&&"focused",!!c&&"formControl",u&&"multiline",!!v&&"adornedStart",!!C&&"adornedEnd"],input:["input",o&&"disabled",u&&"multiline"]},pe(Fe))},ke=d.forwardRef(function(o,m){var i,c,u;const{"aria-describedby":v,"aria-label":C,"aria-labelledby":P,autoComplete:h,autoFocus:e,className:w,defaultValue:p,disabled:g,endAdornment:b,error:t,id:f,multiline:R=!1,name:j,onClick:k,onChange:N,onKeyDown:E,onKeyUp:I,onFocus:S,onBlur:F,placeholder:_,readOnly:B,required:q,startAdornment:A,value:O,type:H,rows:n,slotProps:s={},slots:r={},minRows:y,maxRows:T}=o,$=ie(o,Ie),{getRootProps:Q,getInputProps:W,focused:J,formControlContext:Z,error:X,disabled:ee}=je({disabled:g,defaultValue:p,error:t,onBlur:F,onClick:k,onChange:N,onFocus:S,required:q,value:O}),D=R?void 0:H??"text",L=x({},o,{disabled:ee,error:X,focused:J,formControlContext:Z,multiline:R,type:D}),M=Te(L),te={"aria-describedby":v,"aria-label":C,"aria-labelledby":P,autoComplete:h,autoFocus:e,id:f,onKeyDown:E,onKeyUp:I,name:j,placeholder:_,readOnly:B,type:D},z=(i=r.root)!=null?i:"div",ne=Y({elementType:z,getSlotProps:Q,externalSlotProps:s.root,externalForwardedProps:$,additionalProps:{ref:m},ownerState:L,className:[M.root,w]}),V=R?(c=r.textarea)!=null?c:"textarea":(u=r.input)!=null?u:"input",re=Y({elementType:V,getSlotProps:oe=>W(x({},te,oe)),externalSlotProps:s.input,additionalProps:x({rows:R?n:void 0},R&&!ce(V)&&{minRows:n||y,maxRows:n||T}),ownerState:L,className:M.input});return l.jsxs(z,x({},ne,{children:[A,l.jsx(V,x({},re)),b]}))}),Ne=ke;function G(a,o){var m=a.split(new RegExp(`(${o})`,"gi"));return m.map((i,c)=>l.jsx(d.Fragment,{children:i.toLowerCase()===o.toLowerCase()?l.jsx("b",{className:"bg-secondary-main text-white rounded-sm",children:i}):i},c))}function _e(a){switch(a){case he:return"Kaupunki";case me:return"Seurakunta";case fe:return"Tapahtuma";default:return""}}function Be(a){return we({queryKey:["search-results",a.query],enabled:a.enabled,staleTime:1e3*60,queryFn:async()=>{const{data:o}=await xe.get("/api/events/search?s="+a.query);return o},onError(o){console.error("Error when fetching search results: ",o)},onSuccess(o){console.log("Succesfully fetched search results: ",o)}})}function He(a){const o=ge(),m=d.useRef(null),[i,c]=d.useState(!0),[u,v]=d.useState("");let C;const{isLoading:P,data:h,isError:e}=Be({query:encodeURI(u.replace(/\s+/g," ").trim()),enabled:!i&&u.length>=3});d.useEffect(()=>(i&&u.length>=3&&(C=setTimeout(()=>{c(!1)},500)),()=>{clearTimeout(C)}),[i,u]);const w=t=>{v(t.target.value),i||c(!0)};function p(){var t;(t=m.current)==null||t.select()}const g=t=>{let f;switch(t.type){case"city":f=U({type:"city",search:t.data});break;case"organization":f=U({type:"organization",search:t.data});break;case"title":f=U({type:"title",search:t.data});break}o.setValues({...o.values,query:f,search:t.data}),a.close()},b=()=>{if(P)return l.jsx(be,{size:40});if(e)return l.jsxs("h5",{className:"pt-2 text-center text-info-main",children:[" ",Re," "]},0);if(h&&h.length===0)return l.jsxs("h5",{className:"pt-2 text-center text-info-main",children:[" ",G(u,u)," "," ei tuottanut tuloksia."," "]},0);if(h)return l.jsx("ul",{children:h.map((t,f)=>l.jsx("li",{className:"pb-1",children:l.jsx(ve,{variant:"contained",color:"info",fullWidth:!0,onClick:()=>g(t),children:l.jsxs("div",{className:"flex flex-col md:flex-row",children:[l.jsx("p",{className:"pl-1 pr-1 text-primary-main",children:_e(t.type)}),l.jsx("p",{className:"text-primary-main",children:G(t.data,u)})]})})},f))})};return l.jsxs(ye,{children:[l.jsxs("section",{onClick:p,className:"mb-2 w-full flex justify-center items-center p-3 rounded-lg text-info-main shadow-md bg-secondary-main",children:[l.jsx(Ce,{color:"info"}),l.jsx(Ne,{onFocus:p,className:"w-full pl-1",slotProps:{input:{autoFocus:!0,ref:m,className:"bg-transparent outline-0 w-full placeholder-[#f5cca8] rounded-sm"}},"aria-label":"search",placeholder:"Etsi tapahtumia...",onChange:w,value:u,onKeyDown:t=>{t.key==="Enter"&&h&&g(h[0])}})]}),b()]})}export{He as default};

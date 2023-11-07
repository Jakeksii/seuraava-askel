import{j as e,a as R,r as j,b as x,i as u,S as c,L as d,d as S,c as M,e as L,u as T,f as I,g as k,h as C,H as E,k as P}from"./index-ac736867.js";import{u as W}from"./useQuery-d9794025.js";import{P as H,N as q}from"./PageImage-2e4dbad2.js";function D(){return e.jsx("footer",{children:e.jsx("div",{className:"pb-16"})})}function F(s){return W({queryKey:["event_page",s._id],staleTime:1e3*60,queryFn:async()=>{const{data:t}=await R.get("/api/events/"+s._id);return t},onError(t){console.error("Error when fetching event: ",t)},onSuccess(t){console.log("Succesfully fetched event: ",t)}})}const V=()=>{const[s,t]=j.useState({width:void 0,height:void 0});return j.useEffect(()=>{function n(){t({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),s},B=()=>{const{width:s}=V();return!!s&&s<640};var h={},O=u;Object.defineProperty(h,"__esModule",{value:!0});var v=h.default=void 0,G=O(x()),A=e,U=(0,G.default)((0,A.jsx)("path",{d:"M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z"}),"AccountBalance");v=h.default=U;var f={},K=u;Object.defineProperty(f,"__esModule",{value:!0});var p=f.default=void 0,Q=K(x()),m=e,J=(0,Q.default)([(0,m.jsx)("path",{d:"m12 2-5.5 9h11z"},"0"),(0,m.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"},"1"),(0,m.jsx)("path",{d:"M3 13.5h8v8H3z"},"2")],"Category");p=f.default=J;var g={},X=u;Object.defineProperty(g,"__esModule",{value:!0});var _=g.default=void 0,Y=X(x()),Z=e,ee=(0,Y.default)((0,Z.jsx)("path",{d:"M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"}),"Groups");_=g.default=ee;var w={},se=u;Object.defineProperty(w,"__esModule",{value:!0});var z=w.default=void 0,te=se(x()),ie=e,ne=(0,te.default)((0,ie.jsx)("path",{d:"m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z"}),"Translate");z=w.default=ne;function a({icon:s,text:t}){return e.jsxs("div",{className:"grow flex items-center justify-center rounded-lg text-black bg-info-main p-0 sm:p-1",children:[s,e.jsx("h6",{className:"text-black p-1",children:t})]})}function r({icon:s,text:t}){return e.jsxs("div",{className:"flex items-center justify-center rounded-lg bg-info-dark pr-1 pl-1 text-primary-main",children:[s,e.jsx("h6",{className:"p-1 text-primary-main",children:t})]})}function re({data:s,formattedDates:t,organizationLink:n,distance:i,mapLink:o}){return e.jsxs("article",{className:"grid gap-3",children:[e.jsxs("div",{className:"bg-white rounded-2xl",children:[e.jsxs("section",{className:"grid grid-cols-2 items-center",children:[e.jsx(H,{className:"rounded-2xl",image_id:s.image_id,width:c/2>window.innerWidth?window.innerWidth:c}),e.jsx("section",{children:e.jsxs("div",{className:"bg-white p-4 rounded-2xl",children:[e.jsx(d,{className:"text-slate-600 hover:text-slate-800 underline",to:n,children:s.organization.organization_name}),e.jsx("h2",{className:"pt-2",children:s.title}),e.jsx("div",{className:"flex justify-center",children:e.jsx(a,{text:`${t.startDate} - ${t.endDate}`,icon:e.jsx(S,{})})}),e.jsxs("div",{className:"flex flex-row gap-2 pt-2",children:[e.jsx(a,{text:`${t.startTime} - ${t.endTime}`,icon:e.jsx(M,{})}),e.jsx(a,{text:`${i} km`,icon:e.jsx(L,{})})]}),e.jsx("div",{className:"pt-4",children:e.jsx(d,{to:o,"aria-label":"hae reittiohjeet",children:e.jsx("h5",{children:e.jsxs("u",{children:[s.address.street,", ",s.address.city]})})})})]})})]}),e.jsx("div",{className:"p-4 pt-4",children:e.jsx("p",{className:"text-justify",children:s.extract})}),e.jsxs("section",{className:"flex justify-center gap-2 pb-4",children:[s.meta.denomination&&e.jsx(r,{text:s.meta.denomination,icon:e.jsx(v,{fontSize:"small"})}),s.meta.types&&s.meta.types.map(l=>e.jsx(r,{text:l,icon:e.jsx(p,{fontSize:"small"})})),s.meta.size&&e.jsx(r,{text:s.meta.size,icon:e.jsx(_,{fontSize:"small"})}),s.meta.language&&e.jsx(r,{text:s.meta.language,icon:e.jsx(z,{fontSize:"small"})})]})]}),s.description&&e.jsx("section",{className:"bg-white mt-2 p-4 rounded-2xl",children:e.jsx("div",{className:"text-justify",dangerouslySetInnerHTML:{__html:s.description}})})]})}function ae({data:s,formattedDates:t,organizationLink:n,distance:i,mapLink:o}){return e.jsxs("article",{className:"grid gap-4",children:[e.jsx(H,{className:"rounded-2xl",image_id:s.image_id,width:c>window.innerWidth?window.innerWidth+100:c}),e.jsx("section",{children:e.jsxs("div",{className:"bg-white p-4 pt-6 pb-6 rounded-2xl",children:[e.jsx(d,{className:"text-slate-600 hover:text-slate-800 underline",to:n,children:s.organization.organization_name}),e.jsx("h2",{className:"p-1",children:s.title}),e.jsx("br",{}),e.jsx(a,{text:`${t.startDate} - ${t.endDate}`,icon:e.jsx(S,{})}),e.jsxs("div",{className:"flex flex-row gap-1 pt-1 justify-center",children:[e.jsx(a,{text:`${t.startTime} - ${t.endTime}`,icon:e.jsx(M,{})}),e.jsx(a,{text:`${i} km`,icon:e.jsx(L,{})})]}),e.jsx("br",{}),e.jsx("p",{children:s.extract}),e.jsx("br",{}),e.jsx(d,{to:o,"aria-label":"hae reittiohjeet",children:e.jsx("h5",{children:e.jsxs("u",{children:[s.address.street,", ",s.address.city]})})}),e.jsxs("section",{className:"flex flex-wrap justify-center gap-2 pt-2",children:[s.meta.denomination&&e.jsx(r,{text:s.meta.denomination,icon:e.jsx(v,{fontSize:"small"})}),s.meta.types&&s.meta.types.map(l=>e.jsx(r,{text:l,icon:e.jsx(p,{fontSize:"small"})})),s.meta.size&&e.jsx(r,{text:s.meta.size,icon:e.jsx(_,{fontSize:"small"})}),s.meta.language&&e.jsx(r,{text:s.meta.language,icon:e.jsx(z,{fontSize:"small"})})]})]})}),s.description&&e.jsx("section",{className:"bg-white p-4 rounded-2xl",children:e.jsx("div",{className:"text-justify",dangerouslySetInnerHTML:{__html:s.description}})})]})}const oe=e.jsxs(e.Fragment,{children:[e.jsx(E,{}),e.jsx("main",{"aria-busy":!0,children:e.jsx(P,{})})]});function xe(){const{event_id:s}=T(),{values:{coords:t}}=I(),n=B(),{data:i,isLoading:o,isError:l}=F({_id:s??""});if(o)return oe;if(!i||l)return e.jsx(j.Suspense,{children:e.jsx(q,{})});window.scrollTo(0,0);const y=k(i.start_date,i.end_date),N="/"+encodeURI(i.organization.organization_name.replace(/\s/g,"-")),$=Math.round(C(t.longitude,t.latitude,i.address.coordinates[0],i.address.coordinates[1])),b="https://www.google.com/maps/dir/?api=1&destination="+encodeURI(`${i.address.street} ${i.address.zipcode} ${i.address.city} ${i.address.state} ${i.address.country}`);return e.jsxs(e.Fragment,{children:[e.jsx(E,{}),e.jsx("main",{className:"m-[6px] pt-2 text-center",children:n?e.jsx(ae,{data:i,formattedDates:y,organizationLink:N,distance:$,mapLink:b}):e.jsx(re,{data:i,formattedDates:y,organizationLink:N,distance:$,mapLink:b})}),e.jsx(D,{})]})}export{xe as default};

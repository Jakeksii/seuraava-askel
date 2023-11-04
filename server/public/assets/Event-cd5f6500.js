import{j as e,a as M,r as u,b as w,i as _,S as l,L as o,d as N,c as y,e as b,f as z,g as S,u as R,h as H,k as P,l as T,H as $,m as C}from"./index-1c0519cf.js";import{u as I}from"./useQuery-30246222.js";import{P as E,N as W}from"./PageImage-f08f5f20.js";function k(){return e.jsx("footer",{children:e.jsx("div",{className:" pb-16"})})}function q(s){return I({queryKey:["event_page",s._id],staleTime:1e3*60,queryFn:async()=>{const{data:t}=await M.get("/api/events/"+s._id);return t},onError(t){console.error("Error when fetching event: ",t)},onSuccess(t){console.log("Succesfully fetched event: ",t)}})}const F=()=>{const[s,t]=u.useState({width:void 0,height:void 0});return u.useEffect(()=>{function n(){t({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),s},D=()=>{const{width:s}=F();return!!s&&s<640};var j={},O=_;Object.defineProperty(j,"__esModule",{value:!0});var r=j.default=void 0,U=O(w()),x=e,B=(0,U.default)([(0,x.jsx)("path",{d:"m12 2-5.5 9h11z"},"0"),(0,x.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"},"1"),(0,x.jsx)("path",{d:"M3 13.5h8v8H3z"},"2")],"Category");r=j.default=B;var h={},G=_;Object.defineProperty(h,"__esModule",{value:!0});var m=h.default=void 0,K=G(w()),Q=e,A=(0,K.default)((0,Q.jsx)("path",{d:"M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15l1-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15l1-2H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3l-1 2h4.06c-.04.33-.06.66-.06 1s.02.67.06 1H3l-1 2h4.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"}),"Euro");m=h.default=A;function c({icon:s,text:t}){return e.jsxs("div",{className:"grow flex items-center justify-center rounded-full bg-primary-main text-white p-0 sm:p-1",children:[s,e.jsx("h6",{className:"text-white p-1",children:t})]})}function a({icon:s,text:t}){return e.jsxs("div",{className:"flex items-center justify-center rounded-full bg-secondary-light pr-1 pl-1 text-slate-900",children:[s,e.jsx("h6",{className:"p-1 text-slate-900",children:t})]})}function J({data:s,formattedDates:t,organizationLink:n,distance:i,mapLink:d}){return e.jsxs("article",{className:"grid gap-3",children:[e.jsxs("div",{className:"bg-white rounded-2xl",children:[e.jsxs("section",{className:"grid grid-cols-2 items-center",children:[e.jsx(E,{className:"rounded-2xl",image_id:s.image_id,width:l/2>window.innerWidth?window.innerWidth:l}),e.jsx("section",{children:e.jsxs("div",{className:"bg-white p-4 rounded-2xl",children:[e.jsx(o,{className:"text-slate-600 hover:text-slate-800 underline",to:n,children:s.organization.organization_name}),e.jsx("h2",{className:"pt-2",children:s.title}),e.jsx("div",{className:"flex justify-center",children:e.jsx(c,{text:`${t.startDate} - ${t.endDate}`,icon:e.jsx(N,{})})}),e.jsxs("div",{className:"flex flex-row gap-2 pt-2",children:[e.jsx(c,{text:`${t.startTime} - ${t.endTime}`,icon:e.jsx(y,{})}),e.jsx(c,{text:`${i} km`,icon:e.jsx(b,{})})]}),e.jsx("div",{className:"pt-4",children:e.jsx(o,{to:d,"aria-label":"hae reittiohjeet",children:e.jsx("h5",{children:e.jsxs("u",{children:[s.address.street,", ",s.address.city]})})})})]})})]}),e.jsx("div",{className:"p-4 pt-4",children:e.jsx("p",{className:"text-justify",children:z})}),e.jsxs("section",{className:"flex justify-center gap-2 pb-4",children:[e.jsx(a,{text:"20",icon:e.jsx(m,{fontSize:"small"})}),e.jsx(a,{text:"Seminaari",icon:e.jsx(r,{fontSize:"small"})})]})]}),e.jsx("section",{className:"bg-white mt-2 p-4 rounded-2xl",children:e.jsx("div",{className:"text-justify",children:S})})]})}function V({data:s,formattedDates:t,organizationLink:n,distance:i,mapLink:d}){return e.jsxs("article",{className:"grid gap-4",children:[e.jsx(E,{className:"rounded-2xl",image_id:s.image_id,width:l>window.innerWidth?window.innerWidth+100:l}),e.jsx("section",{children:e.jsxs("div",{className:"bg-white p-4 pt-6 pb-6 rounded-2xl",children:[e.jsx(o,{className:"text-slate-600 hover:text-slate-800 underline",to:n,children:s.organization.organization_name}),e.jsx("h2",{className:"p-1",children:s.title}),e.jsx("br",{}),e.jsx(c,{text:`${t.startDate} - ${t.endDate}`,icon:e.jsx(N,{})}),e.jsxs("div",{className:"flex flex-row gap-1 pt-1 justify-center",children:[e.jsx(c,{text:`${t.startTime} - ${t.endTime}`,icon:e.jsx(y,{})}),e.jsx(c,{text:`${i} km`,icon:e.jsx(b,{})})]}),e.jsx("br",{}),e.jsx("p",{children:z}),e.jsx("br",{}),e.jsx(o,{to:d,"aria-label":"hae reittiohjeet",children:e.jsx("h5",{children:e.jsxs("u",{children:[s.address.street,", ",s.address.city]})})}),e.jsxs("section",{className:"flex flex-wrap justify-center gap-2 pt-2",children:[e.jsx(a,{text:"20",icon:e.jsx(m,{fontSize:"small"})}),e.jsx(a,{text:"Seminaari",icon:e.jsx(r,{fontSize:"small"})}),e.jsx(a,{text:"Seminaari",icon:e.jsx(r,{fontSize:"small"})}),e.jsx(a,{text:"Seminaari",icon:e.jsx(r,{fontSize:"small"})}),e.jsx(a,{text:"Seminaari",icon:e.jsx(r,{fontSize:"small"})})]})]})}),e.jsx("section",{className:"bg-white p-4 rounded-2xl",children:e.jsx("div",{className:"text-justify",children:S})})]})}const X=e.jsxs(e.Fragment,{children:[e.jsx($,{}),e.jsx("main",{"aria-busy":!0,children:e.jsx(C,{})})]});function se(){const{event_id:s}=R(),{values:{coords:t}}=H(),n=D(),{data:i,isLoading:d,isError:L}=q({_id:s??""});if(d)return X;if(!i||L)return e.jsx(u.Suspense,{children:e.jsx(W,{})});window.scrollTo(0,0);const f=P(i.start_date,i.end_date),g="/"+encodeURI(i.organization.organization_name.replace(/\s/g,"-")),p=Math.round(T(t.longitude,t.latitude,i.address.coordinates[0],i.address.coordinates[1])),v="https://www.google.com/maps/dir/?api=1&destination="+encodeURI(`${i.address.street} ${i.address.zipcode} ${i.address.city} ${i.address.state} ${i.address.country}`);return e.jsxs(e.Fragment,{children:[e.jsx($,{}),e.jsx("main",{className:"m-[6px] pt-2 text-center",children:n?e.jsx(V,{data:i,formattedDates:f,organizationLink:g,distance:p,mapLink:v}):e.jsx(J,{data:i,formattedDates:f,organizationLink:g,distance:p,mapLink:v})}),e.jsx(k,{})]})}export{se as default};

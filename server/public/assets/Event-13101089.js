import{j as e,K as h,z as j,L as f,D as g,r as p}from"./index-61f7dc01.js";import{b as N,u as v,d as _,a as y}from"./useFormatDate-5017568f.js";import{d as w}from"./LocationOn-cf4e18cb.js";import{a as b,H as o}from"./Header-863b29e6.js";import{P as z,N as E}from"./NotFound-c14e9b1d.js";import{u as F}from"./useQuery-236a5edc.js";import"./App-e5d30cbc.js";function k(){return e.jsx("footer",{children:e.jsx("div",{className:" pb-16"})})}function D(a){return F({queryKey:["event_page",a._id],staleTime:1e3*60,queryFn:async()=>{const{data:t}=await b.get("/api/events/single/"+a._id);return t},onError(t){console.error("Error when fetching event: ",t)},onSuccess(t){console.log("Succesfully fetched event: ",t)}})}const L=e.jsxs(e.Fragment,{children:[e.jsx(o,{}),e.jsx("main",{className:"grid place-items-center text-white pt-3","aria-busy":!0,children:e.jsx(g,{color:"inherit",size:50})})]}),i=e.jsx(p.Suspense,{children:e.jsx(E,{})});function K(){const{event_id:a}=h(),t=j();if(!a)return i;const{data:s,isLoading:c,isError:l}=D({_id:a});if(c)return L;if(!s||l)return i;const d="/"+encodeURI(s.organization.organization_name.replace(/\s/g,"-")),r=t.locationOn?Math.round(N(t.coords.longitude,t.coords.latitude,s.address.coordinates[0],s.address.coordinates[1])):null,m=r!=null?e.jsxs("div",{className:"flex items-center justify-center rounded-full bg-[#1976d2] p-0 sm:p-1",children:[e.jsx(w,{style:{color:"white"}}),e.jsxs("h6",{className:"p-1 text-white",children:[r," km"]})]}):null,n=v(s.start_date,s.end_date),u=e.jsxs("div",{className:"flex items-center justify-center rounded-full bg-[#1976d2] p-0 sm:p-1",children:[e.jsx(_,{style:{color:"white"}}),e.jsx("h6",{className:"p-1 text-white",children:n.startDate+" - "+n.endDate})]}),x=e.jsxs("div",{className:"flex items-center justify-center rounded-full bg-[#1976d2] p-0 sm:p-1",children:[e.jsx(y,{style:{color:"white"}}),e.jsxs("h6",{className:"p-1 text-white",children:[n.startTime," - ",n.endTime]})]});return e.jsxs(e.Fragment,{children:[e.jsx(o,{}),e.jsxs("main",{className:"m-auto",children:[e.jsx("section",{children:e.jsx(z,{image_id:s.image_id,width:820,height:549})}),e.jsxs("section",{className:"m-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx(f,{className:"text-slate-50 hover:text-slate-300 underline",to:d,children:s.organization.organization_name}),e.jsx("h1",{children:s.title})]}),e.jsxs("div",{className:"bg-white text-black p-4 pt-1 rounded-2xl",children:[e.jsxs("div",{className:"flex flex-col gap-2 pt-2 pb-2 justify-center grow sm:flex-row",children:[m,u,x]}),e.jsx("div",{className:"w-fit m-auto",dangerouslySetInnerHTML:{__html:s.extract}})]})]})]}),e.jsx(k,{})]})}export{K as default};

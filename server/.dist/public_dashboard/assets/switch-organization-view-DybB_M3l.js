import{j as n,B as R,P as t,m as x,T as d,n as h,A as I,r as u,a1 as g,S as _}from"./index-BfWpWL7F.js";import{T as V,a as p,b as c,c as k,d as j,e as L,f as H,g as W,h as B}from"./Add-BO-GIcqz.js";import{C as m}from"./Container-BXJ_KoWx.js";import{C as b}from"./Card-gokM2s2u.js";const E={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function A(e,a,s){return e?Math.max(0,(1+e)*a-s):0}function f({order:e,orderBy:a,headLabel:s}){return n.jsx(V,{children:n.jsx(p,{children:s.map(i=>n.jsx(c,{align:i.align||"left",sortDirection:a===i.id?e:!1,sx:{width:i.width,minWidth:i.minWidth},children:n.jsxs(k,{hideSortIcon:!0,active:a===i.id,direction:a===i.id?e:"asc",children:[i.label,a===i.id?n.jsx(R,{sx:{...E},children:e==="desc"?"sorted descending":"sorted ascending"}):null]})},i.id))})})}f.propTypes={order:t.oneOf(["asc","desc"]),orderBy:t.string,headLabel:t.array};function w({selected:e,organization_id:a,name:s,role:i,isVerified:l,onClick:o}){return n.jsxs(p,{hover:!0,tabIndex:-1,selected:e,children:[n.jsx(c,{component:"th",scope:"row",children:n.jsx(x,{direction:"row",alignItems:"center",spacing:2,children:n.jsx(d,{variant:"subtitle2",noWrap:!0,children:s})})}),n.jsx(c,{children:i}),n.jsx(c,{align:"center",children:l?"Yes":"No"}),n.jsx(c,{align:"right",children:n.jsx(h,{variant:"outlined",disabled:e,onClick:()=>o(a),children:"Hallinnoi"})})]})}w.propTypes={onClick:t.func,isVerified:t.bool,name:t.string,role:t.string,organization_id:t.string,selected:t.bool};function T({emptyRows:e,height:a}){return e?n.jsx(p,{sx:{...a&&{height:a*e}},children:n.jsx(c,{colSpan:9})}):null}T.propTypes={emptyRows:t.number,height:t.number};function N({organizations:e}){const{selectedOrganization:a,switchOrganization:s}=I(),[i,l]=u.useState(0),[o,v]=u.useState(5),y="asc",P="name",z=(r,C)=>{l(C)},S=r=>{l(0),v(parseInt(r.target.value,10))},O=r=>{s(r)};return e.length<=0?n.jsxs(m,{children:[n.jsxs(x,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[n.jsx(d,{variant:"h4",children:"Organisaatiot"}),n.jsx(h,{variant:"contained",color:"inherit",component:g,to:"/organization/new",startIcon:n.jsx(j,{}),children:"Uusi organisaatio"})]}),n.jsxs(b,{sx:{margin:"auto",padding:10},children:[n.jsx(d,{pb:2,variant:"h4",children:"Sinulla ei ole vielä yhtään organisaatiota!"}),n.jsx(h,{variant:"contained",size:"large",component:g,to:"/organization/new",children:"Luo uusi organisaatio"})]})]}):n.jsxs(m,{children:[n.jsxs(x,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[n.jsx(d,{variant:"h4",children:"Organisaatiot"}),n.jsx(h,{variant:"contained",color:"inherit",component:g,to:"/organization/new",startIcon:n.jsx(j,{}),children:"Uusi organisaatio"})]}),n.jsxs(b,{children:[n.jsx(_,{children:n.jsx(L,{sx:{overflow:"unset"},children:n.jsxs(H,{sx:{minWidth:800},children:[n.jsx(f,{order:y,orderBy:P,rowCount:e.length,headLabel:[{id:"organization_name",label:"Name"},{id:"role",label:"Your role"},{id:"isVerified",label:"Verified",align:"center"},{id:""}]}),n.jsxs(W,{children:[e.slice(i*o,i*o+o).map(r=>n.jsx(w,{selected:a===r.organization_id,organization_id:r.organization_id,name:r.organization_name,role:r.role,isVerified:r.isVerified,onClick:O},r._id)),n.jsx(T,{height:77,emptyRows:A(i,o,e.length)})]})]})})}),n.jsx(B,{page:i,component:"div",count:e.length,rowsPerPage:o,onPageChange:z,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:S})]})]})}N.propTypes={organizations:t.array};export{N as S};

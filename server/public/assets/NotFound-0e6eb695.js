import{j as e,L as n}from"./index-d49ab656.js";import{C as l,f as a,A as s}from"./CloudinaryImage-f7796968.js";import{C as r}from"./constants-06a9c141.js";const h=i=>{const t=new l(i.image_id,{cloudName:r}).resize(a().gravity("auto").width(i.width).height(i.height??Math.round(.6666666666666666*i.width)));return e.jsx(s,{cldImg:t,className:"m-auto rounded-none md:rounded-b-2xl"})};function m(i){return e.jsxs("main",{style:{height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"white"},children:[e.jsxs("div",{children:[e.jsx("h1",{style:{display:"inline-block",margin:"0px 20px 0px 0px",padding:"0px 23px 0px 0px",fontSize:"26px",fontWeight:500,verticalAlign:"top",lineHeight:"49px",borderRight:"2px solid white"},children:"404"}),e.jsx("div",{style:{display:"inline-block"},children:e.jsx("h2",{style:{fontSize:"16px",fontWeight:400,lineHeight:"49px",margin:"0px"},children:i.message??"Sivua ei löytynyt"})})]}),e.jsx("br",{}),e.jsx(n,{to:"/",className:"btn-primary",children:"Etusivulle"})]})}export{m as N,h as P};

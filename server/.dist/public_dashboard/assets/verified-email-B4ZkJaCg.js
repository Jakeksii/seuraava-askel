import{y as d,af as m,a7 as x,ag as f,j as e,B as p,a4 as k,x as j,m as v,T as s,G as g,n as y,W as S}from"./index-BfWpWL7F.js";import{L as C}from"./logo-DukFvgkb.js";import{u as E}from"./use-router-DtbeFjTf.js";import{C as b}from"./Card-gokM2s2u.js";import"./Link-B7K0QOWw.js";function T(){const a=d(),n=E(),o=m(),[u]=x(),{isLoading:c,isSuccess:t,isError:i,error:r}=f({verification_token:u.get("verification_token")}),l=()=>{o.invalidateQueries("user"),n.push("/")};function h(){if(!r.response)return"Tarkista verkkoyhteytesi";switch(r.response.status){case 401:return"Tunnuksen vahvistus epäonnistui. Linkki on voinut vanhentua.";case 429:return"Olet yrittänyt liian monta kertaa. Odota hetki ja yritä uudestaan.";default:return"Oho, jokin meni vikaan. Kokeile myöhemmin uudelleen."}}return e.jsxs(p,{sx:{...k({color:j(a.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(C,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(v,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(b,{sx:{p:5,width:1,maxWidth:420,display:"grid"},children:[e.jsx(s,{variant:"h4",children:"Sähköpostin vahvistus"}),c&&e.jsx(g,{sx:{justifySelf:"center",mt:2}}),t&&e.jsx(s,{variant:"body1",children:"Sähköpostisi on vahvistettu!"}),i&&e.jsx(s,{variant:"body1",color:"error",children:h()}),e.jsx("br",{}),(t||i)&&e.jsx(y,{fullWidth:!0,color:"success",size:"large",variant:"contained",onClick:l,children:"Jatka"})]})})]})}function O(){return e.jsxs(e.Fragment,{children:[e.jsx(S,{children:e.jsx("title",{children:" Sähköpostin vahvistus | SE-AS "})}),e.jsx(T,{})]})}export{O as default};
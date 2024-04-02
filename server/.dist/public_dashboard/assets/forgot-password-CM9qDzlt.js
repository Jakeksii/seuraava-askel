import{y as w,a6 as B,r as t,j as e,m as g,B as P,a4 as R,x as W,T as a,W as M,E as q}from"./index-B3jCW4Fb.js";import{L as z}from"./logo-_6u3cJ9y.js";import{u as I}from"./use-router-CH7-W6vm.js";import{T as D}from"./TextField-DQCyuwm7.js";import{L as j}from"./LoadingButton-DudZCK5P.js";import{C as G}from"./Card-DW1bMlw1.js";import{L as c}from"./Link-DzaUqRWn.js";import"./Select-Br8NO0KB.js";import"./react-is.production.min-DUDD-a5e.js";function O(){var m,d,h,x;const f=w(),n=I(),{mutate:b,isLoading:k,isSuccess:o}=B(),r=t.useRef(),[y,u]=t.useState(""),[v,S]=t.useState(!1),[i,L]=t.useState({email:""}),[l,C]=t.useState({email:!1}),E=s=>{L({...i,[s.target.name]:s.target.value})},T=s=>{C({...l,[s.target.name]:!0})},F=s=>{s.preventDefault(),r.current.checkValidity()&&b(i,{onError:p=>{if(!p.response)return u("Tarkista verkkoyhteytesi");switch(p.response.status){case 404:S(!0);break;default:u("Oho, jokin meni vikaan");break}}})},V=e.jsx("form",{noValidate:!0,onSubmit:F,ref:r,children:e.jsxs(g,{spacing:3,children:[e.jsx(D,{name:"email",type:"email",label:"Sähköposti",required:!0,error:!!(l.email&&((d=(m=r.current)==null?void 0:m.elements.email)!=null&&d.validationMessage)),helperText:l.email&&((x=(h=r.current)==null?void 0:h.elements.email)==null?void 0:x.validationMessage),InputLabelProps:{required:!1},value:i.email,onChange:E,onBlur:T}),e.jsx(j,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",loading:k,children:"Lähetä"})]})});return e.jsxs(P,{sx:{...R({color:W(f.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(z,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(g,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(G,{sx:{p:5,width:1,maxWidth:420},children:[e.jsx(a,{variant:"h4",children:"Salasanan nollaus"}),!o&&e.jsxs(a,{variant:"body2",sx:{mt:2,mb:2},children:["Muistuiko salasana?",e.jsx(c,{variant:"subtitle2",component:"button",sx:{ml:.5},onClick:()=>{n.push("/login")},children:"Takaisin"})]}),e.jsxs(a,{variant:"body1",color:"error",sx:{mb:1},children:[y,v&&e.jsxs(a,{variant:"body1",sx:{mb:0},children:["Syöttämääsi sähköpostia ei löytynyt.",e.jsx(c,{variant:"subtitle2",component:"button",sx:{ml:.5},onClick:()=>{n.push("/register")},children:"Rekisteröidy"})]})]}),!o&&V,o&&e.jsxs(e.Fragment,{children:[e.jsxs(a,{variant:"h5",sx:{mt:2,mb:5},children:["Linkki salasanan vaihtamiseen on lähetetty sähköpostiin",e.jsx("br",{}),e.jsx(c,{children:i.email})]}),e.jsx(j,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",onClick:()=>{n.push("/")},children:"Takaisin"})]})]})})]})}function Y(){return e.jsxs(e.Fragment,{children:[e.jsx(M,{children:e.jsx("title",{children:" Salasanan nollaus "})}),e.jsx(q,{children:e.jsx(O,{})})]})}export{Y as default};
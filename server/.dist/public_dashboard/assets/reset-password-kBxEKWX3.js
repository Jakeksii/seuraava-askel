import{y as R,J as B,K as F,r as t,j as s,m as j,I as W,B as _,F as z,x as A,T as r,W as q}from"./index-4JY2uYc9.js";import{L as K}from"./logo-L2scAoTo.js";import{d as M,a as U,v as D}from"./test-password-iMOuN6d0.js";import{u as G}from"./use-router-wSG2qjNp.js";import{T as J}from"./TextField-vdl0cmGb.js";import{I as O}from"./InputAdornment-G0z_MuO8.js";import{L as l}from"./LoadingButton-MxWIXm8B.js";import{C as $}from"./Card-eoGuS8e4.js";import"./Link-UErGXuUI.js";import"./Select-kMBZwo1Z.js";function H(){var h,p,x,f;const v=R(),d=G(),[k]=B(),{mutate:w,isLoading:b,isSuccess:u}=F(),a=t.useRef(),[n,y]=t.useState(!1),[S,c]=t.useState(""),[m,C]=t.useState(!1),[o,P]=t.useState({reset_token:k.get("reset_token"),password:""}),[i,V]=t.useState({password:!1}),E=e=>{e.target.name==="password"&&(D(a.current.elements.password.value)?e.target.setCustomValidity(""):e.target.setCustomValidity("Salasanan on oltava vähintään 8 merkkiä pitkä ja siinä on oltava vähintään yksi iso ja pieni kirjain sekä numero.")),P({...o,[e.target.name]:e.target.value})},L=e=>{V({...i,[e.target.name]:!0})},T=e=>{e.preventDefault(),a.current.checkValidity()&&w(o,{onError:g=>{if(!g.response)return c("Tarkista verkkoyhteytesi");switch(g.response.status){case 401:C(!0);break;default:c("Oho, jokin meni vikaan");break}}})},I=s.jsx("form",{noValidate:!0,onSubmit:T,ref:a,children:s.jsxs(j,{spacing:3,children:[s.jsx(J,{name:"password",type:n?"text":"password",label:"Uusi salasana",autoComplete:"new-password",required:!0,error:!!(i.password&&((p=(h=a.current)==null?void 0:h.elements.password)!=null&&p.validationMessage)),helperText:i.password&&((f=(x=a.current)==null?void 0:x.elements.password)==null?void 0:f.validationMessage),InputLabelProps:{required:!1},value:o.password,onChange:E,onBlur:L,InputProps:{endAdornment:s.jsx(O,{position:"end",children:s.jsx(W,{onClick:()=>y(!n),edge:"end",children:n?s.jsx(M,{}):s.jsx(U,{})})})}}),s.jsx(l,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",loading:b,children:"Vaihda"})]})});return s.jsxs(_,{sx:{...z({color:A(v.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[s.jsx(K,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),s.jsx(j,{alignItems:"center",justifyContent:"center",sx:{height:1},children:s.jsxs($,{sx:{p:5,width:1,maxWidth:420},children:[s.jsx(r,{variant:"h4",children:"Vaihda salasana"}),s.jsx(r,{variant:"body1",color:"error",sx:{mb:5},children:S}),m&&s.jsxs(s.Fragment,{children:[s.jsx(r,{variant:"h5",color:"error",sx:{mt:2,mb:5},children:"Tunnuksen vahvistus epäonnistui. Linkki on voinut vanhentua."}),s.jsx(l,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:()=>{d.push("/forgot-password")},children:"Lähetä uusi linkki"})]}),!m&&!u&&I,u&&s.jsxs(s.Fragment,{children:[s.jsx(r,{variant:"h5",color:"success",sx:{mt:2,mb:5},children:"Salasanasi on nyt vaihdettu!"}),s.jsx(l,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",onClick:()=>{d.push("/login")},children:"Kirjaudu sisään"})]})]})})]})}function ns(){return s.jsxs(s.Fragment,{children:[s.jsx(q,{children:s.jsx("title",{children:" Salasanan nollaus | SE-AS "})}),s.jsx(H,{})]})}export{ns as default};

import{y as R,a7 as I,a8 as F,r as a,j as s,m as j,a3 as W,B as _,a4 as z,x as q,T as r,W as A,E as M}from"./index-B3jCW4Fb.js";import{L as U}from"./logo-_6u3cJ9y.js";import{d as D,a as G,v as K}from"./test-password-BKLwSutS.js";import{u as O}from"./use-router-CH7-W6vm.js";import{T as $}from"./TextField-DQCyuwm7.js";import{I as H}from"./InputAdornment-dOG2pP4o.js";import{L as l}from"./LoadingButton-DudZCK5P.js";import{C as J}from"./Card-DW1bMlw1.js";import"./Link-DzaUqRWn.js";import"./Select-Br8NO0KB.js";import"./react-is.production.min-DUDD-a5e.js";function N(){var h,p,x,f;const v=R(),d=O(),[k]=I(),{mutate:w,isLoading:b,isSuccess:u}=F(),t=a.useRef(),[n,y]=a.useState(!1),[S,c]=a.useState(""),[m,C]=a.useState(!1),[o,P]=a.useState({reset_token:k.get("reset_token"),password:""}),[i,V]=a.useState({password:!1}),E=e=>{e.target.name==="password"&&(K(t.current.elements.password.value)?e.target.setCustomValidity(""):e.target.setCustomValidity("Salasanan on oltava vähintään 8 merkkiä pitkä ja siinä on oltava vähintään yksi iso ja pieni kirjain sekä numero.")),P({...o,[e.target.name]:e.target.value})},L=e=>{V({...i,[e.target.name]:!0})},T=e=>{e.preventDefault(),t.current.checkValidity()&&w(o,{onError:g=>{if(!g.response)return c("Tarkista verkkoyhteytesi");switch(g.response.status){case 401:C(!0);break;default:c("Oho, jokin meni vikaan");break}}})},B=s.jsx("form",{noValidate:!0,onSubmit:T,ref:t,children:s.jsxs(j,{spacing:3,children:[s.jsx($,{name:"password",type:n?"text":"password",label:"Uusi salasana",autoComplete:"new-password",required:!0,error:!!(i.password&&((p=(h=t.current)==null?void 0:h.elements.password)!=null&&p.validationMessage)),helperText:i.password&&((f=(x=t.current)==null?void 0:x.elements.password)==null?void 0:f.validationMessage),InputLabelProps:{required:!1},value:o.password,onChange:E,onBlur:L,InputProps:{endAdornment:s.jsx(H,{position:"end",children:s.jsx(W,{onClick:()=>y(!n),edge:"end",children:n?s.jsx(D,{}):s.jsx(G,{})})})}}),s.jsx(l,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",loading:b,children:"Vaihda"})]})});return s.jsxs(_,{sx:{...z({color:q(v.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[s.jsx(U,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),s.jsx(j,{alignItems:"center",justifyContent:"center",sx:{height:1},children:s.jsxs(J,{sx:{p:5,width:1,maxWidth:420},children:[s.jsx(r,{variant:"h4",children:"Vaihda salasana"}),s.jsx(r,{variant:"body1",color:"error",sx:{mb:5},children:S}),m&&s.jsxs(s.Fragment,{children:[s.jsx(r,{variant:"h5",color:"error",sx:{mt:2,mb:5},children:"Tunnuksen vahvistus epäonnistui. Linkki on voinut vanhentua."}),s.jsx(l,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:()=>{d.push("/forgot-password")},children:"Lähetä uusi linkki"})]}),!m&&!u&&B,u&&s.jsxs(s.Fragment,{children:[s.jsx(r,{variant:"h5",color:"success",sx:{mt:2,mb:5},children:"Salasanasi on nyt vaihdettu!"}),s.jsx(l,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",onClick:()=>{d.push("/login")},children:"Kirjaudu sisään"})]})]})})]})}function is(){return s.jsxs(s.Fragment,{children:[s.jsx(A,{children:s.jsx("title",{children:" Salasanan nollaus "})}),s.jsx(M,{children:s.jsx(N,{})})]})}export{is as default};
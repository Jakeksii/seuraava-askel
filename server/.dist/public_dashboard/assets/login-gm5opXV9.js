import{y as q,E as F,A as M,r as n,j as e,m as b,I as K,B as O,F as W,x as _,T as l,W as U}from"./index-4JY2uYc9.js";import{d as z,a as D,v as G}from"./test-password-iMOuN6d0.js";import{u as $}from"./use-router-wSG2qjNp.js";import{L as H}from"./logo-L2scAoTo.js";import{T as y}from"./TextField-vdl0cmGb.js";import{I as J}from"./InputAdornment-G0z_MuO8.js";import{L as N}from"./LoadingButton-MxWIXm8B.js";import{C as Q}from"./Card-eoGuS8e4.js";import{L as w}from"./Link-UErGXuUI.js";import"./Select-kMBZwo1Z.js";function X(){var p,h,x,g,f,j,k,v;const S=q(),d=$(),{mutate:C,isLoading:L}=F(),{setSession:V}=M(),t=n.useRef(),[u,E]=n.useState(!1),[I,i]=n.useState(""),[o,T]=n.useState({email:"",password:""}),[r,B]=n.useState({email:!1,password:!1}),m=s=>{s.target.name==="password"&&(G(t.current.elements.password.value)?s.target.setCustomValidity(""):s.target.setCustomValidity("Salasanan on oltava vähintään 8 merkkiä pitkä ja siinä on oltava vähintään yksi iso ja pieni kirjain sekä numero.")),T({...o,[s.target.name]:s.target.value})},c=s=>{B({...r,[s.target.name]:!0})},P=s=>{s.preventDefault(),t.current.checkValidity()&&C(o,{onSuccess:a=>{V(a),localStorage.setItem("token",a.token);const R=a.user.verified?"/":"/verify-email";d.push(R)},onError:a=>{if(!a.response)return i("Tarkista verkkoyhteytesi");switch(a.response.status){case 400:i("Väärä sähköposti tai salasana.");break;case 429:i("Olet yrittänyt liian monta kertaa. Odota hetki ja yritä uudestaan.");break;default:i("Oho, jokin meni vikaan.");break}}})},A=e.jsx("form",{noValidate:!0,onSubmit:P,ref:t,children:e.jsxs(b,{spacing:3,children:[e.jsx(y,{name:"email",type:"email",label:"Sähköposti",required:!0,error:!!(r.email&&((h=(p=t.current)==null?void 0:p.elements.email)!=null&&h.validationMessage)),helperText:r.email&&((g=(x=t.current)==null?void 0:x.elements.email)==null?void 0:g.validationMessage),InputLabelProps:{required:!1},value:o.email,onChange:m,onBlur:c}),e.jsx(y,{name:"password",type:u?"text":"password",label:"Salasana",required:!0,error:!!(r.password&&((j=(f=t.current)==null?void 0:f.elements.password)!=null&&j.validationMessage)),helperText:r.password&&((v=(k=t.current)==null?void 0:k.elements.password)==null?void 0:v.validationMessage),InputLabelProps:{required:!1},value:o.password,onChange:m,onBlur:c,InputProps:{endAdornment:e.jsx(J,{position:"end",children:e.jsx(K,{onClick:()=>E(!u),edge:"end",children:u?e.jsx(z,{}):e.jsx(D,{})})})}}),e.jsx(N,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"success",loading:L,children:"Kirjaudu"})]})});return e.jsxs(O,{sx:{...W({color:_(S.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(H,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(b,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(Q,{sx:{p:5,width:1,maxWidth:420},children:[e.jsx(l,{variant:"h4",children:"Kirjaudu sisään"}),e.jsxs(l,{variant:"body2",sx:{mt:2,mb:2},children:["Ei käyttäjää?",e.jsx(w,{variant:"subtitle2",component:"button",sx:{ml:.5},onClick:()=>{d.push("/register")},children:"Rekisteröidy"})]}),e.jsx(l,{variant:"body1",color:"error",sx:{mb:5},children:I}),A,e.jsx(l,{variant:"body2",sx:{mt:2,mb:2,textAlign:"right"},children:e.jsx(w,{sx:{ml:.5},component:"button",onClick:()=>{d.push("/forgot-password")},children:"Unohtuiko salasana?"})})]})})]})}function le(){return e.jsxs(e.Fragment,{children:[e.jsx(U,{children:e.jsx("title",{children:" Kirjaudu | SE-AS "})}),e.jsx(X,{})]})}export{le as default};

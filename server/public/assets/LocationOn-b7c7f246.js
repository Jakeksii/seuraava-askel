import{r as n,j as u,c as f,d as p}from"./index-d49ab656.js";import{L as c,e as s}from"./constants-06a9c141.js";const v=t=>{if(typeof navigator<"u"&&"geolocation"in navigator)navigator.geolocation.getCurrentPosition(o=>{const e={latitude:o.coords.latitude,longitude:o.coords.longitude,error:null};t(e)},o=>{const e={latitude:c,longitude:s,error:o.message};console.log("Location error: "+o),t(e)});else{const o={latitude:c,longitude:s,error:"Geolocation is not supported by this browser."};console.log("Location error: Geolocation is not supported by this browser."),t(o)}},l=n.createContext({locationOn:!1,coords:{longitude:0,latitude:0},error:null,updateLocation:()=>{},clearLocation:()=>{},locationError:()=>{},getLocation:()=>{}});function b(){const t=n.useContext(l);if(!t)throw new Error("useLocationContext must be used within a LocationContextProvider");return t}function j({children:t}){const[o,e]=n.useState({locationOn:!1,coords:{longitude:0,latitude:0},error:null,updateLocation:()=>{},clearLocation:()=>{},locationError:()=>{},getLocation:()=>{}}),d=()=>{v(r=>{if(!r.error){e({...o,locationOn:!0,coords:{longitude:r.longitude,latitude:r.latitude}});return}console.log(r.error),e({...o,locationOn:!1,coords:{longitude:0,latitude:0},error:r.error})})},L=(i,r)=>{e({...o,locationOn:!0,coords:{longitude:i,latitude:r}})},g=()=>{e({...o,locationOn:!1,error:null})};return u.jsx(l.Provider,{value:{...o,updateLocation:L,clearLocation:g,getLocation:d},children:t})}var a={},x=p;Object.defineProperty(a,"__esModule",{value:!0});var C=a.default=void 0,O=x(f()),_=u,E=(0,O.default)((0,_.jsx)("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}),"LocationOn");C=a.default=E;export{j as L,C as d,b as u};

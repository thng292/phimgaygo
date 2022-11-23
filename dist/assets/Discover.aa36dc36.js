import{j as n,a as e,u as T,r as s,b as A}from"./index.8cc21891.js";import{g as B,b as D,c as G,p as I,d as L}from"./price.fd99817b.js";function V(){return n("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",children:[e("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"})]})}function j(){return e("button",{style:{position:"fixed",bottom:"30px",right:"30px",width:"auto",padding:"15px 20px"},onClick:()=>window.scrollTo(0,0),children:e(V,{})})}const F=({page:i})=>e("div",{className:"center-child outlinebtn",style:{position:"fixed",backgroundColor:"white",top:"100px",right:"40px",height:"40px"},children:n("h3",{children:["Page: ",e("span",{children:i})]})}),O=new Date;function P(){let i=[];i.push(e("option",{value:"",children:"All"}));for(let l=O.getFullYear();l>=1990;--l){let c=String(l);i.push(e("option",{value:c,children:c}))}return i}const R=()=>{var w;let{addItemToCart:i}=T();const[l,c]=s.exports.useState(!1),[g,C]=s.exports.useState("popularity"),[m,N]=s.exports.useState("desc"),[u,S]=s.exports.useState(""),[p,v]=s.exports.useState([]),x=B(),[b,y]=s.exports.useState([]),[a,f]=s.exports.useState({page:1,adult:!1,sortedBy:g,order:m,year:u,genre:p}),o=D(a.page,`${a.sortedBy}.${a.order}`,a.adult,a.year!==""?Number(a.year):void 0,a.genre.length>0?a.genre.join(","):void 0);A(),s.exports.useEffect(()=>{o.data!==void 0&&(console.log(o),y(t=>{var r,d;return[...t,...(d=(r=o.data)==null?void 0:r.results)!=null?d:[]]}))},[o.data]);const k=t=>{console.log(t),p.find(r=>r===t)===void 0?v(r=>[...r,t]):v(r=>{let d=r.map(h=>h);return d.splice(d.findIndex(h=>h===t),1),d})};return n("div",{style:{maxWidth:"1400px"},children:[o.isLoading?e("h1",{style:{position:"fixed",left:"50%",transform:"translateX(-50%)"},children:"Loading..."}):"",n("div",{className:"column p10",children:[n("div",{className:"row p10",style:{alignItems:"center",height:"64px"},children:[n("div",{className:"row p10",onClick:()=>{c(t=>!t)},style:{cursor:"pointer"},children:[e("p",{style:{padding:"10px"},children:"Contain Adult"}),e("input",{className:"p10",type:"checkbox",name:"adult",id:"0",checked:l})]}),e("p",{style:{padding:"10px"},children:"Sort by:"}),n("select",{className:"p10",name:"sortedBy",id:"1",onChange:t=>{console.log(t.currentTarget.value),C(t.currentTarget.value)},defaultValue:"release_date",children:[e("option",{value:"release_date",children:"Release Date"}),e("option",{value:"revenue",children:"Revenue"}),e("option",{value:"popularity",children:"Popularity"}),e("option",{value:"vote_average",children:"Rating"})]}),e("p",{className:"p10",children:"Order by"}),e("div",{className:"row p10",style:{cursor:"pointer"},children:n("select",{name:"order",id:"2",onChange:t=>N(t.currentTarget.value),children:[e("option",{value:"asc",children:"ASC"}),e("option",{value:"desc",children:"DESC"})]})}),e("p",{style:{padding:"10px"},children:"In Year:"}),e("select",{name:"year",id:"3",value:u,onChange:t=>S(t.currentTarget.value),children:P()})]}),e("p",{className:"category",children:"Genres"}),e("div",{className:"row",style:{flexWrap:"wrap"},children:x.data!==void 0?(w=x.data)==null?void 0:w.genres.map(t=>n("div",{className:"row p10",onClick:()=>{k(t.id)},style:{cursor:"pointer"},children:[e("input",{className:"p10",type:"checkbox",name:t.name,id:"0",checked:p.find(r=>r===t.id)!==void 0}),e("p",{style:{padding:"10px"},children:t.name})]})):""}),e("button",{onClick:()=>{y([]),f({page:1,adult:l,sortedBy:g,order:m,genre:p,year:u})},children:"Apply"})]}),e(G,{title:"Discover",films:b,onCart:t=>{i(t,I.FullHD,1)},onInfo:t=>{},onPlay:t=>{}}),e("div",{className:"center-child",children:e(L,{onClick:()=>f(t=>({...t,page:t.page+1})),isLoading:o.isLoading})}),e(j,{}),e(F,{page:a.page})]})};export{R as default};

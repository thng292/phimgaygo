import{r,j as n,a as t,F as h}from"./index.dcd18b05.js";const m=e=>{let[i,l]=r.exports.useState(!1);return n("div",{children:[t("div",{style:{margin:"10px",backgroundImage:"url('"+e.film.thumb+"')",backgroundSize:"contain",backgroundRepeat:"no-repeat",height:"40vh",aspectRatio:"2/3",borderRadius:"15px"},onMouseEnter:()=>{l(!0)},onMouseLeave:()=>{l(!1)},children:i?n("div",{style:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:"15px",backgroundColor:"#00000077"},children:[t("button",{onClick:()=>{e.onPlay(e.film.id)},style:{padding:"10px 15px",margin:"6px 0px",border:"0",borderRadius:"3px",width:"114px",background:"linear-gradient(to right, #da22ff, #9733ee)"},children:n("svg",{xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 24 24",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",children:[t("g",{children:t("rect",{fill:"none",height:"24",width:"24"})}),t("g",{children:t("path",{d:"M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M9.5,16.5l7-4.5l-7-4.5V16.5z"})})]})}),n("div",{children:[t("button",{style:{float:"left",padding:"10px 15px",margin:"0 3px 0 0",borderRadius:"3px",border:"0"},onClick:()=>e.onPlay(e.film.id),children:n("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",children:[t("path",{d:"M0 0h24v24H0V0z",fill:"none"}),t("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"})]})}),t("button",{style:{float:"right",margin:"0 0 0 3px",padding:"10px 15px",borderRadius:"3px",border:"0"},onClick:()=>e.onFavorite(e.film.id),children:n("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",children:[t("path",{d:"M0 0h24v24H0V0z",fill:"none"}),t("path",{d:"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})]})})]})]}):""}),t("p",{style:{color:"white",fontFamily:"sans-serif",textAlign:"center",width:"100%",fontSize:"1.2rem"},children:e.film.name})]})};const g=e=>n(h,{children:[t("p",{style:{color:"white",fontFamily:"sans-serif",fontSize:"1.8rem",fontWeight:"bold",padding:"10px 20px"},children:e.title}),t("div",{className:"disable-scrollbars",style:{display:"flex",flexDirection:"row",overflowX:"scroll"},children:e.films.map(i=>t(m,{film:i,onFavorite:e.onFavorite,onInfo:e.onInfo,onPlay:e.onPlay},i.id))})]});const f=e=>t("div",{style:e.style?e.style:{},onClick:()=>e.onClick(),children:n("div",{style:{position:"absolute",bottom:"20px",display:"flex",flexDirection:"row"},children:[t("img",{className:"p10",src:e.thumbUrl,alt:e.name,style:{maxWidth:"20vw",maxHeight:"30vh"}}),n("div",{style:{position:"relative"},children:[t("p",{className:"title p10",children:e.name}),n("div",{style:{display:"grid",gridTemplateColumns:"auto auto",gridTemplateRows:"auto auto",width:"fit-content"},children:[t("p",{className:"desc fade p10",children:e.year}),t("p",{className:"desc fade p10",children:e.length}),t("p",{className:"desc fade p10",children:e.genre}),n("p",{className:"desc fade p10",children:[e.imdb," on IMDb"]})]}),t("p",{className:"p10 desc",style:{maxHeight:"45px",overflow:"hidden"},children:e.desc}),n("p",{className:"p10 desc",children:[t("span",{className:"fade",children:"Starring: "}),e.cast]}),t("button",{onClick:()=>e.onCart(),style:{background:"linear-gradient(to right, #da22ff, #9733ee)",position:"absolute",width:"114px",border:"0",padding:"10px 15px",margin:"10px",borderRadius:"3px",bottom:"0"},children:n("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",children:[t("path",{d:"M0 0h24v24H0V0z",fill:"none"}),t("path",{d:"M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"})]})})]})]})}),x=e=>{if(e.films.length==0)return t(h,{});let[i,l]=r.exports.useState(0),[s,a]=r.exports.useState(!0);return console.log(e.films),r.exports.useEffect(()=>{const o=setInterval(()=>{l(d=>s?(d+1)%e.films.length:d)},5e3);return()=>{clearInterval(o)}},[]),t("div",{style:{backgroundImage:'url("'+e.films[i].banner+'")',position:"relative",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover",height:"60vh",cursor:"pointer"},onPointerEnter:()=>{a(!1),console.log("Pointer enter")},onPointerLeave:()=>{a(!0),console.log("Pointer leave")},children:t(f,{name:e.films[i].name,desc:e.films[i].description,cast:e.films[i].casts.join(", "),length:e.films[i].length,year:e.films[i].year,imdb:e.films[i].imdbRating,genre:e.films[i].genre,thumbUrl:e.films[i].thumb,style:{background:"linear-gradient(to right, #333, #43434300)",height:"100%",width:"100%",padding:"0 60px"},onClick:()=>{},onCart:()=>{}})})},v=e=>{var a;let i=e.homeController.getData(),l=r.exports.useMemo(()=>{let o=[];return i.forEach((d,c)=>{c!="recommend"&&o.push(t(g,{title:c,films:d,onPlay:()=>{},onFavorite:()=>{},onInfo:()=>{}},c))}),o},[i]),s=(a=i.get("recommend"))!=null?a:[];return n("div",{children:[t(x,{films:s}),l]})};export{v as default};
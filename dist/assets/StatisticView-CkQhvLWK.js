import{u as F}from"./index-DkHKmH-a.js";import{_ as I,r as w,o as B,c as N,a as z,b as _,d as u,g as p,f as c,w as s,e as f,s as A,F as y,h as S,p as D,k as E,l as t,n as L,i as M,t as o}from"./index-CHNNiZCq.js";const T=d=>(D("data-v-3b496d6d"),d=d(),E(),d),$=T(()=>t("h1",null,"Statistik",-1)),j={class:"pb-2"},q={style:{"list-style-type":"none"}},G={style:{"list-style-type":"none"}},H={__name:"StatisticView",setup(d){const P=F(),a=w([]),h=w([]);B(async()=>{await b()});const V=N(()=>h.value.slice().sort((l,i)=>l.id-i.id));async function b(){const l=await z.getPlayers();l.success&&(P.setAvailablePlayers(l.data),h.value=l.data)}function x(l){const i=a.value.findIndex(r=>r.name===l.name);i===-1?a.value.push(l):a.value.splice(i,1),a.value=a.value.sort((r,n)=>r.id-n.id)}return(l,i)=>{var g;const r=_("v-chip"),n=_("v-col"),m=_("v-row"),C=_("v-divider");return u(),p("div",null,[$,c(m,null,{default:s(()=>[c(n,null,{default:s(()=>[(u(!0),p(y,null,S(V.value,(e,v)=>(u(),f(r,{key:v,class:L({"mr-2":!0,"mt-2":!0,"selected-player":a.value.some(k=>k.name===e.name)}),ripple:!1,variant:"elevated",size:"large",label:"",onClick:k=>x(e)},{default:s(()=>[M(o(e.name),1)]),_:2},1032,["class","onClick"]))),128))]),_:1})]),_:1}),(g=a.value)!=null&&g.length?(u(),f(m,{key:0},{default:s(()=>[(u(!0),p(y,null,S(a.value,(e,v)=>(u(),f(n,{key:v,cols:a.value.length<2?"12":"6"},{default:s(()=>[c(m,null,{default:s(()=>[c(n,{cols:"12"},{default:s(()=>[t("h3",j,o(e.name),1),c(C)]),_:2},1024),c(n,{cols:"12",class:"pt-0"},{default:s(()=>[t("ul",q,[t("li",null,"Vunnit "+o(e.wonamount)+" kr",1),t("li",null,"Förlorat "+o(e.lostamount)+" kr",1),t("li",null,"Plus minus noll? "+o(e.wonamount-e.lostamount)+" kr",1)])]),_:2},1024),c(n,{cols:"12"},{default:s(()=>[t("ul",G,[t("li",null,"Spelat totalt "+o(e.totalgames)+" matcher",1),t("li",null,"Vunnit matcher "+o(e.wongames),1),t("li",null,"Förlorat match "+o(e.lostgames),1),t("li",null,"Vinstchans "+o((e.wongames/e.totalgames*100).toFixed(1))+"%",1)])]),_:2},1024)]),_:2},1024)]),_:2},1032,["cols"]))),128))]),_:1})):A("",!0)])}}},O=I(H,[["__scopeId","data-v-3b496d6d"]]);export{O as default};

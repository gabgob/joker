import{_ as ae,u as ne,r as b,o as le,a as S,q as B,c as oe,b as f,d as r,g as _,f as o,w as n,e as A,s as W,F as x,h as P,v as $,x as z,i as d,l as h,n as I,t as p}from"./index-DfZcCJ6r.js";import{u as se}from"./index-BLBgta-K.js";const ie={key:0},ue={class:"button-container d-flex flex-column align-center justify-center"},ce={key:0,class:"d-flex flex-row align-center"},re={key:0},de={class:"font-weight-bold"},ve={__name:"GameView",setup(fe){const M=se(),D=ne(),V=b({}),v=b([]),g=b(!1),L=b([]),E=b(!1),c=b({}),O=b(!1),k=b([]);le(async()=>{await y()});function N(a,l){l===0?(a.consecutiveWins++,v.value.forEach(e=>{e.name!==a.name&&e.consecutiveWins>0&&(e.consecutiveWins=0)}),v.value.forEach(e=>{e.name!==a.name&&(e.disableWinOption=!0)})):(a.consecutiveWins=0,a.lostAmountCurrentGame+=l),l===0?a.previousAction="won":l===10?a.previousAction=10:l===20&&(a.previousAction=20),a.registered=!0}function T(a){a.registered=!1,a.previousAction!=="won"?a.lostAmountCurrentGame-=a.previousAction:(a.consecutiveWins--,v.value.forEach(l=>{l.name!==a.name&&(l.disableWinOption=!1)}))}function F(){c.value={};let a=0;L.value.forEach(e=>{const t=e.winner;e.from.forEach(s=>{const i=s.name,C=s.amount;c.value[t]||(c.value[t]={}),c.value[t][i]||(c.value[t][i]=0),c.value[i]||(c.value[i]={}),c.value[i][t]||(c.value[i][t]=0),c.value[t][i]+=C,c.value[i][t]-=C});for(const s in c.value[t])Object.hasOwnProperty.call(c.value[t],s)&&(a+=c.value[t][s])});const l={};for(const e in c.value)if(Object.hasOwnProperty.call(c.value,e)){const t=c.value[e];let s=0,i=0;for(const C in t)if(Object.hasOwnProperty.call(t,C)){const G=t[C];G>0?s+=G:i-=G}l[e]={totalWon:s,totalLoss:i}}v.value.forEach(e=>{for(const t in l)if(e.name===t){const s=l[t];e.totalWon=s.totalWon,e.totalLoss=s.totalLoss}}),E.value=!0,L.value.forEach(e=>{const t=e.winner;v.value.forEach(s=>{s.name===t?(s.wonamount+=a,s.wongames++):(s.lostamount+=s.totalLoss,s.lostgames++),s.totalgames++})}),v.value.forEach(async e=>{await S.updatePlayer(e)})}async function q(){await y()}async function y(){K();const a=await S.getGame(D.params.gameId);a.success&&(V.value=a.game[0],V.value.playerstats.forEach(l=>{let e={...l.player,lostAmountCurrentGame:0,consecutiveWins:0,registered:!1,disableWinOption:!1,wonGame:!1,previousAction:null};v.value.push(e)}))}function K(){V.value={},v.value=[],g.value=!1}async function U(){k.value.forEach(l=>{v.value.push({...l,lostAmountCurrentGame:0,consecutiveWins:0,registered:!1,disableWinOption:!1,wonGame:!1,previousAction:null})});const a=v.value.map(l=>l.name);await S.addPlayersToCurrentGame(D.params.gameId,a),k.value=[]}function H(a){k.value.some(e=>e.name===a.name)?k.value=k.value.filter(e=>e.name!==a.name):k.value.push(a)}B(v,a=>{a.every(e=>e.registered)&&a.forEach(e=>{e.registered=!1,e.disableWinOption=!1,e.consecutiveWins===2&&(e.wonGame=!0,g.value=!0)})},{deep:!0}),B(g,async a=>{if(a){let l="",e=0,t=[];v.value.forEach(i=>{i.wonGame?l=i.name:(e+=i.lostAmountCurrentGame,t.push({name:i.name,amount:i.lostAmountCurrentGame}))});let s={winner:l,wonAmount:e,from:t};L.value.push(s)}});const J=oe(()=>M.getAvailablePlayers.slice().sort((e,t)=>e.id-t.id).filter(e=>!v.value.some(t=>t.name===e.name)));return(a,l)=>{var R;const e=f("v-icon"),t=f("v-col"),s=f("v-row"),i=f("v-btn"),C=f("v-divider"),G=f("v-card-title"),Q=f("v-chip"),X=f("v-card-text"),Y=f("v-spacer"),Z=f("v-card-actions"),ee=f("v-card"),te=f("v-dialog");return(R=v.value)!=null&&R.length?(r(),_("div",ie,[o(s,null,{default:n(()=>[(r(!0),_(x,null,P(v.value,(u,w)=>(r(),A(t,{key:w,cols:"6"},{default:n(()=>[h("div",{class:I({"player-container":!0,"player-container-won":u.consecutiveWins===2,"player-container-won-prev":u.consecutiveWins===1})},[o(s,{"no-gutters":""},{default:n(()=>[o(t,{class:"pl-4 pt-4"},{default:n(()=>[h("h3",null,[d(p(u.name)+" ",1),o(e,{size:"small",style:{float:"right","padding-right":"15px"},onClick:m=>T(u),disabled:!u.registered},{default:n(()=>[d(" mdi-undo ")]),_:2},1032,["onClick","disabled"])])]),_:2},1024)]),_:2},1024),o(s,{class:"ma-0"},{default:n(()=>[o(t,{class:"text-center pl-4"},{default:n(()=>[h("span",null,p(u.lostAmountCurrentGame)+" kr ",1)]),_:2},1024)]),_:2},1024),h("div",ue,[o(i,{variant:"elevated",color:"info",onClick:m=>N(u,10),disabled:u.registered||g.value,class:"ml-2 mb-2 mt-1"},{default:n(()=>[d(" 10 kr ")]),_:2},1032,["onClick","disabled"]),o(i,{variant:"elevated",color:"info",onClick:m=>N(u,20),disabled:u.registered||g.value,class:"ml-2 mb-2 mt-1"},{default:n(()=>[d(" 20 kr ")]),_:2},1032,["onClick","disabled"]),o(i,{variant:"elevated",color:"info",onClick:m=>N(u,0),disabled:u.registered||u.disableWinOption||g.value,class:"ml-2 mb-2 mt-1"},{default:n(()=>[d(" Vinst ")]),_:2},1032,["onClick","disabled"])])],2)]),_:2},1024))),128))]),_:1}),E.value?W("",!0):(r(),A(s,{key:0},{default:n(()=>[o(t,null,{default:n(()=>[$(o(i,{block:"",color:"red-lighten-1",size:"x-large",onClick:F},{default:n(()=>[d(" Avsluta ")]),_:1},512),[[z,g.value]])]),_:1}),o(t,null,{default:n(()=>[$(o(i,{block:"",color:"blue-lighten-1",size:"x-large",onClick:q},{default:n(()=>[d(" Kör igen ")]),_:1},512),[[z,g.value]])]),_:1})]),_:1})),E.value?(r(),A(s,{key:1},{default:n(()=>[o(t,{cols:"12"},{default:n(()=>[(r(!0),_(x,null,P(c.value,(u,w)=>(r(),_("div",{key:w,class:"pb-4"},[(r(!0),_(x,null,P(u,(m,j)=>(r(),_("div",{key:j},[m<0?(r(),_("div",ce,[h("span",null,[h("strong",null,p(w),1),d(" ska ge "),h("span",null,[d(p(Math.abs(m))+" kr till ",1),h("strong",null,p(j),1)])])])):W("",!0)]))),128))]))),128))]),_:1}),o(C),o(t,null,{default:n(()=>[(r(!0),_(x,null,P(v.value,(u,w)=>(r(),_("div",{key:w},[u.wonGame?(r(),_("div",re,[h("span",de,p(u.name),1),d(" har vunnit totalt "+p(u.totalWon)+" kr ",1)])):W("",!0)]))),128))]),_:1})]),_:1})):W("",!0),E.value?(r(),A(s,{key:2},{default:n(()=>[o(t,null,{default:n(()=>[$(o(i,{block:"",color:"red-lighten-1",size:"x-large",to:"/"},{default:n(()=>[d(" Nytt spel ")]),_:1},512),[[z,g.value]])]),_:1})]),_:1})):(r(),A(s,{key:3},{default:n(()=>[o(t,{cols:"12"},{default:n(()=>[o(i,{variant:"tonal",color:"blue-lighten-1",block:"",onClick:l[0]||(l[0]=u=>O.value=!0)},{default:n(()=>[o(e,null,{default:n(()=>[d(" mdi-account-plus-outline ")]),_:1})]),_:1})]),_:1}),o(t,{cols:"12"},{default:n(()=>[o(i,{block:"",color:"red-lighten-1",to:"/"},{default:n(()=>[d(" Avsluta ")]),_:1})]),_:1})]),_:1})),o(te,{modelValue:O.value,"onUpdate:modelValue":l[2]||(l[2]=u=>O.value=u)},{default:n(()=>[o(ee,null,{default:n(()=>[o(G,null,{default:n(()=>[d(" Lägg till spelare ")]),_:1}),o(X,{class:"pt-0"},{default:n(()=>[(r(!0),_(x,null,P(J.value,(u,w)=>(r(),A(Q,{key:w,class:I({"mr-2":!0,"mt-2":!0,"selected-player":k.value.some(m=>m.name===u.name)}),ripple:!1,variant:k.value.some(m=>m.name===u.name)?"elevated":"outlined",size:"large",label:"",onClick:m=>H(u)},{default:n(()=>[d(p(u.name),1)]),_:2},1032,["class","variant","onClick"]))),128))]),_:1}),o(Z,null,{default:n(()=>[o(Y),o(i,{color:"error",variant:"tonal",onClick:l[1]||(l[1]=u=>O.value=!1)},{default:n(()=>[d(" Stäng ")]),_:1}),o(i,{color:"info",variant:"tonal",onClick:U},{default:n(()=>[d(" Lägg till ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])):W("",!0)}}},ge=ae(ve,[["__scopeId","data-v-219e7f10"]]);export{ge as default};

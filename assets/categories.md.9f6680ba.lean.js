import{u as v,_ as F}from"./chunks/docList.a3f97a1a.js";import{r as i,o,c as l,a as d,F as C,b,n as p,u as a,t as m,d as w,e as k,f as g}from"./app.f8544706.js";const B={class:"wy-cat docs-wrap"},D={class:"cat-wrap"},S=["onClick"],x={key:0},E={__name:"wyCat",setup(f){const n=["#FFB3B3","#FFDBA4","#FFE9AE","#C1EFFF","#3498DB"],{categories:c,tags:y}=v();let s=i(""),u=i([]),r=i("");if(typeof window<"u"){let t=new URLSearchParams(window.location.search),_=t.get("type");_==="tag"?(s.value=t.get("tag"),u.value=[...y].map(e=>({label:e,color:n[Math.floor(Math.random()*4)]}))):(s.value=t.get("cat"),u.value=Object.keys(c).map(e=>({label:e,num:c[e],color:n[Math.floor(Math.random()*4)]}))),r.value=_}function h(t){s.value=t}return(t,_)=>(o(),l("div",B,[d("div",D,[(o(!0),l(C,null,b(a(u),e=>(o(),l("div",{key:e.label,class:p([a(r)!=="tag"?"cat-item":"tag-item",a(s)===e.label?"is-cur":""]),onClick:N=>h(e.label)},[a(r)!=="tag"?(o(),l("span",x,m(e.num),1)):w("",!0),d("span",{class:p([a(r)!=="tag"?"docs-categor-num":"docs-tag-num"]),style:k({backgroundColor:e.color})},m(e.label),7)],10,S))),128))]),g(F,{filter:a(s),type:a(r)},null,8,["filter","type"])]))}},V=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"categories.md","lastUpdated":1662613821000}'),M={name:"categories.md"},$=Object.assign(M,{setup(f){return(n,c)=>(o(),l("div",null,[g(E)]))}});export{V as __pageData,$ as default};

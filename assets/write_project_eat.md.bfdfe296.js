import{_,o as c,c as u,a as r,j as p,v as h,t as m,F as f,b as g,n as v}from"./app.f8544706.js";const b={data(){return{eats:"",eatsAry:[],times:2,curIdx:0,randomEats:"输入想吃的，空格隔开，然后点击生成",loading:!1}},methods:{randomEat(){if(!this.eats||this.times<=0)return;const l=this.eats.split(" ");this.eatsAry=l;const a=l.length;this.times--;const d=20+Math.floor(Math.random()*50);let i=0,t=e=>{let s=100,o=d-e;switch(!0){case o>20:s=60;break;case o>7:s=100;break;case o>=3:s=400;break;case o>=0:s=800;break}return s};this.loading=!0;let n=()=>{if(i>d){this.loading=!1,this.randomEats=`${this.times===1?"（不想吃可再随机一次哦）":"（那就吃这个吧）"}`,this.times===0&&(this.loading=!0);return}setTimeout(()=>{this.curIdx=i++%a,n()},t(i))};n()}}},A=JSON.parse('{"title":"","description":"","frontmatter":{"author":"Younglina","date":"2022-03-01"},"headers":[],"relativePath":"write/project/eat.md","lastUpdated":1662613821000}'),k={class:"eats-contain"},x=["disabled"],y={class:"eats-res"},E={class:"eats-grid"};function I(l,a,d,i,t,n){return c(),u("div",null,[r("template",null,[r("div",k,[p(r("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>t.eats=e),placeholder:"输入想吃的，空格隔开",class:"eat-input"},null,512),[[h,t.eats]]),r("button",{onClick:a[1]||(a[1]=(...e)=>n.randomEat&&n.randomEat(...e)),class:"eats-button",disabled:t.loading},"生成",8,x)]),r("p",y,m(t.randomEats),1),r("div",E,[(c(!0),u(f,null,g(t.eatsAry,(e,s)=>(c(),u("div",{key:e+s,class:v({"eats-cur":s===t.curIdx})},m(e),3))),128))])])])}const B=_(b,[["render",I],["__scopeId","data-v-9f780a30"]]);export{A as __pageData,B as default};
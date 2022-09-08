---
author: Younglina
date: '2022-03-01'
---

<template>
    <div class="eats-contain">
        <input v-model="eats" placeholder="输入想吃的，空格隔开" class="eat-input"/>
        <button @click="randomEat" class="eats-button" :disabled="loading">生成</button>
    </div>
    <p class="eats-res">{{randomEats}}</p>
    <div class="eats-grid">
        <div v-for="(item, idx) in eatsAry" :key="item+idx" :class="{'eats-cur': idx===curIdx}">{{item}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            eats: "",
            eatsAry:[],
            times: 2,
            curIdx: 0,
            randomEats: '输入想吃的，空格隔开，然后点击生成',
            loading: false
        }
    },
    methods:{
        randomEat(){
            if(!this.eats || this.times<=0) return
            const eats = this.eats.split(' ')
            this.eatsAry = eats
            const len = eats.length
            this.times--
            const rand = Math.floor(Math.random()*(len-1))
            const randomTimes = 20 + Math.floor((Math.random()*50))
            let i=0
            let setSpeed = (i) => {
                let speed = 100
                let times = randomTimes-i
                switch(true){
                    case times>20: speed = 60;break;
                    case times>7: speed =100;break;
                    case times>=3: speed =400;break;
                    case times>=0: speed =800;break;
                }
                return speed
            }
            this.loading = true
            let aaa = ()=>{
                if(i>randomTimes){
                    this.loading = false
                    this.randomEats = `${this.times===1?'（不想吃可再随机一次哦）':'（那就吃这个吧）'}`
                    this.times === 0 && (this.loading = true)
                    return
                }
                setTimeout(()=>{
                    this.curIdx = (i++)%len
                    aaa()
                }, setSpeed(i))
            }
            aaa()
        }
    }
}
</script>
<style scoped>
    .eats-contain{
        display: flex;
    }
    .eats-input{
        cursor: pointer;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 300px;
    }
    button:disabled {
        color: #8cc5ff;
        background-color: #ecf5ff;
        border-color: #d9ecff;
        cursor: not-allowed;
    }
    .eats-button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        margin-left: 10px;
    }
    .eats-res{
        padding: 0 20px;
        color: red;
    }
    .eats-grid{
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-auto-rows: 100px;
        justify-items: center;
        align-items: center;
    }
    .eats-grid div{
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .eats-cur{
        background-color: rgba(0,0,0,.2);
    }
</style>
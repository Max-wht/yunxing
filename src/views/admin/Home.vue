

<template>
    <div class="menu-container">
      <el-container>
        <!-- 侧边栏 -->
            <el-aside class="menu-side"  :class="{ 'menu-side-narrow': flag }">
                
                <div style="display: flex;align-items: center;">
                    <Logo name="Cloud Silicon" style="padding: 0 40px;margin: 15px 0;" :flag="flag" :bag="colorLogo"/>
                </div>
                <div style="margin-top: 12px;">
                    <AdminMenu :flag="flag" :routes="adminRoutes" :bag="bagMenu" @select="handleRouteSelect"/>
                </div>

            </el-aside>
            <el-container class="main">
                <el-header class="header-section">
                        <LevelHeader :tag="tag" :userInfo="userInfo" @eventListener="eventListener" @selectOperation="selectOperation" />
                </el-header>
                <el-main class="content-section">
                        <router-view></router-view>
                </el-main>
                
            </el-container>
        
      </el-container>
    </div>
  </template>


<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import AdminMenu from '@/components/VerticalMenu.vue'
import LevelHeader from '@/components/LevelHeader.vue';
import router from '@/router';
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';
const route = useRoute();

import { ref, onMounted } from 'vue'

let colorLogo= '#1c1c1c'
let flag = false;
let adminRoutes = ref<RouteRecordRaw[]>([])
let bagMenu: 'rgb(248,248,248)'
let dialogOperaion= false
let userInfo = ref({
    id: null,
    url: '',
    name: '',
    role: null,
    phone: ''
})

onMounted(() => {
    let menus = router.options.routes.filter(router => router.path ==='/admin')[0]
    adminRoutes.value = menus?.children??[]
    // tokenCheckLoad();
    menuOperationHistory();
})

function menuOperationHistory() {
    flag = sessionStorage.getItem('flag') === 'true'
}

let tag ='可视化';
function handleRouteSelect(index: string){
    const ary = adminRoutes.value.filter(entity => entity.path == index);
    tag = ary[0].name as string;
    if(route.path == index){
        return;
    }else{
        router.push({ path : index })
    }
}
function eventListener(event: string) {
   // 个人中心
   if (event === 'center') {
        dialogOperaion = true;
    }
    // 退出登录
    if (event === 'loginOut') {
        loginOut();
    }
}
//TODO 个人中心：updateUserInfo  
function selectOperation(f: boolean) {
   flag = f;
}
function loginOut() {
    //TODO 退出登录的逻辑
}
</script>

<style scoped lang="scss">
.menu-container {
    display: flex;
    height: 100vh;
    width: 100%;


    .menu-side {
        width: 253px;
        min-width: 95px;
        height: 100vh;
        padding-top: 10px;
        box-sizing: border-box;
        transition: width 0.3s ease;
        background-color: rgb(248, 248, 248);
    }

    .menu-side-narrow {
        width: 115px;
    }

    .main {
        flex-grow: 1;
        overflow-x: hidden;

        .header-section {
            max-width: 100%;
            padding: 0 15px 0 0;
        }

        .content-section {
            overflow-x: hidden;
            flex-grow: 1;
            padding: 0 15px;
            box-sizing: border-box;
            overflow-y: auto;
        }
    }



}
</style>
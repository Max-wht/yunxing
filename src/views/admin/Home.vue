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
            <!-- 个人中心 -->
            <el-dialog v-model="dialogOperaion" :show-close="false" width="30%">
                <template #title>
                    <div style="padding: 25px 0 0 20px;">
                        <span style="font-size: 18px;font-weight: 800;">个人中心</span>
                    </div>
                </template>
                <el-row style="padding: 10px 20px 20px 20px;">
                    <el-row>
                        <p style="font-size: 12px;padding: 3px 0;margin-bottom: 10px;">
                            <span class="modelName">*头像</span>
                        </p>
                        <el-upload class="avatar-uploader" action="/api/book-manage-sys-api/v1.0/file/upload"
                            :show-file-list="false" :on-success="handleAvatarSuccess">
                            <img v-if="userInfo.url" :src="userInfo.url" style="width: 80px;height: 80px;">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-row>
                    <el-row>
                        <p style="font-size: 12px;padding: 3px 0;">
                            <span class="modelName">*用户名</span>
                        </p>
                        <input class="input-title" v-model="userInfo.name" placeholder="用户名">
                    </el-row>
                    <el-row>
                        <p style="font-size: 12px;padding: 3px 0;">
                            <span class="modelName">*用户手机号</span>
                        </p>
                        <input class="input-title" v-model="userInfo.phone" placeholder="用户手机号">
                    </el-row>
                </el-row>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button class="customer" size="small" style="background-color: rgb(241, 241, 241);border: none;"
                            @click="dialogOperaion = false">取 消</el-button>
                        <el-button size="small" style="background-color: #15559a;border: none;" class="customer" type="info"
                            @click="updateUserInfo">修改</el-button>
                    </span>
                </template>
                
            </el-dialog>
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
import { ElMessage } from 'element-plus'

let colorLogo= '#1c1c1c'
let flag = ref(false);
let adminRoutes = ref<RouteRecordRaw[]>([])
let bagMenu: 'rgb(248,248,248)'
let dialogOperaion= ref(false)
let userInfo = ref({
    id: null,
    avatar: '',
    name: '',
    role: null,
    phone: ''
})

const tag = ref('')

onMounted(() => {
    let menus = router.options.routes.filter(router => router.path ==='/admin')[0]
    adminRoutes.value = menus?.children??[]
    // tokenCheckLoad();
    menuOperationHistory();
})

function menuOperationHistory() {
    flag.value = sessionStorage.getItem('flag') === 'true'
}

function handleRouteSelect(index: string){
    const ary = adminRoutes.value.filter(entity => entity.path == index);
    tag.value = ary[0].name as string;
    console.log(tag.value);
    if(route.path == index){
        return;
    }else{
        router.push({ path : index })
    }
}
function eventListener(event: string) {
   // 个人中心
   if (event === 'center') {
        console.log('center');
        dialogOperaion.value = true;
    }
    // 退出登录
    if (event === 'loginOut') {
        loginOut();
    }
} 
function selectOperation(f: boolean) {
   flag.value = f;
}

//TODO 退出登录的逻辑
function loginOut() {
    
}
//TODO 更新个人信息
function updateUserInfo() {
   
}

interface UploadResponse {
    code: number;
    data: string;
}

function handleAvatarSuccess(res: UploadResponse) {
    if (res.code !== 200) {
        ElMessage.error('头像上传异常');
        return;
    }
    ElMessage.success('头像上传成功');
    userInfo.value.url = res.data;
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
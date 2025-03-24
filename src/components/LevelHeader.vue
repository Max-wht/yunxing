<template>
<div class="main">
    <span style="margin-left: 20px;">
        <i v-if="!showFlag" class="el-icon-s-fold i-folder"></i>
        <i v-else class="el-icon-s-unfold i-folder"></i>
    </span>
    <span>
        <span class="operation-span-tag">
            &nbsp;&nbsp;
            {{ props.tag }}
        </span>
    </span>
    <span class="user-block">
        <el-dropdown class="user-dropdown">
            <span class="el-dropdown-link" style="display: flex; align-items: center;">
                <el-avatar :size="50" :src=props.userInfo.avatar style="margin-top: 0;" />
                <span class="userName" style="margin-left: 5px;font-size: 16px;">{{ props.userInfo.name }}</span>
                <i class="el-icon-arrow-down el-icon--right" style="margin-left: 5px;">
                    <el-icon><ArrowDown /></el-icon>
                </i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                <el-dropdown-item @click="userCenterPanel">
                    <el-icon><Edit /></el-icon>个人资料
                </el-dropdown-item>
                <el-dropdown-item @click="loginOut">
                    <el-icon><CircleClose /></el-icon>退出登录
                </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </span>
</div>

</template>

<script setup lang="ts">
import { useTransitionFallthrough } from 'element-plus';
import { defineProps , ref ,defineEmits} from 'vue';
const defaultAvatar = '/public/defaultAvatar.png'
const emit = defineEmits(['eventListener'])
const props = defineProps({
    tag: {
        type: String,
        default: 'Home'
    },
    userInfo:{
        type: Object,
        default : {}
    }
})
const showFlag = ref(sessionStorage.getItem('flag') === 'true')

function userCenterPanel() {
   emit('eventListener' ,'center')
}
function loginOut() {
    emit('eventListener', 'loginOut');
}

</script>

<style scoped lang="scss">
.main {
    padding: 26px 30px 26px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    background-color:rgb(248, 248, 248);
    color: #666;

    .operation-span-tag {
        padding: 9px 10px;
        border-radius: 3px;
        font-size: 22px;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        user-select: none;
        margin-top: 15px;
    }

    .operation-span:hover {
        background-color: rgb(248, 248, 248);
    }

    .operation-span {
        margin-top: 20px;
        padding: 6px;
        border-radius: 3px;
        user-select: none;

        i {
            margin: 5px;
            font-size: 20px;
            color: #333;
        }
    }

    span {
        color: #333;
    }

    .user-block {
        position: absolute;
        right: 50px;

        .userName {
            display: inline-block;
            vertical-align: middle;
            font-size: 14px;
            cursor: pointer;
            user-select: none;
        }
    }
}
</style>

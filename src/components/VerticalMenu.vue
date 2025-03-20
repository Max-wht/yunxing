<template>
    <el-menu :collapse-transition="true" :collapse="props.flag"
    style="padding: 5px 20px;max-width: 253px;"
    :default-active="activeIndex" :background-color="props.bag" text-color="#666"
    @select="handleSelect">

        <el-menu-item v-for="(item,index) in routes" :key="index" style="width: 100%;"
        :index="item.path"
        :class="{ 'is-active': activeIndex === item.path }">
            <i :class="item.meta?.icon" style="font-size: 20px;"></i>
            <template #title>
                <span style="font-size: 20px;">{{ item.name }}</span>
            </template>
            
        </el-menu-item>
    
    </el-menu>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

// interface RoutesItem {
//     path: string;
//     name: string;
//     meta: {
//         icon: string;
//     }
// }

const props = defineProps({
    flag:{
        type: Boolean,
        required: false
    },
    bag: {
        type: String,
        default: 'rgb(248,248,248)'
    },
    routes: {
        type: Array as () => RouteRecordRaw[],
        required: true
    }
})

const activeIndex = ref('1');

//  function：显示历史选中路径
onMounted(() => {
    const lastPath = sessionStorage.getItem('activePath');
    if(lastPath === null){
        handleSelect('/adminLayout');
    }else{
        handleSelect(lastPath);
    }
})

// function：通过侧边啦跳转到对应子页面
function handleSelect(index: string) {
    activeIndex.value = index;
    // alert('select:' + index);
    // 浏览器提供的 Web Storage API 的一部分，用于在当前会话期间存储数据
    sessionStorage.setItem('activePath',index);
}
</script>


<style scoped lang="scss">
*{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 400;
}
</style>
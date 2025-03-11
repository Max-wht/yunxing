<template>
    <span class="logo">
        <el-image style="width: 100px; height: 100px" :src="url" :fit="fits" />
        <div v-if="!flag">
            <span :style="{ color: bag, display: 'block' }">{{ name }}</span>
        </div>
    </span>
</template>

<script setup lang="ts">
import type { ImageProps } from 'element-plus'
import { defineProps } from 'vue'

const fits = 'fill' as ImageProps['fit']
const url = "/public/YunXingLogo.ico"
const props = defineProps({
    name: {
        type: String,
        default: 'xx系统'
    },
    flag: {
        type: Boolean,
        required: false
    },
    bag: {
        type: String,
        default: '#1c1c1c'
    },
})
</script>

<style scoped lang="scss">
.logo {
    color: rgb(8, 24, 16) !important;
    font-weight: bold;
    font-size: 26px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    user-select: none;

    span {
        margin-left: 8px;
        color: #666;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
}
</style>
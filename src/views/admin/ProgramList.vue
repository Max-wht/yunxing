<template>
    <div class="program-list">
        <!-- 搜索和筛选区域 -->
        <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="6">
                <el-input v-model="search" placeholder="搜索项目名称" clearable>
                    <template #suffix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="categoryId" placeholder="选择分类" clearable>
                    <el-option label="全部" value="null" />
                    <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
            </el-col>
        </el-row>

        <!-- 项目列表 -->
        <el-row :gutter="20">
            <el-col :span="8" v-for="item in projectList" :key="item.id">
                <el-card class="project-card" :body-style="{ padding: '0px' }" @click="handleCardClick(item)">
                    <img v-if="item.avatar" :src="item.avatar" class="project-image">
                    <div class="project-info">
                        <h3>{{ item.name }}</h3>
                        <p class="description">{{ item.pdescription }}</p>
                        <div class="meta-info">
                            <el-tag size="small">{{ item.categoryId }}</el-tag>
                            <span class="time">创建时间: {{ formatDate(item.createTime) }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface Project {
    id: number
    name: string
    pdescription: string
    categoryId: string
    createTime: string
    avatar: string
    managerId: number
}

interface Category {
    id: number
    name: string
}

const search = ref('')
const categoryId = ref('')
const projectList = ref<Project[]>([])
const categories = ref<Category[]>([])
const router = useRouter()

// 格式化日期
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

// 获取项目列表
const getProjectList = async () => {
    try {
        console.log("&&&&&"+search.value, categoryId.value)
        const response = await axios({
            method: 'get',
            url: '/api/project/list',
            params: {
                projectName: search.value,
                categoryType: categoryId.value
            }
        })
        if (response.data.code === 1) {
            projectList.value = response.data.data
            console.log("项目列表：", projectList.value)
        }
    } catch (error) {
        console.error('获取项目列表失败:', error)
    }
}

// 获取分类列表
const getCategories = async () => {
    try {
        const response = await axios.get('/api/project/categories')
        if (response.data.code === 1) {
            categories.value = response.data.data
        }
    } catch (error) {
        console.error('获取分类列表失败:', error)
    }
}

// 监听搜索和分类变化
watch([search, categoryId], () => {
    getProjectList()
})

// 处理卡片点击
const handleCardClick = (project: Project) => {
    localStorage.setItem('currentProject', JSON.stringify({
        ...project
    }))
    router.push({
        name: "Program Detail",
        params: {
            id: project.id
        }
    })
}

onMounted(() => {
    getProjectList()
    getCategories()
})
</script>

<style scoped lang="scss">
.program-list {
    padding: 20px;
}

.project-card {
    margin-bottom: 20px;
    transition: all 0.3s;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
}

.project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.project-info {
    padding: 15px;

    h3 {
        margin: 0;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .description {
        color: #666;
        font-size: 14px;
        margin-bottom: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .meta-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #999;
    }
}
</style>
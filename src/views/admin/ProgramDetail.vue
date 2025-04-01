<template>
  <div class="program-detail">
    <el-card>
      <template #header>
        <div class="header">
          <el-button @click="goBack" icon="ArrowLeft">返回</el-button>
          <h2>{{ projectInfo.name }}</h2>
        </div>
      </template>

      <div class="content">

        <div class="info-section">
          <el-descriptions
            title="Width vertical list"
            direction="vertical"
            border
            style="margin-top: 20px"
          >
            <el-descriptions-item
              :rowspan="2"
              :width="140"
              label="Photo"
              align="center"
            >
              <img
                style="width: 100px; height: 100px"
                :src="projectInfo.avatar"
                alt="项目图片" class="project-image"
              />
            </el-descriptions-item>
            <el-descriptions-item label="项目名称"
              >{{ projectInfo.name }}</el-descriptions-item
            >
            <el-descriptions-item label="项目分类"
              >{{ categories.find(c => c.id === Number(projectInfo.categoryId))?.name }}</el-descriptions-item
            >
            <el-descriptions-item label="创建时间">{{ formatDate(projectInfo.createTime) }}</el-descriptions-item>
            <el-descriptions-item label="管理员ID">
              <el-tag size="small">{{ projectInfo.managerId }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="简介">
                {{ projectInfo.pdescription }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

interface ProjectInfo {
  id: number;
  name: string;
  pdescription: string;
  categoryId: string;
  createTime: string;
  avatar: string;
  managerId: number;
  category: Category;
}
interface Category {
  id: number;
  name: string;
}

const projectInfo = ref<ProjectInfo>({
  id: 0,
  name: "",
  pdescription: "",
  categoryId: "",
  createTime: "",
  avatar: "",
  managerId: 0,
  category: {
    id: 0,
    name: "",
  },
});

const categories = ref<Category[]>([
    {
        id: 1,
        name: "基础"
    },
    {
        id: 2,
        name: "进阶"
    },
    {
        id: 3,
        name: "毕业"
    }
]);

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// 返回上一页
const goBack = () => {
  router.back();
};

onMounted(() => {
  // 从localStorage中获取项目信息
  const projectStr = localStorage.getItem("currentProject");
  if (projectStr) {
    const project = JSON.parse(projectStr);
    console.log("项目信息：", project);
    projectInfo.value = project;
  }
});
</script>

<style scoped lang="scss">
.program-detail {
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    gap: 20px;

    h2 {
      margin: 0;
    }
  }

  .content {
    display: flex;
    gap: 30px;
    margin-top: 20px;

    .image-section {
      flex: 0 0 400px;

      .project-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .info-section {
      flex: 1;
    }
  }
}
</style> 
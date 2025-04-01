<template>
<br>
  <el-row>
    <el-input v-model="searchClassName" style="width: 240px" placeholder="Please input" />
    <el-button type="primary" @click="searchClassName">搜索</el-button>
  </el-row>

  <el-row>
    <template v-if="clazz.length > 0">
      <el-col :span="24" v-for="item in clazz" :key="item.className">
        <el-card>
          <el-descriptions class="margin-top" :title="item.className" :column="3" :size="size" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <user />
                  </el-icon>
                  学院
                </div>
              </template>
              {{ item.academy }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <iphone />
                  </el-icon>
                  班级总人数
                </div>
              </template>
              {{ item.totalMember }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <location />
                  </el-icon>
                  校区
                </div>
              </template>
              {{ item.campus }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </template>
    <el-empty :image-size="200" v-else description="暂无班级信息" />
  </el-row>
</template>

<script setup lang ="ts">

import { computed, ref } from 'vue'
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'
import type { ComponentSize } from 'element-plus'

const size = ref<ComponentSize>('default')
const searchClassName = ref<string>('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
})


interface clazz {
    academy: string;
    className: string;
    totalMember: number;
    campus: string;
}
const clazz = ref<clazz[]>([])
import axios from 'axios'
import { onMounted } from 'vue'

async function freshClazz() {
    const response = await axios({
        method: 'get',
        url: '/api/classes/info',

    })
    if (response.data.code === 1) {
        clazz.value = response.data.data
    }
}
onMounted(() => {
    freshClazz()
})

</script>

<style scoped lang="scss">
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}

.el-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
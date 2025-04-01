<template>
    <br>
    <el-row>
        <el-col :span="12">
            <div style="display: flex; align-items: center; gap: 10px;">
                <el-input v-model="search" placeholder="输入用户名搜索" >
                </el-input>
            </div>
        </el-col>
        <el-col :span="12">
            <el-select v-model="sortBy" placeholder="排序方式" style="width: 200px">
                <el-option label="提交次数从高到低" value="SUB_COUNT_DESC" />
                <el-option label="提交次数从低到高" value="SUB_COUNT_ASC" />
                <el-option label="姓名A-Z" value="NAME_ASC" />
                <el-option label="姓名Z-A" value="NAME_DESC" />
                <el-option label="注册时间从新到旧" value="SUB_TIME_DESC" />
                <el-option label="注册时间从旧到新" value="SUB_TIME_ASC" />
            </el-select>
        </el-col>
    </el-row>

    <el-row :gutter="10">
        <el-table :data="tableData">
            <el-table-column prop="avatar" label="头像">
                <template #default="scope">
                    <el-avatar :size="50" :src="scope.row.avatar" />
                </template>
            </el-table-column>
            <el-table-column prop="nickName" label="姓名"></el-table-column>
            <el-table-column prop="className" label="班级"></el-table-column>
            <el-table-column prop="subCount" label="提交次数"></el-table-column>
            <el-table-column prop="userCharacter" label="角色">
                <template #default="scope">
                    {{ scope.row.userCharacter === 1 ? '老师' : '学生' }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="最近提交时间">
                <template #default="scope">
                    {{ new Date(scope.row.updateTime).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).replace(/\//g, '-') }}
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <el-pagination
      v-model:current-page="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[8, 12, 20, 30]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

</template>

<script setup lang = "ts">
import {Search} from '@element-plus/icons-vue'
import { ref , onMounted, watch } from 'vue';
import type { ComponentSize } from 'element-plus'
import axios from 'axios';
//分页数据
const currentPage2 = ref(1);
const pageSize2 = ref(8);
const size = ref<ComponentSize>('default')
const disabled = ref(false)
const background = ref(false)
const total = ref(0);


interface Member {
    nickName: string | null;
    avatar: string;
    className: string;
    subCount: number;
    userCharacter: string | null;
    updateTime: string;
}
let tableData = ref<Member[]>([]);
let search = ref('');
let sortBy = ref('SUB_COUNT_DESC'); // 默认按提交次数从高到低排序

/**
 * 登录刷新
 */
async function memberFreshData(){
    console.log(search.value);
    console.log(sortBy.value);
    try {
        const response = await axios(
            {
                method: 'get',
                url: '/api/user/queryStudents',
                params: {
                    userName: search.value,
                    sortBy: sortBy.value,
                    page: currentPage2.value,
                    pageSize: pageSize2.value
                }
            }
        )
        console.log(response.data);
        if (response.data.code === 1) {
            tableData.value = response.data.data.row;
            total.value = response.data.data.total;
        }
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
const handleSizeChange = (val: number) => {
    pageSize2.value = val;
    currentPage2.value = 1;
    memberFreshData();
};

const handleCurrentChange = (val: number) => {
    currentPage2.value = val;
    memberFreshData();
};

// 监听搜索和排序变化
watch([search, sortBy], () => {
    memberFreshData();
});

onMounted(()=>{
        memberFreshData();
})
</script>

<style scoped lang = "scss">
.el-avatar {
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #eee;
}
</style>
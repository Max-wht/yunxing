<template>
<br>
<el-row style="background-color: #FFFFFF;padding: 10px 0;border-radius: 5px;">
    <el-row style="padding: 10px;">
        <!-- 顶部  -->
        <el-row>
            <span class="top-bar">公告标题</span>
            <el-input size="small" style="width: 188px;" v-model="noticeQueryDto.name" placeholder="输入处" clearable
                @clear="handleFilterClear">
            </el-input>
            <span class="top-bar">发布时间</span>
            <el-date-picker size="small" style="margin-left: 10px;width: 220px;" v-model="searchTime"
                type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
            </el-date-picker>
            <el-button size="small" class="customer"
                style="margin-left: 10px;background-color: rgb(235, 237, 245);color: rgb(43, 121, 203);border: none;" type="primary"
            @click="handleFilter">立即查询</el-button>
            <el-button size="small"
                style="background-color: rgb(235, 237, 245);color: rgb(43, 121, 203);border: none;" class="customer"
            type="info" @click="addNotice">新增公告</el-button>
        </el-row>
    </el-row>
</el-row>
<el-row style="margin: 10px;">
    <el-table :data="tableData">
        <el-table-column prop="name"  label="公告"></el-table-column>
        <el-table-column prop="createTime" width="288" label="发布时间" :formatter="formatDateTime"></el-table-column>
        <el-table-column label="操作" width="120">
            <template  #default="scope">
                <span class="text-button" @click="handleEdit(scope.row)">修改</span>
                <span class="text-button" @click="handleDelete(scope.row)">删除</span>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination 
        background 
        layout="total, prev, pager, next" 
        :total= 50
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</el-row>

</template>

<script setup lang="ts">
import { reactive , ref ,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
import { ta } from 'element-plus/es/locales.mjs';

// 定义notice接口类型
interface Notice1 {
    id: number;
    name: string;
    createTime: string;
}

interface Notice {
    id: number;
    content: string;
    name: string;
    current?: number | null;
    startTime?: Date | null;
    endTime?: Date | null;
}

interface NoticeQueryDto {
    name?: string;
}

const router = useRouter();
const currentPage = ref(1);
const pageSize = ref(8);
const totalItems = ref(50);
//返回的信息tableData
const tableData = ref<Notice[]>([]);
const searchTime = ref<Date[]>([]);
const selectedRows = ref<Notice[]>([]);
const noticeQueryDto = ref<NoticeQueryDto>({});
const data = ref<any>(null)

// 添加时间格式化函数
const formatDateTime = (row: any, column: any) => {
    if (column.property === 'createTime') {
        return new Date(row.createTime).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    return row[column.property];
}

onMounted(() => {
    fetchFreshData();
})

//刷新Announce列表
async function fetchFreshData() {
    try {
        tableData.value = [];
        // 处理时间范围
        let startTime :string | null = null;
        let endTime :string | null = null;

        if (searchTime.value.length === 2) {
            const [startDate, endDate] = searchTime.value.map(date => date.toISOString());
            startTime = `${startDate.split('T')[0]}T00:00:00`;
            endTime = `${endDate.split('T')[0]}T23:59:59`;
        }
        const params = {
            current: currentPage.value,
            startTime: startTime,
            endTime: endTime,
            //name: xxx
            name: noticeQueryDto.value.name,
        };
        const response = await axios({
            method: 'post',
            url: '/api/notice/Announcements',
            data: params,
        });
        console.log(response.data);
        data.value = response.data;
        tableData.value = data.value.data.row || [];
        totalItems.value = data.value.data.total || 0;  // 设置总数据量
        console.log(tableData.value);
    }catch(error){
        console.log(error);
    }
}

//添加Announce
const addNotice = () => {
    sessionStorage.setItem('noticeOperation', 'save');
    router.push('/addAnnounce');
};

const handleSelectionChange = (selection: Notice[]) => {
    selectedRows.value = selection;
};

//@Click删除Announce方法
const handleDelete = async (row: Notice) => {
    const confirmed = await ElMessageBox.confirm('删除后不可恢复，是否继续？', '删除公告数据', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    });
    if (confirmed) {
        console.log("ID:" + row.id);
        try {
            const response = await axios({
                method: 'delete',
                url: `/api/notice/delete?id=${row.id}`,
            });
            if (response.data.code === 1) {
                fetchFreshData();
                return;
            }
        } catch (e) {
            console.error(`公告信息删除异常：`, e);
        }
    }
};

const resetQueryCondition = () => {
    noticeQueryDto.value = {};
    searchTime.value = [];
    fetchFreshData();
};

const clearFormData = () => {
    noticeQueryDto.value = {};
};

const handleFilter = () => {
    currentPage.value = 1;
    fetchFreshData();
};

const handleFilterClear = () => {
    noticeQueryDto.value.name = '';
    handleFilter();
};

const handleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1;
    fetchFreshData();
};

const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    fetchFreshData();
};

//@Click修改Announce方法
const handleEdit = (row: Notice) => {
    console.log(row);
    sessionStorage.setItem('noticeInfo', JSON.stringify(row));
    sessionStorage.setItem('noticeOperation', 'update');
    router.push('/addAnnounce');
};
</script>

<style scoped lang="scss">

</style>
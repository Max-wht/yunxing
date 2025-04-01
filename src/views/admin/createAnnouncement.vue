<template>
    <div style="background-color: rgb(248, 249, 250);">
        <div style="width: 800px;margin: 0 auto;padding: 30px 0;box-sizing: border-box;min-height: 100vh;">
            <p style="font-size: 22px;padding: 20px 0;">{{ noticeOperation === 'save' ? '公告新增' : '公告修改' }}</p>
            <div>
                <div style="margin: 20px 0;">
                    <input style="font-weight: bold;" class="title" type="text" placeholder="标题" v-model="notice.name">
                </div>
                <div>
                    <!-- <Editor height="calc(100vh - 500px)" :receiveContent="notice" @on-receive="receiveData" /> -->
                    <input style="font-size: 16px;" type="text" placeholder="内容" v-model="notice.content">
                </div>
            </div>
            <div style="margin: 20px 0;text-align: center;">

                <span class="operation-btn" @click="operation">
                    {{ noticeOperation === 'save' ? '立即新增' : '立即修改' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';
const router = useRouter()
const notice = ref<{ name?: string, content?: string }>({});
const updateAPI = '/api/notice/update'
const saveApi = '/api/notice/save';
const noticeOperation = ref<string>('');


const operation = () => {
    //如果是新增则新增，是跟新就更新
    if (noticeOperation.value === 'save') {
        save();
        return;
    }
    update();
};

/**
 * 页面初始化
 */
const loadOperation = () => {
    const operation = sessionStorage.getItem('noticeOperation');
    if (operation === 'update') {
        const noticeInfo = sessionStorage.getItem('noticeInfo');
        notice.value = noticeInfo ? JSON.parse(noticeInfo) : {};
    }
    noticeOperation.value = operation || '';
};

// const receiveData = (html: string) => {
    
//     notice.value.content = html;
//     console.log(html,1);
// };

async function update() {
    console.log( notice.value);
    const response = await axios({
        method: 'post',
        url: updateAPI,
        data: notice.value,
    })
    //检查code
    if (response.data.code === 1) {
        ElMessage.success('修改成功');
        router.go(-1);
    }
}
async function save() {
    const response = await axios({
        method: 'POST',
        url: saveApi,
        data: notice.value
    });
    if (response.data.code === 1) {
        ElMessage.success('新增成功');
        router.go(-1);
    }
}

 
const save1 = async () => {
    console.log(notice.value);
    const response = await axios({
        method: 'POST',
        url: saveApi,
        data: notice.value
    });
    if (response.data.code === 200) {
        ElMessage.success('新增成功');
        router.go(-1);
    }
};

onMounted(() => {
    loadOperation();
});
</script>

<style scoped lang="scss">
input {
    outline: none;
    border: none;
    width: 100%;
    padding: 18px 12px;
    font-size: 24px;
    box-sizing: border-box;
    border-radius: 5px;


}

.operation-btn {
    padding: 14px 40px;
    background-color: rgb(235, 237, 245);
    color: rgb(43, 121, 203);
    border: none;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
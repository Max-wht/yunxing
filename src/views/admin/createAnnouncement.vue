<template>
    <div style="background-color: rgb(248, 249, 250);">
        <div style="width: 800px;margin: 0 auto;padding: 30px 0;box-sizing: border-box;min-height: 100vh;">
            <p style="font-size: 22px;padding: 20px 0;">{{ noticeOperation === 'save' ? '公告新增' : '公告修改' }}</p>
            <div>
                <div style="margin: 20px 0;">
                    <input type="text" placeholder="标题" v-model="notice.name">
                </div>
                <div>
                    <Editor height="calc(100vh - 500px)" :receiveContent="notice.content" @on-receive="receiveData" />
                </div>
            </div>
            <div style="margin: 20px 0;text-align: center;">
                <span class="operation-btn" @click="operation">
                    {{ noticeOperation === 'save' ? '立即新增' : '立即修改' }}
                    <i class="el-icon-right"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Editor from '@/components/Editor.vue';
const router = useRouter()
const notice = ref<{ name?: string, content?: string }>({});
const saveApi = '/Annuncement/save';
const updateApi = '/Annuncement/update';
const noticeOperation = ref<string>('');


const operation = () => {
    if (noticeOperation.value === 'save') {
        save();
        return;
    }
    update();
};

const loadOperation = () => {
    const operation = sessionStorage.getItem('noticeOperation');
    console.log(operation);
    if (operation === 'update') {
        const noticeInfo = sessionStorage.getItem('noticeInfo');
        notice.value = noticeInfo ? JSON.parse(noticeInfo) : {};
    }
    noticeOperation.value = operation || '';
};

const receiveData = (html: string) => {
    notice.value.content = html;
};

const update = () => {
    fetch(updateApi, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notice.value),
    })
    .then(response => response.json())
    .then(response => {
        if (response.code === 200) {
            ElMessage.success('修改成功');
            router.go(-1);
        }
    });
};

const save = () => {
    fetch(saveApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notice.value),
    })
    .then(response => response.json())
    .then(response => {
        if (response.code === 200) {
            ElMessage.success('新增成功');
            router.go(-1);
        }
    });
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
    font-weight: bold;
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
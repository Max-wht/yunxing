<template>
    <div class="login-container">
        <div style="display: flex;justify-content: left;margin: 20px 0;">
            <img src="/public/YunXingLogo.ico" style="width: 220px;height: 220px;">
        </div>
        <div class="login-panel">
            <div style="width: 300px;padding: 40px;display: flex;justify-content: center;align-items: center;">
                <img src="/public/bag.png" style="width: 350px;" />
            </div>
            <div class="right-login">
                <div>
                    <br><br><br>
                </div>
                <div class="text">
                    <input v-model="phone" class="act" placeholder="输入手机号" />
                </div>
                <div class="text">
                    <input v-model="code" class="pwd" type="password" placeholder="输入验证码" />
                    <button class="sms" @click="sendSMS">获取验证码</button>
                </div>
                <div>
                    <span class="login-btn" @click="loginAndRegister">立即登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup name="Login">
import { ref } from 'vue'
import axios from 'axios';

let phone = ref('')
let code = ref('')
let Character;

async function loginAndRegister() {
    if(!phone.value || !code.value){
        alert('请输入手机号和验证码');
        return
    }
    try {
        const res = await axios({
            url:"http://192.168.1.11:8081/user/mobileLogin",
            method:"post",
            data:{
                mobile:phone.value,
                code:code.value
            }
        })
        console.log(res.data.data);
        Character = res.data.data.Character;
        switch(Character){
            case '0':
                alert('教师端登录成功');
                window.location.href = '/admin';
                break;
            case '1':
                alert('学生端注册成功');
                window.location.href = '/user';
                break;
        }
    }catch(err){
        console.log(err)
    }

}

async function sendSMS() {
    if(!phone.value){
        alert('请输入手机号');
    }
    try {
        await axios({
            url:"http://192.168.1.11:8081/user/sendmSMS",
            method:"post",
            data:{
                mobile:phone.value
            }
        }).then(res=>{
            console.log(res.data.msg);
            alert(res.data.msg);
            });
    }catch(err){
        console.log(err)
    }

}
</script>

<style scoped lang="scss">
* {
    user-select: none;
    font-family: 'poppins' , sans-serif ;
}

.login-container {
    width: 100%;
    min-height: 100vh;
    background-color: rgb(255,255,255);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


    .login-panel {
        display: flex;
        border-top-left-radius: 10px;
        padding: 25px;
        justify-content: space-between;
        height: auto;
        border-radius: 6px;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 20px;
        background-color: rgb(100, 119, 224);
        background: linear-gradient(to right, rgb(7, 109, 219), rgb(119, 139, 220));
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

        .right-login {
            width: 283px;
            background-color: rgb(253, 253, 253);
            padding: 30px;
            border-radius: 5px;
            border-top-left-radius: 150px;
            border-bottom-left-radius: 5px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;

            .text {
                .sms{
                    width: 100px;
                    height: 30px;
                    margin-left: 10px;
                    border-radius: 15px;
                    border: 1px solid rgb(255, 255, 255);
                    background-color: rgb(62, 124, 220);
                    color: white;
                    transition: 0.5s;
                }

                .sms:hover{
                    background-color: rgb(39, 106, 208);
                }
            }
        }

        .logo {
            margin: 10px 0 30px 0;
        }

        .act,
        .pwd {
            margin: 8px 0;
            height: 63px;
            line-height: 63px;
            width: 100%;
            font-size: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 800;
            padding: 0 8px;
            background-color: rgb(248, 248, 248);
            box-sizing: border-box;
            border: 2px solid rgb(248, 248, 248);
            border-radius: 6px;
            padding: 0 15px;
            margin-top: 13px;
        }

        .act:focus,
        .pwd:focus {
            outline: none;
            border: 2px solid rgb(16, 170, 209);
            transition: 1.2s;
            background-color: rgb(244, 244, 244);
        }

        .role {
            display: inline-block;
            color: rgb(30, 102, 147);
            font-size: 14px;
            padding-right: 10px;
        }
    }
    .login-btn:hover{
        background-color: rgb(39, 106, 208);
    }
    .login-btn {
        display: inline-block;
        text-align: center;
        border-radius: 15px;
        margin-top: 20px;
        height: 43px;
        line-height: 43px;
        width: 100%;
        background-color: rgb(62, 124, 220);
        font-size: 14px !important;
        border: none;
        color: white;
        padding: 0 !important;
        cursor: pointer;
        user-select: none;
        transition: 0.5s;
    }

    .tip {
        margin: 20px 0;
    }

}
</style>
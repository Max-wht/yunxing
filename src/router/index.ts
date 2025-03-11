import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login/Login.vue'
import AdminHome from '../views/admin/Home.vue'
import Announcement from '@/views/admin/Announcement.vue'
import ClassesInformation from '@/views/admin/ClassesInformation.vue'
import ClassesMember from '@/views/admin/ClassesMember.vue'
import Forum from '@/views/admin/Forum.vue'
import Logger from '@/views/admin/Logger.vue'
import Main from '@/views/user/Main.vue'
import ProgramList from '@/views/admin/ProgramList.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Login
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/admin',
      component:AdminHome,
      children:[
        {
          path:'/adminMain',
          component:Main,
          name: "Management",
          meta: {
            icon: 'el-icon-s-home'
          }
        },
        {
          path:'/pList',
          component:ProgramList,
          name: "Programs",
          meta: {
            icon: 'el-icon-s-view'
          }
        },
        {
          path:'/classesInfo',
          component:ClassesInformation,
          name: "Classes Info",
          meta: {
            icon: 'el-icon-s-home'
          }
        },
        {
          path:'/classesMember',
          component:ClassesMember,
          name: "Menbers",
          meta: {
            icon: 'el-icon-s-home'
          }
        },
        {
          path:'/Annuncement',
          component:Announcement,
          name: "Announcement",
          meta: {
            icon: 'el-icon-s-home'
          }
        },
        {
          path:'/forum',
          component:Forum,
          name: "Forum",
          meta: {
            icon: 'el-icon-s-home'
          }
        },
        {
          path:'/logger',
          component:Logger,
          name: "Logger",
          meta: {
            icon: 'el-icon-s-home'
          }
        },
      ]
    }

  ]
})

export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import infiniteScroll from 'vue-infinite-scroll'// 无限滚动
import {
  Button,
  Menu,
  MenuItem,
  Input,
  Tag,
  Dialog,
  Form,
  FormItem,
  Message,
  Container,
  Aside,
  Main,
  Table,
  TableColumn,
  Pagination,
  Drawer,
  Select,
  Option,
  Upload,
  Popconfirm,
  MessageBox,
  Backtop,
  Icon,
  Timeline,
  TimelineItem,
  card,
  Empty
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(mavonEditor)
Vue.use(Popconfirm)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(infiniteScroll)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(card)
Vue.use(Empty)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$http = axios
Vue.prototype.$dayjs = dayjs
Vue.prototype.$serve = 'http://localhost:6611'
// 配置拦截器在本地有token码的时候就将token码添加在请求头上
axios.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers.token = localStorage.token
  }
  return config
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 全局事件总线
  created () {
    Vue.prototype.$eventBut = this
  }
}).$mount('#app')

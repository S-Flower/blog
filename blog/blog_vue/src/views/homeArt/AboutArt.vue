<template>
  <div>
    <div class="resumeBox">
    <!-- 头部 -->
    <div class="resumeHear">
      <span>个人简历</span>
      <div class="triangle"></div>
      <hr>
      <div class="small"></div>
    </div>
    <!-- 个人介绍 -->
    <div class="Personal">
      <div class="PersonalLeft">
        <h1>郭保坤</h1>
        <ul>
          <li>男</li>
          <li>|</li>
          <li>21岁</li>
          <li>|</li>
          <li>15614843090</li>
          <li>|</li>
          <li>g15614843090@163.com</li>
          <li>|</li>
          <li>wed前端工程师</li>
        </ul>
        <p>精通html,css,可以模仿小米官网等,理解JavaScript和Jquery框架,了解和可以使用node.js进行前后端交互,理解Ajax的封装,和使用MongoDB操作数据库,</p>
        <p>理解Vue全家桶,和使用git进行代码托管</p>
      </div>
      <div class="PersonalRight">
      </div>
    </div>
    <!-- 教育背景 -->
    <div class="educate width">
      <div class="hears">
        <span>教育背景</span>
      </div>
    </div>
    <div class="educateContent Contents">
      <div class="son1 son">
        2020年-2023年
      </div>
      <div class="son2 son">
        山东外事职业大学
      </div>
      <div class="son3 son">
        大专
      </div>
    </div>
    <!-- 个人项目 -->
    <div class="project width">
      <div class="hears">
        <span>个人项目</span>
      </div>
    </div>
    <!-- 第一个 -->
    <div class="projectsContent Contents">
      <div class="son1 son">
        原生JavaScript游戏项目
      </div>
      <div class="son2 son">
        项目地址:https://gitee.com/sflower/super-mario.git
      </div>
    </div>
    <div class="projects-Personal">
      <p>使用原生js编写</p>
      <p>主要使用计时器使人物或怪物进行移动、及面向对象、类的继承、函数的封装、还有css动画等</p>
    </div>
    <!-- 第二个 -->
      <div class="projectsContent Contents">
        <div class="son1 son">
          基金项目
        </div>
        <div class="son2 son">
          项目地址:https://gitee.com/sflower/fund-projects.git
        </div>
      </div>
      <div class="projects-Personal">
        <p>功能:登陆验证,快捷登录,对喜欢的基金进行收藏或删除，以及查看以购入基金</p>
        <p>技术栈使用nodeJS,express框架,MongoDB数据库,dayjs,等框架,ajax的封装更加方便的发送请求,进可能的做到函数的复用</p>
      </div>
      <!-- 第三个 -->
      <div class="projectsContent Contents">
        <div class="son1 son">
          vue项目
        </div>
        <div class="son2 son">
          项目地址:
        </div>
      </div>
      <div class="projects-Personal">
        <p>功能：用户登录，快捷登录，后台管理(管理用户和文章数据)</p>
        <p>技术栈使用vue脚手架创建项目,element-ui,大部分vue知识,包括组件之间传参，路由之间传参，导航守卫，插槽的使用，vueX，全局事件总线，vue生命周期，axios，拦截器的配置，及数据库的操作，ESlint代码的校验</p>
      </div>
      <!-- 个人评价 -->
      <div class="appraise width">
        <div class="hears">
          <span>个人评价</span>
        </div>
      </div>
      <!-- 个人评价内容 -->
      <div class="appraiseContent">
        <p>
          有团队合作意识，能很好的配合同事完成任务；
          有很好的个人能力，能独立面对问题。
        </p>
        <p>
          性格憨厚，为人朴实，讲诚信，能吃苦。
          踏实认真，有强烈的责任感；认真负责，有良好的团队合作能力。
          执着的精神，是我信奉的精神，这种精神使我在很多的时候都走了下来，可能我的技术没有别人好，但是这种精神会使我比别人走的更远。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.resumeBox {
  width: 100%;
  margin-top: 100px;
}
.resumeHear {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #eee;
}
.resumeHear span {
  display: inline-block;
  line-height: 60px;
  font-size: 30px;
  font-weight: 800;
  background-color: #555;
  text-indent: 20px;
}
.triangle {
  position: absolute;
  top: 0;
  left: 140px;
  float: left;
  border-top:60px solid transparent;
  border-left: 60px solid #555;
}
.small {
  width: 100%;
  height: 10px;
  background-color: #555;
}
.Personal {
  position: relative;
  width: 100%;
  margin-top: 10px;
}
.PersonalLeft {
  display: inline-block;
  width: 76.5%;
  height: 100%;
}
.PersonalLeft h1{
  margin-top: 10px;
}
.PersonalLeft li {
  float: left;
  margin: 5px 3px;
}
.PersonalLeft p {
  float: left;
  margin: 5px;
  color: #888;
}
.PersonalRight {
  display: inline-block;
  position: absolute;
  right: 0;
  top: 50%;
  width: 125px;
  height: 150px;
  background: url(../../assets/2.png);
  background-size: 100% ;
  transform: translate(0,-50%);
}
.width {
  position: relative;
  width: 100%;
  height: 36px;
  background-color: #eee;
}
.hears span{
  display: inline-block;
  line-height: 36px;
  background-color: #555;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  padding: 0px 10px;
}
.Contents {
  width: 100%;
  height: 40px;
  padding: 8px 0;
}
 .son {
  float: left;
  font-weight: bold;
  margin-right: 100px;
  margin-top: 10px;
  color: #666 ;

}
.projects-Personal {
  width: 100%;
}
.projectsContent .son2,
.projectsContent .son1 {
  margin-right: 20px;
}
.projects-Personal p{
  color: #888;
}
.appraiseContent p {
  margin: 20px 0;
  color: #888;
}
</style>

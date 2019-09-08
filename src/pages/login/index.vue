<template>
  <section class="login-content">
    <div class="bg"></div>
    <div class="login-form">
      <div class="title">
        英度云商CMS管理中心
      </div>
      <div class="form-container">
        <div class="header">账号登录</div>
        <el-form class="the-form" :model="loginForm" :rules="rules" ref="loginForm" :inline="false">
          <el-form-item prop="username">
            <el-input
              placeholder="用户名"
              v-model="loginForm.username">
              <i slot="prefix" class="login-icon iconfont icon-personchoosed-copy"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              @keyup.enter.native="login(loginForm)"
              v-model="loginForm.password">
              <i slot="prefix" class="login-icon iconfont icon-mima"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login(loginForm)">登录</el-button>
          </el-form-item>
<!-- 		  <div class="tiparea">
		  	<p class="wxtip">温馨提示：</p>
		  	<p class="tip">用户名为：admin</p>
		  	<p class="tip">密码为：123456</p>
		  </div> -->
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
// import md5 from '@/utils/md5'

  export default {
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur'},
			{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        redirect: undefined
      }
    },
    methods: {
		
		showMessage(type,message){
			this.$message({
				type:type,
				message:message
			})
		},
		
		login (loginForm) {
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					let userinfo = this.loginForm;
					this.$store.dispatch('Login', userinfo).then(res => {
							this.$message.success('登录成功')
							this.$router.push({ path: '/' })    
						})
					}
				})
			},
		
		
		}
	}

</script>
<style lang="scss" scoped>
.login-content {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to right bottom, rgb(72, 178, 185), rgba(37, 99, 68, 0)), url(/static/img/bg2.d474627.jpg) no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 500px;
    height: 600px;

    .title {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
      width: 454px;
      line-height: 70px;
      text-align: center;
    }
    .form-container {
      width: 452px;
      height: 436px;
      background: #fff;
      border-radius: 10px;
      margin-top: 20px;
      .header {
        color: #333;
        font-size: 18px;
        text-align: center;
        padding: 60px 0;
      }
      .the-form {
        padding: 0 46px;
        .login-btn {
          width: 100%;
        }
      }
	  // 
	  // .tiparea{
	  // 	text-align:left;
	  // 	font-size: 12px;
	  // 	color: #4cbb15;
	  // 	.tip{
	  // 		margin-left: 54px;
	  // 	}
	  // 	.tips{
	  // 		color:red;
	  // 	}
	  // }
      .el-input--prefix {
        margin: 0 auto 26px;
        width: 360px;
        height: 40px;
        display: block;
        .el-input__prefix {
          line-height: 40px;
          margin-left: 5px;
        }
        .el-input__inner {
          padding-left: 40px;
        }
      }
    }
  }

}
</style>

<template>
  <el-form  class="user-form" ref="shopForm" :rules="rules" label-position="right" label-width="80px"  :model="shopForm">
    <el-form-item label="商铺牌号" prop="floor_id">
      <el-input size="small" v-model="shopForm.floor_id"></el-input>
    </el-form-item>
	<el-form-item label="商铺名称" prop="shop_name">
	  <el-input size="small" v-model="shopForm.shop_name"></el-input>
	</el-form-item>
	<el-form-item label="商铺电话" prop="shop_phone">
	  <el-input size="small" v-model="shopForm.shop_phone"></el-input>
	</el-form-item>
	<el-form-item  label="商铺图片" prop="shop_pic"> 
	  <el-upload
			class="upload-pic"
			:action= serverUrl 
			:http-request = upqiniupic
			:before-upload = beforeUpload
			:limit="1"
			:show-file-list="false"
			>
		<el-tooltip class="item" effect="dark" content="分辨率800*600px" placement="right-start">
			<img v-if="image1Url" :src="image1Url" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-tooltip>
	</el-upload>
	</el-form-item>
	<el-form-item label="商铺标签" prop="shop_mark">
	  <el-upload
			class="upload-pic"
			:action= serverUrl 
			:http-request = upqiniumark
			:before-upload = beforeUpload
			:limit="1"
			:show-file-list="false"
			>
		<el-tooltip class="item" effect="dark" content="分辨率98*30px" placement="right-start">
			<img v-if="image2Url" :src="image2Url" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-tooltip>
	</el-upload>
	</el-form-item>
    <el-form-item label="简介" prop="shop_desc">
		<quill-editor ref="text" v-model="shopForm.shop_desc"  :options="editorOption" ></quill-editor>
    </el-form-item>
    <el-form-item class="btn-group">
      <el-button type="primary"  @click="submitForm('shopForm')" >保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
	import{ quillEditor } from 'vue-quill-editor'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import {qiniuaddr,serverUrl } from '@/utils/env'
	import  axios from 'axios'
export default {
  name: 'createForm',
  components: {
	quillEditor,
  },
  data() {
    return {
		qiniuaddr,
		serverUrl,
      shopForm: {
        floor_id: '',
        shop_name: '',
        shop_phone: '',
        shop_pic: '',
		shop_mark:'',
		shop_desc:'输入内容'
		} ,
		editorOption: {
			theme:'snow',
		},
		image1Url :'',
		image2Url: '',
		token: {},
      rules: {
        floor_id: [
        { required: true, message: '请输入商铺门号', trigger: 'blur'}
        ],
        shop_name: [
        { required: true, message: '请输入商铺名称', trigger: 'blur'}
        ],
        shop_phone: [
        {  required: true, message: '请输入商铺电话', trigger: 'blur'}
        ],
		shop_pic: [
		{  required: true, message: '请输入商铺图片', trigger: 'blur'},
		],
		shop_mark: [
		{  required: true, message: '请输入商铺标签', trigger: 'blur'},
		],
		shop_desc: [
		{  required: true, message: '请输入商铺简介', trigger: 'blur'},
		],
      }
    }
  },
  methods: {
	upqiniupic(req) {
  const config = {
	headers: {'Content-Type': 'multipart/form-data'}
  }
	let filetype = ''
	if (req.file.type === 'image/png') {
  filetype = 'png'
  } else {
	filetype = 'jpg'
		}
	//重命名要上传的文件
	const keyname = 'yingduyunshang' + (new Date()).getTime() + Math.floor(Math.random() * 100) + '|pic.' + filetype
	// 从后端获取七牛云的上传凭证token
	this.$store.dispatch('TokenImg').then( res =>{
		const formdata = new FormData()
		formdata.append('file' , req.file)
		formdata.append('token', res.data)
		formdata.append('key', keyname)
	axios.post( serverUrl , formdata , config ).then(res => {
		this.image1Url = 'http://' + qiniuaddr + '/' + res.data.key
		this.shopForm.shop_pic = this.image1Url
		})
	})
  },
	upqiniumark(req) {	
	const config = {
		headers: {'Content-Type': 'multipart/form-data'}
	}
		let filetype = ''
		if (req.file.type === 'image/png') {
	filetype = 'png'
	} else {
		filetype = 'jpg'
			}
		const keyname = 'yingduyunshang' + (new Date()).getTime() + Math.floor(Math.random() * 100) + '|mark.' + filetype
		this.$store.dispatch('TokenImg').then( res =>{
			const formdata = new FormData()
			formdata.append('file' , req.file)
			formdata.append('token', res.data)
			formdata.append('key', keyname)
		axios.post( serverUrl , formdata , config ).then(res => {
			this.image2Url = 'http://' + qiniuaddr + '/' + res.data.key
			this.shopForm.shop_mark = this.image2Url
			})
		})
	},
	beforeUpload (file) {
	const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isJPG) {
		this.$message.error('上传头像图片只能是 JPG 格式!')
	}
	if (!isLt2M) {
		this.$message.error('上传头像图片大小不能超过 2MB!')
	}
	return isJPG && isLt2M
	},
    submitForm: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
		this.store.dispatch('CreateShops',this.shopForm).then(res => {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.shopForm = {
              floor_id: '',
              shop_name: '',
              shop_phone: '',
              shop_pic: '' ,
			  shop_mark: '',
			  shop_desc: '',
            }
            this.$emit('cancel')
          }).catch(e => {})
        } else {
          return false;
        }
      });
    },
    cancel: function() {
	 this.shopForm = {
		  floor_id: '',
		  shop_name: '',
		  shop_phone: '',
		  shop_pic: '' ,
		  shop_mark: '',
		  shop_desc: '',
		}
      this.$emit('cancel')
     }
  }
}
</script>
<style lang="scss">
.user-form {
  .el-select {
    width: 100%;
  }
  .el-input {
    width: 100%;
  }
  .btn-group {
    text-align: right;
  }
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 160px;
      height: 120px;
      line-height: 78px;
	  border: 1px solid;
      text-align: center;
    }
    .avatar {
      width: 80px;
      height: 80px;
      display: block;
	 
    }
}
</style>



<!-- // editorOption里是放图片上传配置参数用的，例如：
// action:  '/api/product/richtext_img_upload.do',  // 必填参数 图片上传地址
// methods: 'post',  // 必填参数 图片上传方式
// token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
// name: 'upload_file',  // 必填参数 文件的参数名
// size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
// accept: 'multipart/form-data, image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg'  // 可选 可上传的图片格式 -->
<template>
  <div class="daily_add">
    <!--<main_component @limititem="limititem">-->
    <main_component>
      <breadcrumb_component></breadcrumb_component>
      <div class="daily_info">
        <el-form :model="dailyForm" :rules="rules" ref="dailyForm" label-width="130px" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="报告提交人:">
                <!--<el-label type="text" placeholder="请输入资源名称" v-model="dailyForm.sourcesname"-->
                <!--auto-complete="off"></el-label>-->
                <label v-text="dailyForm.username"></label>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="日志类型:" prop="dailyType">
                <el-select v-model="dailyForm.dailyType" v-bind:disabled="isread" placeholder="选择日志类型">
                  <el-option v-for="item in dailyTypes" :key="item.value" :label="item.value" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="完成的工作:" prop="complete">
                <el-input type="textarea" :rows="6" v-bind:disabled="isread" placeholder="已完成工作的描述"
                          v-model="dailyForm.complete"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="未完成的工作:">
                <el-input type="textarea" :rows="6" v-bind:disabled="isread" placeholder="未完成工作的描述"
                          v-model="dailyForm.uncomplete"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="需协助的工作:">
                <el-input type="textarea" :rows="6" v-bind:disabled="isread" placeholder="需要协助的工作"
                          v-model="dailyForm.needhelp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备注:">
                <el-input type="textarea" :rows="6" v-bind:disabled="isread" placeholder="其他相关的工作"
                          v-model="dailyForm.remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="图片：" label-width="150px">
                <el-upload :on-success="handlesuccess" :before-upload="beforeAvatarUpload"
                           :file-list="this.dailyForm.imgs" :data="token"
                           action="/list/daily/uploadimgs" list-type="picture-card" v-bind:disabled="isread"
                           :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="文档：" label-width="150px">
                <el-upload :on-success="handlesuccess1" :before-upload="beforeAvatarUpload1" :data="token"
                           action="/list/daily/uploaddoc" :file-list="this.dailyForm.zips" v-bind:disabled="isread"
                           :on-preview="handlePreview" :on-remove="handleRemove1">
                  <el-button size="small" type="primary">点击上传</el-button> &nbsp; &nbsp;
                  <i slot="tip" class="el-upload__tip">上传zip、rar压缩包形式</i>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="在职岗位:">
                <!--<el-label type="text" placeholder="请输入资源名称" v-model="dailyForm.sourcesname"-->
                <!--auto-complete="off"></el-label>-->
                <label v-text="dailyForm.deptpost"></label>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="接收人:" prop="reader">
                <el-select v-model="dailyForm.reader" v-bind:disabled="isread" placeholder="选择直系领导">
                  <el-option v-for="item in leaders" :key="item.userid" :label="item.petname" :value="item.userid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
						 <el-col :span="20" v-f="isread">
              <el-form-item label="评论:">
                <el-input type="textarea" :rows="6" disabled=true v-model="dailyForm.comment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="100px" style="text-align: center">
                <el-button type="success" v-bind:disabled="isread" @click="submitForm('dailyForm')">更新</el-button>
                <el-button  @click="backHistory">返回</el-button>
              </el-form-item>
            </el-col>
            
          </el-row>
        </el-form>
        <div v-if="imgShow" class="showImg">
          <div class="showImgBoard fixed" @click="hideBoard"></div>
          <div class="imgItem fixed">
            <img :src="imgUrl"/>
          </div>
        </div>
      </div>
    </main_component>
  </div>

</template>

<script>
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'daily_add',
    data() {
      return {
        dailyForm: {
          dailyid: '',
          dailyType: '',
          complete: '',
          uncomplete: '',
          needhelp: '',
          remark: '',
          reader: null,
          imgs: [],
          zips: [],
          username: '',
          deptpost: '',
        },
        reader:'',
        token: null,
        imgUrl: null,
        imgShow: false,
        leaders: '',   //直系领导
        isread: false,  //是否为查看 查看只能看不能更改
//        styleCss: {
//          disabled:true,
//        },
        dailyTypes:
          [{"value": "日报"},
            {"value": "周报"},
            {"value": "月报"}],
        rules:
          {
            dailyType: [
              {required: true, message: '选择日志类别', trigger: 'change'}
            ],
            
            complete:
              [
                {required: true, message: '已完成的工作描述必须填写，没有则填\'无\'！', trigger: 'blur'},
                {max: 255, message: '长度在0 到 255 个字符', trigger: 'blur'}
              ]
          }
        ,

      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.dailyForm.dailyid = this.$route.query.dailyid;
      this.token = {"token": localStorage.CRM_token,};

      console.log(this.$route.query.read);
      if (this.$route.query.read) {
        this.isread = true;
      }
      this.loadData2(this.$route.query.dailyid, this.$route.query.token)
      this.loadData();
    },
    methods: {
      //当我们移除文件的时候，我们需要移除保存提交到表单里面的数据和删除上传到服务器的图片
      handleRemove(file, fileList) {
        if (file != null) {
//        var imagetype = file.response.data.imageType;
          var url = file.url.substr(0,file.url.indexOf('?'));
          console.log("uuuuuuuuuuuuuuuuuuuuuuu")
          console.log(url)
          console.log("uuuuuuuuuuuuuuuuuuuuuuu")
          /*if (imagetype == 1) {
            this.deleteData(this.dailyForm.imgs, url);
          }*/
           this.deleteData(this.dailyForm.imgs, url);
          //删除服务器中的图片
          this.$http.get("/list/daily/delfile", {
            params: {
              token: localStorage.CRM_token,
              imageName: url,
              dailyid:this.$route.query.dailyid
            }
          }).then(function (res) {
            console.log(res)
          })
        }
      },
      //用于删除图片数据
      deleteData(imageUrls, url) {
        if (imageUrls != null) {
          for (var i = 0; i < imageUrls.length; i++) {
            if (imageUrls[i].url == url) {
              imageUrls.splice(i, 1);
            }
          }
        }
        this.dailyForm.imgs=imageUrls;
      },
      //用于删除文件数据
      deleteData1(imageUrls, url) {
        if (imageUrls != null) {
          for (var i = 0; i < imageUrls.length; i++) {
            if (imageUrls[i].url == url) {
              imageUrls.splice(i, 1);
            }
          }
        }
        this.dailyForm.zips=imageUrls;
      },
      //图片上传成功事件，上传成功后将对应的url存放对应的属性中去。
      handlesuccess(response, file, fileList) {
        if (response.code == 100) {
          if (response.data != null) {
            var url = response.data.imageurl;
            console.log(url);
            this.dailyForm.imgs.push(url)
            console.log("图片上传的地址为:" + this.dailyForm.imgs);

          }
        }
      },
      //通过 这个是点击图片放大时触发的事件
      handlePictureCardPreview(file) {
        //用来放大图片
        console.log(file);
        var imageurl = file.url;
        //对图片的类型进行判断
        console.log(imageurl)
        this.imgUrl = imageurl;
        this.imgShow = true;
      },

      hideBoard() {
        this.imgShow = false;
      },
      //对上传的图片进行限制
      beforeAvatarUpload(file) {
        var type = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
        var isJPG = false;
        for (var i = 0; i < type.length; i++) {
          if (file.type === type[i]) {
            isJPG = true;
          }
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
          this.$message.error('只能上传图片格式格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
      },

      // 对上传的文件 （压缩包）进行限制
      beforeAvatarUpload1(file) {
        var isZip = false;
        var fileext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
        console.log(fileext)
        if (fileext == '.zip' || fileext == '.rar') {
          isZip = true;
        }
         const isLt10M=file.size / 1024 / 1024 < 10;
        if (!isZip) {
          this.$message.error('只能上传zip,rar 格式!');
        }
         if (!isLt10M) {
          this.$message.error('上传压缩文件大小不能超过 10MB!');
        }
        return isZip && isLt10M;
      },
      //用于对应的下载，在添加界面不使用。
      handlePreview(file) {
       	//下载
				var urls = file.url.substr(0,file.url.indexOf('?')).split("/");
				var url=urls[urls.length-2]+"/"+urls[urls.length-1]
				console.log(url,"2222222222222222")
				if(file.url != null && file.url != '') {
					this.$http.get("/list/customer/docDonwload/"+url+"?token="+localStorage.CRM_token).then(function(res) {
						console.log(res)
						//跳转下载
						if((res==null||res.body==null)||res.body.code==404){
							this.$message.error("文件丢失")
							return;
						}else{
							location.href ="/list/customer/docDonwload/"+url+"?token="+localStorage.CRM_token;
						}
					})
					
				}
      },

      //用于添加页面的删除 ，为
      handleRemove1(file) {
        console.log(file)
        if(!this.isread){
        	if (file != null) {
//        var docname = file.response.data.docname;
//        var url = file.response.data.docurl;
					var url = file.url.substr(0,file.url.indexOf('?'));
					
          //同时删除ruleForm1.itemdocUrl中的数据
          this.deleteData1(this.dailyForm.zips, url)
          //删除服务器中的图片
          this.$http.get("/list/daily/delfile", {
            params: {
              token: localStorage.CRM_token,
              imageName: url,
              dailyid:this.$route.query.dailyid
            }
          }).then(function (res) {
            console.log(this.dailyForm.zips)
          })
        }
        }
        
      },
      //上传图片成功后的内容
      handlesuccess1(response, file, fileList) {
        //上传成功将url存放到ruleForm1.itemdocUrl
        if (response.code == 100 && response.data != null) {
          var url = response.data.docurl;
          this.dailyForm.zips.push(url);
          console.log("图片上传的地址为:" + this.dailyForm.zips);
        }
        if (response.code == 102) {
          this.$message({
            message: '文件不能为空',
            type: 'warning'
          });
          for (var i = 0; i < fileList.length; i++) {
            console.log(file.name)
            console.log(fileList[i].name)
            if (file.name == fileList[i].name) {
              fileList.splice(i);
            }
          }
        }
      },

      submitForm(formName) {
      	if(!isNaN(this.dailyForm.reader)){
      		this.reader = this.dailyForm.reader;
      	}
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/list/daily/update', {
              "dailyid": this.dailyForm.dailyid,
              "token": localStorage.CRM_token,
//              "userid": 55,
              "type": this.dailyForm.dailyType,
              "complete": this.dailyForm.complete,
              "uncomplete": this.dailyForm.uncomplete,
              "needhelp": this.dailyForm.needhelp,
              "remark": this.dailyForm.remark,
              "reader": this.reader,
              "imgs": this.dailyForm.imgs,
              "zips": this.dailyForm.zips,
            }, {emulateJSON: true}).then(function (res) {
              if (res.body.code == 100) {
                this.message("更新成功！", 'success');
//                this.$refs[formName].resetFields();
                this.$router.push({path: "/my_daily_list"});
                this.$emit('reload', 1);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      backHistory() {
        this.$router.push({path: "/my_daily_list"});
        this.$emit('reload', 1);
      },
      loadData() {
        this.$http.post('/list/organize/leader', {"userid": localStorage.CRM_userid}, {emulateJSON: true}).then(function (res) {
          var json = res.body.data;
          this.leaders = json;
          console.log("=============当前用户的直系领导=============");
          console.log(this.leaders);
        })
      },
      loadData2(dailyid, token) {
        this.$http.post('/list/daily/read', {
          "dailyid": dailyid,
          "token": token
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data;
          console.log(json,'---------------------');
          this.dailyForm.dailyid = json.dailyid;
          this.dailyForm.deptpost = json.departname + "-" + json.postname;
          this.dailyForm.username = json.petname;
          this.dailyForm.dailyType = json.type;
          this.dailyForm.complete = json.complete;
          this.dailyForm.uncomplete = json.uncomplete;
          this.dailyForm.needhelp = json.needhelp;
          this.dailyForm.remark = json.remark;
          this.dailyForm.reader = json.readername;
          this.dailyForm.comment = json.comment;
					this.reader = json.reader;
          console.log(json.imgs);
          console.log(json.zips);

          let tmpImgs = new Array();
          let tmpZips = new Array();
          if (json.imgs.length > 0) {
            json.imgs.forEach(function (o, index) {
              tmpImgs.push({url: o + "?token=" + token})
            });
          }
          if (json.zips.length > 0) {
            json.zips.forEach(function (o) {
              var a = o.split("/");
              tmpZips.push({
                name: a[a.length - 1],
                url: o + "?token=" + token
              })
            });
          }
          this.dailyForm.imgs = tmpImgs;
          this.dailyForm.zips = tmpZips;
          console.log(this.dailyForm.imgs);
          console.log(this.dailyForm.zips);

        })
      },
      message(msg, msg_type) {
        this.$message({
          message: msg,
          type: msg_type
        });
      },
      //权限改变
      limititem(val) {
        var newVal = [];
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j].menutarget == i + 1) {
              newVal.push(val[j])
            }
          }
        }
        if (newVal[3].childList[2].map.updateFun == 0) {
          this.$router.push({path: "/login"})
        }
      }
    },
  }
</script>

<style lang="less" scoped="scoped">
  .daily_info {
    background: white;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
  }

  .showImg {
    .showImgBoard {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .5);
      z-index: 100;
    }
    .imgItem {
      padding: 10px;
      width: 500px;
      height: auto;
      background: white;
      border-radius: 5px;
      top: 150px;
      left: calc(~"50% - 250px");
      z-index: 101;
      align-items: center;
      img {
        width: 100%;
        max-height: 500px;
      }
    }
  }
</style>

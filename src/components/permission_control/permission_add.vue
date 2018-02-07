<template>
  <div class="info_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="5">
              <el-form-item label="角色名称：" prop="rolename">
                <el-input type="text" v-model="roleForm.rolename" auto-complete="off" placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="19">
              <el-form-item label-width="100px">
                <el-button type="success" @click="submitForm('roleForm')">提交</el-button>
                <el-button @click="resetForm('roleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!--权限选择区域-->
        <el-row v-model="menuALlList" style="margin-top: 15px;margin-left: 20px;" v-for="menu_list in menuALlList"
                :key="menu_list.menuname">
          <el-col :span="4">
            {{menu_list.menuname}}：
          </el-col>
          <el-col :span="20" :offset="2" style="margin-top: -46px;padding: 25px 0px 25px 0px "
                  v-for="menu in menu_list.menuList" :key="menu.menuname">
            <el-col :span="4">
              <el-checkbox-group v-model="fatherids">
                <el-checkbox @change="handleCheckAllChange"
                             :label="menu.menuid" :key="menu.menuid"> {{menu.menuname}}
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="17">
              <el-checkbox-group v-model="sourcesids" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="sources in menu.sourcesVoList" :label="sources.sourcesid"
                             :key="sources.sourcesid">{{sources.sourcesname}}
                </el-checkbox>
                <div style=" display: inline-block;margin-left: 5px;" v-if="menu.menuname == '客户列表' ">
                  <el-date-picker type="date" placeholder="查找起日期" v-model="roleForm.date1"
                                  style="width:126px;"></el-date-picker>
                  -
                  <el-date-picker type="date" placeholder="查找止日期" v-model="roleForm.date2"
                                  style="width: 126px;"></el-date-picker>
                </div>
              </el-checkbox-group>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </main_component>
    <router-view></router-view>
  </div>
</template>

<script>
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'info_list',
    data() {
      return {
        roleForm: {
          rolename: null,
          date1: '',
          date2: '',
        },
        rules: {
          rolename: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ]
        },
        sourcesids: [],
        fatherids: [],
        rolelist: [],
        menuALlList: [],
        ids: [],
      }

    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {

      this.petname = localStorage.CRM_petname;
      this.localData2();
      this.localData3();
    },
    methods: {

      submitForm(formName) {
        if (this.fatherids.length == 0 || this.sourcesids == 0) {
          this.message("必须勾选菜单内容！", 'warning');
          return false;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/list/role/save', {
              "token": localStorage.CRM_token,
              "rolename": this.roleForm.rolename,
              "begintime": this.roleForm.date1 == '' ? null : this.changeTime(this.roleForm.date1),
              "endtime": this.roleForm.date2 == '' ? null : this.changeTime(this.roleForm.date2),
              "auths": {"childId": this.fatherids.toString(), "sourcesId": this.sourcesids.toString()},
            }, {emulateJSON: true}).then(function (res) {
              if (res.body.code == 100) {
                this.message("插入成功！", 'success');
                this.$refs[formName].resetFields();
                this.fatherids = [];
                this.sourcesids = [];
              } else {
                this.message(res.body.msg, 'error');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.fatherids = [];
        this.sourcesids = [];
      },
      localData2() {
        this.$http.post('/list/menu/list', {"token": localStorage.CRM_token}, {emulateJSON: true}).then(function (res) {
          let json = res.body.data;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.menuALlList = json;
//          this.createIds(this.menuALlList)
        })
      },
      localData3() {
        this.$http.post('/list/menu/list2', {"token": localStorage.CRM_token}, {emulateJSON: true}).then(function (res) {
          let json = res.body.data;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.ids = json;
        })
      },
      handleCheckAllChange(event) {
        let id = event.target.value;
        let tempSourcesId = this.sourcesids;

        if (event.target.checked) {
          this.ids.forEach(function (o) {
            if (o.fatherId == id) {
              o.sourcrsIds.forEach(function (oo) {
                let flag = true;
                tempSourcesId.forEach(function (ooo) {
                  if (oo == ooo) {
                    flag = false;
                  }
                })
                if (flag) {
                  tempSourcesId.push(oo);
                }
              })
            }
          })
        } else {
          this.ids.forEach(function (o) {
            if (o.fatherId == id) {
              o.sourcrsIds.forEach(function (oo) {
                tempSourcesId.forEach(function (ooo, index) {
                  if (oo == ooo) {
//                    console.log(index);
                    tempSourcesId.splice(index, 1)
                  }
                })
              })
            }
          })
        }
        this.sourcesids = tempSourcesId;
//        this.checkedCities = event.target.checked ? cityOptions : [];
//        this.isIndeterminate = false;
      },

      handleCheckedCitiesChange(value) {
        let tempFatherid = this.fatherids;
        let tempSourcesid = this.sourcesids;
        let tempids = this.ids;
        let lastId = tempSourcesid.slice(-1);
        let isPush = true;   //是否要push fatherid标志
        let isPop = true;

//        console.log(this.sourcesids)
        //得到当前选中 的全选id
        tempids.forEach(function (o) {
          o.sourcrsIds.forEach(function (oo) {
            if (oo == lastId) {
              tempFatherid.forEach(function (ooo) {
                if (ooo == o.fatherId) {
                  isPush = false;
                }
              });
              if (isPush) {
                tempFatherid.push(o.fatherId);
              }
            }
          });
        });

        //取消 的时候判断是否要取消全选id
        tempFatherid.forEach(function (o, index) {
          tempids.forEach(function (oo) {
            if (oo.fatherId == o) {
              oo.sourcrsIds.forEach(function (ooo) {
//                console.log(o + "---" + oo.fatherId)
//                console.log("tempSourcesid中是否存在：" + tempSourcesid.indexOf(ooo));
                if (tempSourcesid.indexOf(ooo) > -1) {
                  isPop = false;
                }
//                console.log(isPop);
              });
            }
          });
          if (isPop) {
//            console.log("index:" + index);
            tempFatherid.splice(index, 1);
          }
          isPop = true;
        });

        this.fatherids = tempFatherid;
      },
      message(msg, msg_type) {
        this.$message({
          message: msg,
          type: msg_type
        });
      },
      changeTime(time) {
        console.log("--" + time)
        var newTime = new Date(time);
        var yy = newTime.getFullYear();
        var mm = newTime.getMonth() + 1;
        var dd = newTime.getDate();
        return (yy + "-" + mm + "-" + dd)
      },
      //权限改变
      limititem(val) {
      	console.log("=======================qx================");
      	console.log(val);
      	
        var newVal = [];
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j].menutarget == i + 1) {
              newVal.push(val[j])
            }
          }
        }
        if (newVal[4].childList[1].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .table_list {
    background: white;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
  }

  .el-button--success {
    background: #2EB398;
    border-color: #2EB398;
  }
</style>

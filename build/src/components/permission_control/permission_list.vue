<template>
  <div class="info_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-col :span="4" v-if="limitCtrl.okBtn==1">
            <el-form-item>
              <el-select v-model="form.roleid" placeholder="请选择要查看的角色">
                <el-option v-for="item in rolelist" :key="item.roleid" :label="item.rolename"
                           :value="item.roleid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item label-width="80px">
            <el-button v-if="limitCtrl.okBtn==1" type="success" icon="search" @click="search">查看</el-button>
            <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
            <el-button type="primary" v-if="limitCtrl.updateBtn==1" icon="check" @click="update">更新权限</el-button>
          </el-form-item>
        </el-form>
        <!--权限选择区域-->

        <el-row v-model="menuALlList" style="margin-top: 15px;margin-left: 20px;" v-for="menu_list in menuALlList"
                :key="menu_list">
          <el-col :span="4">
            {{menu_list.menuname}}：
          </el-col>
          <el-col :span="20" :offset="2" style="margin-top: -46px;padding: 25px 0px 25px 0px "
                  v-for="menu in menu_list.menuList" :key="menu.menuname">
            <el-col :span="3">
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
                <div style=" display: inline-block;margin-left: 5px; font-size:14px;font-weight:normal"
                     v-if="menu.menuname == '客户列表' ">
                 查询时间段：
                  <el-date-picker type="date" placeholder="查找起日期" v-model="form.date1"
                                  style="width:126px;"></el-date-picker>
                  -
                  <el-date-picker type="date" placeholder="查找止日期" v-model="form.date2"
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
        form: {
          roleid: '',
          date1: '',
          date2: '',
        },
        sourcesids: [],
        fatherids: [],
//        isIndeterminate: true,
        rolelist: [],
        menuALlList: [],
        ids: [],
        limitCtrl: {},		//权限控制
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.petname = localStorage.CRM_petname;
      // 得到角色信息列表
      this.localData();
      //得到权限菜单相关资源
      this.localData2();
      //得到权限菜单每个 子菜单对应资源按钮的 关系集合
      this.localData3();
      if (this.$route.query.itemid != null) {
        this.form.roleid = this.$route.query.itemid;
        console.log("roleid=" + this.$route.query.itemid);
        this.search();

      }
    },
    methods: {
      //更新权限
      update() {
        if (this.fatherids.length == 0 || this.sourcesids == 0) {
          this.message("必须勾选菜单内容！", 'warning');
          return false;
        }
        this.$http.post('/list/role/save', {
          "roleid": this.form.roleid,
          "token": localStorage.CRM_token,
          "begintime": this.form.date1 ? this.changeTime(this.form.date1) : '',
          "endtime": this.form.date2 ? this.changeTime(this.form.date2) : '',

          "auths": {"childId": this.fatherids.toString(), "sourcesId": this.sourcesids.toString()},
        }, {emulateJSON: true}).then(function (res) {
          if (res.body.code == 100) {
            this.message("更新成功！", 'success');
            this.fatherids = [];
            this.sourcesids = [];
          } else {
            this.message(res.body.msg, 'error');
          }
        })
      },
      //搜索
      search() {
        this.$http.post('/list/menu/list3', {
          "token": localStorage.CRM_token, "roleid": this.form.roleid == '' ? null : this.form.roleid,
        }, {emulateJSON: true}).then(function (res) {
          if (res.body.code == '100') {
            var json = res.body.data;
            //加载json对象，如果是json字符串要eval()转成json对象
            this.sourcesids = json.sourcesids;
            this.fatherids = json.fatherids;
            this.form.date1 = json.begintime;
            this.form.date2 = json.endtime;
            console.log(this.form.date1);
            console.log(this.form.date2);
          } else {
            this.message(res.body.msg, 'error');
          }
        })
      },
      //添加
      add() {
        this.$router.push({path: "/permission_list/add"})
      },
      localData() {
        this.$http.post('/list/role/list', {"token": localStorage.CRM_token}, {emulateJSON: true}).then(function (res) {
          let json = res.body.data;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.rolelist = json;
        })
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
      	if (typeof(time) =="undefined")
      			return null;
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
        if (newVal[4].childList[1].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[4].childList[1].map;
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

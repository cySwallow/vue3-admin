<template>
  <el-form
    ref="formRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm">
    <!-- <el-form-item label="部门" prop="username">
      <el-select v-model="options.selected" class="m-2" placeholder="请选择" size="large">
        <el-option
          v-for="item in options.data"
          :key="item.tenantId"
          :label="item.companyName"
          :value="item.tenantId" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <!-- <el-form-item label="验证码" prop="code">
      <el-input v-model="ruleForm.code" type="text" autocomplete="off" />
      <img class="code-img" :src="`data:image/gif;base64,${codeImage}`" @click="getCode" />
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { tenantList, codeImg, login } from '../../api/login';
let formRef = ref(null);
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const options = reactive({
  data: [],
  selected: ''
});
let codeImage = ref('');
const ruleForm = reactive({
  password: 'admin123',
  username: 'admin',
  code: '',
  uuid: '',
  rememberMe: false,
  clientId
});

const getTenantList = async () => {
  try {
    const data = await tenantList();
    options.data = data.voList;
  } catch (err) {}
};
const getCode = async () => {
  try {
    const data = await codeImg();
    codeImage.value = data.img;
    ruleForm.uuid = data.uuid;
  } catch (err) {}
};
onMounted(() => {
  // getTenantList();
  // getCode();
});

const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!');
      try {
        const data = await login(ruleForm);
        console.log(data);
      } catch (err) {}
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped lang="scss">
.demo-ruleForm {
  ::v-deep(.el-form-item__content) {
    display: flex;
    .el-input {
      width: 250px;
    }
  }
  .code-img {
    width: 80px;
    height: 32px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>

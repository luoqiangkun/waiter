<template>
  <div class="login">
    <div class="bgc">
      <img src="../../assets/images/logo.png" alt />
    </div>
    <div class="loginWrapper">
      <div class="item">
        <img src="../../assets/images/zh1.png" alt />
        <input type="text" placeholder="员工号" v-model="form.user_account" />
      </div>
      <div class="item">
        <img src="../../assets/images/zh2.png" alt />
        <input type="password" placeholder="密码" v-model="form.user_password" />
      </div>
    </div>
      <cube-button :primary="true" @click="doLogin">登录</cube-button>
  </div>
</template>
<script>
import { login } from "@/api";
export default {
  name: "login",
  data() {
    return {
      form: {
        user_account: "",
        user_password: ""
      }
    };
  },
  methods: {
    doLogin() {
      this.$store
        .dispatch("user/login", this.form)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
        })
        .catch(error => {
          const toast = this.$createToast({
            txt: error,
            type: "txt"
          });
          toast.show();
          this.form.user_password = "";
         

        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.login {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .bgc {
    background-color: #fe7e00;
    height: 290px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
      margin-bottom: 60px;
    }
  }

  .loginWrapper {
    width: 90%;
    margin: 0 auto;
    margin-top: -6rem;
    position: relative;
    box-shadow: 0px 0px 13px 3px rgba(222, 222, 222, 0.29);
    border-radius: 10px;
    padding: 2rem 0;
    padding-top: 3rem;
    background: #fff;

    input {
      border: none;
      background: #f9f9f9;
      height: 2.65rem;
      vertical-align: middle;
      outline: none;
    }

    .van-icon, .van-icon::before {
      color: #fe7e00;
    }

    .item {
      height: 2.65rem;
      background-color: #f9f9f9;
      border-radius: 1.5rem;
      margin: 0 12%;
      margin-bottom: 1rem;
      text-indent: 0.5rem;
      display: flex;
      align-items: center;
    }
  }

  button {
    margin-top: 3rem;
    width: 90% !important;
    border-radius: 2rem;
    margin-left: 5%;
    background: #fe7e00;
    box-shadow: 0 5px 11px #fe7e0073;
  }
}

.item img {
  height: 1rem;
  vertical-align: middle;
  margin: 0 0.7rem;
}
</style>
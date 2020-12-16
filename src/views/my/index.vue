<template>
  <div>

    <div class="header">
      <div class="info">
        <img src="https://www.baidu.com/img/bd_logo1.png?where=super" alt class="avatar" />
        <div class="nickName">账号名称</div>
      </div>
    </div>

    <div class="Btn">
      <cube-button :primary="true">退出账号</cube-button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
.dv {
  background-color: #fe7e00;
  color: #fff;
  text-align: center;
  padding: 0.5rem 0;
}

.leftImg {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.box {
  width: 90%;
  margin: 0 auto;
  box-shadow: 0px 0px 23px 6px rgba(228, 228, 228, 0.29);
  border-radius: 20px;
  display: flex;
  box-sizing: border-box;
  padding: 0.8rem 0;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.Btn {
  width: 90%;
  margin: 0 auto;
  margin-top: 8rem;

  button {
    width: 100%;
    border-radius: 2rem;
    background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
    box-shadow: 0px 20px 21px 0px rgba(254, 126, 0, 0.4);
  }
}

.Btn .cube-btn {
  width: 90% !important;
  margin: 0 auto;
}

.header {
  text-align: center;
  background: #fe7e00;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.info .nickName {
  margin-top: 1rem;
  color: #fff;
}
</style>
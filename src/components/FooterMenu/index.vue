<template>
  <div class="footer-menu">
    <ul>
      <li>
        <router-link :to="{path:'/table'}">
        <span class="fon icon-zhuozi "></span>
        <p>餐台</p></router-link>
      </li>
      <li>
        <router-link :to="{path:'/order'}">
                <span class="fon icon-5 "></span>

        <p>订单</p></router-link>
      </li>
      <li>
        <router-link :to="{path:'/user'}">
                <span class="fon icon-weibiaoti- "></span>

        <p>我的</p></router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.footer-menu {
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 7px 0;
        bottom: 0;
      position: fixed;
      width: 100%;
      box-shadow: 0 0 10px #eee;
          background: white;
      display:flex;
  }
  li {
    display: inline-block;
    margin: 0 10px;
    text-align:center;
    flex-grow:1;
  }
  li img{
    width:20px;
  }

  p{
    font-size:12px;
    color:black;
    margin-top:3px;
  }
}

</style>

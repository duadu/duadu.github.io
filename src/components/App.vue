<!-- template元素中最好只有唯一的一个元素包起来 -->
<template> 
  <div class="top-box">
    <Navbar></Navbar>
    <router-view></router-view>
    <Toaster></Toaster>
  </div>
</template>

<script>
import store from '../vuex/store'
import Navbar from './Navbar'
import Toaster from './Toaster'

export default {
  store,
  components: { 
  	Navbar,
  	Toaster
  }
}
</script>

<style>
@import 'https://at.alicdn.com/t/font_0zedwq692ila0pb9.css'
</style>
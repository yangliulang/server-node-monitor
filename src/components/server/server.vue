<template>
  <div class="server">
    <div :class="['circle', getServerStatus]" ref="circle"></div>
    <div class="dot-list">
      <span :class="{twinkle:isTwinkle(v)}" :key="v" v-for="v in 18"></span>
    </div>
  </div>
</template>

<script>
import Server from './server'
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'server',
  data() {
    return {
      //随机要闪烁的点
      twinkle: []
    }
  },
  props: {
    status: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    getServerStatus() {
      const status = this.status
      return status === 'success'
        ? ''
        : status === 'error'
        ? 'circle-twinkle-error'
        : status === 'warning'
        ? 'circle-twinkle-warning'
        : ''
    }
  },
  methods: {
    isTwinkle(v) {
      return this.twinkle.includes(v)
    },
    randomTwinke() {
      const r = Math.ceil(Math.random() * 10)
      const a = Array.from(
        new Set(
          Array(r)
            .fill(0)
            .map(item => Math.ceil(Math.random() * 12))
        )
      )
      this.twinkle = a
    },
    statusTwinkle() {
      const status = this.status
      const circleClassList = this.$refs.circle.classList
      status === 'success' && circleClassList.toggle('circle-twinkle')
      status === 'error' && circleClassList.toggle('circle-twinkle-error')
      status === 'warning' && circleClassList.toggle('circle-twinkle-warning')
    }
  },
  mounted() {
    // this.timer1 = setInterval(this.randomTwinke, 500)
    // this.timer2 = setInterval(this.statusTwinkle, 500)
  },
  destroyed() {
    // clearInterval(this.timer1)
    // clearInterval(this.timer2)
  }
}
</script>

<style scoped>
@keyframes status-success {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: green;
  }
  100% {
    background-color: transparent;
  }
}
.server {
  border-top: 1px solid #0d3f6e;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #146abb;
  animation: status-success 0.3s easin-in infinite;
  /* transition: all 0.3s ease-in; */
}
.circle-twinkle {
  border-color: rgb(3, 173, 3);
  box-shadow: green 0 0 10px inset;
}
.circle-twinkle-error {
  border-color: red;
  box-shadow: red 0 0 10px inset;
}
.circle-twinkle-warning {
  border-color: orange;
  box-shadow: orange 0 0 10px inset;
}
.dot-list {
  line-height: 5px;
  height: 20px;
  width: 90px;
}
.dot-list span {
  display: inline-block;
  width: 5px;
  height: 5px;
  box-sizing: border-box;
  border: 1px solid #3096f6;
  border-radius: 50%;
  margin-left: 5px;
}
.dot-list span.twinkle {
  background-color: yellow;
  box-shadow: #fff 0 0 5px;
}
.dot-list span:nth-child(9n + 1) {
  margin-left: 0;
}
.dot-list span:nth-child(10n) {
  margin-left: 5px;
}
</style>
<template>
  <div class="page">
    <div class="page-3d" ref="page-main">
      <div class="page-header">
        <a href="https://www.58ex.com"></a>
        <s>|</s>
        <h1>58Coin服务器集群监控</h1>
        <!-- <span :key="i" ref="dotList" v-for="i in 20"></span> -->
      </div>
      <div class="server-page server-page-status">
        <ServerList :server-data="usdt"></ServerList>
      </div>
      <div class="server-page server-page-mq">
        <ServerList :server-data="mq"></ServerList>
      </div>
    </div>
  </div>
</template>
<script>
import ServerList from '@/pages/server-list'
import { renderServer } from '@/scripts/tools.js'
import ServerData from '@/server-ws'
export default {
  name: 'home',
  components: {
    ServerList
  },
  data() {
    return {
      usdt: ServerData.usdt,
      mq: ServerData.mq
    }
  },
  methods: {
    //随机三列点的位置
    rondomDotPos() {
      this.$refs.dotList.forEach(dot => {
        const dotStyle = dot.style
        dotStyle.left = Math.random() * 100 + '%'
        dotStyle.top = Math.random() * 100 + '%'
        dotStyle.opacity = Math.random()
        dotStyle.backgroundColor =
          '#' + Math.floor(Math.random() * 256).toString(10)
      })
    },
    socketInit() {
      //process.env.NODE_ENV === 'production'
      let socketUrl = 'ws://192.168.111.227:8083/websocket'
      if (process.env.NODE_ENV === 'production') {
        socketUrl = ''
      }
      const ws = new WebSocket('ws://192.168.111.227:8083/websocket')
      ws.onopen = function() {
        ws.send(
          '{"action":"0","metric":"","project":"USDT","serviceModule":""}'
        )
      }
      ws.onmessage = evt => {
        const ret = JSON.parse(evt.data)
        //客户端连接成功后再更新数据
        if (ret.data) {
          //根据返回的节点更新ui机构
          this.updateServerData(this.usdt, ret.data)
          this.updateServerData(this.mq, ret.data)
        }
      }
      ws.onclose = function() {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
    },
    //更新对应的ip节点数据
    updateServerData(structureData, serverNodeData) {
      structureData.forEach(item => {
        if (
          serverNodeData.endpoint + serverNodeData.serviceModule ===
          item.ip + item.name
        ) {
          //根据策略模式去渲染不同的数据
          renderServer.render(serverNodeData, item)
        }
        item.list && this.updateServerData(item.list, serverNodeData)
      })
    }
  },
  mounted() {
    //格式化socket数据
    // console.log(this.formatSocketData(this.ServerData.nginx))
    //初次执行一次
    // this.rondomDotPos()
    //3秒后轮训数据
    // this.timer = setInterval(this.rondomDotPos, 3000)
    //订阅socket
    this.socketInit()
    // console.log(this.$refs['page-main'])
    // this.$refs['page-main'].style.setProperty('transform', 'rotate(-90deg)')
  },
  destroyed() {
    //当卸载后取消定时器的引用
    // window.clearInterval(this.timer)
  }
}
</script>

<style>
@keyframes rotate3d {
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(10deg);
  }
  50% {
    transform: rotateY(0deg);
  }
  75% {
    transform: rotateY(-10deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
body {
  background-color: #edf3fb;
}
.page-main {
  transform-origin: center top;
}
.page-3d {
  perspective: 100;
}
/* .server-page {
   animation: rotate3d 20s ease-in 0.1s infinite; 
} */
.page-header {
  background-color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #edeef0;
}
.page-header s {
  padding: 0 10px;
  text-decoration: none;
  color: #979797;
  /* font-style: normal; */
}
.page-header a {
  display: inline-block;
  width: 140px;
  height: 70px;
  margin: 0 10px;
  background: url(./assets/logo.png) no-repeat center center;
  background-size: contain;
}
.page-header h1 {
  color: #303b4e;
  font-size: 24px;
  position: relative;
  z-index: 1;
}
.page-header h1 i {
  position: relative;
  font-style: normal;
  display: inline-block;
  transition: all 2s cubic-bezier(0.76, 0.45, 0.01, 1.66);
}
.page-header span {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-top: -5px;
  left: 50%;
  top: 100%;
  opacity: 0;
  background-color: #fff;
  box-shadow: #fff 0 0 4px;
  transition: all 3s ease-in;
}
.server-page {
  padding-bottom: 50px;
  display: flex;
  justify-content: space-around;
  transform-origin: 0 0;
  /* transform: rotate(-90deg) translateX(-1350px); */
}
.server-rec {
  display: flex;
  margin-top: 80px;
}
.server-rec-inner {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.server-rec-inner:first-child {
  margin-left: 0;
}
.server-rec-inner:last-child {
  margin-right: 0;
}
.server-page-status .server-rec-inner {
  margin: 0 100px;
}
.server-page-status .server-rec-inner:first-child {
  margin-left: 0;
}
.server-page-status .server-rec-inner:last-child {
  margin-right: 0;
}
.server-page-mq {
  position: relative;
}
.server-page-mq:before {
  content: '';
  position: absolute;
  top: -1px;
  width: 685px;
  height: 1px;
  background-color: #b2bcc9;
}
</style>

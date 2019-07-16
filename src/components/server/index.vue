<template>
  <div
    :class="'server-group server-group-'+status"
    :id="id"
    :spare="spare"
    :style="{left:position.left+'px',top:position.top+'px'}"
  >
    <div
      :class="['server-box',type!=='MQ'?'server-box-status':'server-box-data', 'server-box-'+status]"
    >
      <div class="server-name">
        {{name}}
        <span v-if="ip">{{ip}}</span>
      </div>

      <div class="server-notification" v-if="type==='MQ'">
        <ul v-if="notification.length">
          <li
            :class="transformClass(item.status)"
            :key="randomKey(item.value)"
            v-for="item in notification"
          >
            <span>{{item.name}}</span>:
            <span>{{item.value}}</span>
          </li>
        </ul>
        <p
          :class="['server-loading' ,loadingState?'el-icon-loading':'']"
          v-else
        >{{loadingState?'':'暂无推送数据'}}</p>
      </div>
    </div>
    <div class="server-arrow-down" v-if="arrowDown"></div>
  </div>
</template>
<script>
import Server from './server'
export default {
  name: 'server-group',
  components: {
    Server
  },
  props: {
    arrowDown: {
      type: Boolean,
      default: false
    },
    spare: {
      type: Boolean
    },
    ip: {
      type: String
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '服务器'
    },
    status: {
      type: String,
      default: 'success'
    },
    notification: {
      type: Array,
      default() {
        return []
      }
    },
    position: {
      type: Object,
      default() {
        return {
          left: 0,
          top: 0
        }
      }
    }
  },
  data() {
    return {
      loadingState: true
    }
  },
  methods: {
    //五秒钟之后还没有数据返回
    delayLoading() {
      this.timer = window.setTimeout(() => {
        if (!this.notification.length) {
          //如果notification的length
          this.loadingState = false
        }
      }, 5000)
    },
    randomKey() {
      return Math.random()
    },
    transformClass(status) {
      return status === 0
        ? 'normal'
        : status === 1
        ? 'warning'
        : status === 2
        ? 'danger'
        : ''
    }
  },
  computed: {
    id() {
      return this.keys ? this.keys : this.name + '-' + this.ip
    }
  },
  destroyed() {
    window.clearTimeout(this.timer)
  },
  mounted() {
    this.type === 'MQ' && this.delayLoading()
  }
}
</script>

<style lang="less" scoped>
@keyframes status-error {
  0% {
    border: 1px solid transparent;
  }
  100% {
    border: 1px solid red;
    box-shadow: red 0 0 20px inset;
  }
}
@keyframes status-warning {
  0% {
    box-shadow: #e4ff63 0 0 10px inset;
  }
  50% {
    box-shadow: #e4ff63 0 0 50px inset;
  }
  100% {
    box-shadow: #e4ff63 0 0 10px inset;
  }
}
// .server-group-error {
//   animation: serve-scale 2s ease-in infinite;
//   position: relative;
//   z-index: 100;
// }
.server-notification {
  margin-top: 10px;
  ul {
    list-style: none;

    font-size: 14px;
    & li {
      padding: 5px 10px;
      word-break: break-all;
      color: #506488;
      padding-left: 20px;
      & > span:last-child {
        color: #24324c;
        font-weight: bolder;
      }
    }
  }
  .server-loading {
    position: relative;
  }
}

.server-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  color: #666;
}
.el-icon-loading {
  font-size: 20px;
}
.server-box {
  border: 1px solid #fff;
  // padding: 5px;
  position: relative;
  border-radius: 10px;
  // box-shadow: rgba(255, 255, 255, 0.767) 0 0 10px inset;
  box-shadow: 0 8px 20px 0 rgba(108, 137, 255, 0.1);
  background-color: #fff;
}
.server-box-error {
  animation: status-error 1s ease-in alternate infinite;
}
.server-box-warning {
  animation: status-warning 2s ease-in infinite;
}
.server-name {
  text-align: center;
  color: #24324c;
  font-weight: bold;
  font-size: 14px;
  // padding: 10px 0;
  span {
    display: block;
    font-size: 12px;
    color: cadetblue;
  }
}
.server-gear {
  border: 1px solid #3096f6;
  box-sizing: border-box;
  height: 10px;
  width: 80px;
  margin: 10px auto 0;
  box-shadow: #fff 0 0 4px inset;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  background-color: #11112b;
  &:after,
  &:before {
    content: '';
    width: 2px;
    background-color: #3096f6;
    position: relative;
    top: -10px;
  }
}

.server-group {
  position: relative;
  .notification {
    position: absolute;
    top: 0%;
    width: 100%;
    border: 1px solid #3096f6;
    border-radius: 5px;
    box-shadow: #fff 0 0 4px inset;
    padding: 5px 0;
    font-size: 12px;
    text-align: center;
    opacity: 0.9;
    background-color: #11112b;
    &:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 1px;
      background-color: #3096f6;
      top: 50%;
    }
  }
  .server-arrow-down {
    position: absolute;
    left: 50%;
    width: 1px;
    height: 50px;
    background-color: #b2bcc9;
    &:after,
    &:before {
      position: absolute;
      bottom: 0;
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      background-color: #b2bcc9;
      transform-origin: center bottom;
    }
    &:after {
      transform: rotate(-40deg);
    }
    &:before {
      transform: rotate(40deg);
    }
  }
  //纯状态数据
  .server-box-status {
    width: 140px;
    height: 140px;
    .server-name {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:before {
        content: '';
        display: inline-block;
        margin-bottom: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // background-image: linear-gradient(-220deg, #00bbff 0%, #0086ff 100%);
        box-shadow: 0 4px 10px 0 rgba(54, 63, 255, 0.2);
        background: url(../../assets/yunfuwucopy.png) no-repeat center center;
        background-size: cover;
      }
    }
    // &.server-box-error {
    //   .server-name {
    //     &::before {
    //       // background-image: url(../../assets/yunfuwu.png);
    //     }
    //   }
    // }
  }
  .server-box-data {
    width: 236px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 20px 0;
    &:before {
      content: '';
      content: '';
      display: inline-block;
      width: 40px;
      height: 40px;
      position: relative;
      left: 10px;
      top: 3px;
      border-radius: 50%;
      box-shadow: 0 4px 10px 0 rgba(54, 63, 255, 0.2);
      background: url(../../assets/shanghucopy6.png) no-repeat center center;
      background-size: cover;
    }
    .server-name {
      width: 170px;
      display: flex;
      // text-indent: 10px;
      padding-left: 20px;
      align-items: center;
      line-height: 120%;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
    .server-notification {
      width: 236px;
    }
  }
}
//如果当前机器处于备用状态，隐藏它下面的子节点
</style>
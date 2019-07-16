<template>
  <!-- name="服务器A" status="error" -->
  <div class="server-rec" ref="server-group">
    <div class="throughout-line" ref="throughout-line" v-if="getChildrenSize()>=2"></div>
    <div :key="server.id" class="server-rec-inner" v-for="server in serverData">
      <!-- 默认指向父级 -->
      <div
        :style="{width:getChildrenSize()<2?'80px':'40px'}"
        class="line line-animate"
        ref="line"
        v-if="!server.hiddenLine"
      ></div>
      <!-- 有可能指向父级的兄弟们 -->
      <div
        :data-target-up="lineToUpId"
        :key="lineToUpId"
        class="line line-animate"
        ref="lineToParentSiblings"
        v-for="lineToUpId in server.targetParentSiblingsIds"
      ></div>
      <ServerBox
        :arrow-down="server.arrowDown"
        :ip="server.ip"
        :name="server.name"
        :notification="server.notification"
        :position="server.position"
        :spare="server.isSpare"
        :status="server.status"
        :type="server.type"
      ></ServerBox>
      <server-list :server-data="server.list" v-if="server.list"></server-list>
    </div>
  </div>
</template>

<script>
import ServerBox from '@/components/server/index'
export default {
  name: 'server-list',
  components: {
    ServerBox
  },
  props: {
    serverData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    //每一组中可能存在不同的服务器节点，导致计算贯穿线出错
    //需要获取节点的第一个合最后一个的宽度/2
    getFirstAndLastRect() {
      const serverGroup = this.$refs['server-group'].children
      const serverGroupOfFirst = serverGroup.item(1)
      const serverGroupOfLast = serverGroup.item(serverGroup.length - 1)
      const width =
        (serverGroupOfFirst.offsetWidth + serverGroupOfLast.offsetWidth) / 2
      const throughoutLine = this.$refs['throughout-line']
      throughoutLine.style.setProperty('width', `calc(100% - ${width - 1}px)`)
      throughoutLine.style.setProperty(
        'left',
        serverGroupOfFirst.offsetWidth / 2 + 'px'
      )
    },
    //回去当前循环它的子节点
    getChildrenSize() {
      return this.serverData.length
    },
    //绘制默认的指向父服务器的连接线
    drawLine() {
      const lines = this.$refs.line
      //绘制默认指向父服务器的链接线
      lines &&
        lines.forEach(line => {
          //当前线的位置信息
          const lineRect = line.getBoundingClientRect()
          //获取当前线的爷爷元素的位置信息
          const lineParentParent = line.parentElement.parentElement
          const lineParentElRect = lineParentParent.getBoundingClientRect()
          //计算相邻多条线的中心点坐标
          const linesCenterDotX =
            lineParentElRect.width / 2 + lineParentElRect.left
          //获取当前线相对于页面左边的距离
          const linePageX = lineRect.left
          //用爷爷的中心点和当前线的坐标点做比较，如果小于0表示线在左边，大于0就在右边，等于0，不变
          //然后设置旋转角度
          this.compareLineOfCenterDot(linesCenterDotX, linePageX, line)
        })
      //绘制指向父服务的兄弟连接线
      const lineToParentSiblings = this.$refs.lineToParentSiblings
      lineToParentSiblings &&
        lineToParentSiblings.forEach(line => {
          //父服务器的兄弟服务器的id
          const parentServerId = line.dataset.targetUp
          //当前线的位置信息
          const lineRect = line.getBoundingClientRect()
          //获取当前线的爷爷元素的位置信息
          const lineParentElRect = document
            .querySelector(`#${parentServerId}`)
            .getBoundingClientRect()
          //计算相邻多条线的中心点坐标
          const linesCenterDotX =
            lineParentElRect.width / 2 + lineParentElRect.left
          //获取当前线相对于页面左边的距离
          const linePageX = lineRect.left
          //用爷爷的中心点和当前线的坐标点做比较，如果小于0表示线在左边，大于0就在右边，等于0，不变
          //然后设置旋转角度
          this.compareLineOfCenterDot(linesCenterDotX, linePageX, line)
        })
    },
    compareLineOfCenterDot(linesCenterDotX, linePageX, line) {
      //三角形的对边高低固定
      let triangleDuiBian = 80
      //如果存在交叉，计算triangleDuiBian
      const targetId = line.dataset.targetUp
      let targetElement, currentElement
      if (targetId) {
        targetElement = document
          .querySelector(`#${targetId}`)
          .getBoundingClientRect()
        currentElement = line.parentElement
          .querySelector('.server-group')
          .getBoundingClientRect()
        triangleDuiBian = currentElement.top - targetElement.bottom
      }
      //三角形底边的绝对值
      const triangleDiBian = Math.abs(linesCenterDotX - linePageX)
      //已知三角形的底边和对边，求出倾斜角度
      const deg = (Math.atan2(triangleDuiBian, triangleDiBian) * 180) / Math.PI
      //计算三角形斜边的长度
      const xieBian = Math.sqrt(
        Math.pow(triangleDuiBian, 2) + Math.pow(triangleDiBian, 2)
      )

      //三角形斜边的
      const lineStyle = line.style
      if (linesCenterDotX - linePageX > 0) {
        //表示在左边
        lineStyle.transform = `rotate(${-deg}deg)`
      }
      if (linesCenterDotX - linePageX < 0) {
        //表示在右边
        lineStyle.transform = `rotate(${-(180 - deg)}deg)`
      }
      lineStyle.width = xieBian + 'px'
    }
  },
  mounted() {
    this.getChildrenSize() >= 2 && this.getFirstAndLastRect()
    //绘制默认链接线
    // this.drawLine()
  }
}
</script>
<style scoped>
@keyframes line-animate-after {
  0% {
    left: 100%;
    opacity: 0;
  }
  100% {
    left: 0;
  }
}
@keyframes line-animate-before {
  0% {
    left: 50%;
    opacity: 0;
  }
  100% {
    left: 0;
  }
}
.server-rec,
.server-rec-inner {
  position: relative;
}
.server-spare {
  /* visibility: hidden; */
  display: none;
}
.throughout-line {
  position: absolute;
  height: 1px;
  background-color: #b2bcc9;
  top: -40px;
  text-align: center;
}
.throughout-line:before {
  content: '';
  display: inline-block;
  height: 40px;
  width: 1px;
  background: #b2bcc9;
  position: relative;
  top: -40px;
}
.throughout-line + div {
  margin-left: 0;
}
.line {
  position: absolute;
  top: 0px;
  height: 1px;
  width: 40px;
  left: 50%;
  background-color: #b2bcc9;
  /* box-shadow: #fff 0 0 3px; */
  transform: rotate(-90deg);
  transform-origin: 0 0;
  line-height: 0;
}
.line:hover {
  /* background-color: #fff; */
}
.line::after,
.line::before {
  content: '';
  display: inline-block;
  width: 1px;
  height: 10px;
  background-color: #b2bcc9;
  position: absolute;
  bottom: 1px;
  transform-origin: 0 bottom;
}
.line.line-animate::after {
  transform: rotate(50deg);
}
.line.line-animate::before {
  transform: rotate(125deg);
}
.server-group[spare] + div {
  display: none;
}
</style>
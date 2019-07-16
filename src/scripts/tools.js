const renderServer = {
  render(serverNodeData, currentStructureData) {
    const metric = serverNodeData.metric
    //备用机器待启用
    if (serverNodeData.endpoint === '192.168.200.159') {
      this.spare(serverNodeData, currentStructureData)
    }
    //几种请求数据
    if (
      /ORDER_NUMS/g.test(metric) ||
      /BUCKET_REQUEST_NUMS/g.test(metric) ||
      /BUCKET_USER_REQUEST_NUMS/g.test(metric) ||
      /ORDER_REQUEST_AVG_COST/g.test(metric) ||
      /DELAY_QUEUE_REQUEST_NUMS/g.test(metric)
    ) {
      this.matchingAndSecurities(serverNodeData, currentStructureData)
      return
    }
    this[metric] && this[metric](serverNodeData, currentStructureData)
  },
  //启用备用
  spare(serverNodeData, currentStructureData) {
    if (serverNodeData.metric === 'status') {
      currentStructureData.isSpare = true
      delete currentStructureData.type
    }
    if (serverNodeData.metric === 'diff') {
      currentStructureData.isSpare = false
      currentStructureData.type = 'MQ'
    }
  },
  //如果metric==status
  status(serverNodeData, currentStructureData) {
    currentStructureData.status =
      serverNodeData.value.status === 'UP'
        ? 'success'
        : serverNodeData.value.status === 'DOWN'
        ? 'error'
        : ''
  },
  //matching类型合securities类型
  matchingAndSecurities(serverNodeData, currentStructureData) {
    const key = serverNodeData.metric
    const notification = currentStructureData.notification || []
    const isIn = notification.find(item => item.key === key)
    if (isIn) {
      isIn.value = serverNodeData.value.num
      return
    }
    notification.push({
      key: serverNodeData.metric,
      name: serverNodeData.value.name,
      value: serverNodeData.value.num
    })
  },
  //如果metric==diff深度监控
  diff(serverNodeData, currentStructureData) {
    const groupNameReportList = serverNodeData.value.groupNameReportList
    const groupNameReportListKeys = Object.keys(groupNameReportList)
    currentStructureData.notification.length = 0
    groupNameReportListKeys.forEach(key => {
      currentStructureData.notification.push({
        name: key,
        value: groupNameReportList[key].diffTotal
      })
    })
  }
}
export { renderServer }

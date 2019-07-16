//链接线从哪些id流过来,
// targetParentSiblingsIds: ['ws2'],
//隐藏默认指向线
// hiddenLine:true,
//设置相对偏移位置
//position:{left:-100,top:0}
//内部的消息队列
// notification: [
//   {
//     name: '本地队列',
//     value: 6790,
//     status:0,1,2 //阈值
//   },
//   {
//     name: '撮合数据',
//     value: 637838
//   },
//   {
//     name: '数据单量',
//     value: 98766
//   },
//   {
//     name: '组赛书',
//     value: 46
//   }
// ],
const serverNode = {
  mq: [
    {
      name: 'RecoketMQ',
      ip: '192.168.112.116',
      type: 'MQ',
      notification: [],
      onLineIp: '172.31.58.43',
      status: 'success',
      list: [
        {
          name: 'matching',
          ip: '192.168.200.120',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.63.167',
          status: 'success'
        },
        {
          name: 'matching',
          ip: '192.168.200.116',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.49.255',
          status: 'success'
        },
        {
          name: 'matching',
          ip: '192.168.200.13',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.52.61',
          status: 'success'
        },
        {
          name: 'matching',
          ip: '192.168.200.121',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.60.230',
          status: 'success'
        }
      ]
    },
    {
      name: 'RecoketMQ',
      ip: '192.168.112.102',
      isSpare: true,
      onLineIp: '172.31.63.144',
      status: 'success',
      list: [
        {
          name: 'matching',
          ip: '192.168.200.120',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.63.167',
          status: 'success'
        },
        {
          name: 'matching',
          ip: '192.168.200.116',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.49.255',
          status: 'success'
        },
        {
          name: 'matching',
          ip: '192.168.200.13',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.52.61',
          status: 'success'
        },
        {
          name: 'matching',
          ip: '192.168.200.121',
          type: 'MQ',
          notification: [],
          onLineIp: '172.31.60.230',
          status: 'success'
        }
      ]
    }
  ],
  usdt: [
    {
      name: 'EUREKA',
      ip: '192.168.200.114',
      onLineIp: '172.31.62.40',
      status: 'success'
    },
    {
      name: 'ZUUL',
      ip: '192.168.112.113',
      onLineIp: '172.31.49.234',
      status: 'success',
      list: [
        {
          name: 'WEBSERVICE',
          ip: '192.168.112.117',
          onLineIp: '172.31.52.245',
          status: 'success',
          list: [
            {
              name: 'SERVICE-SECURITIES2',
              ip: '192.168.200.122',
              onLineIp: '172.31.53.21',
              arrowDown: true,
              status: 'success'
            },
            {
              name: 'SERVICE-SECURITIES3',
              ip: '192.168.200.151',
              onLineIp: '172.31.61.54',
              arrowDown: true,
              status: 'success'
            }
          ]
        }
      ]
    },
    {
      name: 'ZUUL',
      ip: '192.168.112.114',
      onLineIp: '172.31.62.152',
      status: 'success',
      list: [
        {
          name: 'WEBSERVICE',
          ip: '192.168.112.118',
          onLineIp: '172.31.49.123',
          status: 'success',
          list: [
            {
              name: 'SERVICE-SECURITIES4',
              ip: '192.168.200.150',
              onLineIp: '172.31.53.115',
              arrowDown: true,
              status: 'success'
            }
          ]
        }
      ]
    },
    {
      name: 'EUREKA',
      ip: '192.168.200.133',
      onLineIp: '172.31.63.69',
      status: 'success'
    }
  ]
}
//如果是线上环境 替换成线上ip
if (process.env.NODE_ENV === 'production') {
  ;(function replace(serverNodes) {
    serverNodes.forEach(node => {
      node.ip = node.onLineIp
      node.list && replace(node.list)
    })
  })(serverNode.usdt)
  ;(function replace(serverNodes) {
    serverNodes.forEach(node => {
      node.ip = node.onLineIp
      node.list && replace(node.list)
    })
  })(serverNode.mq)
}
export default serverNode

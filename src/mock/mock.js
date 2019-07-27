import Mock from 'mockjs'

Mock.mock('http://localhost:3000/orderlist', {
  'info|10-20': [{
    'index|+1': 1,
    'name': '@cfirst @clast',
    'type|0-1': 1,
    'time': '@time',
    'address|1-5': 1
  }]
})

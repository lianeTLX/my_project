/*
  封装一些公共方法
*/

/*
  objFilter:过滤对象中的属性
  参数：obj--需要过滤的对象
       arr--需要保留的属性
*/
function objFilter(obj, arr) {
  let result = {}
  Object.keys(obj)
    .filter(key => arr.includes(key))
    .forEach(key => {
      result[key] = obj[key]
    })
  return result
}

/*
  getMyMap:将数据转成需要的格式
  参数：arr--需要转成map的数组
        key--转成map的key的属性名
 */
function getMyMap(arr, key) {
  let myMap = {}
  for (let i = 0; i < arr.length; i++) {
    //将金额从分转换成元
    arr[i].price = toYuan(arr[i].price)
    delete arr[i].expand
    myMap[arr[i][key]] = arr[i]
  }
  return myMap
}

/*
  getKey:将key转换成对应中文
*/
function getKey(key) {
  switch (key) {
    case 'id':
      return '商品ID'
    case 'name':
      return '商品名称'
    case 'price':
      return '商品价格'
    case 'stock':
      return '商品库存'
    case 'goods_code':
      return '商品条码'
    case 'status':
      return '商品状态'
    case 'create_time':
      return '创建时间'
    case 'update_time':
      return '更新时间'
  }
}

/*
  regFun:正则规则
  根据不同的key返回不同的正则表达式和提示信息
*/
function regFun(key){
  let res = {}
  if (key == 'name') {
    res.reg = /^[\u4E00-\u9FA5A-Za-z0-9_.]+$/
    res.wMsg = '*商品名称必填，并不能含有非法字符哦！'  
  } else if (key == 'price') {
    res.reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
    res.wMsg = '*请填写正确格式的商品价格哦！'
  } else if (key == 'stock') {
    res.reg = /^\d+$/
    res.wMsg = '*商品库存只能是整数哦！'
  } else if (key == 'goods_code') {
    res.reg = /^\d+$/
    res.wMsg = '*商品条形码只能是整数哦！'
  } else if (key == 'status') {
    res.reg = /^[01]{1}$/
    res.wMsg = '*商品状态只能为0或者1；1表示正常，0表示下架！'
  }
  return res
}

/*
  validationFun验证函数
*/
function validationFun(v, reg) {
  return reg.test(v)
}


/*
  toYuan:金额过滤器，将分转化称元
  toFen:金额过滤器，将元转化为分
*/
function toYuan(val) {
  return (val / 100).toFixed(2)
}
function toFen(val) {
  return val * 100
}

export {
  objFilter,
  getMyMap,
  getKey,
  toYuan,
  toFen,
  regFun,
  validationFun
}
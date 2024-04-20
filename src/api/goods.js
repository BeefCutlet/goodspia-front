import api from '.'

//굿즈 목록 조회
export const getGoodsList = async () => {
  return await api
    .get('/goods/list?page=0&size=6')
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log('err: ', err.response.data)
    })
}

//굿즈 단건 조회
export const getGoods = async (goodsId) => {
  return await api
    .get(`/goods/${goodsId}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log('err: ', err.response.data)
    })
}

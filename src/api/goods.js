import api from '.'

//굿즈 목록 조회
export const getGoodsList = async () => {
  return await api
    .get('/goods/list?page=0&size=6')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('굿즈 목록 조회 실패, error: ', error.response.data)
    })
}

export const getRegisteredGoodsList = async () => {
  return await api
    .get('/goods/artist')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('등록한 굿즈 목록 조회 실패, error: ', error.response.data)
    })
}

export const getRegisteredGoods = async (goodsId) => {
  return await api
    .get(`/goods/artist/${goodsId}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(
        '등록한 굿즈 상세 정보 조회 실패, error: ',
        error.response.data,
      )
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

//굿즈 등록
export const registerGoods = async (goods) => {
  return await api
    .post('/goods', goods, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('굿즈 등록 성공')
      return true
    })
    .catch((error) => {
      console.log('굿즈 등록 실패, error: ', error.response.data)
      return false
    })
}

//굿즈 정보 수정
export const modifyGoods = async (goods) => {
  return await api
    .put('/goods', goods, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('굿즈 수정 성공')
      return true
    })
    .catch((error) => {
      console.log('굿즈 등록 실패, error: ', error.response.data)
      return false
    })
}

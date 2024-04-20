import api from '.'

//장바구니 목록 조회
export const getCartList = async () => {
  return await api
    .get('/cart/list')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('장바구니 목록 조회 실패: ', error.response.data)
    })
}

//장바구니 등록
export const addCartList = async (cartList) => {
  return await api
    .post('/cart', cartList)
    .then((response) => {
      return true
    })
    .catch((error) => {
      console.log('장바구니 등록 실패: ', error.response.data)
      return false
    })
}

//장바구니 수량 변경
export const changeCartGoodsQuantity = async (cartId, quantity) => {
  return await api
    .put('/cart/quantity', {
      cartId,
      quantity,
    })
    .then((response) => {
      return true
    })
    .catch((error) => {
      console.log('장바구니 굿즈 수량 변경 실패: ', error.response.data)
      return false
    })
}

//장바구니 삭제
export const deleteCart = async (cartId) => {
  return await api
    .delete(`/cart/${cartId}`)
    .then((response) => {
      return true
    })
    .catch((error) => {
      console.log('장바구니 삭제 실패: ', error.response.data)
      return false
    })
}

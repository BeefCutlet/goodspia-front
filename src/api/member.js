import api from '.'

export const getMember = async () => {
  return await api
    .get('/members/info')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('회원 정보 조회 실패: ', error.response.data)
      return null
    })
}

export const updateMember = async ({
  name,
  nickname,
  phoneNumber,
  birthday,
}) => {
  return await api
    .put('/members', {
      name,
      nickname,
      phoneNumber,
      birthday,
    })
    .then((response) => {
      return true
    })
    .catch((error) => {
      console.log('회원 정보 수정 실패: ', error.response.data)
      return false
    })
}

import api from '.'

export const applyForArtist = async (artist) => {
  return await api
    .post('/artists', artist)
    .then((response) => {
      console.log('아티스트 등록 성공')
      return true
    })
    .catch((error) => {
      console.log('아티스트 등록 실패: ', error.response.data)
      return false
    })
}

export const getArtist = async () => {
  return await api
    .get('/artists')
    .then((response) => {
      console.log('아티스트 정보 조회 성공')
      return response.data
    })
    .catch((error) => {
      console.log('아티스트 정보 조회 실패: ', error.response.data)
    })
}

export const updateArtist = async (artist) => {
  return await api
    .put('/artists/', artist, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('아티스트 정보 수정 성공')
      return true
    })
    .catch((error) => {
      console.log('아티스트 정보 수정 실패: ', error.response.data)
      return false
    })
}

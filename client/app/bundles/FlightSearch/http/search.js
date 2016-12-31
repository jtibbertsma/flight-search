import request from 'axios'

export default function search(data, coords, onSuccess, onError) {
  const token = FB.getAuthResponse().accessToken

  request
    .post('/api/search', { data, coords, token })
    .then(onSuccess)
    .catch(onError)
}

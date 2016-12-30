import request from 'axios'

export default function search(data, onSuccess, onError) {
  request
    .post('/api/search', { data })
    .then(onSuccess)
    .catch(onError)
}

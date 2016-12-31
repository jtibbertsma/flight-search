import request from 'axios'

export default function search(data, coords, onSuccess, onError) {
  request
    .post('/api/search', { data, coords })
    .then(onSuccess)
    .catch(onError)
}

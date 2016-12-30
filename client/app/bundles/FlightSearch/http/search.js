import request from 'axios'

export default function search(formData, onSuccess, onError) {
  request
    .post('/api/search', formData)
    .then(onSuccess)
    .catch(onError)
}

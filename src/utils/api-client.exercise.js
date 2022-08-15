import * as auth from 'auth-provider'

const apiURL = process.env.REACT_APP_API_URL

function client(
  endpoint,
  {token, headers: customHeaders, data, ...customConfig} = {},
) {
  const body = data ? JSON.stringify(data) : undefined

  const config = {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    body,
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.assign(window.location)
      return Promise.reject({message: 'Unauthorized'})
    } else {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    }
  })
}

export {client}

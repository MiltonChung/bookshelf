async function client(endpoint, customConfig = {}) {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const fullURL = `${process.env.REACT_APP_API_URL}/${endpoint}`
  const config = {
    method: 'GET',
    ...customConfig,
  }

  const response = await window.fetch(fullURL, config)
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}

export {client}

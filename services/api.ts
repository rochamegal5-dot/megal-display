export async function request<T>(url: string): Promise<T> {

  const res = await fetch(url, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status}`)
  }

  return res.json()
}

export const Api = {

  quiniela() {
    return request('/api/quiniela')
  },

  tombola() {
    return request('/api/tombola')
  },

  fiveGold() {
    return request('/api/cinco-de-oro')
  },

  weather() {
    return request('/api/weather')
  },

}

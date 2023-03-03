async function request<T>(option: any, url: string) {
    let res = await fetch(url, option)
    let resp = await res.json()
    return resp
  }
  
  export function get<T>(url: string) {
    return request<T>({method: "GET"}, url)
  }

  export function post<T>(body: any, url: string) {
    return request<T>({method: "POST", body: body}, url)
  }
  
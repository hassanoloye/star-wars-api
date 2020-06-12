import request from "request-promise-native"

const methodTypes = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch'
}

export default class RequestService {

  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
  }

  async makeRequest({urlPath, method = methodTypes.GET, data = {}, query={}, headers={}, json = true}) {
    const args = {
      uri: `${this.baseUrl}${urlPath}`,
      method,
      json
    };
    if (method === methodTypes.GET) {
      args.qs = data
    } else {
      args.body = data
    }
    args.headers = {
      'Content-Type': 'application/json',
      ...headers
    }

    return await request(args);
  }

  async get(path, query, headers) {
    return this.makeRequest({
      urlPath: path,
      method: methodTypes.GET,
      query,
      headers
    })
  }

  async post(path, data, headers) {
    return this.makeRequest({
      urlPath: path,
      method: methodTypes.POST,
      data,
      headers
    })
  }

  async delete(path, query, headers) {
    return this.makeRequest({
      urlPath: path,
      method: methodTypes.DELETE,
      query,
      headers
    })
  }

  async put(path, data, headers) {
    return this.makeRequest({
      urlPath: path,
      method: methodTypes.PUT,
      data,
      headers
    })
  }

  async patch(path, data, headers) {
    return this.makeRequest({
      urlPath: path,
      method: methodTypes.PATCH,
      data,
      headers
    })
  }
}

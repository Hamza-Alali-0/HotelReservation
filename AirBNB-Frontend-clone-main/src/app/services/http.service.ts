import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Point to API Gateway running on localhost:8080
  BASE_URL = isDevMode() ? '//localhost:8080/api/' : '/api/'
  // headers will be constructed per-request so we can include the auth token from sessionStorage

  public get(endpoint: string, data?: any) {
    return this.httpRequest(endpoint, 'get', data)
  }

  public post(endpoint: string, data?: any) {
      return this.httpRequest(endpoint, 'post', data)
  }

  public put(endpoint: string, data: any) {
    return this.httpRequest(endpoint, 'put', data)
  }

  public delete(endpoint: string, data: any) {
    return this.httpRequest(endpoint, 'delete', data)
  }

  private httpRequest(endpoint: string, method: string, data = null) {
    try {
      const token = sessionStorage.getItem('token');
      const headers = token ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }) : new HttpHeaders({ 'Content-Type': 'application/json' });
      const option: any = { body: data, headers };
      return this.http.request(method, `${this.BASE_URL}${endpoint}`, option)
    } catch (err: any) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) sessionStorage.clear()
        throw err
    }
}
}

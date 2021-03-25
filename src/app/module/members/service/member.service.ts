import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL: string;
  jsonServerURL: string;

  constructor(private httpClient: HttpClient) { 
    this.baseURL = environment.memberApiPath;
  }

  getAllMembers(): Observable<any> {
    return this.httpClient.get(this.baseURL);
  }

  getMemberById(id): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  createMember(data): Observable<any> {
    return this.httpClient.post(this.baseURL, data);
  }

  updateMember(id, data): Observable<any> {
    return this.httpClient.put(this.baseURL + '/update/' + `${id}`, data);
  }

  deleteMember(id): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.baseURL);
  }

  searchMember(memberNumber): Observable<any> {
    this.jsonServerURL = `http://${window.location.hostname}:3000/members`;
    return this.httpClient.get(`${this.jsonServerURL}?memberNumber=${memberNumber}`);
  }
}

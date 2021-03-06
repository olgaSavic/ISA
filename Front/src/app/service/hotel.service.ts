import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HotelModel } from '../model/hotel.model';
import {Observable} from 'rxjs';
import {SearchHotelsModel} from '../model/searchHotels.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'text/plain'}),
};

@Injectable()
export class HotelService {

  private BASE_URL = 'http://localhost:8080/api/hotel';

  constructor(private http: HttpClient) {

  }

  registerHotel(object: HotelModel): Observable<any> {
    const body = JSON.stringify(object);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/registerHotel`, body, {headers});
  }

  getHotelsByAdministrator(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/getHotelsByAdministrator`, {headers});
  }

  checkIfReservedHotel(id: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/checkIfReservedHotel/${id}`, {headers});
  }

  izmeniHotel(object: HotelModel, id: any): Observable<any> {
    const body = JSON.stringify(object);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`${this.BASE_URL}/izmeniHotel/${id}`, body, {headers});
  }

  getHotel(idHotela: any): Observable<any>  {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/getHotel/${idHotela}`, {headers});
  }

  getAllHotels(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/getAllHotels`, {headers});
  }

  searchHotels(object: SearchHotelsModel): Observable<any> {
    const body = JSON.stringify(object);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/searchHotels`, body, {headers});
  }


  monthyGraph(idHotela: any, year: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('year', year);
    return this.http.get(`${this.BASE_URL}/monthlyGraph/${idHotela}`, { params: params});
  }

  weeklyGraph(idHotela: any, year: any, month: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('year', year);
    params = params.append('month', month);
    return this.http.get(`${this.BASE_URL}/weeklyGraph/${idHotela}`, { params: params});
  }

  dailyGraph(idHotela: any, date: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('date', date);
    return this.http.get(`${this.BASE_URL}/dailyGraph/${idHotela}`, { params: params});
  }

  getAllHotelsByAddress(idRezervacijeLeta: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/getAllHotelsByAddress/${idRezervacijeLeta}`, {headers});
  }

  getRevenues(idHotela: any, d1: any, d2: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('d1', d1);
    params = params.append('d2', d2);
    return this.http.get(`${this.BASE_URL}/getRevenues/${idHotela}`, { params: params});
  }

  vratiHoteleKorisnika(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/vratiHoteleKorisnika`, {headers});
  }

  sortHotele(sort : string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.BASE_URL}/sort/`+sort, {headers});
  }
}


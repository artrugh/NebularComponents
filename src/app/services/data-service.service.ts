import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { ODataResponse, ServiceCardBase } from "../Models";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private readonly baseUrl = "https://localhost:5001";

  constructor(private readonly http: HttpClient) { }

  public getServiceCards(): Observable<ODataResponse<ServiceCardBase[]>> {
    return this.http.get<ODataResponse<ServiceCardBase[]>>(this.baseUrl + "/api/v1/odata/servicecards");
  }
}

import { Injectable } from '@angular/core';
import { Circunscripcion, Distrito, Estado } from '../comun/models/catalogos';
import { ApiService } from '../comun/services/api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private api: ApiService) {
  }
  async getCircunscripcion(): Promise<Array<Circunscripcion>> {
    return this.api.ExecuteApiCall<Array<Circunscripcion>>(`${environment.URL_API}Diputaciones/GetCircunscripciones`, null);
  }

  async getEstado(request:any): Promise<Array<Estado>> {
    return this.api.ExecuteApiCall<Array<Estado>>(`${environment.URL_API}Diputaciones/GetEstados`, request);
  }

  async getDistrito(request:any): Promise<Array<Distrito>> {
    return this.api.ExecuteApiCall<Array<Distrito>>(`${environment.URL_API}Diputaciones/GetDistritos`, request);
  }

}

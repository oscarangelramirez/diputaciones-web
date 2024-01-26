import { Injectable } from '@angular/core';
import { ApiService } from '../comun/services/api.service';
import { EstadisticaDetalle, EstadisticasGlobal } from '../comun/models/estadisticas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private api: ApiService) {
  }
  async getEstadisticaGlobal(request: any): Promise<EstadisticasGlobal> {
    return this.api.ExecuteApiCall<EstadisticasGlobal>(`${environment.URL_API}Diputaciones/GetGlobalEstadisticas`, request);
  }

  async getEstadisticaDetalle(request:any): Promise<Array<EstadisticaDetalle>> {
    return this.api.ExecuteApiCall<Array<EstadisticaDetalle>>(`${environment.URL_API}Diputaciones/GetGlobalEstadisticasDetalle`, request);
  }


}

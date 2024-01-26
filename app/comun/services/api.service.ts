import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import { AppToasterService } from './appToaster.service';
import { ConvertApiResponse, ConvertValue, HTTP_JSON_OPTIONS, HttpRequestType, ToasterPosition } from '../utils/utils';
import { ApiResponse } from '../models/apiModel';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private toaster: AppToasterService) {
    }

    /**
     Realiza una llama al api regresando un objeto del tipo "ApiResponse" y convierte el resultado al
     tipo deseado "T"
     **/
    async ExecuteApiCall<T>(urlMethod: string, request: any | null = null): Promise<T> {
        let result: T | PromiseLike<T>;
        try {
            let response: ApiResponse = await lastValueFrom(this.http.post<ApiResponse>(urlMethod, request, HTTP_JSON_OPTIONS));
            if (!response.Result.Status) {
                this.toaster.warning(response.Result.Error, ToasterPosition.bottomCenter);
                throw  response.Result.Error;
            }
            result = ConvertApiResponse<T>(response);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     Realiza una llama al api regresando y convirtiendo el resultado a un objeto del tipo "T"
     **/
    async ExecuteDistinctApiCall<T>(
        urlMethod: string,
        request: any | null = null,
        type: HttpRequestType = HttpRequestType.POST,
        options?: any): Promise<T> {
        let response: any;
        try {
            switch (type) {
                case HttpRequestType.POST:
                    response = await lastValueFrom(this.http.post<T>(urlMethod, request, HTTP_JSON_OPTIONS));
                    break;
                case HttpRequestType.GET:
                    response = await lastValueFrom(this.http.get(urlMethod, options ?? {}));
                    break;
            }
            return ConvertValue<T>(response);
        } catch (e) {
            console.log(e);
            // this.toaster.warning('Ha ocurrido un problema al realizar la operación',"", ToasterPosition.bottomCenter);
            throw new Error("Ha ocurrido un problema");
        }
    }

}

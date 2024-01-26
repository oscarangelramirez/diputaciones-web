import { HttpHeaders } from "@angular/common/http";
import { ApiResponse } from "../models/apiModel";

export enum HttpRequestType {
    POST = 0,
    GET = 1,
    PUT = 2,
    UPDATE = 3,
    DELETE = 4
  }
  
  export const HTTP_JSON_OPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  
  export enum ToasterPosition {
    topRight = 'custom-toast-top-right',
    topLeft = 'toast-top-left',
    bottomRight = 'toast-bottom-right',
    bottomLeft = 'toast-bottom-left',
    // Other positions you would like
    bottomCenter = 'toast-bottom-center',
    topCenter = 'toast-top-center',
    topFullWidth = 'toast-top-full-width'
  }

  export function ConvertApiResponse<T>(value: ApiResponse): T {
    if (!value.Result.Status) {
      console.log(value.Result.Error);
    }
    return ConvertValue<T>(value.Data);
  
  }

  export const ConvertValue = <T>(value: any): T => JSON.parse(JSON.stringify(value)) as T;

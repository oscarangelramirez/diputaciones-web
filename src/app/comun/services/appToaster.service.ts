import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { ToasterPosition } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AppToasterService {

  constructor(private toastr: ToastrService) {
  }

  success(message: string, position: ToasterPosition, title: string = '') {
    this.toastr.success(message, '', {
      positionClass: position,
      progressBar: true,
      progressAnimation: "decreasing"
    });
  }

  warning(message: string, position: ToasterPosition, title: string = '') {
    this.toastr.warning(message, '', {
      positionClass: position,
      progressBar: true,
      progressAnimation: "decreasing"
    });
  }

  error(message: string, position: ToasterPosition, title: string = '') {
    this.toastr.error(message, '', {
      positionClass: position,
      progressBar: true,
      progressAnimation: "decreasing"
    });
  }


  info(message: string, position: ToasterPosition, title: string = '') {
    this.toastr.info(message, '', {
      positionClass: position,
      progressBar: true,
      progressAnimation: "decreasing"
    });
  }


}

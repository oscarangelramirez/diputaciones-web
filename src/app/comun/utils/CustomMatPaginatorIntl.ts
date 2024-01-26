import {Injectable} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();  

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {

      this.itemsPerPageLabel = "Elementos por página";
      this.nextPageLabel = "Siguiente";
      this.previousPageLabel = "Anterior";
      this.changes.next();

  }


}
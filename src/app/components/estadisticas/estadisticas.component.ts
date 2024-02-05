import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { EstadisticasService } from '../../services/estadisticas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadisticaDetalle, EstadisticasGlobal } from '../../comun/models/estadisticas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements AfterViewInit {

  form: FormGroup;
  listCircunscripcion: any[];
  listEstados: any[];
  listDistritos: any[];
  checkFilterPerdidasMenor = false;
  checkFilterGanadasMenor = false;
  checkFilterGanadasMayor = false;
  checkFilterPerdidasMayor = false;

  checkFilterGanadas = false;
  checkFilterPerdidas = false;
  porcentaje: number = 10;
  DefaultCircunscripcion = 4;


  resultGlobal: EstadisticasGlobal;
  resultDetalle: EstadisticaDetalle[];

  private paginator: MatPaginator;


  dataSource = new MatTableDataSource<EstadisticaDetalle>();
  displayedColumns: string[] = ['Color', 'Distrito', 'Seccion', 'Ganador', 'Porcentaje']


  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private formBuilder: FormBuilder,
    private catService: CatService,
    private estadisticasService: EstadisticasService,
    private spinnerService: NgxSpinnerService) {
    this.form = this.formBuilder.group({
      Id_Circunscripcion: [null, [Validators.required]],
      Id_Estado: [null],
      Id_Distrito: [null]
    });
    this.initApp();
  }


  ngAfterViewInit() {


  }

  async initApp() {
    this.spinnerService.show("ngxall")
    this.listCircunscripcion = await this.catService.getCircunscripcion();
    this.listEstados =  await this.catService.getEstado(4);
    this.spinnerService.hide("ngxall")
  }

  async changeCircunscripcion(value) {
    this.listEstados = new Array();
    this.form.patchValue({ Id_Estado: null });
    this.listEstados = await this.catService.getEstado(value.value);
  }

  async changeEstado(value) {
    this.listDistritos = new Array();
    this.form.patchValue({ Id_Distrito: null });
    this.listDistritos = await this.catService.getDistrito(value.value);
  }

  async onSubmit() {
    this.resultGlobal = null;
    this.getGlobalEstadisticas();
    this.getDetailEstadisticas();
  }
  async getGlobalEstadisticas() {
    this.spinnerService.show('global')
    this.resultGlobal = await this.estadisticasService.getEstadisticaGlobal(this.form.value);
    this.spinnerService.hide('global')
  }

  async getDetailEstadisticas() {
    this.spinnerService.show('detail')
    this.resultDetalle = await this.estadisticasService.getEstadisticaDetalle(this.form.value);
    this.getListFilter();
    this.spinnerService.hide('detail')
  }

  getListFilter() {

    if (this.checkFilterGanadasMayor)
      this.dataSource.data = this.resultDetalle.filter(u => u.DiferenciaSegundo > this.porcentaje && u.Partido_Ganador == 'MORENA');

    if (this.checkFilterGanadas)
      this.dataSource.data = this.resultDetalle.filter(u => u.Partido_Ganador == 'MORENA'
        && u.DiferenciaSegundo <= this.porcentaje && u.DiferenciaSegundo > 5);
    if (this.checkFilterGanadasMenor)
      this.dataSource.data = this.resultDetalle.filter(u => u.DiferenciaSegundo <= 5 && u.Partido_Ganador == 'MORENA');

    if (this.checkFilterPerdidasMenor)
      this.dataSource.data = this.resultDetalle.filter(u => u.DiferenciaMorena <= 5 && u.Partido_Ganador !== 'MORENA');

    if (this.checkFilterPerdidas)
      this.dataSource.data = this.resultDetalle.filter(u => u.Partido_Ganador !== 'MORENA'  &&   u.DiferenciaMorena <=10  &&  u.DiferenciaMorena  >5);

    if (this.checkFilterPerdidasMayor)
      this.dataSource.data = this.resultDetalle.filter(u => u.DiferenciaMorena > this.porcentaje && u.Partido_Ganador !== 'MORENA');

    if (!this.checkFilterGanadas && !this.checkFilterPerdidas && !this.checkFilterPerdidasMenor && !this.checkFilterGanadasMenor && !this.checkFilterGanadasMayor && !this.checkFilterPerdidasMayor)
      this.dataSource.data = this.resultDetalle;
  }

  GetPorcentaje(value) {
    let porcentaje = Number(value);
    return porcentaje.toString() + '%';
  }

  SetValues() {
    this.checkFilterPerdidasMenor = false;
    this.checkFilterGanadasMenor = false;
    this.checkFilterGanadasMayor = false;
    this.checkFilterPerdidasMayor = false;
    this.checkFilterGanadas = false;
    this.checkFilterPerdidas = false;
  }

}

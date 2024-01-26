export interface EstadisticasGlobal
{
    NumeroDistritos : number
    NumeroVotos :number
    Ganados :number
    Perdidos :number
}
export interface EstadisticaDetalle
{
    IdDistrito :number;
    Seccion :number;
    Partido_Ganador :string;
    Votos_Ganadores : number;
    PorcentajeGanador : number;
    PorcentajeMorena : number;
    DiferenciaMorena : number;
    PorcentajeSegundo :number;
    DiferenciaSegundo :number;
}

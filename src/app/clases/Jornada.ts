export class Jornada {
  Fecha: Date;
  CriterioGanador: string;
  JuegoDeCompeticionLigaId: number;
  GanadoresFormulaUno: number[];
  id: number;
  JuegoDeCompeticionTorneoId: number;
  NumeroDeJornada: number;

  constructor(Fecha?: Date, CriterioGanador?: string, JuegoDeCompeticionId?: number, GanadoresFormulaUno?: number[], JuegoDeCompeticionTorneoId?: number, NumeroDeJornada?: number) {

    this.Fecha = Fecha;
    this.CriterioGanador = CriterioGanador;
    this.JuegoDeCompeticionLigaId = JuegoDeCompeticionId;
    this.GanadoresFormulaUno = GanadoresFormulaUno;
    this.JuegoDeCompeticionTorneoId = JuegoDeCompeticionTorneoId;
    this.NumeroDeJornada = NumeroDeJornada;
  }
}

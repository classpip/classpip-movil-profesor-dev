import { Component, OnInit } from '@angular/core';
import { SesionService, PeticionesAPIService, CalculosService, ComServerService } from 'src/app/services/index';
import Swal from 'sweetalert2';
import {JuegoDeVotacionUnoATodos, Alumno, AlumnoJuegoDeVotacionUnoATodos, TablaAlumnoJuegoDeVotacionUnoATodos, Equipo} from 'src/app/clases/index';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { EquipoJuegoDeVotacionUnoATodos } from 'src/app/clases/EquipoJuegoDeVotacionUnoATodos';
import { TablaEquipoJuegoDeVotacionUnoATodos } from 'src/app/clases/TablaEquipoJuegoDeVotacionUnoATodos';
import { TablaAlumnoJuegoDeVotacionTodosAUno} from 'src/app/clases/index';
import {JuegoDeVotacionTodosAUno, AlumnoJuegoDeVotacionTodosAUno} from 'src/app/clases/index';
import { AlumnoJuegoDeVotacionAOpciones } from 'src/app/clases/AlumnoJuegoDeVotacionAOpciones';


@Component({
  selector: 'app-juego-votaciones',
  templateUrl: './juego-votaciones.page.html',
  styleUrls: ['./juego-votaciones.page.scss'],
})
export class JuegoVotacionesPage implements OnInit {

  juegoSeleccionado: any;
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDeVotacionUnoATodos[];
  listaEquiposOrdenadaPorPuntos: EquipoJuegoDeVotacionUnoATodos[];
  rankingIndividualJuegoDeVotacionUnoATodos: TablaAlumnoJuegoDeVotacionUnoATodos[] = [];
  rankingEquipoJuegoDeVotacionUnoATodos: TablaEquipoJuegoDeVotacionUnoATodos[] = [];
  datasourceAlumno;
  dataSourceEquipo;
  alumnosEquipo: Alumno[];
  displayedColumnsAlumnos: string[] = ['posicion', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'puntos', 'incremento', ' '];
  displayedColumnsEquipos: string[] = ['posicion', 'nombreEquipo', 'miembros', 'puntos', 'incremento', 'cuantos'];
  interval;
  alumnosQueYaHanVotado: Alumno[];
  equiposQueYaHanVotado: number[];
  equiposConMiembros: any;

  listaAlumnosOrdenadaPorPuntosTodosAUno: AlumnoJuegoDeVotacionTodosAUno[];
  displayedColumnsAlumnos2: string[] = ['posicion', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'votos',  'nota'];
  columnasListas = false;
  rankingIndividualJuegoDeVotacionTodosAUno: TablaAlumnoJuegoDeVotacionTodosAUno[] = [];

  alumnosInscritos: AlumnoJuegoDeVotacionAOpciones[];
  datos: any[];
  dataSource;
  displayedColumns: string[] = ['opcion', 'incremento', 'puntos'];
  numeroRespuestas = 0;
  numeroParticipantes: number;
  ficheroGenerado = false;
  sonido = true;
 

  constructor( public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    public calculos: CalculosService,
    private comServer: ComServerService,
    private location: Location) 
  { }

  ngOnInit() {

    this.juegoSeleccionado = this.sesion.DameJuego();
    console.log(this.juegoSeleccionado);

    if(this.juegoSeleccionado.Tipo === "Juego De Votación Uno A Todos"){

      if (this.juegoSeleccionado.Modo === 'Individual') {
        this.AlumnosDelJuego();
        this.comServer.EsperoVotacion()
        .subscribe((res: any) => {
            console.log ('llega votacion');
            console.log (res.votacion);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < res.votacion.Votos.length; i++) {
              const votado = this.rankingIndividualJuegoDeVotacionUnoATodos.filter (al => al.id === res.votacion.Votos[i].alumnoId)[0];
              console.log ('votado');
              console.log (votado);
              votado.puntos = votado.puntos + res.votacion.Votos[i].puntos;
              votado.incremento = res.votacion.Votos[i].puntos;
            }
            // Tomo nota de que el alumno ya ha votado
            this.rankingIndividualJuegoDeVotacionUnoATodos.filter (al => al.id === res.votacion.alumnoId)[0].votado = true;
            console.log ('ranking');
            console.log (this.rankingIndividualJuegoDeVotacionUnoATodos);
            // tslint:disable-next-line:only-arrow-functions
            this.rankingIndividualJuegoDeVotacionUnoATodos = this.rankingIndividualJuegoDeVotacionUnoATodos.sort(function(obj1, obj2) {
              return obj2.puntos - obj1.puntos;
            });
            this.datasourceAlumno = new MatTableDataSource(this.rankingIndividualJuegoDeVotacionUnoATodos);
  
            // Haremos que se muestren los incrementos de esa votaciñón durante 5 segundos
            this.interval = setInterval(() => {
              this.rankingIndividualJuegoDeVotacionUnoATodos.forEach (al => al.incremento = 0);
              clearInterval(this.interval);
            }, 5000);
        });
      } else {
        this.EquiposDelJuego();
        console.log ('VOY A ESPERAR VOTACION');
        this.comServer.EsperoVotacion()
        .subscribe((res: any) => {
            console.log ('llega votacion');
            console.log (res);
            console.log ('equipos que han votado', this.equiposQueYaHanVotado);
  
            if (!this.juegoSeleccionado.VotanEquipos) {
              res.votacion.Votos = res.votacion.Votos.filter (voto => !this.alumnosQueYaHanVotado.some (al => al.id === voto.alumnoId));
              console.log ('votos filtrados ', res.votacion.Votos);
              const alumno = this.alumnosDelJuego.find (a => a.id === res.votacion.Votos[0].alumnoId);
              this.alumnosQueYaHanVotado.push (alumno);
              console.log ('alumnos que ya han votado ', this.alumnosQueYaHanVotado);
            }
       
            if ((this.juegoSeleccionado.VotanEquipos) && (this.equiposQueYaHanVotado.includes (res.votacion.equipoId))) {
              console.log ('El equipo ya ha votado');
            } else {
              console.log ('vota un miembro del equipo ', res.votacion.equipoId);
              this.equiposQueYaHanVotado.push (res.votacion.equipoId);
              console.log ('actualizo equipos que ya han votado ', this.equiposQueYaHanVotado);

              for (let i = 0; i < res.votacion.Votos.length; i++) {
                  const votado = this.rankingEquipoJuegoDeVotacionUnoATodos.filter (eq => eq.id === res.votacion.Votos[i].equipoId)[0];
                  console.log ('votado');
                  console.log (votado);
                  votado.puntos = votado.puntos + res.votacion.Votos[i].puntos;
                  votado.incremento = res.votacion.Votos[i].puntos;
              }

              this.rankingEquipoJuegoDeVotacionUnoATodos.filter (eq => eq.id === res.votacion.equipoId)[0].votado = true;
              console.log ('ranking');
              console.log (this.rankingEquipoJuegoDeVotacionUnoATodos);
              this.rankingEquipoJuegoDeVotacionUnoATodos = this.rankingEquipoJuegoDeVotacionUnoATodos.sort(function(obj1, obj2) {
                  return obj2.puntos - obj1.puntos;
              });
              this.dataSourceEquipo = new MatTableDataSource(this.rankingEquipoJuegoDeVotacionUnoATodos);
  
              this.interval = setInterval(() => {
                  this.rankingEquipoJuegoDeVotacionUnoATodos.forEach (eq => eq.incremento = 0);
                  clearInterval(this.interval);
              }, 5000);
            }
        });
  
      }

    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Todos A Uno"){
      
      if (this.juegoSeleccionado.Conceptos.length > 1) {
        this.juegoSeleccionado.Conceptos.forEach (concepto => this.displayedColumnsAlumnos.push (concepto));
      }
      this.displayedColumnsAlumnos.push (' ');
      this.columnasListas = true;
      console.log ('columnas');
      console.log (this.displayedColumnsAlumnos);
      console.log ('conceptos');
      console.log (this.juegoSeleccionado.Conceptos);
  
      if (this.juegoSeleccionado.Modo === 'Individual') {
        this.AlumnosDelJuego();
      } else {
        console.log ('aun no funciona la modalidad por equipos');
      }
      this.comServer.EsperoVotaciones()
      .subscribe((res: any) => {
          this.RecuperarInscripcionesAlumnoJuego();
      });
  
    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Votar opciones"){
      
      if (this.juegoSeleccionado.Modo === 'Individual') {
        this.RecuperarInscripcionesAlumnoJuego();
      } else {
        console.log ('aun no funciona la modalidad por equipos');
      }
      this.comServer.EsperoRespuestasVotacionAOpciones()
      .subscribe((respuesta) => {
        console.log ('recibo respuesta');
        console.log (respuesta);
        if (respuesta.votos) {
          this.numeroRespuestas++;
          let i;
          for (i = 0; i < respuesta.votos.length; i++) {
            const index = this.datos.findIndex (entrada => entrada.opcion === respuesta.votos[i].opcion );
            this.datos [index].incremento =  respuesta.votos[i].puntos;
            this.datos [index].puntos =  this.datos [index].puntos + respuesta.votos[i].puntos ;
          }
          this.datos.sort((a, b) => b.puntos - a.puntos);
          this.dataSource = new MatTableDataSource(this.datos);
        }
      });
    } 
  }

  AlumnosDelJuego() {

    if(this.juegoSeleccionado.Tipo === "Juego De Votación Uno A Todos"){
      
      console.log ('Vamos a pos los alumnos');
      this.peticionesAPI.DameAlumnosJuegoDeVotacionUnoATodos(this.juegoSeleccionado.id)
      .subscribe(alumnosJuego => {
        console.log ('Ya tengo los alumnos');
        console.log(alumnosJuego);
        this.alumnosDelJuego = alumnosJuego;
        this.RecuperarInscripcionesAlumnoJuego();
      });
    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Todos A Uno"){
      
      console.log ('Vamos a pos los alumnos');
      this.peticionesAPI.DameAlumnosJuegoDeVotacionTodosAUno(this.juegoSeleccionado.id)
      .subscribe(alumnosJuego => {
        console.log ('Ya tengo los alumnos');
        console.log(alumnosJuego);
        this.alumnosDelJuego = alumnosJuego;
        this.RecuperarInscripcionesAlumnoJuego();
      });
    }
    
  }

  EquiposDelJuego() {

    this.peticionesAPI.DameAlumnosGrupo(this.juegoSeleccionado.grupoId)
    .subscribe(alumnosJuego => {
      console.log ('Ya tengo los alumnos');
      console.log(alumnosJuego);
      this.alumnosDelJuego = alumnosJuego;
      console.log ('Vamos a pos los equipos');
      this.peticionesAPI.DameEquiposJuegoDeVotacionUnoATodos(this.juegoSeleccionado.id)
      .subscribe(equiposJuego => {
        console.log ('Ya tengo los equipos');
        console.log(equiposJuego);
        this.equiposDelJuego = equiposJuego;
        this.equiposConMiembros = [];
        this.equiposDelJuego.forEach (async eq => {
          const res = await this.peticionesAPI.DameAlumnosEquipo (eq.id).toPromise();
          if (res !== undefined) {
            this.equiposConMiembros.push ({
              equipo: eq,
              miembros: res
            })
          } else {
            this.equiposConMiembros.push ({
              equipo: eq,
              miembros: undefined
            })
          }

        })
      
        this.RecuperarInscripcionesEquipoJuego();
      });  
    });
  
  }

  AlumnoHaVotado(alumno: Alumno) {
    return this.alumnosQueYaHanVotado.some (al => al.id === alumno.id);
  }

  CuantosHanVotadoDelEquipo (equipo: Equipo): string {
    // Hay que contar cuantos alumnos del equipo están en la lista de los que ya han votado
    // Primero vemos si todas las listas implicadas están preparadas
    if (this.equiposConMiembros && this.alumnosQueYaHanVotado && this.equiposConMiembros) {
      const alumnosDelEquipo = this.equiposConMiembros.filter (eq => eq.equipo.id === equipo.id)[0].miembros;
      console.log ('equipo ', equipo);
      console.log ('alumnos del equipo ', alumnosDelEquipo);
      console.log ('alumnos que ya han votado ', this.alumnosQueYaHanVotado);
      const yaHanVotado = alumnosDelEquipo.filter(alumno => this.alumnosQueYaHanVotado.some(al => al.id === alumno.id));
      console.log ('ya han votado ', yaHanVotado);
      if (yaHanVotado) {
        return yaHanVotado.length + '/' + alumnosDelEquipo.length;
      } else {
        return '0/' + alumnosDelEquipo.length;
      }
    } else {
      return null
    }

  }

  RecuperarInscripcionesEquipoJuego() {
    console.log ('vamos por las inscripciones de equipos ' + this.juegoSeleccionado.id);
    this.peticionesAPI.DameInscripcionesEquipoJuegoDeVotacionUnoATodos(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.listaEquiposOrdenadaPorPuntos = inscripciones;
      // ordena la lista por puntos
      // tslint:disable-next-line:only-arrow-functions
      this.listaEquiposOrdenadaPorPuntos = this.listaEquiposOrdenadaPorPuntos.sort(function(obj1, obj2) {
        return obj2.puntosTotales - obj1.puntosTotales;
      });
      if (true) {
      //if (!this.juegoSeleccionado.VotanEquipos) {
        console.log ('Estas son las inscripciones ', this.listaEquiposOrdenadaPorPuntos);
        // preparo una lista con los alumnos que ya han votado
        this.alumnosQueYaHanVotado = [];
        this.equiposQueYaHanVotado = [];
        this.listaEquiposOrdenadaPorPuntos.forEach ( inscripcion => {
          if (inscripcion.Votos) {
            this.equiposQueYaHanVotado.push (inscripcion.equipoId);
            // tslint:disable-next-line:max-line-length
            const yaHanVotado = this.alumnosDelJuego.filter (alumno => inscripcion.Votos.some (voto => voto.alumnoId === alumno.id));
            console.log (yaHanVotado);
            this.alumnosQueYaHanVotado = this.alumnosQueYaHanVotado.concat (yaHanVotado);
          }
        });
      }
      this.TablaClasificacionTotal();
      console.log ('Alumnos que ya han votado ', this.alumnosQueYaHanVotado);
      console.log ('EQUIPOS QUE YA HAN VOTADO ', this.equiposQueYaHanVotado);
    });
  }

  RecuperarInscripcionesAlumnoJuego() {

    if(this.juegoSeleccionado.Tipo === "Juego De Votación Uno A Todos"){
      
      console.log ('vamos por las inscripciones ' + this.juegoSeleccionado.id);
      this.peticionesAPI.DameInscripcionesAlumnoJuegoDeVotacionUnoATodos(this.juegoSeleccionado.id)
      .subscribe(inscripciones => {
        this.listaAlumnosOrdenadaPorPuntos = inscripciones;
        this.listaAlumnosOrdenadaPorPuntos = this.listaAlumnosOrdenadaPorPuntos.sort(function(obj1, obj2) {
          return obj2.PuntosTotales - obj1.PuntosTotales;
        });
      this.TablaClasificacionTotal();
      });

    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Todos A Uno"){
      console.log ('vamos por las inscripciones ' + this.juegoSeleccionado.id);
      this.peticionesAPI.DameInscripcionesAlumnoJuegoDeVotacionTodosAUno(this.juegoSeleccionado.id)
      .subscribe(inscripciones => {
        this.listaAlumnosOrdenadaPorPuntosTodosAUno = inscripciones;
        this.TablaClasificacionTotal();
      });
    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Votar opciones"){
      
      console.log ('vamos por las inscripciones ' + this.juegoSeleccionado.id);
      this.peticionesAPI.DameInscripcionesAlumnoJuegoDeVotacionAOpciones(this.juegoSeleccionado.id)
      .subscribe(inscripciones => {
      this.alumnosInscritos = inscripciones;
      this.numeroParticipantes = this.alumnosInscritos.length;
      this.PrepararTabla();

    });
    }
    
  }

  PrepararTabla() {
    // preparamos la tabla para guardar los votos
    this.datos = [];
    let i;
    for (i = 0; i < this.juegoSeleccionado.Opciones.length; i++) {
      this.datos.push ({
        opcion:  this.juegoSeleccionado.Opciones[i],
        incremento: 0,
        puntos: 0
      });
    }
    this.alumnosInscritos.forEach (respuesta => {
      if (respuesta.Votos) {
        this.numeroRespuestas++;
        for (i = 0; i < respuesta.Votos.length; i++) {
          const index = this.datos.findIndex (entrada => entrada.opcion === respuesta.Votos[i].opcion );
          this.datos [index].puntos =  this.datos [index].puntos + respuesta.Votos[i].puntos ;
        }
      }
    });
    this.datos.sort((a, b) => b.puntos - a.puntos);
    this.dataSource = new MatTableDataSource(this.datos);

  }

  TablaClasificacionTotal() {

    if(this.juegoSeleccionado.Tipo === "Juego De Votación Uno A Todos"){

      if (this.juegoSeleccionado.Modo === 'Individual') {
        // tslint:disable-next-line:max-line-length
        this.rankingIndividualJuegoDeVotacionUnoATodos = this.calculos.PrepararTablaRankingIndividualVotacionUnoATodos (
          this.listaAlumnosOrdenadaPorPuntos,
          this.alumnosDelJuego);
        // tslint:disable-next-line:only-arrow-functions
        this.rankingIndividualJuegoDeVotacionUnoATodos = this.rankingIndividualJuegoDeVotacionUnoATodos.sort(function(obj1, obj2) {
          return obj2.puntos - obj1.puntos;
        });
        console.log (this.rankingIndividualJuegoDeVotacionUnoATodos);
        this.datasourceAlumno = new MatTableDataSource(this.rankingIndividualJuegoDeVotacionUnoATodos);
  
      } else {
          // tslint:disable-next-line:max-line-length
          this.rankingEquipoJuegoDeVotacionUnoATodos = this.calculos.PrepararTablaRankingEquipoVotacionUnoATodos (
            this.listaEquiposOrdenadaPorPuntos,
            this.equiposDelJuego);
          // tslint:disable-next-line:only-arrow-functions
          this.rankingEquipoJuegoDeVotacionUnoATodos = this.rankingEquipoJuegoDeVotacionUnoATodos.sort(function(obj1, obj2) {
            return obj2.puntos - obj1.puntos;
          });
   
          this.dataSourceEquipo = new MatTableDataSource(this.rankingEquipoJuegoDeVotacionUnoATodos);
  
      }
    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Todos A Uno"){
     
      if (this.juegoSeleccionado.Modo === 'Individual') {
    
        this.rankingIndividualJuegoDeVotacionTodosAUno = this.calculos.PrepararTablaRankingIndividualVotacionTodosAUno (
        this.listaAlumnosOrdenadaPorPuntosTodosAUno,
        this.alumnosDelJuego,
        this.juegoSeleccionado);
      
        this.rankingIndividualJuegoDeVotacionTodosAUno = this.rankingIndividualJuegoDeVotacionTodosAUno.sort(function(obj1, obj2) {
          return obj2.nota - obj1.nota;
        });
  
        console.log ('inscripciones');
        console.log (this.listaAlumnosOrdenadaPorPuntosTodosAUno);
        console.log ('ranking');
        console.log (this.rankingIndividualJuegoDeVotacionTodosAUno);
        this.datasourceAlumno = new MatTableDataSource(this.rankingIndividualJuegoDeVotacionTodosAUno);
  
      } else {
        console.log ('la modalidad en equipo aun no está operativa');
      }
    }

  }

  VotacionFinalizada() {
   
    if(this.juegoSeleccionado.Tipo === "Juego De Votación Uno A Todos"){
      
      if (this.juegoSeleccionado.Modo === 'Individual') {
        let cont = 0;
        this.rankingIndividualJuegoDeVotacionUnoATodos.forEach (al => {if (al.votado) { cont++; } });
        return (cont === this.rankingIndividualJuegoDeVotacionUnoATodos.length);
      } else if (this.juegoSeleccionado.VotanEquipos) {
        let cont = 0;
        this.rankingEquipoJuegoDeVotacionUnoATodos.forEach (eq => {if (eq.votado) { cont++; } });
        return (cont === this.rankingEquipoJuegoDeVotacionUnoATodos.length);
      } else {
        return (this.alumnosQueYaHanVotado.length === this.alumnosDelJuego.length);
      }
    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Todos A Uno"){
      return false;
    }

  }


  Desactivar() {
    Swal.fire({
      title: '¿Seguro que quieres desactivar el juego de votación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        
        if (this.juegoSeleccionado.Tipo === 'Juego De Votación Uno A Todos' ){

          if (this.juegoSeleccionado.Modo === 'Individual') {
            this.listaAlumnosOrdenadaPorPuntos.forEach (alumno => {
              alumno.PuntosTotales = this.rankingIndividualJuegoDeVotacionUnoATodos.filter (al => al.id === alumno.alumnoId)[0].puntos;
              this.peticionesAPI.ModificaInscripcionAlumnoJuegoDeVotacionUnoATodos (alumno).subscribe();
            });
          } else {
            this.listaEquiposOrdenadaPorPuntos.forEach (equipo => {
              equipo.puntosTotales = this.rankingEquipoJuegoDeVotacionUnoATodos.filter (eq => eq.id === equipo.equipoId)[0].puntos;
              this.peticionesAPI.ModificaInscripcionEquipoJuegoDeVotacionUnoATodos (equipo).subscribe();
            });
          }
  
          this.juegoSeleccionado.JuegoActivo = false;
          this.peticionesAPI.CambiaEstadoJuegoDeVotacionUnaATodos (this.juegoSeleccionado)
          .subscribe(res => {
              if (res !== undefined) {
                console.log(res);
                console.log('juego desactivado');
                Swal.fire('El juego se ha desactivado correctamente');
                this.location.back();
              }
          });  
        }else if (this.juegoSeleccionado.Tipo === 'Juego De Votación Todos A Uno'){
          
          this.listaAlumnosOrdenadaPorPuntos.forEach (alumno => {
            alumno.PuntosTotales = this.rankingIndividualJuegoDeVotacionTodosAUno.filter (al => al.id === alumno.alumnoId)[0].nota;
            console.log ('actualizo');
            console.log (alumno);
            //this.peticionesAPI.ModificaInscripcionAlumnoJuegoDeVotacionTodosAUno (alumno).subscribe();
          });
  
          this.juegoSeleccionado.JuegoActivo = false;
          this.peticionesAPI.CambiaEstadoJuegoDeVotacionTodosAUno (this.juegoSeleccionado)
          .subscribe(res => {
              if (res !== undefined) {
                console.log(res);
                console.log('juego desactivado');
                Swal.fire('El juego se ha desactivado correctamente');
                this.location.back();
              }
          });
        }else if (this.juegoSeleccionado.Tipo === 'Juego De Votación Votar opciones'){
          
          this.juegoSeleccionado.JuegoActivo = false;
          this.peticionesAPI.CambiaEstadoJuegoDeVotacionAOpciones (this.juegoSeleccionado)
          .subscribe(res => {
            if (res !== undefined) {
              console.log(res);
              console.log('juego desactivado');
              Swal.fire('El juego se ha desactivado correctamente');
              this.location.back();
            }
          });
        }
      }
    });
  }

  applyFilter(filterValue: string) {
    
    if(this.juegoSeleccionado.Tipo === "Juego De Votación Uno A Todos"){
      
      if (this.juegoSeleccionado.Modo === 'Individual') {
        this.datasourceAlumno.filter = filterValue.trim().toLowerCase();
      } else {
        this.dataSourceEquipo.filter = filterValue.trim().toLowerCase();
      }
    }else if(this.juegoSeleccionado.Tipo === "Juego De Votación Todos A Uno"){
      this.datasourceAlumno.filter = filterValue.trim().toLowerCase();
    }

    
  }

  async AlumnosDelEquipo(equipo: Equipo) {
    console.log(equipo);

    const res = await this.peticionesAPI.DameAlumnosEquipo (equipo.id).toPromise();
    if (res[0] !== undefined) {
        this.alumnosEquipo = res;
    } else {
      console.log('No hay alumnos en este equipo');
      // Informar al usuario
      this.alumnosEquipo = undefined;
    }
  }



}

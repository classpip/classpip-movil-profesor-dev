import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesAPIService, SesionService } from '../../services/index';
import { NavController  } from '@ionic/angular';
import { CuestionarioSatisfaccion, Alumno, AlumnoJuegoDeCuestionarioSatisfaccion } from '../../clases';
import {MatStepper} from '@angular/material';
import { IonSlides } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-juego-cuestionario-satisfaccion',
  templateUrl: './juego-cuestionario-satisfaccion.page.html',
  styleUrls: ['./juego-cuestionario-satisfaccion.page.scss'],
})
export class JuegoCuestionarioSatisfaccionPage implements OnInit {
  disablePrevBtn = true;
  disableNextBtn = false;

  juegoSeleccionado: any;
  inscripciones: AlumnoJuegoDeCuestionarioSatisfaccion[];
  respuestasAfirmaciones: number[];
  respuestasPreguntasAbiertas: string [][];
  cuestionario: CuestionarioSatisfaccion;
  numeroRespuestas: number;
  informacionPreparada = false;
  afirmaciones: any[];
  datosGrafico: any[];
  alumnosDelJuego: Alumno[];
  grafico;

  @ViewChild(MatStepper, { static: false }) stepper: MatStepper;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;


  constructor(
    public navCtrl: NavController,
    private sesion: SesionService,
    private peticionesAPI: PeticionesAPIService,
    private location: Location
  ) {}


  ngOnInit() {
  

    this.juegoSeleccionado = this.sesion.DameJuego();
    this.peticionesAPI.DameCuestionarioSatisfaccion (this.juegoSeleccionado.cuestionarioSatisfaccionId)
    .subscribe (cuestionario => {
      this.cuestionario = cuestionario;
      this.RecuperarInscripcionesAlumnoJuego();
    });

  }

  RecuperarInscripcionesAlumnoJuego() {
    this.peticionesAPI.DameInscripcionesAlumnoJuegoDeCuestionarioSatisfaccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripciones = inscripciones;
      // tslint:disable-next-line:only-arrow-functions
      this.PreparaInformacion();
      this.informacionPreparada = true;
    });
  }

  PreparaInformacion() {
    this.numeroRespuestas = 0;
    this.respuestasAfirmaciones = Array(this.cuestionario.Afirmaciones.length).fill (0);
    this.respuestasPreguntasAbiertas = Array(this.cuestionario.PreguntasAbiertas.length);
    let i: number;
    for ( i = 0; i < this.respuestasPreguntasAbiertas.length; i++) {
      this.respuestasPreguntasAbiertas[i] = [];
    }
    this.inscripciones.forEach (inscripcion => {
      if (inscripcion.Contestado) {
        this.numeroRespuestas++;
        for ( i = 0; i < this.respuestasAfirmaciones.length; i++) {
          this.respuestasAfirmaciones[i] =  this.respuestasAfirmaciones[i]  + inscripcion.RespuestasAfirmaciones[i];
        }
        for ( i = 0; i < this.respuestasPreguntasAbiertas.length; i++) {
          this.respuestasPreguntasAbiertas[i].push (inscripcion.RespuestasPreguntasAbiertas[i]);
        }
      }
    });
    this.afirmaciones = [];
  }

  doCheck() {
    // Para decidir si hay que mostrar los botones de previo o siguiente slide
    const prom1 = this.slides.isBeginning();
    const prom2 = this.slides.isEnd();
  
    Promise.all([prom1, prom2]).then((data) => {
      data[0] ? this.disablePrevBtn = true : this.disablePrevBtn = false;
      data[1] ? this.disableNextBtn = true : this.disableNextBtn = false;
    });
  }


  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  DesactivarJuego() {
    Swal.fire({
      title: '¿Seguro que quieres desactivar el juego?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {

        this.juegoSeleccionado.JuegoActivo = false;
        this.peticionesAPI.CambiaEstadoJuegoDeCuestionarioSatisfaccion (this.juegoSeleccionado)
        .subscribe(res => {
            if (res !== undefined) {
              console.log(res);
              console.log('juego desactivado');
              Swal.fire('El juego se ha desactivado correctamente');
              this.location.back();
            }
        });
      }
    });
  }
}

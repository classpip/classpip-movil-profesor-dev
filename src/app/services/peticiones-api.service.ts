import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType, Http} from '@angular/http';
import {
  Profesor, Grupo, Alumno, Matricula, Juego, Punto, Nivel, AlumnoJuegoDePuntos,
  Equipo, AsignacionEquipo, AsignacionPuntosJuego, EquipoJuegoDePuntos, Coleccion,
  AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion, Cromo, HistorialPuntosAlumno, HistorialPuntosEquipo,
  Album, AlbumEquipo, Insignia, AlumnoJuegoDeCompeticionLiga, EquipoJuegoDeCompeticionLiga, Jornada, EnfrentamientoLiga,
  AlumnoJuegoDeCompeticionFormulaUno, EquipoJuegoDeCompeticionFormulaUno, AlumnoJuegoDeGeocaching, Escenario,
  MiAlumnoAMostrarJuegoDeGeocaching,
  PuntoGeolocalizable, AlumnoJuegoDeAvatar, FamiliaAvatares, JuegoDeVotacionUnoATodos, AlumnoJuegoDeVotacionUnoATodos,
  Rubrica, JuegoDeVotacionTodosAUno, AlumnoJuegoDeVotacionTodosAUno, JuegoDeCuestionarioSatisfaccion, AlumnoJuegoDeCuestionarioSatisfaccion,
  CuestionarioSatisfaccion, JuegoDeEncuestaRapida, JuegoDeCuestionarioRapido, SesionClase, AsistenciaClase, JuegoDeCogerTurnoRapido, JuegoDeVotacionRapida,
  JuegoDeControlDeTrabajoEnEquipo, AlumnoJuegoDeControlDeTrabajoEnEquipo
  
} from '../clases';

import{EquipoJuegoDeVotacionUnoATodos} from 'src/app/clases/EquipoJuegoDeVotacionUnoATodos';
import { AlumnoJuegoDeCuestionario } from '../clases/AlumnoJuegoDeCuestionario';
import { Cuestionario } from '../clases/Cuestionario';
import { Pregunta } from '../clases/Pregunta';
import { AlumnoJuegoDeEvaluacion } from '../clases/AlumnoJuegoDeEvaluacion';
import { EquipoJuegoDeEvaluacion } from '../clases/EquipoJuegoDeEvaluacion';
import {JuegoDeEvaluacion} from '../clases/JuegoDeEvaluacion';
import { RespuestaJuegoDeCuestionario } from '../clases/RespuestaJuegoDeCuestionario';
import * as URL from '../URLs/urls';
import { EnfrentamientoTorneo } from '../clases/EnfrentamientoTorneo';
import { AlumnoJuegoDeCompeticionTorneo } from '../clases/AlumnoJuegoDeCompeticionTorneo';
import { AlumnoJuegoDeVotacionAOpciones } from 'src/app/clases/AlumnoJuegoDeVotacionAOpciones'
import { JuegoDeVotacionAOpciones } from 'src/app/clases/JuegoDeVotacionAOpciones'
@Injectable({
  providedIn: 'root'
})

export class PeticionesAPIService {

  // private base = 'http://localhost:';

  // private base = 'http://147.83.118.92:';
  // private base = 'http://192.168.1.35:';

  private base = URL.host;
  // private base = 'http://192.168.1.143:';
    // private base = 'http://192.168.1.45:';


   
  private APIUrlProfesores = this.base + '3000/api/Profesores';
  private APIURLEquiposJuegoEvaluado = this.base + '3000/api/equiposJuegoDeEvaluacion';
  private APIURLAlumnoJuegoEvaluado = this.base + '3000/api/alumnosJuegoDeEvaluacion';
  private APIUrlAlumnos = this.base +  '3000/api/Alumnos';
  private APIURLJuegoDeEvaluacion = this.base + '3000/api/juegosDeEvaluacion';
  private APIUrlGrupos = this.base + '3000/api/Grupos';
  private APIURLRubricas = this.base + '3000/api/Rubricas';
  private APIUrlMatriculas = this.base + '3000/api/Matriculas';
  private APIRUrlJuegoDePuntos = this.base + '3000/api/JuegosDePuntos';
  private APIUrlLogoEquipo = this.base + '3000/api/imagenes/LogosEquipos/download/';
  private APIUrlEquipos = this.base + '3000/api/Equipos';
  private APIUrlLogosEquipos = this.base + '3000/api/imagenes/LogosEquipos';
  private APIUrlPuntosJuego = this.base + '3000/api/AsignacionPuntosJuego';
  private APIUrlImagenNivel = this.base + '3000/api/imagenes/imagenNivel';
  private APIURLImagenInsignia = this.base + '3000/api/imagenes/ImagenInsignia';

  private APIUrlAlumnoJuegoDePuntos = this.base + '3000/api/AlumnoJuegosDePuntos';
  private APIUrlEquipoJuegoDePuntos = this.base + '3000/api/EquiposJuegosDePuntos';

  private APIUrlAlumnoJuegoDeColeccion = this.base + '3000/api/AlumnosJuegoDeColeccion';
  private APIUrlEquipoJuegoDeColeccion = this.base + '3000/api/EquiposJuegoDeColeccion';

  private APIRUrlJuegoDeCompeticionLiga = this.base + '3000/api/JuegoDeCompeticionLiga';
  private APIUrlAlumnoJuegoDeCompeticionLiga = this.base + '3000/api/AlumnosJuegoDeCompeticionLiga';
  private APIUrlAlumnoJuegoDeCompeticionTorneo = this.base + '3000/api/AlumnosJuegoDeCompeticionLiga';
  private APIUrlJornadasJuegoDeCompeticionLiga = this.base + '3000/api/JornadasDeCompeticionLiga';
  private APIUrlJornadasJuegoDeCompeticionTorneo = this.base + '3000/api/JornadasDeCompeticionTorneo';
  private APIUrlEnfrentamientosTorneo = this.base + '3000/api/EnfrentamientosTorneo';
  
  private APIUrlJuegoDeCompeticionLiga = this.base + '3000/api/JuegosDeCompeticionLiga';
  private APIUrlJuegoDeCompeticionTorneo = this.base + '3000/api/JuegosDeCompeticionTorneo';
  private APIUrlEquipoJuegoDeCompeticionLiga = this.base + '3000/api/EquiposJuegoDeCompeticionLiga';

  private APIUrlJuegoDeCompeticionFormulaUno = this.base + '3000/api/JuegosDecompeticionFormulaUno';
  private APIUrlAlumnoJuegoDeCompeticionFormulaUno = this.base + '3000/api/AlumnosJuegoDeCompeticionFormulaUno';
  private APIUrlEquipoJuegoDeCompeticionFormulaUno = this.base + '3000/api/EquiposJuegoDeCompeticionFormulaUno';
  private APIUrlJornadasJuegoDeCompeticionFormulaUno = this.base + '3000/api/JornadasDeCompeticionFormulaUno';

  private APIUrlColecciones = this.base + '3000/api/Colecciones';
  private APIUrlImagenColeccion = this.base + '3000/api/imagenes/ImagenColeccion';
  private APIUrlImagenCromo = this.base + '3000/api/imagenes/ImagenCromo';
  private APIUrlHistorialPuntosAlumno = this.base + '3000/api/HistorialesPuntosAlumno';


  private APIUrlEquiposJuegoDePuntos = this.base + '3000/api/EquiposJuegosDePuntos';
  private APIUrlHistorialPuntosEquipo = this.base + '3000/api/HistorialesPuntosEquipo';


  private APIRUrlJuegoDeColeccion = this.base + '3000/api/JuegosDeColeccion';
  private APIRUrlColecciones = this.base + '3000/api/Colecciones';
  private APIRUrlAlbum = this.base + '3000/api/Albumes';
  private APIRUrlAlbumEquipo = this.base + '3000/api/albumsEquipo';

  private APIUrlJuegoDeCuestionario = this.base + '3000/api/JuegosDeCuestionario';
  private APIUrlAlumnoJuegoDeCuestionario = this.base + '3000/api/AlumnosJuegoDeCuestionario';
  private APIUrlCuestionario = this.base + '3000/api/Cuestionarios';
  private APIUrlRespuestasJuegoDeCuestionario = this.base + '3000/api/respuestasJuegoDeCuestionario';

  private APIUrlJuegoDeGeocaching = this.base + '3000/api/JuegosDeGeocaching';
  private APIUrlAlumnoJuegoDeGeocaching = this.base + '3000/api/AlumnosJuegoDeGeocaching';
  private APIUrlEscenarios = this.base + '3000/api/Escenarios';
  private APIUrlPreguntas = this.base + '3000/api/Preguntas';





  private APIUrlImagenesAvatares =  this.base + '3000/api/imagenes/ImagenesAvatares';
  private APIUrlJuegoDeAvatar = this.base + '3000/api/juegosDeAvatar';
  private APIUrlAlumnoJuegoDeAvatar = this.base + '3000/api/alumnosJuegoAvatar';
  private APIUrlFamiliarAvatares = this.base + '3000/api/familiasAvatares';
  private APIUrlAudiosAvatares = this.base + '3000/api/imagenes/AudiosAvatares';
  private APIUrlAlumnoJuegoDeVotacionUnoATodos = this.base + '3000/api/alumnosJuegoDeVotacionUnoATodos';
  private APIUrlJuegoDeVotacionUnoATodos = this.base + '3000/api/juegosDeVotacionUnoATodos';

  private APIUrlAlumnoJuegoDeVotacionTodosAUno = this.base + '3000/api/alumnosJuegoDeVotacionTodosAUno';
  private APIUrlJuegoDeVotacionTodosAUno = this.base + '3000/api/juegosDeVotacionTodosAUno';

  private APIUrlAlumnoJuegoDeCuestionarioSatisfaccion = this.base + '3000/api/alumnosJuegoDeCuestionarioSatisfaccion';
  private APIUrlCuestionarioSatisfaccion = this.base + '3000/api/cuestionariosSatisfaccion';
  private APIUrlImagenesPerfil = this.base + '3000/api/imagenes/ImagenesPerfil';
  private APIUrlJuegoDeEncuestaRapida =  this.base + '3000/api/juegosDeEncuestaRapida';
  private APIUrlJuegoDeVotacionRapida = this.base + '3000/api/juegosDeVotacionRapida';
  private APIUrlJuegoDeCuestionarioRapido = this.base + '3000/api/juegosDeCuestionarioRapido';

  private APIUrlJuegoDeCogerTurnoRapido = this.base + '3000/api/juegosDeCogerTurnoRapido';

  private APIUrlCuestionarios = this.base + '3000/api/Cuestionarios';
  private APIUrlCuestionariosSatisfaccion = this.base + '3000/api/cuestionariosSatisfaccion';
  private APIUrlAsistenciasClase = this.base + '3000/api/AsistenciasClase';
  private APIUrlSesionesClase = this.base + '3000/api/SesionesClase';
  private APIUrlEnfrentamientosLiga = this.base + '3000/api/EnfrentamientosLiga';

  private APIUrlAlumnoJuegoDeControlDeTrabajoEnEquipo = this.base + '3000/api/alumnosJuegoDeControlDeTrabajoEnEquipo';
  private APIUrlJuegoDeControlDeTrabajoEnEquipo = this.base + '3000/api/juegosDeControlDeTrabajoEnEquipo';
  private APIUrlEquipoJuegoDeVotacionUnoATodos  = this.base + '3000/api/equipoJuegosDeVotacionUnoATodos';
  private APIUrlAlumnoJuegoDeVotacionAOpciones = this.base + '3000/api/juegosDeVotacionAOpciones';

  constructor(
    private http: HttpClient,
    private httpImagenes: Http
  ) { }

  public DameImagenColeccion(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenColeccion + '/download/' + imagen,
      { responseType: ResponseContentType.Blob });
  }


  // FUNCIÓN TEMPORAL DE AUTENTIFICAR (PARA SIMPLIFICAR AHORA)
  public DameProfesor(username: string, password: string): Observable<Profesor> {

    return this.http.get<Profesor>(this.APIUrlProfesores + '?filter[where][NombreUsuario]=' + username + '&filter[where][Password]=' + password);
  }

  public DameEquiposJuegoDeEvaluacion(juegoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIURLJuegoDeEvaluacion + '/' + juegoId + '/Equipos');
  }
  
  public DameRelacionEquiposJuegoDeEvaluacion(juegoId: number): Observable<EquipoJuegoDeEvaluacion[]> {
    return this.http.get<EquipoJuegoDeEvaluacion[]>(this.APIURLEquiposJuegoEvaluado + '?filter[where][juegoDeEvaluacionId]=' + juegoId);
  }
  
  public EnviarRespuestaEquiposJuegoDeEvaluacion(relacionId: number, respuesta: any): Observable<EquipoJuegoDeEvaluacion> {
    return this.http.patch<EquipoJuegoDeEvaluacion>(this.APIURLEquiposJuegoEvaluado + '/' + relacionId, respuesta);
  }
  public BorrarAlumnoJuegoDeEvaluacion(alumnoJuegoDeEvaluacionId: number): Observable<AlumnoJuegoDeEvaluacion> {
    return this.http.delete<AlumnoJuegoDeEvaluacion>(this.APIURLAlumnoJuegoEvaluado + '/' + alumnoJuegoDeEvaluacionId);
  }
  public BorrarEquipoJuegoDeEvaluacion(equipoJuegoDeEvaluacionId: number): Observable<EquipoJuegoDeEvaluacion> {
    return this.http.delete<EquipoJuegoDeEvaluacion>(this.APIURLEquiposJuegoEvaluado + '/' + equipoJuegoDeEvaluacionId);
  }

  public BorrarJuegoDeEvaluacion(juegoId: number): Observable<JuegoDeEvaluacion> {
    return this.http.delete<JuegoDeEvaluacion>(this.APIURLJuegoDeEvaluacion + '/' + juegoId);
  }


  public EnviarRespuestaAlumnosJuegoDeEvaluacion(relacionId: number, respuesta: any): Observable<AlumnoJuegoDeEvaluacion> {
    return this.http.patch<AlumnoJuegoDeEvaluacion>(this.APIURLAlumnoJuegoEvaluado + '/' + relacionId, respuesta);
  }

  public PonNotaFinalAlumnoJuegoDeEvaluacion(alumnoJuegoDeEvaluacion: AlumnoJuegoDeEvaluacion): Observable<AlumnoJuegoDeEvaluacion> {
    return this.http.put<AlumnoJuegoDeEvaluacion>(this.APIURLAlumnoJuegoEvaluado + '/' + alumnoJuegoDeEvaluacion.id, alumnoJuegoDeEvaluacion);
  }

  public PonNotaFinalEquipoJuegoDeEvaluacion(equipoJuegoDeEvaluacion: EquipoJuegoDeEvaluacion): Observable<EquipoJuegoDeEvaluacion> {
    return this.http.put<EquipoJuegoDeEvaluacion>(this.APIURLEquiposJuegoEvaluado + '/' + equipoJuegoDeEvaluacion.id, equipoJuegoDeEvaluacion);
  }

  public CambiaEstadoJuegoDeEvaluacion(juego: JuegoDeEvaluacion): Observable<JuegoDeEvaluacion> {
    return this.http.put<JuegoDeEvaluacion>(this.APIURLJuegoDeEvaluacion + '/' + juego.id , juego);
  }

  public DameProfesorPorIdentificador(identificador: string): Observable<Profesor> {
    return this.http.get<Profesor>(this.APIUrlProfesores + '?filter[where][Identificador]=' + identificador);
  }

  public ModificarJornada(JornadaNueva: Jornada, JornadaId: number): Observable<Jornada> {
    return this.http.patch<Jornada>(this.APIUrlJornadasJuegoDeCompeticionLiga + '/' + JornadaId, JornadaNueva);
  }

  public ModificarJornadaTorneo(JornadaNueva: Jornada, JornadaId: number): Observable<Jornada> {
    return this.http.patch<Jornada>(this.APIUrlJornadasJuegoDeCompeticionTorneo + '/' + JornadaId, JornadaNueva);
  }

  public ModificarJornadaFormulaUno(JornadaNueva: Jornada, JornadaId: number): Observable<Jornada> {
    return this.http.patch<Jornada>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '/' + JornadaId, JornadaNueva);
  }


  public DameAlumno(nombreUsuario: string, password: string): Observable<Alumno> {

    return this.http.get<Alumno>(this.APIUrlAlumnos + '?filter[where][Username]=' + nombreUsuario
      + '&filter[where][Password]=' + password);
  }

  public DameAlumnoEmail(nombreAlumno: string): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '?filter[where][Username]=' + nombreAlumno );
  }

  public DameTodosLosAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlAlumnos);
  }

  public DameAlumnosJuegoDeEvaluacion(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIURLJuegoDeEvaluacion + '/' + juegoId + '/Alumnos');
  }

  public DameTodosLosProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.APIUrlProfesores);
  }

  public CreaAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrlAlumnos, alumno);
  }

  public CambiaEstadoJuegoDeCompeticionLiga(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlJuegoDeCompeticionLiga + '/' + juego.id , juego);
  }

  public CambiaEstadoJuegoDeCompeticionTorneo(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlJornadasJuegoDeCompeticionTorneo + '/' + juego.id , juego);
  }

  public CambiaEstadoJuegoDeCompeticionFormulaUno(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juego.id , juego);
  }

  
  public DameContrasenaProfesor(nombre: string): Observable<Profesor> {
    return this.http.get<Profesor>(this.APIUrlProfesores + '?filter[where][NombreUsuario]=' + nombre );
  }

  public DameRelacionAlumnosJuegoDeEvaluacion(juegoId: number): Observable<AlumnoJuegoDeEvaluacion[]> {
    return this.http.get<AlumnoJuegoDeEvaluacion[]>(this.APIURLAlumnoJuegoEvaluado + '?filter[where][juegoDeEvaluacionId]=' + juegoId);
  }


  public DameAlumnoAsignacion(nombre: string[]): Observable<Alumno> {
    console.log('Entro a mostrar a ' + nombre[0] + nombre[1]);
    // tslint:disable-next-line:max-line-length
    return this.http.get<Alumno>(this.APIUrlAlumnos + '?filter[where][Nombre]=' + nombre[0] + '&filter[where][PrimerApellido]=' + nombre[1]);
  }

  public DameGrupo(grupoId: number): Observable<Grupo> {
    return this.http.get<Grupo>(this.APIUrlGrupos + '/' + grupoId);
  }


  // NOS DEVUELVE UN ARRAY CON LOS GRUPOS DEL PROFESOR
  public DameGruposProfesor(profesorId: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.APIUrlProfesores + '/' + profesorId + '/grupos');
  }

  // NOS DEVUELVE UN ARRAY CON LOS GRUPOS DEL ALUMNO
  public DameGruposAlumno(alumnoId: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.APIUrlAlumnos + '/' + alumnoId + '/grupos');
  }

  // NOS DEVUELVE LOS ALUMNOS DEL GRUPO CUYO IDENTIFICADOR PASAMOS COMO PARÁMETRO
  public DameAlumnosGrupo(grupoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlGrupos + '/' + grupoId + '/alumnos');
  }

  // OBTENEMOS LA MATRICULA DE UN ALUMNO EN UN GRUPO NUEVO
  public DameMatriculasGrupo(grupoId: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.APIUrlMatriculas + '?filter[where][grupoId]=' + grupoId);
  }


  // BORRAMOS LA MATRICULA DEL ALUMNO EN EL GRUPO
  public BorraMatricula(matriculaId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlMatriculas + '/' + matriculaId);
  }

  public BorraGrupo(profesorId: number, grupoId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/grupos/' + grupoId);
  }

  // Devuelve los juegos de puntos del Alumno
  public DameJuegoDePuntosAlumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegoDePuntos');
  }

  // Obtenemos la imagen del nivel deseado
  public DameImagenNivel(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenNivel + '/download/' + imagen,
        { responseType: ResponseContentType.Blob });
  }

  // Devuelve los juego de colecciones del Alumno
  public DameJuegoDeColeccionesAlumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegoDeColeccions');
  }

  public DameJuegoDeCompeticionF1Alumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegosDeCompeticionFormulaUno');
  }

  // Devuelve los equipos a los que pertenece un alumno
  public DameEquiposDelAlumno(alumnoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlAlumnos + '/' + alumnoId + '/equipos');
  }

  // DEVUELVE LOS JUEGOS DE PUNTOS DEL GRUPO QUE PASAMOS COMO PARÁMETRO
  public DameJuegoDePuntosEquipo(equipoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlEquipos + '/' + equipoId + '/juegoDePuntos');
  }

  // OBTENEMOS LOS JUEGO DE COLECCIÓN DEL GRUPO
  public DameJuegoDeColeccionEquipo(equipoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlEquipos + '/' + equipoId + '/juegoDeColeccions');
  }

  // OBTENEMOS LOS JUEGO DE COMPETICIÓN DEL GRUPO
  public DameJuegoDeCompeticionGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions');
  }

  public DameJuegoDeCompeticionF1Equipo(equipoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlEquipos + '/' + equipoId + '/juegosDeCompeticionFormulaUno');
  }

  public DameJuegoDeCompeticionLigaEquipo(equipoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlEquipos + '/' + equipoId + '/juegosDeCompeticionLiga');
  }

  // OBTENEMOS LOS PUNTOS QUE FORMAN PARTE DEL JUEGO DE PUNTOS
  public DamePuntosJuegoDePuntos(juegoDePuntosId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIRUrlJuegoDePuntos + '/' + juegoDePuntosId + '/puntos');
  }

  // OBTENEMOS LOS NIVELES QUE FORMAN PARTE DEL JUEGO DE PUNTOS
  public DameNivelesJuegoDePuntos(juegoDePuntosId: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.APIRUrlJuegoDePuntos + '/' + juegoDePuntosId + '/nivels');
  }

  // OBTENEMOS LOS ALUMNOS QUE FORMAN PARTE DEL JUEGO DE PUNTOS
  public DameAlumnosJuegoDePuntos(juegoDePuntosId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIRUrlJuegoDePuntos + '/' + juegoDePuntosId + '/alumnos');
  }


  // OBTENEMOS LA INSCRIPCIÓN ESPECÍFICA DE UN ALUMNO CONCRETO EN UN JUEGO DE PUNTOS CONCRETO.
  public DameInscripcionAlumnoJuegoDePuntos(alumnoId: number, juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    console.log('voy a por los puntos');
    return this.http.get<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuegoDePuntos + '?filter[where][alumnoId]=' + alumnoId
      + '&filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  // NOS DEVUELVE LAS INCRIPCIONES DE TODOS LOS ALUMNOS DE UN JUEGO DE PUNTOS
  public DameInscripcionesAlumnoJuegoDePuntos(juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos[]> {
    return this.http.get<AlumnoJuegoDePuntos[]>(this.APIUrlAlumnoJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  public DameInscripcionesEquipoJuegoDePuntos(juegoDePuntosId: number): Observable<EquipoJuegoDePuntos[]> {
    return this.http.get<EquipoJuegoDePuntos[]>(this.APIUrlEquipoJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }


  // Devuelve el equipo de un alumno en un Juego de Puntos en concreto
  public DameEquipoAlumnoJuegoDePuntos(alumnoJuegoDePuntosId: number): Observable<Equipo> {
    return this.http.get<Equipo>(this.APIUrlAlumnoJuegoDePuntos + '/' + alumnoJuegoDePuntosId + '/alumno/equipos');
  }

  // Devuelve el equipo de un alumno en un Juego de Puntos en concreto
  public DameEquipoAlumnoJuegoDeColeccion(alumnoJuegoDeColeccionId: number): Observable<Equipo> {
    return this.http.get<Equipo>(this.APIUrlAlumnoJuegoDeColeccion + '/' + alumnoJuegoDeColeccionId + '/alumno/equipos');
  }


  // PERMITE CREAR UN GRUPO AL PROFESOR. DEVOLVEMOS UN OBSERVABLE GRUPO PARA SABER EL IDENTIFICADOR DEL GRUPO QUE ACABAMOS
  // DE CREAR POR SI DECIDIMOS TIRAR UN PASO HACIA ATRÁS EN EL MOMENTO DE CREAR Y MODIFICAR EL NOMBRE O LA DESCRIPCIÓN
  public CreaGrupo(grupo: Grupo, profesorId: number): Observable<Grupo> {
    return this.http.post<Grupo>(this.APIUrlProfesores + '/' + profesorId + '/grupos', grupo);
  }
  // CUANDO EDITAMOS UN GRUPO LE PASAMOS EL NUEVO MODELO DEL GRUPO, EL IDENTIFICADOR DEL PROFESOR Y EL GRUPO EN CONCRETO
  // QUE QUEREMOS EDITAR
  public ModificaGrupo(grupo: Grupo, profesorId: number, grupoId: number): Observable<Grupo> {
    return this.http.put<Grupo>(this.APIUrlProfesores + '/' + profesorId + '/grupos/' + grupoId, grupo);
  }

  // BUSCA SI HAY ALGUN ALUMNO EN LA BASE DE DATOS CON ESE NOMBRE Y APELLIDOS
  public DameAlumnoConcreto(alumno: Alumno, ProfesorId: number): Observable<Alumno> {
    console.log('Entro a buscar a ' + alumno.Nombre + ' ' + alumno.PrimerApellido + ' ' + alumno.SegundoApellido);
    return this.http.get<Alumno>(this.APIUrlProfesores + '/' + ProfesorId + '/alumnos?filter[where][Nombre]=' + alumno.Nombre +
      '&filter[where][PrimerApellido]=' + alumno.PrimerApellido + '&filter[where][SegundoApellido]=' + alumno.SegundoApellido);
  }

  // MATRICULAMOS A UN ALUMNO EN UN GRUPO NUEVO
  public MatriculaAlumnoEnGrupo(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.APIUrlMatriculas, matricula);
  }

  // ASIGNAR ALUMNOS A UN PROFESOR
  public AsignaAlumnoAlProfesor(alumno: Alumno, profesorId: number): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrlProfesores + '/' + profesorId + '/alumnos', alumno);
  }

  // OBTENEMOS LA MATRICULA CONCRETA DE UN ALUMNO EN UN GRUPO
  public DameMatriculaAlumno(alumnoId: number, grupoId: number): Observable<Matricula> {
    return this.http.get<Matricula>(this.APIUrlMatriculas + '?filter[where][grupoId]=' + grupoId + '&filter[where][alumnoId]=' + alumnoId);
  }


  // OBTENEMOS LOS EQUIPOS DEL GRUPO
  public DameEquiposDelGrupo(grupoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlGrupos + '/' + grupoId + '/equipos');
  }

  // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera

  // public DameLogoEquipo(FotoEquipo: string): Observable<any> {
  //   return this.http.get(this.APIUrlLogoEquipo + FotoEquipo,
  //      { responseType: ResponseContentType.ArrayBuffer });
  // }

  // OBTENEMOS LOS ALUMNOS QUE PERTENECEN A UN EQUIPO
  public DameAlumnosEquipo(equipoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlEquipos + '/' + equipoId + '/alumnos');
  }

  public ModificaJuegoDeCompeticionFormulaUno(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.patch<Juego>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + grupoId, juego);
  }
  
  // ELIMINAMOS UN EQUIPO EN CONCRETO DEL GRUPO
  public BorraEquipoDelGrupo(equipo: Equipo): Observable<any> {
    return this.http.delete<any>(this.APIUrlGrupos + '/' + equipo.grupoId + '/equipos/' + equipo.id);
  }

  // DEVUELVE UN ARRAY CON LAS ASIGNACIONES DE UN EQUIPO CONCRETO
  public DameAsignacionesDelEquipo(equipo: Equipo): Observable<AsignacionEquipo[]> {
    console.log('Entro a buscar');
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + equipo.grupoId + '/asignacionEquipos?filter[where][equipoId]='
      + equipo.id);
  }

  // BUSCA Y ELIMINA A UN ALUMNO DE UN EQUIPO (BORRA ASIGNACIONEQUIPO)
  public BorraAlumnoEquipo(asignacionEquipo: AsignacionEquipo): Observable<any> {
    return this.http.delete<any>(this.APIUrlGrupos + '/' + asignacionEquipo.grupoId + '/asignacionEquipos/'
      + asignacionEquipo.id);
  }

  // CREAMOS UN NUEVO EQUIPO DENTRO DEL GRUPO
  public CreaEquipo(equipo: Equipo, grupoId: number): Observable<Equipo> {
    return this.http.post<Equipo>(this.APIUrlGrupos + '/' + grupoId + '/equipos', equipo);
  }
  // PONEMOS UN LOGO AL EQUIPO
  public PonLogoEquipo(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlLogosEquipos + '/upload', formData);
  }


  public BorraLogoEquipo(logo: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlLogosEquipos + '/files/' + logo);
  }


  // SE USA PARA EDITAR UN EQUIPO
  public ModificaEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(this.APIUrlEquipos + '/' + equipo.id, equipo);
  }

  // RECUPERAMOS LAS ASIGNACIONES (COMO LA INSCRIPCIÓN DEL ALUMNO AL EQUIPO) DE UN GRUPO DETERMINADO
  public DameAsignacionesEquipoDelGrupo(grupoId: number): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos');
  }

  // DEVUELVE LA ASIGNACIÓN CONCRETA DE UN ALUMNO EN UN EQUIPO
  public DameAsignacionEquipoAlumno(alumnoId: number, equipoId: number, grupoId: number): Observable<AsignacionEquipo> {
    return this.http.get<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos?filter[where][equipoId]=' + equipoId +
      '&filter[where][alumnoId]=' + alumnoId);
  }

  // EDITA UNA ASIGNACIÓN DE UN ALUMNO EN UN EQUIPO. SE PUEDE UTILIZAR PARA MOVER ALUMNOS DE EQUIPO.
  public ModificaAsignacionEquipoAlumno(asignacionEquipo: AsignacionEquipo, grupoId: number, asignacionEquipoId: number):
    Observable<AsignacionEquipo> {
    return this.http.put<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos/' +
      asignacionEquipoId, asignacionEquipo);
  }


  // ASIGNAR ALUMNO A UN EQUIPO
  public PonAlumnoEquipo(asignacionEquipos: AsignacionEquipo, grupoId: number): Observable<AsignacionEquipo> {
    return this.http.post<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos', asignacionEquipos);
  }

  // CREA UN NUEVO JUEGO DE PUNTOS
  public CreaJuegoDePuntos(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos', juego);
  }

  // CREAMOS UN NUEVO JUEGO DE COLECCIÓN EN EL GRUPO
  public CreaJuegoDeColeccion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions', juego);
  }

  // DEVUELVE LOS TIPOS DE PUNTOS CREADOS POR EL PROFESOR
  public DameTiposDePuntos(profesorId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIUrlProfesores + '/' + profesorId + '/puntos');
  }

  // SELECCIONAMOS LOS PUNTOS QUE FORMARÁN PARTE DEL JUEGO
  public AsignaPuntoJuego(asignacionPuntoJuego: AsignacionPuntosJuego) {
    return this.http.post<AsignacionPuntosJuego>(this.APIUrlPuntosJuego, asignacionPuntoJuego);
  }


  // CREAMOS NIVELES PARA UN JUEGO DE PUNTOS DETERMINADO
  public CreaNivel(nivel: Nivel, juegoDePuntosId: number) {
    return this.http.post<Nivel>(this.APIRUrlJuegoDePuntos + '/' + juegoDePuntosId + '/nivels', nivel);
  }


  // ASIGNAMOS FOTOS A UN NIVEL (ES OPCIONAL)
  public PonImagenNivel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenNivel + '/upload', formData);
  }


  // OBTENEMOS UN ARRAY CON LAS COLECCIONES DEL PROFESOR
  public DameColeccionesDelProfesor(profesorId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrlProfesores + '/' + profesorId + '/coleccions');
  }





  // EDITAMOS UN JUEGO DE COLECCIÓN. EL JUEGO YA FUE CREADO. AHORA LO COMPLETAMOS ASIGNANDOLE
  // LA COLECCION (POR ESO ES UN PUT)
  public CompletaJuegoDeColeccion(juego: Juego, grupoId: number, juegoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoId, juego);
  }

  // INSCRIBIMOS AL ALUMNO EN EL JUEGO DE COLECCIÓN
  public InscribeAlumnoJuegoDeColeccion(alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion) {
    return this.http.post<AlumnoJuegoDeColeccion>(this.APIUrlAlumnoJuegoDeColeccion, alumnoJuegoDeColeccion);
  }

  // INCRIBIMOS AL EQUIPO EN EL JUEGO DE COLECCIÓN
  public InscribeEquipoJuegoDeColeccion(equipoJuegoDeColeccion: EquipoJuegoDeColeccion) {
    return this.http.post<EquipoJuegoDeColeccion>(this.APIUrlEquipoJuegoDeColeccion, equipoJuegoDeColeccion);
  }

  // OBTENEMOS UN ARRAY DE CROMOS DE LA COLECCIÓN
  public DameCromosColeccion(coleccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIUrlColecciones + '/' + coleccionId + '/cromos');
  }



  // ELIMINAMOS LA COLECCIÓN CUYO IDENTIFICADOR PASAMOS COMO PARÁMETRO
  public BorraColeccion(coleccionId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/coleccions/' + coleccionId);
  }


  // ELIMINAMOS UN CROMO DETERMINADO DE UNA COLECCIÓN CONCRETA
  public BorrarCromo(cromoId: number, coleccionId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlColecciones + '/' + coleccionId + '/cromos/' + cromoId);
  }

  // SE USA PARA EDITAR LA COLECCIÓN DEL PROFESOR. AMBOS IDENTIFICADORES LOS PASAMOS COMO PARÁMETRO
  public ModificaColeccion(coleccion: Coleccion, profesorId: number, coleccionId: number): Observable<Coleccion> {
    return this.http.put<Coleccion>(this.APIUrlProfesores + '/' + profesorId + '/coleccions/' + coleccionId, coleccion);
  }


  // PONE UNA IMÁGEN A LA COLECCIÓN
  public PonImagenColeccion(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenColeccion + '/upload', formData);
  }

  // EDITAMOS UN CROMO EN CONCRETO DE UNA COLECCIÓN DETERMINADA
  public ModificaCromoColeccion(cromo: Cromo, coleccionId: number, cromoId: number): Observable<Cromo> {
    return this.http.put<Cromo>(this.APIUrlColecciones + '/' + coleccionId + '/cromos/' + cromoId, cromo);
  }

  // PONEMOS UNA IMAGEN AL CROMO
  public PonImagenCromo(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenCromo + '/upload', formData);
  }

  // HACE UN POST DE UNA NUEVA COLECCIÓN AL PROFESOR
  public CreaColeccion(coleccion: Coleccion, profesorId: number): Observable<Coleccion> {
    return this.http.post<Coleccion>(this.APIUrlProfesores + '/' + profesorId + '/coleccions', coleccion);
  }

  // AGREGAMOS UN NUEVO CROMO A UNA COLECCIÓN DETERMINADA
  public PonCromoColeccion(cromo: Cromo, coleccionId: number): Observable<Cromo> {
    return this.http.post<Cromo>(this.APIUrlColecciones + '/' + coleccionId + '/cromos', cromo);
  }
  // ELIMINAMOS UNA ASIGNACIÓN DE PUNTO A UN ALUMNO
  public BorrarPuntosAlumno(historialPuntosAlumnoId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.delete<HistorialPuntosAlumno[]>(this.APIUrlHistorialPuntosAlumno + '/' + historialPuntosAlumnoId);
  }

  // EDITAMOS LA INSCRIPCIÓN DEL ALUMNO EN EL JUEGO DE PUNTOS PARA PONER PUNTOS, YA QUE ÉSTA INCRIPCIÓN TAMBIÉN CONTIENE LOS PUNTOS TOTALES
  public PonPuntosJuegoDePuntos(alumnoJuegoDePuntos: AlumnoJuegoDePuntos, alumnoJuegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuegoDePuntos + '/' + alumnoJuegoDePuntosId, alumnoJuegoDePuntos);
  }

  // OBTENEMOS EL HISTORIAL TOTAL DE PUNTOS DEL ALUMNO
  public DameHistorialPuntosAlumno(alumnoJuegoDePuntosId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.get<HistorialPuntosAlumno[]>(this.APIUrlHistorialPuntosAlumno + '?filter[where][alumnoJuegoDePuntosId]='
      + alumnoJuegoDePuntosId);
  }

  // OBTENEMOS EL HISTORIAL DE UN ALUMNO POR TIPO DE PUNTO
  public DameHistorialDeUnPunto(alumnoJuegoDePuntosId: number, puntoId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.get<HistorialPuntosAlumno[]>(this.APIUrlHistorialPuntosAlumno + '?filter[where][alumnoJuegoDePuntosId]='
      + alumnoJuegoDePuntosId + '&filter[where][puntoId]=' + puntoId);
  }


  // OBTENEMOS LOS EQUIPOS QUE FORMAN PARTE DEL JUEGO DE PUNTOS
  public DameEquiposJuegoDePuntos(juegoDePuntosId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIRUrlJuegoDePuntos + '/' + juegoDePuntosId + '/equipos');
  }


  // NOS DEVUELVE LAS INCRIPCIONES DEL QUE LE INDICAMOS DE UN JUEGO DE PUNTOS
  public DameInscripcionEquipoJuegoDePuntos(juegoDePuntosId: number, equipoId: number): Observable<EquipoJuegoDePuntos> {
    return this.http.get<EquipoJuegoDePuntos>(this.APIUrlEquiposJuegoDePuntos + '?filter[where][juegoDePuntosId]='
      + juegoDePuntosId + '&filter[where][equipoId]=' + equipoId);
  }


  // OBTENEMOS EL HISTORIAL DE UN EQUIPO POR TIPO DE PUNTO
  public DameHistorialDeUnPuntoEquipo(equipoJuegoDePuntosId: number, puntoId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.get<HistorialPuntosEquipo[]>(this.APIUrlHistorialPuntosEquipo + '?filter[where][equipoJuegoDePuntosId]='
      + equipoJuegoDePuntosId + '&filter[where][puntoId]=' + puntoId);
  }


  // OBTENEMOS EL HISTORIAL TOTAL DE PUNTOS DEL EQUIPO
  public DameHistorialPuntosEquipo(equipoJuegoDePuntosId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.get<HistorialPuntosEquipo[]>(this.APIUrlHistorialPuntosEquipo + '?filter[where][equipoJuegoDePuntosId]='
      + equipoJuegoDePuntosId);
  }

  // CAMBIA EL ESTADO DEL JUEGO DE COLECCIÓN DE ACTIVO A INACTIVO O VICEVERSA
  public CambiaEstadoJuegoDePuntos(juegoDePuntos: Juego, juegoDePuntosId: number, grupoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos/' + juegoDePuntosId, juegoDePuntos);
  }

  // REGISTRAMOS LA FECHA EN QUE DAMOS UN PUNTO A UN ALUMNO, SU VALOR, EL TIPO DE PUNTO
  public PonHistorialPuntosAlumno(historial: HistorialPuntosAlumno): Observable<HistorialPuntosAlumno> {
    return this.http.post<HistorialPuntosAlumno>(this.APIUrlHistorialPuntosAlumno, historial);
  }

  // EDITAMOS LA INSCRIPCIÓN DEL EQUIPO EN EL JUEGO DE PUNTOS PARA PONER PUNTOS, YA QUE ÉSTA INCRIPCIÓN TAMBIÉN CONTIENE LOS PUNTOS TOTALES
  // tslint:disable-next-line:max-line-length
  public PonPuntosEquiposJuegoDePuntos(equipoJuegoDePuntos: EquipoJuegoDePuntos, equipoJuegoDePuntosId: number): Observable<EquipoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<EquipoJuegoDePuntos>(this.APIUrlEquiposJuegoDePuntos + '/' + equipoJuegoDePuntosId, equipoJuegoDePuntos);
  }


  // REGISTRAMOS LA FECHA EN QUE DAMOS UN PUNTO A UN EQUIPO, SU VALOR, EL TIPO DE PUNTO
  public PonHistorialPuntosEquipo(historial: HistorialPuntosEquipo): Observable<HistorialPuntosEquipo> {
    return this.http.post<HistorialPuntosEquipo>(this.APIUrlHistorialPuntosEquipo, historial);
  }

  // ELIMINAMOS UNA ASIGNACIÓN DE PUNTO A UN EQUIPO
  public BorraPuntosEquipo(historialPuntosEquipoId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.delete<HistorialPuntosEquipo[]>(this.APIUrlHistorialPuntosEquipo + '/' + historialPuntosEquipoId);
  }

  // ELIMINA EL JUEGO DE PUNTOS QUE PASAMOS COMO PARÁMETRO
  public BorraJuegoDePuntos(juegoDePuntosId: number, grupoId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos/' + juegoDePuntosId);
  }


  // DEVUELVE LOS ALUMNOS QUE FORMAN PARTE DE UN JUEGO DE COLECCIÓN DETERMINADO
  public DameAlumnosJuegoDeColeccion(juegoDeColeccionId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIRUrlJuegoDeColeccion + '/' + juegoDeColeccionId + '/alumnos');
  }

  // DEVUELVE UN ARRAY CON LAS INCRIPCIONES DE LOS ALUMNOS A UN JUEGO DE COLECCIÓN DETERMINADO
  public DameInscripcionesAlumnoJuegoDeColeccion(juegoDeColeccionId: number): Observable<AlumnoJuegoDeColeccion[]> {
    return this.http.get<AlumnoJuegoDeColeccion[]>(this.APIUrlAlumnoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
      + juegoDeColeccionId);
  }



  // DEVUELVE UN ARRAY CON LAS INCRIPCIONES DE LOS ALUMNOS A UN JUEGO DE COLECCIÓN DETERMINADO
  public DameInscripcionAlumnoJuegoDeColeccion(juegoDeColeccionId: number, alumnoId: number): Observable<AlumnoJuegoDeColeccion> {
    return this.http.get<AlumnoJuegoDeColeccion>(this.APIUrlAlumnoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
      + juegoDeColeccionId + '&filter[where][alumnoId]=' + alumnoId);
  }

  // NOS DEVUELVE EL NOMBRE DEL ALUMNO QUE PARTICIPA EN EL JUEGO DE COLECCION
  public DameNombreAlumnoJuegoColeccion(AlumnoJuegoDeColeccionId: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnoJuegoDeColeccion + '/' + AlumnoJuegoDeColeccionId + '/alumno');
  }


  // DEVUELVE LOS EQUIPOS QUE FORMAN PARTE DE UN JUEGO DE COLECCIÓN DETERMINADO
  public DameEquiposJuegoDeColeccion(juegoDeColeccionId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIRUrlJuegoDeColeccion + '/' + juegoDeColeccionId + '/equipos');
  }

  // DEVUELVE UN ARRAY CON LAS INCRIPCIONES DE LOS EQUIPOS A UN JUEGO DE COLECCIÓN DETERMINADO
  public DameInscripcionEquipoJuegoDeColeccion(juegoDeColeccionId: number, equipoId: number): Observable<EquipoJuegoDeColeccion> {
    return this.http.get<EquipoJuegoDeColeccion>(this.APIUrlEquipoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
      + juegoDeColeccionId + '&filter[where][equipoId]=' + equipoId);
  }

  // OBTENEMOS LA COLECCIÓN CUYO IDENTIFICADOR PASAMOS COMO PARÁMETRO
  public DameColeccion(coleccionId: number): Observable<Coleccion> {
    return this.http.get<Coleccion>(this.APIRUrlColecciones + '/' + coleccionId);
  }
  // CAMBIA EL ESTADO DEL JUEGO DE COLECCIÓN DE ACTIVO A INACTIVO O VICEVERSA
  public CambiaEstadoJuegoDeColeccion(juegoDeColeccion: Juego, juegoDeColeccionId: number, grupoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoDeColeccionId, juegoDeColeccion);
  }


  // ASIGNAMOS UN NUEVO CROMO PARA EL ÁLBUM DEL ALUMNO
  public AsignarCromoAlumno(album: Album) {
    return this.http.post<Album>(this.APIRUrlAlbum, album);
  }

  public DameAlbumAlumno(cromoId: number, alumnoJuegoDeColeccionId: number): Observable<Album> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Album>(this.APIRUrlAlbum + '?filter[where][cromoId]=' + cromoId + '&filter[where][alumnoJuegoDeColeccionId]=' + alumnoJuegoDeColeccionId);
  }

  public BorrarAlbumAlumno(AlbumId: number) {
    return this.http.delete<Album>(this.APIRUrlAlbum + '/' + AlbumId);
  }

  // Lo mismo para equipos
  public DameAlbumEquipo(cromoId: number, equipoJuegoDeColeccionId: number): Observable<Album> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Album>(this.APIRUrlAlbumEquipo + '?filter[where][cromoId]=' + cromoId + '&filter[where][equipoJuegoDeColeccionId]=' + equipoJuegoDeColeccionId);
  }

  public BorrarAlbumEquipo(AlbumEquipoId: number) {
    return this.http.delete<Album>(this.APIRUrlAlbumEquipo + '/' + AlbumEquipoId);
  }

  // ASIGNAMOS UN NUEVO CROMO PARA EL ÁLBUM DEL EQUIPO
  public AsignarCromoEquipo(album: AlbumEquipo) {
    return this.http.post<AlbumEquipo>(this.APIRUrlAlbumEquipo, album);
  }

  // NOS DEVUELVE LOS CROMOS QUE TIENE UN ALUMNO CONCRETO EN UN JUEGO DE COLECCIÓN CONCRETO, YA QUE EL ALUMNOJUEGODECOLECCIÓN RELACIONA
  // EL ID DEL ALUMNO Y EL ID DEL JUEGO DE COLECCIÓN
  public DameCromosAlumno(alumnoJuegoDeColeccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIUrlAlumnoJuegoDeColeccion + '/' + alumnoJuegoDeColeccionId + '/cromos');
  }

  // NOS DEVUELVE LOS CROMOS QUE TIENE UN EQUIPO CONCRETO EN UN JUEGO DE COLECCIÓN CONCRETO
  public DameCromosEquipo(equipoJuegoDeColeccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIUrlEquipoJuegoDeColeccion + '/' + equipoJuegoDeColeccionId + '/cromos');
  }

  // ELIMINA EL JUEGO DE COLECCIÓN QUE PASAMOS COMO PARÁMETRO
  public BorraJuegoDeColeccion(juegoDeColeccionId: number, grupoId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoDeColeccionId);
  }

  // PARA CREAR UN PUNTO NUEVO DEL PROFESOR
  public CreaTipoDePunto(punto: Punto, profesorId: number): Observable<Punto> {
    return this.http.post<Punto>(this.APIUrlProfesores + '/' + profesorId + '/puntos', punto);
  }

  // PARA EDITAR UN PUNTO DEL PROFESOR
  public ModificaTipoDePunto(punto: Punto, profesorId: number, puntoId: number): Observable<Punto> {
    return this.http.put<Punto>(this.APIUrlProfesores + '/' + profesorId + '/puntos/' + puntoId, punto);
  }

  // PARA BORRAR UN PUNTO DEL PROFESOR
  public BorraTipoDePunto(puntoId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/puntos/' + puntoId);
  }

  // PARA CREAR UNA INSIGNIA NUEVO DEL PROFESOR
  public CreaInsignia(insignia: Insignia, profesorId: number): Observable<Insignia> {
    return this.http.post<Insignia>(this.APIUrlProfesores + '/' + profesorId + '/insignia', insignia);
  }

  // PARA EDITAR UNA INSIGNIA DEL PROFESOR
  public ModificaInsignia(insignia: Insignia, profesorId: number, insigniaId: number): Observable<Insignia> {
    return this.http.put<Insignia>(this.APIUrlProfesores + '/' + profesorId + '/insignia/' + insigniaId, insignia);
  }

  // PARA BORRAR UNA INSIGNIA DEL PROFESOR
  public BorraInsignia(insigniaId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/insignia/' + insigniaId);
  }

  // PARA PONER UNA IMAGEN A UNA INSIGNIA
  public PonImagenInsignia(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLImagenInsignia + '/upload', formData);
  }

  // // DEVUELVE LOS PUNTOS CREADOS POR EL PROFESOR
  // public DameTiposDePuntos(profesorId: number): Observable<Punto[]> {
  //   return this.http.get<Punto[]>(this.APIUrlProfesores + '/' + profesorId + '/puntos');
  // }

  // DEVUELVE LAS INSIGNIAS CREADAS POR EL PROFESOR
  public DameInsignias(profesorId: number): Observable<Insignia[]> {
    return this.http.get<Insignia[]>(this.APIUrlProfesores + '/' + profesorId + '/insignia');
  }

  // DEVUELVE LA IMAGEN CORRESPONDIENTE A CADA INSIGNIA
  public DameImagenInsignia(ImagenInsignia: string): Observable<any> {
    return this.http.get<any>(this.APIURLImagenInsignia + '/download/' + ImagenInsignia);
  }

  // PETICIONES JUEGO DE CUESTIONARIO
/*   public DameJuegoDeCuestionario(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCuestionario');
  } */
  // Devuelve los juegos de puntos del Alumno
  public DameJuegoDeCuestionarioAlumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegosDeCuestionario');
  }

  /////////////////// JUEGO DE CUESTIONARIO//////////////////////////////


  // OBTENEMOS LOS ALUMNOS QUE FORMAN PARTE DEL JUEGO DE CUESTIONARIO
  public DameAlumnosJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCuestionario + '/' + juegoDeCuestionarioId + '/alumnos');
  }

  // OBTENEMOS LA INSCRIPCIÓN ESPECÍFICA DE UN ALUMNO CONCRETO EN UN JUEGO DE CUESTIONARIO.
  public DameInscripcionAlumnoJuegoDeCuestionario(alumnoId: number, juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario> {
    return this.http.get<AlumnoJuegoDeCuestionario>(this.APIUrlAlumnoJuegoDeCuestionario + '?filter[where][alumnoId]=' + alumnoId
    + '&filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  // OBTENEMOS DATOS DEL CUESTIONARIO SELECCIONADO
  public DameCuestionario(cuestionarioId: number): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(this.APIUrlCuestionario + '/' + cuestionarioId);
  }

  // OBTENEMOS LAS PREGUNTAS DEL CUESTIONARIO SELECCIONADO
  public DamePreguntasCuestionario(cuestionarioId: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.APIUrlCuestionario + '/' + cuestionarioId + '/Preguntas');
  }

  // ESTABLECE LA NOTA OBTENIDA POR EL ALUMNO EN EL CUESTIONARIO
  public PonerNotaAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionario: AlumnoJuegoDeCuestionario, alumnoJuegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionario>(this.APIUrlAlumnoJuegoDeCuestionario + '/' + alumnoJuegoDeCuestionarioId, alumnoJuegoDeCuestionario);
  }

  // GUARDAMOS LAS RESPUESTAS DE LOS ALUMNOS DEL CUESTIONARIO QUE HAYAN REALIZADO
  // tslint:disable-next-line:max-line-length
  public GuardarRespuestaAlumnoJuegoDeCuestionario(respuestaAlumnoJuegoDeCuestionario: RespuestaJuegoDeCuestionario): Observable<RespuestaJuegoDeCuestionario> {
    console.log ('estoy en api');
    console.log (respuestaAlumnoJuegoDeCuestionario);
    return this.http.post<RespuestaJuegoDeCuestionario>(this.APIUrlRespuestasJuegoDeCuestionario , respuestaAlumnoJuegoDeCuestionario);
  }

  // OBTENEMOS LISTA INSCRIPCCIONES DEL CUESTINARIO
  public ListaInscripcionesAlumnosJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario[]> {
    return this.http.get<AlumnoJuegoDeCuestionario[]>(this.APIUrlAlumnoJuegoDeCuestionario + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  // OBTENEMOS ALUMNO EN CONCRETO
  public DameAlumnoConId(alumnoId: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '/' + alumnoId);
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  public DameJuegoDeCompeticionLigaAlumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegosDeCompeticionLiga');
  }

  public DamePuntosJuegoDeCompeticionLiga(juegoDeCompLigaId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIRUrlJuegoDeCompeticionLiga + '/' + juegoDeCompLigaId + '/puntos');
  }

  // OBTENEMOS LA INSCRIPCIÓN ESPECÍFICA DE UN ALUMNO CONCRETO EN UN JUEGO DE COMPETICION LIGA CONCRETO.
  // tslint:disable-next-line:max-line-length
  public DameInscripcionAlumnoJuegoDeCompeticionLiga(alumnoId: number, juegoDeCompLigaId: number): Observable<AlumnoJuegoDeCompeticionLiga> {
    console.log('voy a por los puntos');
    return this.http.get<AlumnoJuegoDeCompeticionLiga>(this.APIUrlAlumnoJuegoDeCompeticionLiga + '?filter[where][alumnoId]=' + alumnoId
      + '&filter[where][juegoDeCompLigaId]=' + juegoDeCompLigaId);
  }



  public DameInscripcionesAlumnoJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<AlumnoJuegoDeCompeticionLiga[]> {
    return this.http.get<AlumnoJuegoDeCompeticionLiga[]>(this.APIUrlAlumnoJuegoDeCompeticionLiga
      + '?filter[where][JuegoDeCompeticionLigaId]=' + juegoDeCompeticionLigaId);
  }

  public DameInscripcionesAlumnoJuegoDeCompeticionTorneo(juegoDeCompeticionTorneoId: number): Observable<AlumnoJuegoDeCompeticionTorneo[]> {
    return this.http.get<AlumnoJuegoDeCompeticionTorneo[]>(this.APIUrlAlumnoJuegoDeCompeticionTorneo
      + '?filter[where][JuegoDeCompeticionTorneoId]=' + juegoDeCompeticionTorneoId);
  }




  public DameEnfrentamientosDeCadaJornadaLiga(jornadasDeCompeticionLigaId: number): Observable<Array<EnfrentamientoLiga>> {
    return this.http.get<Array<EnfrentamientoLiga>>(this.APIUrlJornadasJuegoDeCompeticionLiga + '/' + jornadasDeCompeticionLigaId +
      '/enfrentamientosLiga');
  }

  public DameEnfrentamientosDeCadaJornadaTorneo(jornadasDeCompeticionTorneoId: number): Observable<Array<EnfrentamientoTorneo>> {
    return this.http.get<Array<EnfrentamientoTorneo>>(this.APIUrlJornadasJuegoDeCompeticionTorneo + '/' + jornadasDeCompeticionTorneoId +
      '/enfrentamientosTorneo');
  }

  /*public DameEnfrentamientosDeCadaJornadaFormulaUno(jornadasDeCompeticionFormulaUnoId: number): Observable<Array<EnfrentamientoFormulaUno>> {
    return this.http.get<Array<EnfrentamientoFormulaUno>>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '/' + jornadasDeCompeticionFormulaUnoId +
      '/enfrentamientoFormulaUno');
  }*/


  public DameAlumnosJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCompeticionLiga + '/' + juegoDeCompeticionLigaId + '/alumnos');
  }

  public DameAlumnosJuegoDeCompeticionTorneo(juegoDeCompeticionTorneoId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCompeticionTorneo + '/' + juegoDeCompeticionTorneoId + '/alumnos');
  }

  public DameAlumnosJuegoDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionFormulaUnoId + '/alumnos');
  }


  
  public DameInscripcionesAlumnoJuegoDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<AlumnoJuegoDeCompeticionFormulaUno[]> {
    return this.http.get<AlumnoJuegoDeCompeticionFormulaUno[]>(this.APIUrlAlumnoJuegoDeCompeticionFormulaUno
      + '?filter[where][JuegoDeCompeticionFormulaUnoId]=' + juegoDeCompeticionFormulaUnoId);
  }

  public DameInscripcionesEquipoJuegoDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<EquipoJuegoDeCompeticionFormulaUno[]> {
    return this.http.get<EquipoJuegoDeCompeticionFormulaUno[]>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno
      + '?filter[where][JuegoDeCompeticionFormulaUnoId]=' + juegoDeCompeticionFormulaUnoId);
  }




  public DameJornadasDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '?filter[where][JuegoDeCompeticionFormulaUnoId]='
    + juegoDeCompeticionFormulaUnoId);
  }

  public DameJornadasDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.APIUrlJornadasJuegoDeCompeticionLiga + '?filter[where][JuegoDeCompeticionLigaId]='
      + juegoDeCompeticionLigaId);
  }

  public DameJornadasDeCompeticionTorneo(juegoDeCompeticionTorneoId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.APIUrlJornadasJuegoDeCompeticionTorneo + '?filter[where][JuegoDeCompeticionTorneoId]='
      + juegoDeCompeticionTorneoId);
  }




  public DameEquiposJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeCompeticionLiga + '/' + juegoDeCompeticionLigaId + '/equipos');
  }

  public DameEquiposJuegoDeCompeticionTorneo(juegoDeCompeticionTorneoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeCompeticionTorneo + '/' + juegoDeCompeticionTorneoId + '/equipos');
  }

  public DameEquiposJuegoDeCompeticionFormulaUno(juegoDeCompeticionLigaId: number): Observable<Equipo[]> {
    console.log('Voy a por los equipos');
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionLigaId + '/equipos');
  }





  public DameInscripcionesEquipoJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<EquipoJuegoDeCompeticionLiga[]> {
    return this.http.get<EquipoJuegoDeCompeticionLiga[]>(this.APIUrlEquipoJuegoDeCompeticionLiga
      + '?filter[where][JuegoDeCompeticionLigaId]=' + juegoDeCompeticionLigaId);
  }

  /*public DameInscripcionesEquipoJuegoDeCompeticionFormulaUno(juegoDeCompeticionLigaId: number): Observable<EquipoJuegoDeCompeticionLiga[]> {
    return this.http.get<EquipoJuegoDeCompeticionLiga[]>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno
      + '?filter[where][JuegoDeCompeticionLigaId]=' + juegoDeCompeticionLigaId);
  }*/

  /*public DameInscripcionesEquipoJuegoDeCompeticionTorneo(juegoDeCompeticionTorneoId: number): Observable<EquipoJuegoDeCompeticionTorneo[]> {
    return this.http.get<EquipoJuegoDeCompeticionTorneo[]>(this.APIUrlEquipoJuegoDeCompeticionTorneo
      + '?filter[where][JuegoDeCompeticionTorneoId]=' + juegoDeCompeticionTorneoId);
  }*/

  /* Dame las imagenes de los cromos */
  public DameImagenCromo(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenCromo +  '/download/' + imagen,
      { responseType: ResponseContentType.Blob });
  }

// geocaching
  public DameJuegoDeGeocachingAlumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegosDeGeocaching');
  }
  public DameAlumnosJuegoDeGeocaching(juegoDeGeocachingId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeGeocaching + '/' + juegoDeGeocachingId + '/alumnos');
  }
  public DameInscripcionAlumnoJuegoDeGeocaching(alumnoId: number, juegoDeGeocachingId: number): Observable<AlumnoJuegoDeGeocaching> {
    return this.http.get<AlumnoJuegoDeGeocaching>(this.APIUrlAlumnoJuegoDeGeocaching + '?filter[where][alumnoId]=' + alumnoId
    + '&filter[where][juegoDeGeocachingId]=' + juegoDeGeocachingId);
  }
  public ListaInscripcionesAlumnosJuegoDeGeocaching(juegoDeGeocachingId: number): Observable<AlumnoJuegoDeGeocaching[]> {
    return this.http.get<AlumnoJuegoDeGeocaching[]>(this.APIUrlAlumnoJuegoDeGeocaching + '?filter[where][juegoDeGeocachingId]=' + juegoDeGeocachingId);
  }
  public DameEscenario(idescenario: number): Observable<Escenario> {
    return this.http.get<Escenario>(this.APIUrlEscenarios + '/' + idescenario);
  }
public DamePuntosGeolocalizablesEscenario(idescenario: number): Observable<PuntoGeolocalizable[]> {
    return this.http.get<PuntoGeolocalizable[]>(this.APIUrlEscenarios + '/' + idescenario + '/puntosgeolocalizables');
}
public DamePreguntas(preguntaId: number): Observable<Pregunta> {
  return this.http.get<Pregunta>(this.APIUrlPreguntas + '/' + preguntaId);

}

public PonerNotaAlumnoJuegoDeGeocaching(alumnoJuegoDeGeocaching: AlumnoJuegoDeGeocaching, alumnoJuegoDeGeocachingId: number): Observable<AlumnoJuegoDeGeocaching> {
  // tslint:disable-next-line:max-line-length
  return this.http.put<AlumnoJuegoDeGeocaching>(this.APIUrlAlumnoJuegoDeGeocaching + '/' + alumnoJuegoDeGeocachingId, alumnoJuegoDeGeocaching);
}


  // AVATARES
  public DameAlumnosJuegoDeAvatar(juegoDeAvatarId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeAvatar + '/' + juegoDeAvatarId + '/alumnos');
  }
  public DameInscripcionesAlumnoJuegoDeAvatar(juegoDeAvatarId: number): Observable<AlumnoJuegoDeAvatar[]> {
    return this.http.get<AlumnoJuegoDeAvatar[]>(this.APIUrlAlumnoJuegoDeAvatar
    + '?filter[where][juegoDeAvatarId]=' + juegoDeAvatarId);
  }
  // Da la inscripción de un alumno concreto
  public DameInscripcionAlumnoJuegoDeAvatar(juegoDeAvatarId: number, alumnoId: number): Observable<AlumnoJuegoDeAvatar[]> {
    return this.http.get<AlumnoJuegoDeAvatar[]>(this.APIUrlAlumnoJuegoDeAvatar
    + '?filter[where][juegoDeAvatarId]=' + juegoDeAvatarId +  '&filter[where][alumnoId]=' + alumnoId);
  }

  // Modifica la inscripcion (el avatar) del alumno
  public ModificaInscripcionAlumnoJuegoDeAvatar(alumnoJuegoDeAvatar: AlumnoJuegoDeAvatar): Observable<AlumnoJuegoDeAvatar> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeAvatar>(this.APIUrlAlumnoJuegoDeAvatar + '/' + alumnoJuegoDeAvatar.id, alumnoJuegoDeAvatar);
  }
  // Devuelve los juegos de avatar del Alumno
  public DameJuegoDeAvatarAlumno(alumnoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegoDeAvatars');
  }
  // Obtener familia de avatar
  public DameFamilia(familiaId: number): Observable<FamiliaAvatares> {
    return this.http.get<FamiliaAvatares>(this.APIUrlFamiliarAvatares + '/' + familiaId);
  }

  public DameImagenAvatar(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenesAvatares + '/download/' + imagen,
      { responseType: ResponseContentType.Blob });
  }

   // PONE AUDIO DE AVATAR
   public PonAudioAvatar(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlAudiosAvatares + '/upload', formData);
  }

  public BorraAudioAvatar(audio: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlAudiosAvatares + '/files/' + audio);
  }

  // Juegos de votacion

  public DameJuegosDeVotacionUnoATodosAlumno(alumnoId: number): Observable<JuegoDeVotacionUnoATodos[]> {
    return this.http.get<JuegoDeVotacionUnoATodos[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegoDeVotacionUnoATodos');
  }


   // Da la inscripción de un alumno concreto
   public DameInscripcionAlumnoJuegoDeVotacionUnoATodos(juegoId: number, alumnoId: number): Observable<AlumnoJuegoDeVotacionUnoATodos[]> {
    return this.http.get<AlumnoJuegoDeVotacionUnoATodos[]>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos
    + '?filter[where][juegoDeVotacionUnoATodosId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId);
  }

  public DameAlumnosJuegoDeVotacionUnoATodos(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeVotacionUnoATodos + '/' + juegoId + '/alumnos');
  }
  // Modifica la inscripcion (la votacion) del alumno
  public RegistraVotacion(alumnoJuegoDeVotacionUnoATodos: AlumnoJuegoDeVotacionUnoATodos): Observable<AlumnoJuegoDeVotacionUnoATodos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeVotacionUnoATodos>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos + '/' + alumnoJuegoDeVotacionUnoATodos.id, alumnoJuegoDeVotacionUnoATodos);
  }



  public DameJuegosDeVotacionTodosAUnoAlumno(alumnoId: number): Observable<JuegoDeVotacionTodosAUno[]> {
    return this.http.get<JuegoDeVotacionTodosAUno[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegoDeVotacionTodosAUno');
  }
   // Da la inscripción de un alumno concreto
   public DameInscripcionAlumnoJuegoDeVotacionTodosAUno(juegoId: number, alumnoId: number): Observable<AlumnoJuegoDeVotacionTodosAUno[]> {
    return this.http.get<AlumnoJuegoDeVotacionTodosAUno[]>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno
    + '?filter[where][juegoDeVotacionTodosAUnoId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId);
  }

  public DameAlumnosJuegoDeVotacionTodosAUno(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeVotacionTodosAUno + '/' + juegoId + '/alumnos');
  }

  // Modifica la inscripcion (las votaciones) del alumno
  public RegistraVotaciones(alumnoJuegoDeVotacionTodosAUno: AlumnoJuegoDeVotacionTodosAUno): Observable<AlumnoJuegoDeVotacionTodosAUno> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeVotacionTodosAUno>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno + '/' + alumnoJuegoDeVotacionTodosAUno.id, alumnoJuegoDeVotacionTodosAUno);
  }


  public PonImagenPerfil(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenesPerfil + '/upload', formData);
  }

  public ModificaAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(this.APIUrlAlumnos + '/' + alumno.id, alumno);
  }

  // Juegos de cuestionario de satisfaccion

  public DameJuegosDeCuestiinarioSatisfaccionAlumno(alumnoId: number): Observable<JuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<JuegoDeCuestionarioSatisfaccion[]>(this.APIUrlAlumnos + '/' + alumnoId + '/juegoDeCuestionarioSatisfaccion');
  }

  // Da la inscripción de un alumno concreto
  // tslint:disable-next-line:max-line-length
  public DameInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(juegoId: number, alumnoId: number): Observable<AlumnoJuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<AlumnoJuegoDeCuestionarioSatisfaccion[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion
    + '?filter[where][juegoDeCuestionarioSatisfaccionId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId);
  }

  public DameAlumnosJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + juegoId + '/alumnos');
  }

  public DameCuestionarioSatisfaccion(cuestionarioId: number): Observable<CuestionarioSatisfaccion> {
    return this.http.get<CuestionarioSatisfaccion>(this.APIUrlCuestionarioSatisfaccion + '/' + cuestionarioId);
  }

  // tslint:disable-next-line:max-line-length
  public ModificaInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(inscripcion: AlumnoJuegoDeCuestionarioSatisfaccion): Observable<AlumnoJuegoDeCuestionarioSatisfaccion> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionarioSatisfaccion>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + inscripcion.id, inscripcion);
  }

  public DameJuegoDeEncuestaRapida(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeEncuestaRapida
    + '?filter[where][Clave]=' + clave);
  }


  public ModificarJuegoDeEncuestaRapida( juego: JuegoDeEncuestaRapida): Observable<JuegoDeEncuestaRapida> {
    // tslint:disable-next-line:max-line-length
      return this.http.put<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida, juego);
    }

  public DameJuegoDeVotacionRapida(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeVotacionRapida
    + '?filter[where][Clave]=' + clave);
  }
  public ModificarJuegoVotacionRapida( juego: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
      return this.http.put<any>(this.APIUrlJuegoDeVotacionRapida, juego);
  }


  public DameJuegoDeCuestionarioRapido(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeCuestionarioRapido
    + '?filter[where][Clave]=' + clave);
  }
  public ModificarJuegoDeCuestionarioRapido( juego: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
      return this.http.put<any>(this.APIUrlJuegoDeCuestionarioRapido, juego);
  }


  public DameJuegoDeCogerTurnoRapido(clave: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlJuegoDeCogerTurnoRapido
    + '?filter[where][Clave]=' + clave);
  }


  public DameJuegosDeCuestionarioSatisfaccion(grupoId: number): Observable<JuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<JuegoDeCuestionarioSatisfaccion[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCuestionarioSatisfaccion');
  }
  public DameJuegoDePuntosGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos');
  }
  public DameJuegoDeColeccionGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions');
  }
  public DameJuegoDeCompeticionTorneoGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionTorneo');
  }
  public DameJuegoDeEvaluacion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeEvaluacion');
  }
  public DameJuegoDeCompeticionLigaGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionLiga');
  }
  public DameJuegoDeCompeticionFormulaUnoGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionFormulaUno');
  }

  public DameRubrica(rubricaId: number): Observable<Rubrica> {
    return this.http.get<Rubrica>(this.APIURLRubricas + '/' + rubricaId);
  }

  public DameJuegoDeCuestionario(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegosDeCuestionario');
  }
  public DameJuegoDeGeocaching(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegosDeGeocaching');
  }
  public DameJuegoDeAvatarGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeAvatars');
  }
  public DameJuegosDeVotacionUnoATodos(grupoId: number): Observable<JuegoDeVotacionUnoATodos[]> {
    return this.http.get<JuegoDeVotacionUnoATodos[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeVotacionUnoATodos');
  }

  public DameJuegosDeEvaluacion(grupoId: number): Observable<JuegoDeEvaluacion[]> {
    return this.http.get<JuegoDeEvaluacion[]>(this.APIUrlGrupos + '/' + grupoId + '/juegosDeEvaluacion');
  }
  
  public DameJuegosDeVotacionTodosAUno(grupoId: number): Observable<JuegoDeVotacionTodosAUno[]> {
    return this.http.get<JuegoDeVotacionTodosAUno[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeVotacionTodosAUno');
  }

  public DameTodosMisCuestionariosSatisfaccion(profesorId: number): Observable<CuestionarioSatisfaccion[]> {
    return this.http.get<CuestionarioSatisfaccion[]>(this.APIUrlProfesores + '/' + profesorId + '/cuestionariosSatisfaccion');
  }

  public DameCuestionariosSatisfaccionPublicos(): Observable<CuestionarioSatisfaccion[]> {
    return this.http.get<CuestionarioSatisfaccion[]>(this.APIUrlCuestionariosSatisfaccion
                                 + '?filter[where][Publico]=true');
  }


  public DameProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.APIUrlProfesores);
  }


  public CreaJuegoDeEncuestaRapida(juego: JuegoDeEncuestaRapida): Observable<JuegoDeEncuestaRapida> {
    return this.http.post<JuegoDeEncuestaRapida>(this.APIUrlProfesores + '/' + juego.profesorId + '/juegosDeEncuestaRapida', juego);
  }

  public DameTodosMisCuestionarios(profesorId: number): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.APIUrlProfesores + '/' + profesorId + '/cuestionarios');
  }
  public DameCuestionariosPublicos(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.APIUrlCuestionarios
                                 + '?filter[where][Publico]=true');
  }

  public CreaJuegoDeCuestionarioRapido(juego: JuegoDeCuestionarioRapido): Observable<JuegoDeCuestionarioRapido> {
    return this.http.post<JuegoDeCuestionarioRapido>(this.APIUrlProfesores + '/' + juego.profesorId + '/juegosDeCuestionarioRapido', juego);
  }

  public DameInscripcionesAlumnoJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario[]> {
    return this.http.get<AlumnoJuegoDeCuestionario[]>(this.APIUrlAlumnoJuegoDeCuestionario
                                                      + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  // public Dame(juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario[]> {
  //   return this.http.get<AlumnoJuegoDeCuestionario[]>(this.APIUrlAlumnoJuegoDeCuestionario
  //                                                     + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  // }

  public DameRespuestasAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionarioId: number): Observable<RespuestaJuegoDeCuestionario[]> {
    return this.http.get<RespuestaJuegoDeCuestionario[]>(this.APIUrlRespuestasJuegoDeCuestionario
      + '?filter[where][alumnoJuegoDeCuestionarioId]=' + alumnoJuegoDeCuestionarioId);
  }

  public ModificaJuegoDeCuestionario(JuegosDeCuestionario: any,
                                     juegoDeCuestionarioId: number, grupoId: number): Observable<any> {
    return this.http.put<any>(this.APIUrlGrupos + '/' + grupoId + '/juegosDeCuestionario/' + juegoDeCuestionarioId, JuegosDeCuestionario);
  }

  
  public ModificaProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(this.APIUrlProfesores + '/' + profesor.id, profesor);
  }

  public PonGanadoresJornadasDeCompeticionFormulaUno(jornada: Jornada): Observable<Jornada> {
    return this.http.put<Jornada>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '/' + jornada.id, jornada);
  }

   // tslint:disable-next-line:max-line-length
   public PonPuntosAlumnoGanadorJornadasDeCompeticionFormulaUno(alumno: AlumnoJuegoDeCompeticionFormulaUno): Observable<AlumnoJuegoDeCompeticionFormulaUno> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCompeticionFormulaUno>(this.APIUrlAlumnoJuegoDeCompeticionFormulaUno + '/' + alumno.id, alumno);
  }
     // tslint:disable-next-line:max-line-length
  public PonPuntosEquipoGanadorJornadasDeCompeticionFormulaUno(equipo: EquipoJuegoDeCompeticionFormulaUno): Observable<EquipoJuegoDeCompeticionFormulaUno> {
      // tslint:disable-next-line:max-line-length
      return this.http.put<EquipoJuegoDeCompeticionFormulaUno>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno + '/' + equipo.id, equipo);
  }

  
  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeVotacionUnoATodos(juegoId: number): Observable<AlumnoJuegoDeVotacionUnoATodos[]> {
    return this.http.get<AlumnoJuegoDeVotacionUnoATodos[]>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos + '?filter[where][juegoDeVotacionUnoATodosId]=' + juegoId);
  }

  public CrearEnfrentamientoTorneo(enfrentamiento: EnfrentamientoTorneo, jornadasDeCompeticionTorneoId: number): Observable<EnfrentamientoTorneo> {
    return this.http.post<EnfrentamientoTorneo>(this.APIUrlJornadasJuegoDeCompeticionTorneo + '/' + jornadasDeCompeticionTorneoId +
      '/enfrentamientosTorneo', enfrentamiento);
  }

  public PonGanadorDelEnfrentamientoTorneo(enfrentamiento: EnfrentamientoTorneo): Observable<EnfrentamientoTorneo> {
    return this.http.put<EnfrentamientoTorneo>(this.APIUrlEnfrentamientosTorneo + '/' + enfrentamiento.id, enfrentamiento);
  }


  public RegistraProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.APIUrlProfesores, profesor);
  }

  public CreaSesionClase(sesion: SesionClase, grupoId: number): Observable<SesionClase> {
    return this.http.post<SesionClase>(this.APIUrlGrupos + '/' + grupoId + '/sesionesClase', sesion);
  }

  
  public ModificaSesionClase(sesion: SesionClase): Observable<SesionClase> {
    return this.http.put<SesionClase>(this.APIUrlSesionesClase + '/' + sesion.id, sesion);
  }


  public RegistraAsistenciaAlumno(asistencia: AsistenciaClase): Observable<AsistenciaClase> {
    return this.http.post<AsistenciaClase>(this.APIUrlAsistenciasClase, asistencia);
  }
  
  public DameSesionesClaseGrupo(grupoId: number): Observable<SesionClase[]> {
    return this.http.get<SesionClase[]>(this.APIUrlSesionesClase + '?filter[where][grupoId]=' + grupoId);
  }

  public DameAsistenciasClase(sesionClaseId: number): Observable<AsistenciaClase[]> {
    return this.http.get<AsistenciaClase[]>(this.APIUrlAsistenciasClase + '?filter[where][sesionClaseId]=' + sesionClaseId);
  }

  
  public BorraSesionClase(sesionClaseId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlSesionesClase + '/' + sesionClaseId);
  }

  public BorraAsistenciaClase(asistenciaId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlAsistenciasClase + '/' + asistenciaId);
  }

  
  public DameJuegosDeEncuestaRapida(profesorId: number): Observable<JuegoDeEncuestaRapida[]> {
    console.log (this.APIUrlProfesores + '/' + profesorId + '/juegosDeEncuestaRapida');
    return this.http.get<JuegoDeEncuestaRapida[]>(this.APIUrlProfesores + '/' + profesorId + '/juegosDeEncuestaRapida');
  }

  public BorraJuegoDeEncuestaRapida(juegoId: number): Observable<JuegoDeEncuestaRapida> {
    return this.http.delete<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida + '/' + juegoId);
  }

  public DameJuegosDeCuestionarioRapido(profesorId: number): Observable<JuegoDeCuestionarioRapido[]> {
    return this.http.get<JuegoDeCuestionarioRapido[]>(this.APIUrlProfesores + '/' + profesorId + '/juegosDeCuestionarioRapido');
  }

  public BorraJuegoDeCuestionarioRapido(juegoId: number): Observable<JuegoDeCuestionarioRapido> {
    return this.http.delete<JuegoDeCuestionarioRapido>(this.APIUrlJuegoDeCuestionarioRapido + '/' + juegoId);
  }

 
  public CreaJuegoDeVotacionRapida(juego: JuegoDeVotacionRapida): Observable<JuegoDeVotacionRapida> {
    return this.http.post<JuegoDeVotacionRapida>(this.APIUrlProfesores + '/' + juego.profesorId + '/juegosDeVotacionRapida', juego);
  }

  public DameJuegosDeVotacionRapida(profesorId: number): Observable<JuegoDeVotacionRapida[]> {
    return this.http.get<JuegoDeVotacionRapida[]>(this.APIUrlProfesores + '/' + profesorId + '/juegosDeVotacionRapida');
  }

  public BorraJuegoDeVotacionRapida(juegoId: number): Observable<JuegoDeVotacionRapida> {
    return this.http.delete<JuegoDeVotacionRapida>(this.APIUrlJuegoDeVotacionRapida + '/' + juegoId);
  }

  
  public CreaJuegoDeCogerTurnoRapido(juego: JuegoDeCogerTurnoRapido): Observable<JuegoDeCogerTurnoRapido> {
    return this.http.post<JuegoDeCogerTurnoRapido>(this.APIUrlProfesores + '/' + juego.profesorId + '/juegosDeCogerTurnoRapido', juego);
  }

  public DameJuegosDeCogerTurnoRapido(profesorId: number): Observable<JuegoDeCogerTurnoRapido[]> {
    return this.http.get<JuegoDeCogerTurnoRapido[]>(this.APIUrlProfesores + '/' + profesorId + '/juegosDeCogerTurnoRapido');
  }

  public BorraJuegoDeCogerTurnoRapido(juegoId: number): Observable<JuegoDeCogerTurnoRapido> {
    return this.http.delete<JuegoDeCogerTurnoRapido>(this.APIUrlJuegoDeCogerTurnoRapido + '/' + juegoId);
  }


  public ModificarJuegoDeCogerTurnoRapido( juego: JuegoDeCogerTurnoRapido): Observable<JuegoDeCogerTurnoRapido> {
    // tslint:disable-next-line:max-line-length
      return this.http.put<JuegoDeCogerTurnoRapido>(this.APIUrlJuegoDeCogerTurnoRapido, juego);
    }

    
  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<AlumnoJuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<AlumnoJuegoDeCuestionarioSatisfaccion[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion
                                                      + '?filter[where][juegoDeCuestionarioSatisfaccionId]=' + juegoId);
  }

  
  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeVotacionTodosAUno(juegoId: number): Observable<AlumnoJuegoDeVotacionTodosAUno[]> {
    return this.http.get<AlumnoJuegoDeVotacionTodosAUno[]>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno
                                                      + '?filter[where][juegoDeVotacionTodosAUnoId]=' + juegoId);
  }

  public DameJuegosDeControlDeTrabajoEnEquipo(grupoId: number): Observable<JuegoDeControlDeTrabajoEnEquipo[]> {
    return this.http.get<JuegoDeControlDeTrabajoEnEquipo[]>(this.APIUrlGrupos + '/' + grupoId + '/juegosDeControlDeTrabajoEnEquipo');
  }

  public DameInscripcionAlumnoJuegoDeControlDeTrabajoEnEquipo(juegoId: number, alumnoId: number): Observable<AlumnoJuegoDeControlDeTrabajoEnEquipo[]> {
    return this.http.get<AlumnoJuegoDeControlDeTrabajoEnEquipo[]>(this.APIUrlAlumnoJuegoDeControlDeTrabajoEnEquipo
        + '?filter[where][juegoDeControlDeTrabajoEnEquipoId]=' + juegoId +  '&filter[where][alumnoId]=' + alumnoId);
  }

  public CambiaEstadoJuegoDeControlDeTrabajoEnEquipo(juego: JuegoDeControlDeTrabajoEnEquipo): Observable<JuegoDeControlDeTrabajoEnEquipo> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeControlDeTrabajoEnEquipo>(this.APIUrlJuegoDeControlDeTrabajoEnEquipo + '/' + juego.id , juego);
  }

  public DameInscripcionesAlumnosJuegoDeControlDeTrabajoEnEquipo(juegoId: number): Observable<AlumnoJuegoDeControlDeTrabajoEnEquipo[]> {
    return this.http.get<AlumnoJuegoDeControlDeTrabajoEnEquipo[]>(this.APIUrlAlumnoJuegoDeControlDeTrabajoEnEquipo
      + '?filter[where][juegoDeControlDeTrabajoEnEquipoId]=' + juegoId);
  }


  public BorrarInscripcionAlumnoJuegoDeControlDeTrabajoEnEquipo(inscripcionId: number): Observable<AlumnoJuegoDeControlDeTrabajoEnEquipo> {
    return this.http.delete<AlumnoJuegoDeControlDeTrabajoEnEquipo>(this.APIUrlAlumnoJuegoDeControlDeTrabajoEnEquipo + '/' + inscripcionId);
  }

  public BorrarJuegoDeControlDeTrabajoEnEquipo(juegoId: number): Observable<JuegoDeControlDeTrabajoEnEquipo> {
    return this.http.delete<JuegoDeControlDeTrabajoEnEquipo>(this.APIUrlJuegoDeControlDeTrabajoEnEquipo + '/' + juegoId);
  }

  public CambiaEstadoJuegoDeCuestionarioSatisfaccion(juego: JuegoDeCuestionarioSatisfaccion): Observable<JuegoDeCuestionarioSatisfaccion> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeCuestionarioSatisfaccion>(this.APIUrlGrupos + '/' + juego.grupoId + '/juegoDeCuestionarioSatisfaccion/' + juego.id, juego);
  }
  
  public PonGanadorDelEnfrentamiento(enfrentamiento: EnfrentamientoLiga): Observable<EnfrentamientoLiga> {
    return this.http.put<EnfrentamientoLiga>(this.APIUrlEnfrentamientosLiga + '/' + enfrentamiento.id, enfrentamiento);
  }

  public PonPuntosAlumnoGanadorJuegoDeCompeticionLiga(alumnoGanadorJuegoDeCompeticionLiga: AlumnoJuegoDeCompeticionLiga): Observable<AlumnoJuegoDeCompeticionLiga> {
    return this.http.put<AlumnoJuegoDeCompeticionLiga>(this.APIUrlAlumnoJuegoDeCompeticionLiga + '/'
      + alumnoGanadorJuegoDeCompeticionLiga.id, alumnoGanadorJuegoDeCompeticionLiga);
  }

  public PonPuntosEquipoGanadorJuegoDeCompeticionLiga(ganadorJuegoDeCompeticionLiga: EquipoJuegoDeCompeticionLiga): Observable<EquipoJuegoDeCompeticionLiga> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<EquipoJuegoDeCompeticionLiga>(this.APIUrlEquipoJuegoDeCompeticionLiga + '/' + ganadorJuegoDeCompeticionLiga.id, ganadorJuegoDeCompeticionLiga);
  }

  public DameEquiposJuegoDeVotacionUnoATodos(juegoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeVotacionUnoATodos + '/' + juegoId + '/equipos');
  }

  public DameInscripcionesEquipoJuegoDeVotacionUnoATodos(juegoId: number): Observable<EquipoJuegoDeVotacionUnoATodos[]> {
    return this.http.get<EquipoJuegoDeVotacionUnoATodos[]>(this.APIUrlEquipoJuegoDeVotacionUnoATodos
      + '?filter[where][juegoDeVotacionUnoATodosId]=' + juegoId);
  }

  public DameInscripcionesAlumnoJuegoDeVotacionAOpciones(juegoId: number): Observable<AlumnoJuegoDeVotacionAOpciones[]> {
    return this.http.get<AlumnoJuegoDeVotacionAOpciones[]>(this.APIUrlAlumnoJuegoDeVotacionAOpciones
      + '?filter[where][juegoDeVotacionAOpcionesId]=' + juegoId);
  }

  public ModificaInscripcionAlumnoJuegoDeVotacionUnoATodos(inscripcion: AlumnoJuegoDeVotacionUnoATodos): Observable<AlumnoJuegoDeVotacionUnoATodos> {
    return this.http.put<AlumnoJuegoDeVotacionUnoATodos>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos + '/' + inscripcion.id, inscripcion);
  }

  public ModificaInscripcionEquipoJuegoDeVotacionUnoATodos(inscripcion: EquipoJuegoDeVotacionUnoATodos): Observable<EquipoJuegoDeVotacionUnoATodos> {
    return this.http.put<EquipoJuegoDeVotacionUnoATodos>(this.APIUrlEquipoJuegoDeVotacionUnoATodos + '/' + inscripcion.id, inscripcion);
  }

  public CambiaEstadoJuegoDeVotacionUnaATodos(juego: JuegoDeVotacionUnoATodos): Observable<JuegoDeVotacionUnoATodos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeVotacionUnoATodos>(this.APIUrlGrupos + '/' + juego.grupoId + '/juegoDeVotacionUnoATodos/' + juego.id, juego);
  }

  public CambiaEstadoJuegoDeVotacionTodosAUno(juego: JuegoDeVotacionTodosAUno): Observable<JuegoDeVotacionTodosAUno> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeVotacionTodosAUno>(this.APIUrlGrupos + '/' + juego.grupoId + '/juegoDeVotacionTodosAUno/' + juego.id, juego);
  }

  public CambiaEstadoJuegoDeVotacionAOpciones(juego: JuegoDeVotacionAOpciones): Observable<JuegoDeVotacionAOpciones> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeVotacionAOpciones>(this.APIUrlGrupos + '/' + juego.grupoId + '/juegoDeVotacionAOpciones/' + juego.id, juego);
  }

  
}

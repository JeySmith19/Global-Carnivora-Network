export class Evento {
  id: number = 0;
  nombre: string = "";
  fechaEvento: Date = new Date();
  horaInicio: string = ""; // "20:45"
  duracionSubastaMinutos: number = 10;
  descansoMinutos: number = 0;
  estado: string = "";
}

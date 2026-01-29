export class Subasta {
  id: number = 0;
  userId?: number;
  username?: string;
  phone?: string;
  city?: string;
  eventoId?: number;
  eventoNombre?: string;
  fechaEvento?: Date;
  horaInicio?: string;
  duracionSubastaMinutos?: number;
  descansoMinutos?: number;
  planta: string = "";
  maceta: string = "";
  observaciones: string = "";
  imagen: string = "";   
  estado: string = "PENDIENTE";
  precioBase: number = 0;
  numeroSubasta?: number;
  horaInicioAsignada?: string;
  horaFinAsignada?: string;
  showModal?: boolean;
}

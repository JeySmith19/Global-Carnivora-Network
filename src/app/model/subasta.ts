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

  planta: string = "";
  maceta: string = "";
  observaciones: string = "";

  // 👉 ESTE es el campo que usaremos
  imagen: string = "";   

  estado: string = "PENDIENTE";
  precioBase: number = 0;
}

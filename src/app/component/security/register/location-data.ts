// src/app/data/location-data.ts

export interface Region {
  name: string;
  mainCities: string[];
}

export interface Country {
  name: string;
  code: string;
  regions: Region[];
}

export const COUNTRIES: Country[] = [
{
    name: 'Perú',
    code: '51',
    regions: [
      { name: 'Amazonas', mainCities: ['Chachapoyas', 'Bagua Grande', 'Bagua', 'Rodríguez de Mendoza', 'Santa María de Nieva'] },
      { name: 'Áncash', mainCities: ['Huaraz', 'Chimbote', 'Casma', 'Huarmey', 'Caraz', 'Carhuaz', 'Huari'] },
      { name: 'Apurímac', mainCities: ['Abancay', 'Andahuaylas', 'Chalhuanca', 'Antabamba', 'Chincheros'] },
      { name: 'Arequipa', mainCities: ['Arequipa', 'Camaná', 'Mollendo', 'Aplao', 'Chivay', 'Caravelí'] },
      { name: 'Ayacucho', mainCities: ['Ayacucho', 'Huanta', 'Puquio', 'Cangallo', 'San Miguel', 'Vilcashuamán'] },
      { name: 'Cajamarca', mainCities: ['Cajamarca', 'Jaén', 'Chota', 'Celendín', 'Cutervo', 'Bambamarca', 'San Ignacio'] },
      { name: 'Callao', mainCities: ['Callao', 'Bellavista', 'Ventanilla', 'La Punta', 'Carmen de la Legua'] },
      { name: 'Cusco', mainCities: ['Cusco', 'Sicuani', 'Quillabamba', 'Urubamba', 'Calca', 'Espinar', 'Paucartambo'] },
      { name: 'Huancavelica', mainCities: ['Huancavelica', 'Lircay', 'Acobamba', 'Pampas', 'Castrovirreyna', 'Huaytará'] },
      { name: 'Huánuco', mainCities: ['Huánuco', 'Tingo María', 'Ambo', 'La Unión', 'Llata', 'Panao', 'Puerto Inca'] },
      { name: 'Ica', mainCities: ['Ica', 'Chincha Alta', 'Pisco', 'Nazca', 'Palpa', 'Paracas', 'Marcona'] },
      { name: 'Junín', mainCities: ['Huancayo', 'Tarma', 'La Merced', 'Satipo', 'Jauja', 'Concepción', 'La Oroya'] },
      { name: 'La Libertad', mainCities: ['Trujillo', 'Huamachuco', 'Pacasmayo', 'Chepén', 'Otuzco', 'Virú', 'Tayabamba'] },
      { name: 'Lambayeque', mainCities: ['Chiclayo', 'Lambayeque', 'Ferreñafe', 'Olmos', 'Motupe', 'Monsefú'] },
      { name: 'Lima', mainCities: ['Lima', 'Huacho', 'Huaral', 'Cañete', 'Barranca', 'Chosica', 'Matucana', 'Oyón'] },
      { name: 'Loreto', mainCities: ['Iquitos', 'Yurimaguas', 'Nauta', 'Requena', 'Contamana', 'Caballococha'] },
      { name: 'Madre de Dios', mainCities: ['Puerto Maldonado', 'Iñapari', 'Salvación', 'Mazuko'] },
      { name: 'Moquegua', mainCities: ['Moquegua', 'Ilo', 'Omate', 'Torata'] },
      { name: 'Pasco', mainCities: ['Cerro de Pasco', 'Oxapampa', 'Yanahuanca', 'Villa Rica', 'Pozuzo'] },
      { name: 'Piura', mainCities: ['Piura', 'Sullana', 'Paita', 'Talara', 'Chulucanas', 'Sechura', 'Ayabaca'] },
      { name: 'Puno', mainCities: ['Puno', 'Juliaca', 'Azángaro', 'Huancané', 'Ayaviri', 'Ilave', 'Juli', 'Yunguyo'] },
      { name: 'San Martín', mainCities: ['Moyobamba', 'Tarapoto', 'Juanjuí', 'Rioja', 'Lamas', 'Tocache', 'Saposoa'] },
      { name: 'Tacna', mainCities: ['Tacna', 'Tarata', 'Candarave', 'Locumba'] },
      { name: 'Tumbes', mainCities: ['Tumbes', 'Zarumilla', 'Zorritos'] },
      { name: 'Ucayali', mainCities: ['Pucallpa', 'Aguaytía', 'Atalaya', 'Esperanza', 'Campo Verde'] }
    ]
  },
  {
    name: 'México',
    code: '52',
    regions: [
      { name: 'Aguascalientes', mainCities: ['Aguascalientes', 'Jesús María', 'Calvillo'] },
      { name: 'Baja California', mainCities: ['Mexicali', 'Tijuana', 'Ensenada', 'Tecate', 'Rosarito'] },
      { name: 'Baja California Sur', mainCities: ['La Paz', 'Cabo San Lucas', 'San José del Cabo', 'Loreto'] },
      { name: 'Campeche', mainCities: ['San Francisco de Campeche', 'Ciudad del Carmen', 'Champotón'] },
      { name: 'Chiapas', mainCities: ['Tuxtla Gutiérrez', 'San Cristóbal de las Casas', 'Tapachula', 'Comitán'] },
      { name: 'Chihuahua', mainCities: ['Chihuahua', 'Ciudad Juárez', 'Cuauhtémoc', 'Delicias', 'Parral'] },
      { name: 'Ciudad de México', mainCities: ['Ciudad de México'] },
      { name: 'Coahuila', mainCities: ['Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Acuña'] },
      { name: 'Colima', mainCities: ['Colima', 'Manzanillo', 'Villa de Álvarez', 'Tecomán'] },
      { name: 'Durango', mainCities: ['Durango', 'Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro'] },
      { name: 'Estado de México', mainCities: ['Toluca de Lerdo', 'Ecatepec', 'Naucalpan', 'Tlalnepantla', 'Nezahualcóyotl'] },
      { name: 'Guanajuato', mainCities: ['Guanajuato', 'León', 'Irapuato', 'Celaya', 'Salamanca', 'San Miguel de Allende'] },
      { name: 'Guerrero', mainCities: ['Chilpancingo de los Bravo', 'Acapulco de Juárez', 'Iguala', 'Zihuatanejo'] },
      { name: 'Hidalgo', mainCities: ['Pachuca de Soto', 'Tulancingo', 'Tula de Allende', 'Tizayuca'] },
      { name: 'Jalisco', mainCities: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Puerto Vallarta', 'Lagos de Moreno'] },
      { name: 'Michoacán', mainCities: ['Morelia', 'Uruapan', 'Zamora', 'Lázaro Cárdenas'] },
      { name: 'Morelos', mainCities: ['Cuernavaca', 'Jiutepec', 'Cuautla'] },
      { name: 'Nayarit', mainCities: ['Tepic', 'Bahía de Banderas', 'Compostela'] },
      { name: 'Nuevo León', mainCities: ['Monterrey', 'Guadalupe', 'San Pedro Garza García', 'Apodaca', 'San Nicolás de los Garza'] },
      { name: 'Oaxaca', mainCities: ['Oaxaca de Juárez', 'San Juan Bautista Tuxtepec', 'Salina Cruz', 'Juchitán'] },
      { name: 'Puebla', mainCities: ['Puebla de Zaragoza', 'Tehuacán', 'San Andrés Cholula', 'Atlixco'] },
      { name: 'Querétaro', mainCities: ['Santiago de Querétaro', 'San Juan del Río', 'Corregidora'] },
      { name: 'Quintana Roo', mainCities: ['Chetumal', 'Cancún', 'Playa del Carmen', 'Cozumel'] },
      { name: 'San Luis Potosí', mainCities: ['San Luis Potosí', 'Ciudad Valles', 'Matehuala', 'Rioverde'] },
      { name: 'Sinaloa', mainCities: ['Culiacán Rosales', 'Mazatlán', 'Los Mochis', 'Guasave'] },
      { name: 'Sonora', mainCities: ['Hermosillo', 'Ciudad Obregón', 'Nogales', 'San Luis Río Colorado', 'Navojoa'] },
      { name: 'Tabasco', mainCities: ['Villahermosa', 'Cárdenas', 'Comalcalco', 'Paraíso'] },
      { name: 'Tamaulipas', mainCities: ['Ciudad Victoria', 'Reynosa', 'Matamoros', 'Nuevo Laredo', 'Tampico'] },
      { name: 'Tlaxcala', mainCities: ['Tlaxcala de Xicohténcatl', 'Huamantla', 'Apizaco'] },
      { name: 'Veracruz', mainCities: ['Xalapa-Enríquez', 'Veracruz', 'Coatzacoalcos', 'Orizaba', 'Poza Rica'] },
      { name: 'Yucatán', mainCities: ['Mérida', 'Kanasín', 'Valladolid', 'Tizimín'] },
      { name: 'Zacatecas', mainCities: ['Zacatecas', 'Fresnillo', 'Guadalupe', 'Jerez'] }
    ]
  },
  {
    name: 'Argentina',
    code: '54',
    regions: [
      { name: 'Ciudad Autónoma de Buenos Aires', mainCities: ['CABA'] },
      { name: 'Buenos Aires', mainCities: ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'Lanús', 'Quilmes', 'Pilar'] },
      { name: 'Catamarca', mainCities: ['San Fernando del Valle de Catamarca', 'Recreo', 'Belén'] },
      { name: 'Chaco', mainCities: ['Resistencia', 'Presidencia Roque Sáenz Peña', 'Villa Ángela'] },
      { name: 'Chubut', mainCities: ['Rawson', 'Comodoro Rivadavia', 'Trelew', 'Puerto Madryn', 'Esquel'] },
      { name: 'Córdoba', mainCities: ['Córdoba', 'Río Cuarto', 'Villa María', 'Villa Carlos Paz', 'San Francisco'] },
      { name: 'Corrientes', mainCities: ['Corrientes', 'Goya', 'Paso de los Libres', 'Curuzú Cuatiá'] },
      { name: 'Entre Ríos', mainCities: ['Paraná', 'Concordia', 'Gualeguaychú', 'Concepción del Uruguay'] },
      { name: 'Formosa', mainCities: ['Formosa', 'Clorinda', 'Pirané'] },
      { name: 'Jujuy', mainCities: ['San Salvador de Jujuy', 'San Pedro de Jujuy', 'Palpalá'] },
      { name: 'La Pampa', mainCities: ['Santa Rosa', 'General Pico'] },
      { name: 'La Rioja', mainCities: ['La Rioja', 'Chilecito', 'Aimogasta'] },
      { name: 'Mendoza', mainCities: ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Las Heras', 'Luján de Cuyo'] },
      { name: 'Misiones', mainCities: ['Posadas', 'Oberá', 'Eldorado', 'Puerto Iguazú'] },
      { name: 'Neuquén', mainCities: ['Neuquén', 'Cutral Có', 'Zapala', 'San Martín de los Andes'] },
      { name: 'Río Negro', mainCities: ['Viedma', 'San Carlos de Bariloche', 'General Roca', 'Cipolletti'] },
      { name: 'Salta', mainCities: ['Salta', 'San Ramón de la Nueva Orán', 'Tartagal', 'General Güemes'] },
      { name: 'San Juan', mainCities: ['San Juan', 'Rawson', 'Chimbas'] },
      { name: 'San Luis', mainCities: ['San Luis', 'Villa Mercedes', 'Merlo'] },
      { name: 'Santa Cruz', mainCities: ['Río Gallegos', 'Caleta Olivia', 'El Calafate', 'Puerto Deseado'] },
      { name: 'Santa Fe', mainCities: ['Santa Fe', 'Rosario', 'Rafaela', 'Venado Tuerto', 'Reconquista'] },
      { name: 'Santiago del Estero', mainCities: ['Santiago del Estero', 'La Banda', 'Termas de Río Hondo'] },
      { name: 'Tierra del Fuego', mainCities: ['Ushuaia', 'Río Grande', 'Tolhuin'] },
      { name: 'Tucumán', mainCities: ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo', 'Concepción'] }
    ]
  },
  {
    name: 'Ecuador',
    code: '593',
    regions: [
      { name: 'Azuay', mainCities: ['Cuenca', 'Gualaceo', 'Paute', 'Santa Isabel'] },
      { name: 'Bolívar', mainCities: ['Guaranda', 'San Miguel', 'Chimbo'] },
      { name: 'Cañar', mainCities: ['Azogues', 'La Troncal', 'Cañar'] },
      { name: 'Carchi', mainCities: ['Tulcán', 'Bolívar', 'Huaca'] },
      { name: 'Chimborazo', mainCities: ['Riobamba', 'Guano', 'Alausí', 'Chunchi'] },
      { name: 'Cotopaxi', mainCities: ['Latacunga', 'Pujilí', 'Salcedo', 'La Maná'] },
      { name: 'El Oro', mainCities: ['Machala', 'Pasaje', 'Santa Rosa', 'Huaquillas', 'Arenillas'] },
      { name: 'Esmeraldas', mainCities: ['Esmeraldas', 'Quinindé', 'Atacames', 'San Lorenzo'] },
      { name: 'Galápagos', mainCities: ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Puerto Villamil'] },
      { name: 'Guayas', mainCities: ['Guayaquil', 'Durán', 'Samborondón', 'Milagro', 'Daule', 'Playas', 'Empalme'] },
      { name: 'Imbabura', mainCities: ['Ibarra', 'Otavalo', 'Cotacachi', 'Atuntaqui'] },
      { name: 'Loja', mainCities: ['Loja', 'Catamayo', 'Cariamanga', 'Macará'] },
      { name: 'Los Ríos', mainCities: ['Babahoyo', 'Quevedo', 'Ventanas', 'Vinces', 'Buena Fe'] },
      { name: 'Manabí', mainCities: ['Portoviejo', 'Manta', 'Chone', 'Montecristi', 'Bahía de Caráquez', 'Jipijapa', 'El Carmen'] },
      { name: 'Morona Santiago', mainCities: ['Macas', 'Gualaquiza', 'Sucúa'] },
      { name: 'Napo', mainCities: ['Tena', 'Archidona', 'Baeza'] },
      { name: 'Orellana', mainCities: ['Puerto Francisco de Orellana', 'La Joya de los Sachas', 'Loreto'] },
      { name: 'Pastaza', mainCities: ['Puyo', 'Mera', 'Santa Clara'] },
      { name: 'Pichincha', mainCities: ['Quito', 'Sangolquí', 'Machachi', 'Cayambe', 'Puerto Quito'] },
      { name: 'Santa Elena', mainCities: ['Santa Elena', 'La Libertad', 'Salinas'] },
      { name: 'Santo Domingo de los Tsáchilas', mainCities: ['Santo Domingo', 'La Concordia'] },
      { name: 'Sucumbíos', mainCities: ['Nueva Loja', 'Shushufindi', 'Putumayo'] },
      { name: 'Tungurahua', mainCities: ['Ambato', 'Baños de Agua Santa', 'Pelileo', 'Píllaro'] },
      { name: 'Zamora Chinchipe', mainCities: ['Zamora', 'Yantzaza', 'Zumba'] }
    ]
  }
];
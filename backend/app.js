import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Esquema para Alumno
const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  asignatura: String,
  nota: Number
});
const corsOptions = {
    origin: [
    'http://localhost:5173',  // si quieres permitir también vite corriendo local
    'http://localhost:8080'   // el contenedor que acabas de mapear
  ],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

 

const AlumnoModel = mongoose.model('Alumno', AlumnoSchema);

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Conexión a MongoDB
mongoose.connect('mongodb://daw:abc123.@base_datos:27017/test?authSource=admin');

// GET - Listar todos los alumnos
app.get('/alumnos', async (_req, res) => {
  try {
    console.log('Listando alumnos...');
    const alumnos = await AlumnoModel.find();
    // Calcular el 30% de la nota para cada alumno
    const alumnosConCalculo = alumnos.map(alumno => ({
      ...alumno.toObject(),
      notaParcial: (alumno.nota * 0.3).toFixed(2)
    }));
    return res.json(alumnosConCalculo);
  } catch (error) {
    return res.status(500).json({ error: 'Error al listar alumnos' });
  }
});

// POST - Crear un nuevo alumno
app.post('/alumnos', async (req, res) => {
  try {
    const { nombre, asignatura, nota } = req.body;
    console.log('Creando nuevo alumno...');
    const nuevoAlumno = await AlumnoModel.create({ 
      nombre, 
      asignatura, 
      nota: Number(nota)
    });
    return res.status(201).json(nuevoAlumno);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear alumno' });
  }
});

// DELETE - Eliminar un alumno
app.delete('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Eliminando alumno...');
    await AlumnoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar alumno' });
  }
});

app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, GraduationCap } from 'lucide-react';

interface Alumno {
  _id: string;
  nombre: string;
  asignatura: string;
  nota: number;
  notaParcial: number;
}

function App() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [nota, setNota] = useState('');

  const fetchAlumnos = async () => {
    try {
      const response = await fetch('http://localhost:3000/alumnos');
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/alumnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, asignatura, nota: Number(nota) }),
      });
      setNombre('');
      setAsignatura('');
      setNota('');
      fetchAlumnos();
    } catch (error) {
      console.error('Error al crear alumno:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'DELETE',
      });
      fetchAlumnos();
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Gestión de Alumnos</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Alumno</h2>
          <form onSubmit={handleSubmit} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 border"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Asignatura</label>
              <input
                type="text"
                value={asignatura}
                onChange={(e) => setAsignatura(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 border"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nota</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 border"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Agregar
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">30% de la Nota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alumnos.map((alumno) => (
                <tr key={alumno._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{alumno.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{alumno.asignatura}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{alumno.nota}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{alumno.notaParcial}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(alumno._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
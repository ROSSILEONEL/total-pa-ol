"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const cursosPorAnio = {
  "1º Año": ["1-1", "1-2", "1-3", "1-4"],
  "2º Año": ["2-1", "2-2", "2-3", "2-4"],
  "3º Año": ["3-1", "3-2", "3-3", "3-4"],
  "4º Año": ["4-1", "4-2", "4-3", "4-4"],
  "5º Año": ["5-1", "5-2", "5-3", "5-4"],
  "6º Año": ["6-1", "6-2", "6-3", "6-4"],
  "7º Año": ["7-1", "7-2", "7-3", "7-4"]
};

export default function NetbookCard({ netbook }: { netbook: any }) {
  const [estado, setEstado] = useState(netbook.estado);
  const [curso, setCurso] = useState(netbook.curso);
  const [docente, setDocente] = useState(netbook.docente);
  const [alumno, setAlumno] = useState(netbook.alumno);
  const [descripcion, setDescripcion] = useState(netbook.Descripcion);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`netbook-${netbook.id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setEstado(parsed.estado);
      setCurso(parsed.curso);
      setDocente(parsed.docente);
      setAlumno(parsed.alumno);
    }
  }, [netbook.id]);

  const saveToLocalStorage = (data: any) => {
    localStorage.setItem(`netbook-${netbook.id}`, JSON.stringify(data));
  };

  const handleClick = () => {
    
    if (!showModal) {
      if (estado === "En mantenimiento") {
        Swal.fire({
          title: "En Mantenimiento!",
          text: "No se puede cambiar el estado porque esta net esta en mantenimiento!",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      const newEstado = estado === "Disponible" ? "En uso" : "Disponible";
      setEstado(newEstado);
      const updated = { estado: newEstado, curso, docente, alumno };
      saveToLocalStorage(updated);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === "curso") setCurso(value);
    if (field === "docente") setDocente(value);
    if (field === "alumno") setAlumno(value);
    const updated = {
      estado,
      curso: field === "curso" ? value : curso,
      docente: field === "docente" ? value : docente,
      alumno: field === "alumno" ? value : alumno,
    };
    saveToLocalStorage(updated);
  };

  const handleCursoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se dispare el cambio de estado
    setShowModal(true);
  };

  const selectCurso = (c: string) => {
    setCurso(c);
    handleChange("curso", c);
    setShowModal(false);
  };

  let bgColor = estado === "Disponible" ? "bg-green-600" : "bg-red-500" 
  if (estado === "En mantenimiento") {
    bgColor= "bg-blue-800 ";}
  return (
    <>
      <div
        className={`p-2  rounded-xl shadow-md text-white cursor-pointer transition-colors duration-600 ${bgColor}`}
        onClick={handleClick}
      >
        <h2 className="text-sm font-bold">Net #{netbook.numero}</h2>
        <p className="text-xs"><strong>Estado:</strong> {estado}</p>
        <div className="mt-1">
          <label className="inline-block text-xs">Curso:</label>
          <input
            type="text"
            value={curso}
            readOnly
            onClick={handleCursoClick}
            className="w-full text-xs ml-1 px-2 inline-block py-1 text-black rounded cursor-pointer bg-white"
          />
          <label className="inline-block text-sm mt-1">Docente:</label>
          <input
            type="text"
            value={docente}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChange("docente", e.target.value)}
            className="w-auto px-1 py-1 text-black rounded"
          />
          <label className="block w-auto text-sm mt-1">Alumno:</label>
          <input
            type="text"
            value={alumno}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChange("alumno", e.target.value)}
            className="w-auto px-1 py-1 text-black rounded"
          />
          <label className="block w-auto text-sm mt-1">Descripción:</label>
          <textarea 
            value={descripcion}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-auto px-1 py-1 text-black rounded"
          />
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-2 rounded-xl shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-black">Selecciona un curso</h3>
            <div className="space-y-3">
              {Object.entries(cursosPorAnio).map(([anio, cursos]) => (
                <div key={anio}>
                  <p className="font-semibold text-sm text-gray-700 mb-1">{anio}</p>
                  <div className="flex flex-wrap gap-2">
                    {cursos.map((c) => (
                      <button
                        key={c}
                        onClick={() => selectCurso(c)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { pool } from '../db.js';

// Obtener todas las citas
export const obtenerCitas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Citas.*, Usuarios.nombre AS nombre_usuario, Scooters.modelo AS modelo_scooter
      FROM Citas
      JOIN Usuarios ON Citas.id_usuario = Usuarios.id_usuario
      JOIN Scooters ON Citas.id_scooter = Scooters.id_scooter
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

// Obtener citas por ID
export const obtenerCitaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Citas WHERE id_cita = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
};

// 🔹 Obtener citas por usuario
export const obtenerCitasPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [rows] = await pool.query(`
      SELECT Citas.*, Usuarios.nombre AS nombre_usuario, Scooters.modelo AS modelo_scooter
      FROM Citas
      JOIN Usuarios ON Citas.id_usuario = Usuarios.id_usuario
      JOIN Scooters ON Citas.id_scooter = Scooters.id_scooter
      WHERE Citas.id_usuario = ?
    `, [id_usuario]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas del usuario' });
  }
};

// Crear una nueva cita
export const crearCita = async (req, res) => {
  try {
    const { id_usuario, id_scooter, fecha_hora } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Citas (id_usuario, id_scooter, fecha_hora) VALUES (?, ?, ?)',
      [id_usuario, id_scooter, fecha_hora]
    );
    res.status(201).json({ message: 'Cita creada', id_cita: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Actualizar una cita
export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_hora, estado_cita } = req.body;
    const [result] = await pool.query(
      'UPDATE Citas SET fecha_hora = ?, estado_cita = ? WHERE id_cita = ?',
      [fecha_hora, estado_cita, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json({ message: 'Cita actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

// Eliminar una cita
export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Citas WHERE id_cita = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};

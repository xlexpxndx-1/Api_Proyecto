import { pool } from '../db.js'

// Obtener todos los historiales
export const obtenerHistorial = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT HistorialMantenimiento.*, 
             Scooters.marca, 
             Scooters.modelo, 
             Servicios.nombre_servicio
      FROM HistorialMantenimiento
      JOIN Scooters ON HistorialMantenimiento.id_scooter = Scooters.id_scooter
      JOIN Servicios ON HistorialMantenimiento.id_servicio = Servicios.id_servicio
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de mantenimientos' })
  }
}

// Obtener historial por ID
export const obtenerHistorialPorId = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM HistorialMantenimiento WHERE id_historial = ?', [id])
    if (rows.length === 0) return res.status(404).json({ message: 'Historial no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' })
  }
}

// Crear nuevo historial
export const crearHistorial = async (req, res) => {
  try {
    const { id_scooter, id_servicio, fecha_mantenimiento, tecnico, detalle } = req.body
    const [result] = await pool.query(
      'INSERT INTO HistorialMantenimiento (id_scooter, id_servicio, fecha_mantenimiento, tecnico, detalle) VALUES (?, ?, ?, ?, ?)',
      [id_scooter, id_servicio, fecha_mantenimiento, tecnico, detalle]
    )
    res.status(201).json({ message: 'Historial creado', id_historial: result.insertId })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear historial' })
  }
}

// Actualizar historial existente
export const actualizarHistorial = async (req, res) => {
  try {
    const { id } = req.params
    const { id_scooter, id_servicio, fecha_mantenimiento, tecnico, detalle } = req.body
    const [result] = await pool.query(
      'UPDATE HistorialMantenimiento SET id_scooter = ?, id_servicio = ?, fecha_mantenimiento = ?, tecnico = ?, detalle = ? WHERE id_historial = ?',
      [id_scooter, id_servicio, fecha_mantenimiento, tecnico, detalle, id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Historial no encontrado' })
    res.json({ message: 'Historial actualizado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar historial' })
  }
}

// Eliminar un historial
export const eliminarHistorial = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM HistorialMantenimiento WHERE id_historial = ?', [id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Historial no encontrado' })
    res.json({ message: 'Historial eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historial' })
  }
}

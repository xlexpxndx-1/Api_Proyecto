import { pool } from '../db.js'

// Obtener todos los detalles de cita con info de servicio y cita
export const obtenerDetallesCita = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DetalleCita.*, 
             Servicios.nombre_servicio, 
             Servicios.tipo_servicio, 
             Citas.fecha_hora
      FROM DetalleCita
      JOIN Servicios ON DetalleCita.id_servicio = Servicios.id_servicio
      JOIN Citas ON DetalleCita.id_cita = Citas.id_cita
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de cita' })
  }
}

// Obtener un detalle específico por ID de Detalle (id_detalle)
export const obtenerDetalleCitaPorId = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM DetalleCita WHERE id_detalle = ?', [id])
    if (rows.length === 0) return res.status(404).json({ message: 'Detalle no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el detalle' })
  }
}

// ✅ Obtener todos los detalles por ID de Cita (id_cita)
export const obtenerDetallesPorIdCita = async (req, res) => {
  const { id_cita } = req.params
  try {
    const [rows] = await pool.query(`
      SELECT DetalleCita.*, 
             Servicios.nombre_servicio, 
             Servicios.tipo_servicio,
             Citas.fecha_hora
      FROM DetalleCita
      JOIN Servicios ON DetalleCita.id_servicio = Servicios.id_servicio
      JOIN Citas ON DetalleCita.id_cita = Citas.id_cita
      WHERE DetalleCita.id_cita = ?
    `, [id_cita])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Sin detalles para esta cita' })
    }

    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles por cita' })
  }
}

// Crear un nuevo detalle de cita
export const crearDetalleCita = async (req, res) => {
  try {
    const { id_cita, id_servicio, observaciones } = req.body
    const [result] = await pool.query(
      'INSERT INTO DetalleCita (id_cita, id_servicio, observaciones) VALUES (?, ?, ?)',
      [id_cita, id_servicio, observaciones]
    )
    res.status(201).json({ message: 'Detalle creado', id_detalle: result.insertId })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el detalle' })
  }
}

// Actualizar un detalle existente
export const actualizarDetalleCita = async (req, res) => {
  try {
    const { id } = req.params
    const { id_cita, id_servicio, observaciones } = req.body
    const [result] = await pool.query(
      'UPDATE DetalleCita SET id_cita = ?, id_servicio = ?, observaciones = ? WHERE id_detalle = ?',
      [id_cita, id_servicio, observaciones, id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' })
    res.json({ message: 'Detalle actualizado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el detalle' })
  }
}

// Eliminar un detalle por ID
export const eliminarDetalleCita = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM DetalleCita WHERE id_detalle = ?', [id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' })
    res.json({ message: 'Detalle eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el detalle' })
  }
}

import { pool } from '../db.js'

// Obtener todas las notificaciones
export const obtenerNotificaciones = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT n.*, u.nombre 
      FROM Notificaciones n
      JOIN Usuarios u ON n.id_usuario = u.id_usuario
      ORDER BY n.fecha_envio DESC
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener notificaciones' })
  }
}

// Obtener notificaciones por ID de usuario
export const obtenerNotificacionesPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params
    const [rows] = await pool.query(
      `SELECT * FROM Notificaciones WHERE id_usuario = ? ORDER BY fecha_envio DESC`,
      [id_usuario]
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener notificaciones del usuario' })
  }
}

// Crear nueva notificación
export const crearNotificacion = async (req, res) => {
  try {
    const { id_usuario, titulo, mensaje } = req.body
    if (!id_usuario || !titulo || !mensaje) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const [result] = await pool.query(
      `INSERT INTO Notificaciones (id_usuario, titulo, mensaje)
       VALUES (?, ?, ?)`,
      [id_usuario, titulo, mensaje]
    )

    res.status(201).json({ message: 'Notificación creada', id_notificacion: result.insertId })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear notificación' })
  }
}

// Marcar como leída
export const marcarComoLeida = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query(
      `UPDATE Notificaciones SET leida = 1 WHERE id_notificacion = ?`,
      [id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notificación no encontrada' })
    }
    res.json({ message: 'Notificación marcada como leída' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar notificación' })
  }
}

// Eliminar notificación
export const eliminarNotificacion = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query(
      `DELETE FROM Notificaciones WHERE id_notificacion = ?`,
      [id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notificación no encontrada' })
    }
    res.json({ message: 'Notificación eliminada' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar notificación' })
  }
}

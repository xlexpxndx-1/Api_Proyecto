import { pool } from '../db.js'

// Obtener todos los servicios
export const obtenerServicios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Servicios ORDER BY id_servicio DESC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' })
  }
}

// Obtener servicio por ID
export const obtenerServicioPorId = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM Servicios WHERE id_servicio = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el servicio' })
  }
}

// Crear nuevo servicio
export const crearServicio = async (req, res) => {
  try {
    const { nombre_servicio, tipo_servicio, descripcion } = req.body

    if (!nombre_servicio || !tipo_servicio) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const [result] = await pool.query(
      `INSERT INTO Servicios (nombre_servicio, tipo_servicio, descripcion)
       VALUES (?, ?, ?)`,
      [nombre_servicio, tipo_servicio, descripcion]
    )

    res.status(201).json({ message: 'Servicio creado', id_servicio: result.insertId })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio' })
  }
}

// Actualizar servicio
export const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre_servicio, tipo_servicio, descripcion } = req.body

    const [result] = await pool.query(
      `UPDATE Servicios SET nombre_servicio = ?, tipo_servicio = ?, descripcion = ? 
       WHERE id_servicio = ?`,
      [nombre_servicio, tipo_servicio, descripcion, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    res.json({ message: 'Servicio actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' })
  }
}

// Eliminar servicio
export const eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await pool.query('DELETE FROM Servicios WHERE id_servicio = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    res.json({ message: 'Servicio eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el servicio' })
  }
}

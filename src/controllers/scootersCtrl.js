import { pool } from '../db.js'

// Obtener todos los scooters
export const obtenerScooters = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.*, u.nombre AS nombre_usuario 
      FROM Scooters s
      JOIN Usuarios u ON s.id_usuario = u.id_usuario
      ORDER BY s.id_scooter DESC
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener scooters' })
  }
}

// Obtener scooter por ID
export const obtenerScooterPorId = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query(
      `SELECT * FROM Scooters WHERE id_scooter = ?`,
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Scooter no encontrado' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener scooter' })
  }
}

// Obtener scooters por ID de usuario
export const obtenerScootersPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params
    const [rows] = await pool.query(
      `SELECT * FROM Scooters WHERE id_usuario = ?`,
      [id_usuario]
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener scooters del usuario' })
  }
}

// Crear un nuevo scooter
export const crearScooter = async (req, res) => {
  try {
    const { id_usuario, marca, modelo, anio, numero_serie, imagen_url = null } = req.body

    if (!id_usuario || !marca || !modelo || !anio || !numero_serie) {
      return res.status(400).json({ message: 'Todos los campos obligatorios' })
    }

    const [result] = await pool.query(
      `INSERT INTO Scooters (id_usuario, marca, modelo, año, numero_serie, imagen_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_usuario, marca, modelo, anio, numero_serie, imagen_url]
    )

    res.status(201).json({ message: 'Scooter creado', id_scooter: result.insertId })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'El número de serie ya existe' })
    } else {
      res.status(500).json({ error: 'Error al crear scooter' })
    }
  }
}

// Actualizar scooter
export const actualizarScooter = async (req, res) => {
  try {
    const { id } = req.params
    const { marca, modelo, anio, numero_serie, imagen_url = null } = req.body

    const [result] = await pool.query(
      `UPDATE Scooters SET marca = ?, modelo = ?, año = ?, numero_serie = ?, imagen_url = ? 
       WHERE id_scooter = ?`,
      [marca, modelo, anio, numero_serie, imagen_url, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Scooter no encontrado' })
    }

    res.json({ message: 'Scooter actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar scooter' })
  }
}

// Eliminar scooter
export const eliminarScooter = async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await pool.query(
      `DELETE FROM Scooters WHERE id_scooter = ?`,
      [id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Scooter no encontrado' })
    }

    res.json({ message: 'Scooter eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar scooter' })
  }
}

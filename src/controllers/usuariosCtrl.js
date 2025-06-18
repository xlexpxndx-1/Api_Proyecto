import { pool } from '../db.js'

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_usuario, nombre, correo, rol, fecha_registro, imagen_url 
      FROM Usuarios 
      ORDER BY id_usuario DESC
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query(`
      SELECT id_usuario, nombre, correo, rol, fecha_registro, imagen_url 
      FROM Usuarios 
      WHERE id_usuario = ?
    `, [id])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' })
  }
}

// Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol, imagen_url = null } = req.body

    if (!nombre || !correo || !contraseña || !rol) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const [result] = await pool.query(`
      INSERT INTO Usuarios (nombre, correo, contraseña, rol, imagen_url) 
      VALUES (?, ?, ?, ?, ?)
    `, [nombre, correo, contraseña, rol, imagen_url])

    res.status(201).json({ message: 'Usuario creado', id_usuario: result.insertId })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'El correo ya está registrado' })
    } else {
      res.status(500).json({ error: 'Error al crear el usuario' })
    }
  }
}

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, correo, contraseña, rol, imagen_url = null } = req.body

    const [result] = await pool.query(`
      UPDATE Usuarios 
      SET nombre = ?, correo = ?, contraseña = ?, rol = ?, imagen_url = ?
      WHERE id_usuario = ?
    `, [nombre, correo, contraseña, rol, imagen_url, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}

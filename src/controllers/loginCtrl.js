import { pool } from '../db.js'

// Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body

    // Validar campos obligatorios
    if (!correo || !contraseña) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' })
    }

    // Buscar usuario por correo
    const [rows] = await pool.query(
      'SELECT id_usuario, nombre, correo, rol FROM Usuarios WHERE correo = ? AND contraseña = ?',
      [correo, contraseña]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' })
    }

    // Usuario autenticado
    res.status(200).json({
      message: 'Login exitoso',
      usuario: rows[0]
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

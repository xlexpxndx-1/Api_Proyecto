import { Router } from 'express'
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuariosCtrl.js'

const router = Router()

// Rutas de usuarios
router.get('/usuarios', obtenerUsuarios)
router.get('/usuarios/:id', obtenerUsuarioPorId)
router.post('/usuarios', crearUsuario)
router.put('/usuarios/:id', actualizarUsuario)
router.delete('/usuarios/:id', eliminarUsuario)
router.put('/usuarios/:id', actualizarUsuario);

export default router



//import usuariosRoutes from './routes/usuarios.routes.js'
//app.use('/api', usuariosRoutes)

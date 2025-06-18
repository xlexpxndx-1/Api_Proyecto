import { Router } from 'express'
import {
  obtenerScooters,
  obtenerScooterPorId,
  obtenerScootersPorUsuario,
  crearScooter,
  actualizarScooter,
  eliminarScooter
} from '../controllers/scootersCtrl.js'

const router = Router()

// GET todos
router.get('/scooters', obtenerScooters)

// GET por ID
router.get('/scooters/:id', obtenerScooterPorId)

// GET por usuario
router.get('/scooters/usuario/:id_usuario', obtenerScootersPorUsuario)

// POST nuevo
router.post('/scooters', crearScooter)

// PUT actualizar
router.put('/scooters/:id', actualizarScooter)

// DELETE
router.delete('/scooters/:id', eliminarScooter)

export default router

//importar en app.js
//import scootersRoutes from './routes/scooters.routes.js'
//app.use('/api', scootersRoutes)

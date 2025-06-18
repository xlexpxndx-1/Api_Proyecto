import { Router } from 'express'
import {
  obtenerServicios,
  obtenerServicioPorId,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../controllers/serviciosCtrl.js'

const router = Router()

// GET todos los servicios
router.get('/servicios', obtenerServicios)

// GET servicio por ID
router.get('/servicios/:id', obtenerServicioPorId)

// POST nuevo servicio
router.post('/servicios', crearServicio)

// PUT actualizar servicio
router.put('/servicios/:id', actualizarServicio)

// DELETE eliminar servicio
router.delete('/servicios/:id', eliminarServicio)

export default router


//import serviciosRoutes from './routes/servicios.routes.js'
//app.use('/api', serviciosRoutes)

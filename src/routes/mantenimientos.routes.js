import { Router } from 'express'
import {
  obtenerHistorial,
  obtenerHistorialPorId,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial
} from '../controllers/mantenimientosCtrl.js'

const router = Router()

// GET todos
router.get('/historial', obtenerHistorial)

// GET uno por ID
router.get('/historial/:id', obtenerHistorialPorId)

// POST crear
router.post('/historial', crearHistorial)

// PUT actualizar
router.put('/historial/:id', actualizarHistorial)

// DELETE eliminar
router.delete('/historial/:id', eliminarHistorial)

export default router



// en app.js 
//import mantenimientosRoutes from './routes/mantenimientos.routes.js'
//app.use('/api', mantenimientosRoutes)

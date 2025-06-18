import { Router } from 'express'
import {
  obtenerHistorial,
  obtenerHistorialPorId,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial
} from '../controllers/historialCtrl.js'

const router = Router()

// Ruta base: /api/historial

router.get('/historial', obtenerHistorial)
router.get('/historial/:id', obtenerHistorialPorId)
router.post('/historial', crearHistorial)
router.put('/historial/:id', actualizarHistorial)
router.delete('/historial/:id', eliminarHistorial)

export default router

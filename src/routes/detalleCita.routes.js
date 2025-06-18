import { Router } from 'express'
import {
  obtenerDetallesCita,
  obtenerDetalleCitaPorId,
  obtenerDetallesPorIdCita, // ✅ nueva función
  crearDetalleCita,
  actualizarDetalleCita,
  eliminarDetalleCita
} from '../controllers/detalleCitaCtrl.js'

const router = Router()

// Ruta base: /api/detallecita

router.get('/detallecita', obtenerDetallesCita)
router.get('/detallecita/cita/:id_cita', obtenerDetallesPorIdCita) // ✅ NUEVA RUTA
router.get('/detallecita/:id', obtenerDetalleCitaPorId)
router.post('/detallecita', crearDetalleCita)
router.put('/detallecita/:id', actualizarDetalleCita)
router.delete('/detallecita/:id', eliminarDetalleCita)

export default router

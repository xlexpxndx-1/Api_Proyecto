import { Router } from 'express';
import {
  obtenerCitas,
  obtenerCitaPorId,
  obtenerCitasPorUsuario, // Importamos la nueva función
  crearCita,
  actualizarCita,
  eliminarCita
} from '../controllers/citasCtrl.js';

const router = Router();

// Ruta base: /api/citas

router.get('/citas', obtenerCitas);
router.get('/citas/:id', obtenerCitaPorId);
router.get('/citas/usuario/:id_usuario', obtenerCitasPorUsuario); // 🔹 Ruta nueva
router.post('/citas', crearCita);
router.put('/citas/:id', actualizarCita);
router.delete('/citas/:id', eliminarCita);

export default router;

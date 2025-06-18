import { Router } from 'express'
import {
  obtenerNotificaciones,
  obtenerNotificacionesPorUsuario,
  crearNotificacion,
  marcarComoLeida,
  eliminarNotificacion
} from '../controllers/notificacionesCtrl.js'

const router = Router()

// Obtener todas las notificaciones
router.get('/notificaciones', obtenerNotificaciones)

// Obtener notificaciones por usuario
router.get('/notificaciones/usuario/:id_usuario', obtenerNotificacionesPorUsuario)

// Crear una nueva notificación
router.post('/notificaciones', crearNotificacion)

// Marcar como leída (PATCH es lo correcto para actualización parcial)
router.patch('/notificaciones/:id/leida', marcarComoLeida)

// Eliminar una notificación
router.delete('/notificaciones/:id', eliminarNotificacion)

export default router

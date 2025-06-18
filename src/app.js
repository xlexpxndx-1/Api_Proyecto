import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Importar rutas correctamente
import usuariosRoutes from './routes/usuarios.routes.js'
import scootersRoutes from './routes/scooters.routes.js'
import serviciosRoutes from './routes/servicios.routes.js'
import citasRoutes from './routes/citas.routes.js'
import detalleCitaRoutes from './routes/detalleCita.routes.js'
import historialRoutes from './routes/historial.routes.js'
import notificacionesRoutes from './routes/notificaciones.routes.js'
import loginRoutes from './routes/login.routes.js'
import mantenimientosRoutes from './routes/mantenimientos.routes.js'

// Para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuración CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Rutas de la API
app.use('/api', usuariosRoutes)
app.use('/api', scootersRoutes)
app.use('/api', serviciosRoutes)
app.use('/api', citasRoutes)
app.use('/api', detalleCitaRoutes)
app.use('/api', historialRoutes)
app.use('/api', notificacionesRoutes)
app.use('/api', loginRoutes)
app.use('/api', mantenimientosRoutes)

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

export default app

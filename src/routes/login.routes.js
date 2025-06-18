import { Router } from 'express'
import { loginUsuario } from '../controllers/loginCtrl.js'

const router = Router()

// Ruta: /api/login
router.post('/login', loginUsuario)

export default router


//import loginRoutes from './routes/login.routes.js'
//app.use('/api', loginRoutes)
//Asegúrate de agregar esta ruta en tu archivo app.js:
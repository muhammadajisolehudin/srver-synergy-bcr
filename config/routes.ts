import express, { Request, Response, NextFunction, Router } from 'express';
import * as controllers from '../app/controllers';
import uploadeHandler from '../app/middlewares/uploadeHandler';
import { auth, isAdmin, isSuperAdmin } from '../app/middlewares/auth';
import path from 'path';

const apiRouter: Router = express.Router();

apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);
apiRouter.post('/api/v1/register', controllers.api.v1.authController.register);

apiRouter.post('/api/v1/su/register', auth, isSuperAdmin, controllers.api.v1.adminRegistrationController.register);

apiRouter.get('/api/v1/cars', auth, controllers.api.v1.carController.list);
apiRouter.get('/api/v1/cars/search', auth, isAdmin, controllers.api.v1.carController.search);
apiRouter.get('/api/v1/cars/:id',auth , controllers.api.v1.carController.show);
apiRouter.post('/api/v1/cars', auth, isAdmin, uploadeHandler.single('img'), controllers.api.v1.carController.create);
apiRouter.put('/api/v1/cars/:id', auth, isAdmin, uploadeHandler.single('img'), controllers.api.v1.carController.update);
apiRouter.delete('/api/v1/cars/:id', auth, isAdmin, controllers.api.v1.carController.destroy);

// Konfigurasi Express untuk menyediakan akses file statis dari direktori uploads
const UPLOAD_DIR = path.join(__dirname, '../uploads');
apiRouter.use('/uploads', express.static(UPLOAD_DIR));

apiRouter.get('/api/v1/errors', (req: Request, res: Response, next: NextFunction) => {
  throw new Error(
    'The Industrial Revolution and its consequences have been a disaster for the human race.'
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

export default apiRouter;

import { json } from 'body-parser';
import { Router, Request, Response } from 'express';
import { DbConfig } from './config';
import { errNotFound } from './pkg/domain/models/errors';
import ContainerBuilder from './pkg/registry/containers';

const router: Router = Router();

const ctnBuilder = new ContainerBuilder();
const getterCtn = ctnBuilder.newPostGetterCtn(DbConfig.user, DbConfig.host, DbConfig.database, DbConfig.password, DbConfig.port);
const writerCtn = ctnBuilder.newPostWriterCtn(DbConfig.user, DbConfig.host, DbConfig.database, DbConfig.password, DbConfig.port);
const deleterCtn = ctnBuilder.newPostDeleterCtn(DbConfig.user, DbConfig.host, DbConfig.database, DbConfig.password, DbConfig.port);


type routeHandler = {

    path: string,
    method: string,
    handler: (req: Request, res: Response) => void

}

type resMessage = {

    status: number,
    message: string

}

const routesHandler = {
    get: 
        [
            {

                path: '/getPosts',
                method: 'get',
                handler: async (_req: Request, res: Response) => {
                    getterCtn.getPosts().then(posts => {
                        
                        res.statusCode = 200;
                        res.send(posts);

                    }).catch(err => {

                        let statusCode = 500;
                        if (err === errNotFound) {

                            statusCode = 404;

                        } 

                        res.statusCode = statusCode;
   
                        const resMessage: resMessage = {
                            status: statusCode,
                            message: err.message
                        }

                        res.json(resMessage);


                    });
                }
            } as routeHandler,
            {
                path: '/getPost/byId/:id',
                method: 'get',
                handler: async (req: Request, res: Response) => {
                    const id = req.params.id;
                    var idNumber: number = +id;
                    getterCtn.getPostById(idNumber).then(post => {

                        res.statusCode = 200;
                        res.json(post);

                    }).catch(err => {

                        let statusCode = 500;
                        if (err === errNotFound) {

                            statusCode = 404;

                        } 

                        res.statusCode = statusCode;
   
                        const resMessage: resMessage = {
                            status: statusCode,
                            message: err.message
                        }

                        res.json(resMessage);

                    });
                }
            } as routeHandler,
    ],
    post: 
        [
           {
                path: '/createPost',
                method: 'post',
                handler: async (req: Request, res: Response) => {
                    const post = req.body;
                    writerCtn.insertPost(post).then(() => {

                        res.statusCode = 200;
                        const resMessage: resMessage = {

                            status: 200,
                            message: `Post inserted on DB`

                        }
                        res.json(resMessage);
                        
                    }).catch(err => {

                        let statusCode = 500;
                        const resMessage: resMessage = {

                            status: statusCode,
                            message: err.message

                        }

                        res.statusCode = statusCode;
                        res.json(resMessage);
                    });
                }
            } as routeHandler,
            {
                path: '/updatePost/:id',
                method: 'post',
                handler: async (req: Request, res: Response) => {
                    const id = req.params.id;
                    const idNumber: number = +id;
                    const post = req.body;
                    writerCtn.updatePost(idNumber, post).then(() => {

                        res.statusCode = 200;
                        const resMessage: resMessage = {

                            status: 200,
                            message: `Post with id ${id} was updated`

                        }

                        res.json(resMessage);

                    }).catch(err => {

                        let statusCode = 500;
                        if (err === errNotFound) {

                            statusCode = 404;

                        } 

                        res.statusCode = statusCode;
   
                        const resMessage: resMessage = {
                            status: statusCode,
                            message: err.message
                        }

                        res.json(resMessage);

                    });
                }
            } as routeHandler,
            {
                path: '/deletePost/:id',
                method: 'post',
                handler: async (req: Request, res: Response) => {
                    const id = req.params.id;
                    const idNumber: number = +id;
                    deleterCtn.deletePost(idNumber).then(() => {

                        res.statusCode = 200;
                        const resMessage: resMessage = {

                            status: 200,
                            message: `Post with id ${id} was deleted`

                        }

                        res.json(resMessage);

                    }).catch(err => {

                        let statusCode = 500;
                        if (err === errNotFound) {

                            statusCode = 404;

                        }

                        res.statusCode = statusCode;

                        const resMessage: resMessage = {
                            status: statusCode,
                            message: err.message
                        }

                        res.json(resMessage);

                    });
                }
            } as routeHandler,
        ], 
}

const initRoutes = (): void => {

    routesHandler.get.forEach(route => {
        router['get'](route.path, route.handler);
    });

    routesHandler.post.forEach(route => {
        router['post'](route.path, route.handler);
    });

    router.use(json());
    
}

initRoutes();

router.get('/', (req: Request, res: Response) => {

    res.statusCode = 200;
    res.write('Available routes: \n\n');
    routesHandler.get.forEach(element => {
        res.write(`${element.method} ${element.path} \n`);
    });
    routesHandler.post.forEach(element => {
        res.write(`${element.method} ${element.path} \n`);
    });
    res.end();

});

export const routes: Router = router;

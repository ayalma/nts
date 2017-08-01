import {Inject} from "typescript-ioc";
import {<%=capitalName%>Service} from "./<%=capitalName%>Service";
import {Router, Request, Response, NextFunction} from 'express';

export class <%=capitalName%>Controller {
    @Inject
    private <%=name%>Service: <%=capitalName%>Service;
    private _router:Router;

    constructor() {
        this._router = Router();
        this.register();
    }

    get router(): Router {
        return this._router;
    }

    private register() {
        this._router.post('/create', async (req: Request, res: Response, next: NextFunction) => {

        });

        this._router.post('/update', (req: Request, res: Response, next: NextFunction) => {

        });
        this._router.delete('/delete', (req: Request, res: Response, next: NextFunction) => {

        });

        this._router.get('/get',(req: Request, res: Response, next: NextFunction) => {

        });
    }
}
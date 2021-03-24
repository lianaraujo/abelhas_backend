import { Router } from "express";
import TotemController from "./controllers/TotemController";

const routes = Router();
;

routes.get("/totems/:id", TotemController.show);
routes.get("/totems", TotemController.index);
routes.post("/totems", TotemController.create); //// ######
routes.delete("/totems/:id", TotemController.delete)


export default routes;

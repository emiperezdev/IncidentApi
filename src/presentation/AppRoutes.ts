import { Router } from "express";
import { IncidentRoutes } from "./incidents/IncidentRoutes";

export class AppRoutes {

  static get routes() : Router {
    const router = Router();
    router.use("/api/incidents", IncidentRoutes.routes);

    return router;
  }
}
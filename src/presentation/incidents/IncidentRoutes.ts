import { Router } from "express";
import { IncidentController } from "./IncidentController";

export class IncidentRoutes {

  static get routes(): Router {
    const router = Router();
    const incidentController = new IncidentController();

    router.get('', incidentController.getIncidents);
    router.get('/:id', incidentController.getIncidentById);
    router.post('', incidentController.saveIncident);
    router.delete('/:id', incidentController.deleteIncidentById);
    router.put('/:id', incidentController.updateIncidentById);

    return router;
  }

}
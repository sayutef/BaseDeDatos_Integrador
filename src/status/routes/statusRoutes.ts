// routes/statusRoutes.ts
import { Router } from "express";
import { getAllStatuses,getStatusById,createStatus,updateStatus,deleteLogicalStatus,deleteStatus } from "../controllers/statusController";

const statusRoutes: Router = Router();

statusRoutes.get('/', getAllStatuses);
statusRoutes.get('/:status_id', getStatusById);
statusRoutes.post('/', createStatus);
statusRoutes.put('/:status_id', updateStatus);
statusRoutes.delete('/:status_id', deleteStatus);
statusRoutes.put('/deleted/:status_id', deleteLogicalStatus);

export default statusRoutes;

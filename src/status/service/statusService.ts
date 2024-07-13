import { StatusRepository } from "../repository/StatusRepository";
import { Status } from "../models/Status";
import { DateUtils } from "../../shared/utils/DateUtils";

export class StatusService {
    public static async getAllStatuses(): Promise<Status[]> {
        try {
            return await StatusRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener estados: ${error.message}`);
        }
    }

    public static async getStatusById(statusId: number): Promise<Status | null> {
        try {
            return await StatusRepository.findById(statusId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el estado: ${error.message}`);
        }
    }

    public static async addStatus(status: Status): Promise<Status> {
        try {
            const currentDate = new Date();
            status.created_at = DateUtils.formatDate(currentDate);
            status.updated_at = DateUtils.formatDate(currentDate);

            return await StatusRepository.createStatus(status);
        } catch (error: any) {
            throw new Error(`Error al crear estado: ${error.message}`);
        }
    }

    public static async modifyStatus(statusId: number, statusData: Status): Promise<Status | null> {
        try {
            const statusFound = await StatusRepository.findById(statusId);

            if (statusFound) {
                if (statusData.name) {
                    statusFound.name = statusData.name;
                }
                if (statusData.updated_by) {
                    statusFound.updated_by = statusData.updated_by;
                }
                if (statusData.deleted !== undefined) {
                    statusFound.deleted = statusData.deleted;
                }
                statusFound.updated_at = DateUtils.formatDate(new Date());

                const updatedStatus = await StatusRepository.updateStatus(statusId, statusFound);
                return updatedStatus;
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar estado: ${error.message}`);
        }
    }

    public static async deleteStatus(statusId: number): Promise<boolean> {
        try {
            return await StatusRepository.deleteStatus(statusId);
        } catch (error: any) {
            throw new Error(`Error al eliminar estado: ${error.message}`);
        }
    }

    public static async deleteStatusLogic(statusId: number): Promise<boolean> {
        try {
            return await StatusRepository.deleteStatusLogic(statusId);
        } catch (error: any) {
            throw new Error(`Error al eliminar estado lógicamente: ${error.message}`);
        }
    }
}

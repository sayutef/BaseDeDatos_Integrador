import { RoleRepository } from "../repositories/RoleRepository";
import { Role } from "../models/Role";
import { DateUtils } from "../../shared/utils/DateUtils";

export class RoleService {
    public static async getAllRoles(): Promise<Role[]> {
        try {
            return await RoleRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener roles: ${error.message}`);
        }
    }

    public static async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return await RoleRepository.findById(roleId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el rol: ${error.message}`);
        }
    }

    public static async addRole(role: Role): Promise<Role> {
        try {
            const currentDate = new Date();
            role.created_at = DateUtils.formatDate(currentDate);
            role.updated_at = DateUtils.formatDate(currentDate);

            return await RoleRepository.createRole(role);
        } catch (error: any) {
            throw new Error(`Error al crear rol: ${error.message}`);
        }
    }

    public static async modifyRole(roleId: number, roleData: Role): Promise<Role | null> {
        try {
            const roleFound = await RoleRepository.findById(roleId);

            if (roleFound) {
                if (roleData.name) {
                    roleFound.name = roleData.name;
                }
                if (roleData.permisos) {
                    roleFound.permisos = roleData.permisos;
                }
                if (roleData.updated_by) {
                    roleFound.updated_by = roleData.updated_by;
                }
                if (roleData.deleted !== undefined) {
                    roleFound.deleted = roleData.deleted;
                }
                roleFound.updated_at = DateUtils.formatDate(new Date());

                const updatedRole = await RoleRepository.updateRole(roleId, roleFound);
                return updatedRole;
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar rol: ${error.message}`);
        }
    }

    public static async deleteRole(roleId: number): Promise<boolean> {
        try {
            return await RoleRepository.deleteRole(roleId);
        } catch (error: any) {
            throw new Error(`Error al eliminar rol: ${error.message}`);
        }
    }
}

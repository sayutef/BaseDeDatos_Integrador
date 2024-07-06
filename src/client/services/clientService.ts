import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../models/Client";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ClientService {
    public static async getAllClients(): Promise<Client[]> {
        try {
            return await ClientRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener clientes: ${error.message}`);
        }
    }

    public static async getClientById(clientId: number): Promise<Client | null> {
        try {
            return await ClientRepository.findById(clientId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el cliente: ${error.message}`);
        }
    }

    public static async addClient(client: Client): Promise<Client> {
        try {
       
           
            client.created_at = DateUtils.formatDate(new Date());
            client.updated_at = DateUtils.formatDate(new Date());

            const newClient = await ClientRepository.createClient(client);

            return newClient;
        } catch (error: any) {
            throw new Error(`Error al crear el cliente: ${error.message}`);
        }
    }

    public static async updateClient(clientId: number, clientData: Partial<Client>): Promise<Client | null> {
        try {
            const clientFound = await ClientRepository.findById(clientId);

            if (!clientFound) {
                throw new Error(`No se encontró el cliente con ID ${clientId}`);
            }

            if (clientData.name) {
                clientFound.name = clientData.name;
            }
            if (clientData.age) {
                clientFound.age = clientData.age;
            }
            if (clientData.address) {
                clientFound.address = clientData.address;
            }
            if (clientData.phone_number) {
                clientFound.phone_number = clientData.phone_number;
            }
            if (clientData.updated_by) {
                clientFound.updated_by = clientData.updated_by;
            }
            if (clientData.updated_at) {
                clientFound.updated_at = DateUtils.formatDate(new Date());
            }
            if (clientData.deleted !== undefined) {
                clientFound.deleted = clientData.deleted;
            }

            clientFound.updated_at = DateUtils.formatDate(new Date());

            const updatedClient = await ClientRepository.updateClient(clientId, clientFound);

            if (!updatedClient) {
                throw new Error(`No se pudo actualizar el cliente con ID ${clientId}`);
            }

            return updatedClient;
        } catch (error: any) {
            throw new Error(`Error al modificar el cliente: ${error.message}`);
        }
    }

    public static async deleteClient(clientId: number): Promise<boolean> {
        try {
            return await ClientRepository.deleteClient(clientId);
        } catch (error: any) {
            throw new Error(`Error al eliminar cliente: ${error.message}`);
        }
    }

    public static async deleteClientLogic(userId: number): Promise<boolean> {
        try {
            return await ClientRepository.deleteClientLogic(userId);
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

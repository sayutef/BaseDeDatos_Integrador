import { Request, Response } from "express";
import { ClientService } from "../services/clientService";

export const getAllClients = async (_req: Request, res: Response) => {
    try {
        const clients = await ClientService.getAllClients();
        res.status(200).json(clients);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getClientById = async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.client_id, 10);
        const client = await ClientService.getClientById(clientId);

        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'No se encontró el cliente' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const addClient = async (req: Request, res: Response) => {
    try {
        const newClient = await ClientService.addClient(req.body);
        res.status(201).json(newClient);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.client_id, 10);
        const updatedClient = await ClientService.updateClient(clientId, req.body);

        if (updatedClient) {
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ message: `No se encontró el cliente con ID ${clientId}` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.client_id, 10);
        const deleted = await ClientService.deleteClient(clientId);

        if (deleted) {
            res.status(200).json({ message: 'Se eliminó el cliente.' });
        } else {
            res.status(404).json({ message: `No se encontró el cliente con ID ${clientId}` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

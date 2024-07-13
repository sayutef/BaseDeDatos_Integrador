// controllers/AddressController.ts
import { Request, Response } from "express";
import { AddressService } from "../service/addressService";

export const getAllAddresses = async (_req: Request, res: Response) => {
    try {
        const addresses = await AddressService.getAllAddresses();
        res.status(200).json(addresses);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAddressById = async (req: Request, res: Response) => {
    try {
        const addressId = parseInt(req.params.address_id, 10);
        const address = await AddressService.getAddressById(addressId);

        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const addAddress = async (req: Request, res: Response) => {
    try {
        const newAddress = await AddressService.addAddress(req.body);
        res.status(201).json(newAddress);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const addressId = parseInt(req.params.address_id, 10);
        const updatedAddress = await AddressService.updateAddress(addressId, req.body);

        if (updatedAddress) {
            res.status(200).json(updatedAddress);
        } else {
            res.status(404).json({ message: `Address with ID ${addressId} not found` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const addressId = parseInt(req.params.address_id, 10);
        const deleted = await AddressService.deleteAddress(addressId);

        if (deleted) {
            res.status(200).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAddressLogic = async (req: Request, res: Response) => {
    try {
        const addressId = parseInt(req.params.address_id, 10);
        const deleted = await AddressService.deleteAddressLogic(addressId);

        if (deleted) {
            res.status(200).json({ message: 'Address logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

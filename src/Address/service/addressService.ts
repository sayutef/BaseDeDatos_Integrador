// services/AddressService.ts
import { AddressRepository } from "../reposritory/AddressRepository";
import { Address } from "../models/Addres";
import { DateUtils } from "../../shared/utils/DateUtils";

export class AddressService {
    public static async getAllAddresses(): Promise<Address[]> {
        try {
            return await AddressRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error fetching addresses: ${error.message}`);
        }
    }

    public static async getAddressById(addressId: number): Promise<Address | null> {
        try {
            return await AddressRepository.findById(addressId);
        } catch (error: any) {
            throw new Error(`Error fetching address: ${error.message}`);
        }
    }

    public static async addAddress(address: Address): Promise<Address> {
        try {
            address.created_at = DateUtils.formatDate(new Date());
            address.updated_at = DateUtils.formatDate(new Date());

            const newAddress = await AddressRepository.createAddress(address);
            return newAddress;
        } catch (error: any) {
            throw new Error(`Error creating address: ${error.message}`);
        }
    }

    public static async updateAddress(addressId: number, addressData: Partial<Address>): Promise<Address | null> {
        try {
            const addressFound = await AddressRepository.findById(addressId);

            if (!addressFound) {
                throw new Error(`Address with ID ${addressId} not found`);
            }

            if (addressData.street) addressFound.street = addressData.street;
            if (addressData.postal_code) addressFound.postal_code = addressData.postal_code;
            if (addressData.municipality) addressFound.municipality = addressData.municipality;
            if (addressData.updated_by) addressFound.updated_by = addressData.updated_by;
            if (addressData.updated_at) addressFound.updated_at = DateUtils.formatDate(new Date());
            if (addressData.deleted !== undefined) addressFound.deleted = addressData.deleted;

            addressFound.updated_at = DateUtils.formatDate(new Date());

            const updatedAddress = await AddressRepository.updateAddress(addressId, addressFound);

            if (!updatedAddress) {
                throw new Error(`Failed to update address with ID ${addressId}`);
            }

            return updatedAddress;
        } catch (error: any) {
            throw new Error(`Error updating address: ${error.message}`);
        }
    }

    public static async deleteAddress(addressId: number): Promise<boolean> {
        try {
            return await AddressRepository.deleteAddress(addressId);
        } catch (error: any) {
            throw new Error(`Error deleting address: ${error.message}`);
        }
    }

    public static async deleteAddressLogic(addressId: number): Promise<boolean> {
        try {
            return await AddressRepository.deleteAddressLogic(addressId);
        } catch (error: any) {
            throw new Error(`Error logically deleting address: ${error.message}`);
        }
    }
}

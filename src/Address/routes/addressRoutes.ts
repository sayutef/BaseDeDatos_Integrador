// routes/AddressRoutes.ts
import { Router } from "express";
import { getAddressById,getAllAddresses,deleteAddress,deleteAddressLogic,updateAddress,addAddress } from "../controllers/addressControllers";

const AddressRoutes = Router();

AddressRoutes.get("/", getAllAddresses);
AddressRoutes.get("/:address_id", getAddressById);
AddressRoutes.post("/", addAddress);
AddressRoutes.put("/:address_id", updateAddress);
AddressRoutes.delete("/:address_id", deleteAddress);
AddressRoutes.put("/:address_id", deleteAddressLogic);

export default AddressRoutes;

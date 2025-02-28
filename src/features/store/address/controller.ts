import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma";
import { console } from "inspector";

// store address -------------------------------------------------------------------------------------------------
interface StoreAddressMain {
  storeId: number;
  stateId: number;
  cityId: number;
  pincode: number;
  addressLine1: string;
  addressLine2: string;
  googleMapLink: string;
}

interface StoreAddressCreateProps extends StoreAddressMain {
  latitude: number;
  longitude: number;
}

interface StoreAddressCreateResponse extends StoreAddressMain {
  id: number;
  coordinates_json: string;
}

interface StoreCoordinatesResponse {
  id: number;
  coordinates_json: string;
}

export async function createAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const value: StoreAddressCreateProps = req.body;

    const storeAddress: StoreAddressCreateResponse[] = await prisma.$queryRaw`
      INSERT INTO "StoreAddress" 
        ("storeId", "stateId", "cityId", "googleMapLink", "pincode", "addressLine1", "addressLine2", "coordinates")
      VALUES 
        (${value.storeId}, ${value.stateId}, ${value.cityId}, ${value.googleMapLink}, ${value.pincode}, ${value.addressLine1}, ${value.addressLine2}, 
        ST_SetSRID(ST_MakePoint(${value.longitude}, ${value.latitude}), 4326)::geography
        )
      RETURNING "id", "storeId", "stateId", "cityId", "googleMapLink", "pincode", "addressLine1", "addressLine2", ST_AsGeoJSON(coordinates) AS coordinates_json;
    `;

    const result = storeAddress.map((address) => ({
      id: address.id,
      storeId: address.storeId,
      stateId: address.stateId,
      cityId: address.cityId,
      pincode: address.pincode,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      googleMapLink: address.googleMapLink,
      coordinates: JSON.parse(address.coordinates_json), // Convert GeoJSON string to object
    }));

    res.status(201).json(result[0]);
  } catch (error) {
    console.log(`Error in create store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in create store address."));
  }
}

export async function getStoreAddressById(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;

    const response: StoreAddressCreateResponse[] = await prisma.$queryRaw`
      SELECT "id", "storeId", "stateId", "cityId", "googleMapLink", "pincode", "addressLine1", "addressLine2", ST_AsGeoJSON(coordinates) AS coordinates_json FROM "StoreAddress"
      WHERE "storeId"=${storeId};
    `;

    const storeAddresses = response.map((address) => ({
      id: address.id,
      storeId: address.storeId,
      stateId: address.stateId,
      cityId: address.cityId,
      pincode: address.pincode,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      googleMapLink: address.googleMapLink,
      latitude: JSON.parse(address.coordinates_json).coordinates[1], // Convert GeoJSON string to object
      longitude: JSON.parse(address.coordinates_json).coordinates[0],
    }));

    res.status(200).json(storeAddresses[0]);
  } catch (error) {
    console.log(`Error in get store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get store address."));
  }
}

export async function getStoreCoordinatesById(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeId } = req.params;

    const response: StoreCoordinatesResponse[] = await prisma.$queryRaw`
      SELECT "id", ST_AsGeoJSON(coordinates) AS coordinates_json FROM "StoreAddress"
      WHERE "storeId"=${storeId};
    `;

    const storeCoordinates = response.map((address) => ({
      id: address.id,
      latitude: JSON.parse(address.coordinates_json).coordinates[1], // Convert GeoJSON string to object
      longitude: JSON.parse(address.coordinates_json).coordinates[0],
    }));

    res.status(200).json(storeCoordinates[0]);
  } catch (error) {
    console.log(`Error in get store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in get store address."));
  }
}

export async function updateStoreAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeAddressId } = req.params;
    const value = req.body;

    const result: StoreAddressCreateResponse[] = await prisma.$queryRaw`
      UPDATE "StoreAddress"
      SET 
        "stateId" = ${value.stateId},
        "cityId" = ${value.cityId},
        "googleMapLink" = ${value.googleMapLink},
        "pincode" = ${value.pincode},
        "addressLine1" = ${value.addressLine1},
        "addressLine2" = ${value.addressLine2},
        "coordinates" = ST_SetSRID(ST_MakePoint(${value.longitude}, ${value.latitude}), 4326)::geography
      WHERE "id" = ${storeAddressId}
      RETURNING "id", "storeId", "stateId", "cityId", "googleMapLink", "pincode", "addressLine1", "addressLine2", ST_AsGeoJSON(coordinates) AS coordinates_json;
    `;

    const storeAddress = result.map((address) => ({
      id: address.id,
      storeId: address.storeId,
      stateId: address.stateId,
      cityId: address.cityId,
      pincode: address.pincode,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      googleMapLink: address.googleMapLink,
      latitude: JSON.parse(address.coordinates_json).coordinates[1], // Convert GeoJSON string to object
      longitude: JSON.parse(address.coordinates_json).coordinates[0],
    }));

    res.status(200).json(storeAddress[0]);
  } catch (error) {
    console.log(`Error in update store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in update store address."));
  }
}

export async function deleteStoreAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { storeAddressId } = req.params;
    const deleteStoreAddress = await prisma.storeAddress.delete({ where: { id: parseInt(storeAddressId) } });

    res.status(200).json({ message: "Store Address deleted successfully.", deleteStoreAddress });
  } catch (error) {
    console.log(`Error in delete store address: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in delete store address."));
  }
}

// ---------------------------------------------------------------------------------------------------------------

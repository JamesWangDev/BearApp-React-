import { RequestHandler } from "express";
import { Registry } from "../../models";
import createError from "http-errors";

export const getEveryRegistry: RequestHandler = async (_req, res, next) => {
  try {
    const registry = await Registry.find();
    res.status(200).json(registry);
  } catch (err) {
    next(err);
  }
};

export const createRegistry: RequestHandler = async (req, res, next) => {
  try {
    const newRegistry = await Registry.create(req.body);
    res.status(201).json(newRegistry);
  } catch (err) {
    next(err);
  }
};

export const getOneRegistry: RequestHandler = async (req, res, next) => {
  try {
    const { customUrl } = req.params;
    const registry = await Registry.findOne({ customUrl });
    if (!registry) throw createError(404, `Registry (${customUrl}) not found`);
    res.status(200).json(registry);
  } catch (err) {
    next(err);
  }
};

export const updateOneRegistry: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;
    const updatedRegistry = await Registry.findByIdAndUpdate(
      registryId,
      req.body,
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );
    if (!updatedRegistry) {
      throw createError(400, `Error updating Registry (${registryId})`);
    }
    res.status(200).json(updatedRegistry);
  } catch (err) {
    next(err);
  }
};

export const deleteOneRegistry: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;
    const deletedRegistry = await Registry.findByIdAndDelete(registryId);
    if (!deletedRegistry)
      throw createError(400, `Error removing registry (${registryId})`);
    res.status(200).json(deletedRegistry);
  } catch (err) {
    next(err);
  }
};

import { RequestHandler } from "express";
import createError from "http-errors";
import { Registry, Item } from "../../models";

export const getEveryRegistry: RequestHandler = async (_req, res, next) => {
  try {
    const registry = await Registry.find();
    console.log("getEveryRegisty", registry);
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
    const registry = await Registry.findOne({ customUrl }).populate("items");
    if (!registry) throw createError(404, `Registry (${customUrl}) not found`);
    res.status(200).json(registry);
  } catch (err) {
    next(err);
  }
};

export const updateOneRegistry: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;

    // update a registry based on it's _id
    // anything sent in the body will overwrite the given values
    // will throw an error if validations don't succeed
    const updatedRegistry = await Registry.findByIdAndUpdate(
      registryId,
      req.body,
      {
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

    // delete the given registry based on it's _id
    const deletedRegistry = await Registry.findByIdAndDelete(registryId);
    if (!deletedRegistry) {
      throw createError(400, `Error removing registry (${registryId})`);
    }

    // delete all the items that are inside the recently deleted registry
    const { deletedCount, n } = await Item.deleteMany({
      _id: {
        $in: deletedRegistry.items,
      },
    });
    const message = `Deleted registry and ${deletedCount}/${n} item${
      n === 1 ? "" : "s"
    }`;

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

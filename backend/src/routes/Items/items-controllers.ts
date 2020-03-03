import { RequestHandler } from "express";
import mongoose from "mongoose";
import createError from "http-errors";
import { Item, Registry } from "../../models";

export const getOneItem: RequestHandler = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) throw createError(404, `Item (${itemId}) not found`);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const getEveryItem: RequestHandler = async (_req, res, next) => {
  try {

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;

    // find the registry
    const registry = await Registry.findById(registryId);
    if (!registry) throw createError(404, `Registry (${registryId}) not found`);

    // create an item
    const newItem = await Item.create(req.body);

    // push the newItem _id into the registry items array
    registry.items.push(newItem._id);
    await registry.save();

    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

export const deleteOneItem: RequestHandler = async (req, res, next) => {
  try {
    const { itemId, registryId } = req.params;

    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      throw createError(400, `Error removing item (${itemId})`);
    }

    const updatedRegistry = await Registry.findByIdAndUpdate(registryId, {
      $pull: { items: itemId },
    });
    if (!updatedRegistry) {
      throw createError(400, `Error updating Registry (${registryId}) items`);
    }

    res.status(200).json(deletedItem);
  } catch (err) {
    next(err);
  }
};

export const updateOneItem: RequestHandler = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) throw createError(400, `Error updating item (${itemId})`);

    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};

export const deleteMultipleItems: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;
    const { arrayOfIds } = req.body;

    // throws if you forgot to pass arrayOfIds
    if (!arrayOfIds) {
      throw createError(400, "Please pass arrayOfIds in the body");
    }

    // change array of string into mongoose ObjectId's
    const idsToDelete = JSON.parse(arrayOfIds).map((id: string) =>
      mongoose.Types.ObjectId(id)
    );

    // throws if you passed an empty arrayOfIds
    if (!idsToDelete.length) {
      throw createError(400, "You didn't put any _id's in arrayOfIds");
    }

    // find the target registry
    const registry = await Registry.findById(registryId);
    if (!registry) throw createError(404, `Registry (${registryId}) not found`);

    // delete all the items passed in arrayOfIds
    const { deletedCount, n } = await Item.deleteMany({
      _id: {
        $in: idsToDelete,
      },
    });

    // throws if we didn't even attempt to delete anything
    if (!n) {
      throw createError(400, "Sorry, couldn't find those _ids");
    }

    // throws if we didn't delete anything
    if (!deletedCount) {
      throw createError(400, `Sorry, deleted 0/${n} items`);
    }

    // remove those items from their registry
    const updatedRegistry = await Registry.findByIdAndUpdate(
      registryId,
      {
        $pull: {
          items: {
            $in: idsToDelete,
          },
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedRegistry) {
      throw createError(400, `Error updating registry (${registryId})`);
    }

    const message = `Updated registry items and deleted ${deletedCount}/${n} item${
      n === 1 ? "" : "s"
    }`;

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

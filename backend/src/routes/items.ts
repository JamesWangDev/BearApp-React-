import { RequestHandler } from "express";
import createError from "http-errors";
import { Item } from "../models";

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
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const getRegistryItems: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;
    const items = await Item.find({ registryId });
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

export const deleteOneItem: RequestHandler = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await Item.findByIdAndRemove(itemId);
    if (!deletedItem) throw createError(400, `Error removing item (${itemId})`);
    res.status(200).json(deletedItem);
  } catch (err) {
    next(err);
  }
};

export const deleteRegistryItems: RequestHandler = async (req, res, next) => {
  try {
    const { registryId } = req.params;
    const { deletedCount, n, ok } = await Item.deleteMany({ registryId });
    if (ok !== 1) {
      throw createError(400, `Error only deleted ${deletedCount}/${n} items`);
    }
    res
      .status(204)
      .json({ message: `Successfully deleted ${deletedCount}/${n} items` });
  } catch (err) {
    next(err);
  }
};

export const updateOneItem: RequestHandler = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      upsert: true,
      new: true,
    });
    if (!updatedItem.ok) {
      throw createError(400, `Error updating item (${itemId})`);
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};

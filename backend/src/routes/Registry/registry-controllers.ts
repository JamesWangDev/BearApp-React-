import { RequestHandler } from "express";
import createError from "http-errors";
import { Registry, Item } from "../../models";
import { AuthHandler } from "../../utils";
import { PurchaserI } from "../../models/Item/item-types";

export const getEveryRegistry: RequestHandler = async (_req, res, next) => {
  try {
    const registry = await Registry.find();
    res.status(200).json(registry);
  } catch (err) {
    next(err);
  }
};

export const createRegistry: AuthHandler = async (req, res, next) => {
  try {
    const userId = req.user?.sub;

    if (!userId) throw createError(404, "User is not valid");

    const newRegistry = await Registry.create({
      ...req.body,
      userId,
    });
    res.status(201).json(newRegistry);
  } catch (err) {
    next(err);
  }
};

export const getMyRegistry: AuthHandler = async (req, res, next) => {
  try {
    const userId = req.user?.sub;

    if (!userId) throw createError(404, "User is not valid");

    const registry = await Registry.findOne({ userId }).populate("items");
    if (!registry) throw createError(404, "You don't have a registry");

    res.status(200).json(registry);
  } catch (err) {
    next(err);
  }
};

export const getOneRegistry: RequestHandler = async (req, res, next) => {
  try {
    const { customUrl } = req.params;
    const registry = await Registry.findOne(
      {
        customUrl,
      },
      {
        email: 0,
        phoneNumber: 0,
        userId: 0,
        // "items.name": 0,
      }
    )
      .populate("items")
      .lean();
    // .then(reg => {
    if (!registry) throw createError(404, `Registry (${customUrl}) not found`);

    registry.items = registry.items.map((item: any) => ({
      _id: item._id,
      isReserved: item.isReserved,
      name: item.name,
      description: item.description,
      price: item.price,
      link: item.link,
      image: item.image,
      addedOn: item.addedOn,
      totalPurchased: item.purchasers.reduce(
        (total: number, purchaser: PurchaserI) =>
          (total += purchaser.pricePaid),
        0
      ),
    }));

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

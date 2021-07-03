const express = require("express");
const Activity = require("../models/activity");
const User = require("../models/User");
const security = require("../middleware/security");
const router = express.Router();

router.get(
  "/stats/totalDurationEx",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const statistics = await Activity.getTotalSum({ user });
      return res.status(200).json({ statistics });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/stats/avgCalories",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const statistics = await Activity.getAvgCalories({ user });
      return res.status(200).json({ statistics });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/stats/avgIntensity",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const statistics = await Activity.getAvgIntensity({ user });
      return res.status(200).json({ statistics });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:type",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const activity = await Activity.listUserActivities(req.params.type, {
        user,
      });
      return res.status(200).json({ activity });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:type/:activityId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    const { type, activityId } = req.params;
    try {
      const activity = await Activity.fetchActivityById(type, activityId);
      return res.status(200).json({ activity });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/:type",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { type } = req.params;
      const { email } = res.locals.user;
      const user = await User.fetchUserByEmail(email);
      const publicUser = User.makeUser(user);
      const activity = await Activity.createNewActivity({
        user: publicUser,
        details: req.body,
        type: type,
      });
      return res.status(201).json({ activity });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:type",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const activity = await Activity.listUserActivities(req.params.type, {
        user,
      });
      return res.status(200).json({ activity });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:type",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const activity = await Activity.listUserActivities(req.params.type, {
        user,
      });
      return res.status(200).json({ activity });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;

const Subscription = require('../Models/subscriptionModel');

const getAllSubscriptions = (filters) => {
  return Subscription.find(filters);
};

const getSubscriptionById = (id) => {
  return Subscription.findById(id);
};

// Create
const addSubscription = (obj) => {
  const subscription = new Subscription(obj);
  return subscription.save();
};

// Update
const updateSubscription = (id, obj) => {
  return Subscription.findByIdAndUpdate(id, obj);
};

// Delete
const deleteSubscription = (id) => {
  return Subscription.findByIdAndDelete(id);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
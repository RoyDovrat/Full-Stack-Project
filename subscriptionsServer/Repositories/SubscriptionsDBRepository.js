const Subscription = require('../Models/subscriptionModel');

const getAllSubscriptions = (filters) => {
  return Subscription.find(filters);
};

const getSubscriptionById = (id) => {
  return Subscription.findById(id);
};

const addSubscription = (obj) => {
  const subscription = new Subscription(obj);
  return subscription.save();
};

const updateSubscription = (id, obj) => {
  return Subscription.findByIdAndUpdate(id, obj);
};

const deleteSubscription = (filters) => {
  return Subscription.deleteMany(filters); 
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
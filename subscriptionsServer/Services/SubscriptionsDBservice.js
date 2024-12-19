const subscriptionRepository = require('../Repositories/SubscriptionsDBRepository');

const getAllSubscriptions = (filters) => {
  return subscriptionRepository.getAllSubscriptions(filters);
};

const getSubscriptionById = (id) => {
  return subscriptionRepository.getSubscriptionById(id);
};

const addSubscription = (obj) => {
  return subscriptionRepository.addSubscription(obj);
};

const updateSubscription = (id, obj) => {
  return subscriptionRepository.updateSubscription(id, obj);
};

const deleteSubscription = (id) => {
  return subscriptionRepository.deleteSubscription(id);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
}
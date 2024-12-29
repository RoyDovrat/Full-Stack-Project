const subscriptionRepository = require('../Repositories/SubscriptionsDBRepository');

const getAllSubscriptions = (filters) => {
  return subscriptionRepository.getAllSubscriptions(filters);
};

const getSubscriptionById = (id) => {
  return subscriptionRepository.getSubscriptionById(id);
};

const addSubscription = async (obj) => {
  const { memberId, movies } = obj;
  const subscriptions = await getAllSubscriptions();
  const existingSubscription = subscriptions.find((subscription) => subscription.memberId.toString() === memberId);

  if (existingSubscription) {
    existingSubscription.movies.push(...movies);  
    return subscriptionRepository.updateSubscription(existingSubscription._id, existingSubscription);
  } else {
    return subscriptionRepository.addSubscription(obj);
  }
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
const express = require('express');
const SubscriptionsService = require('../Services/SubscriptionsDBservice');

const router = express.Router();

// Entry point: http://localhost:8000/subscriptions

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const subscriptions = await SubscriptionsService.getAllSubscriptions(filters);
    res.json(subscriptions);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionsService.getSubscriptionById(id);
    res.json(subscription);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await SubscriptionsService.addSubscription(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await SubscriptionsService.updateSubscription(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SubscriptionsService.deleteSubscription(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
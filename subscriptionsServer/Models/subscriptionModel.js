const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        memberId: mongoose.Schema.Types.ObjectId,
        movies: [
            {
                movieId: mongoose.Schema.Types.ObjectId,
                date: Date
            }
        ]
    },

    { versionKey: false }
);

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;
const { Thought, User } = require('../models/');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      if (!thought) {
        return res.status(404).json({ message: 'No Thought associated with ID' })
      }
      res.json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createNewThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No Thought associated with ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'Thought Not Found' });
      }
      res.json({ message: 'Thought Removed' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async postReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No Thought associated with ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No Thought associated with ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
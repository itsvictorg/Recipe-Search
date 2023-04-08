const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedRecipes");

        return userData;
      }
      throw new AuthenticationError("You are not logged in");
    },
  },
  Mutation: {
    // pull args from user input to login user
    login: async (parent, { email, password }) => {
      console.log('hit the login');
      const user = await User.findOne({ email });

      // check username
      if (!user) {
        throw new AuthenticationError("username/password is incorrect");
      }
      // retrieve and check user password behind the curtain
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("username/password is incorrect");
      }
      // all pass assign token to user.
      const token = signToken(user);
      return { token, user };
    },
    // pull args from user input to create user then turn user to receive token then return user and token as value
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // pull user input from args and add to set return new true
    saveRecipe: async (parent, args, context) => {
      console.log('hit save recipe');
      console.log(context.user);
      console.log(args);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: input } },
          { new: true }
        ).populate('savedRecipes');

        
        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in!");
    },
    // pull recipe id from args to remove
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedRecipes: { recipeId: recipeId } } },
          { new: true }
        ).populate("savedRecipes");

        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in!");
    },
  },
};

module.exports = resolvers;
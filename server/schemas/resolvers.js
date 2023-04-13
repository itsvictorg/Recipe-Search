const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
// configure stripe donation here on server side


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
    // create a query to function donation form
    // example use from 22.24 change for personal usecase
    
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const order = new Order({ products: args.products });
    //   const line_items = [];

    //   const { products } = await order.populate('products');

    //   for (let i = 0; i < products.length; i++) {
    //     const product = await stripe.products.create({
    //       name: products[i].name,
    //       description: products[i].description,
    //       images: [`${url}/images/${products[i].image}`]
    //     });

    //     const price = await stripe.prices.create({
    //       product: product.id,
    //       unit_amount: products[i].price * 100,
    //       currency: 'usd',
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });

    //   return { session: session.id };
    // }
  },
  Mutation: {
    // pull args from user input to login user
    login: async (parent, { email, password }) => {

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
      console.log('RESOLVER login assigning token now...');
      // all pass assign token to user.
      const token = signToken(user);
      return { token, user };
    },
    // pull args from user input to create user then turn user to receive token then return user and token as value
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      console.log('RESOLVER addUser assigning token now...');
      const token = signToken(user);
      return { token, user };
    },
    // pull user input from args and add to set return new true
    saveRecipe: async (parent, { newRecipe}, context) => {

      console.log('RESOLVER saveRecipe', newRecipe);

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: newRecipe } },
          { new: true }
        ).populate('savedRecipes');

        
        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in!");
    },
    // pull recipe id from args to remove
    removeRecipe: async (parent, { recipeId }, context) => {

      console.log('RESOLVER removeRecipe', recipeId);

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
    addRecipe: async (parent, {title, servings, ingredients, instructions}) => {
      const newRecipe = await Recipe.create({title, servings, ingredients, instructions});
      return newRecipe;
    }
  },
};

module.exports = resolvers;
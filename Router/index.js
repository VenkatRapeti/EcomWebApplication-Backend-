const express = require("express");
const userAuthCountroller = require("../countrollers/authentication");
const userVerifTokenCountroller = require("../countrollers/verifyToken");
const updatedUserCountroller = require("../countrollers/User");
const productsCountroller = require("../countrollers/Product");
const cartsCountroller = require("../countrollers/Cart");
const ordersCountroller = require("../countrollers/Order");
const stripeCountroller = require("../countrollers/stripe");


const route = express.Router();

// USER RELATED API'S

route.post('/auth/register', userAuthCountroller.userRegister);
route.post('/auth/login', userAuthCountroller.userLogin);
route.put('/user/update/:id', userVerifTokenCountroller.verifyTokenAndAuthorization, updatedUserCountroller.updatedUser);
route.delete('/user/delete/:id', userVerifTokenCountroller.verifyTokenAndAuthorization, updatedUserCountroller.deleteUser);
route.get('/findUser/:id', userVerifTokenCountroller.verifyTokenAndAdmin, updatedUserCountroller.getUser);
route.get('/findAllUsers', userVerifTokenCountroller.verifyTokenAndAdmin, updatedUserCountroller.getUsers);
route.get('/usersStats', userVerifTokenCountroller.verifyTokenAndAdmin, updatedUserCountroller.getUserStatistics);

// PRODUCT RELATED API'S

route.post('/product/add', userVerifTokenCountroller.verifyTokenAndAdmin, productsCountroller.addProduct);
route.put('/product/update/:id', userVerifTokenCountroller.verifyTokenAndAdmin, productsCountroller.updateProduct);
route.delete('/product/delete/:id', userVerifTokenCountroller.verifyTokenAndAdmin, productsCountroller.deleteProduct);
route.get('/findProduct/:id', productsCountroller.getProduct);
route.get('/findAllProducts', productsCountroller.getAllProducts);

// CART RELATED API'S

route.post('/cart/add', userVerifTokenCountroller.verifyToken, cartsCountroller.addCart);
route.put('/cart/update/:id', userVerifTokenCountroller.verifyTokenAndAuthorization, cartsCountroller.updateCart);
route.delete('/cart/delete/:id', userVerifTokenCountroller.verifyTokenAndAuthorization, cartsCountroller.deleteCart);
route.get('/findCart/:userId', userVerifTokenCountroller.verifyTokenAndAuthorization, cartsCountroller.getCart);
route.get('/findAllcarts', userVerifTokenCountroller.verifyTokenAndAdmin, cartsCountroller.getAllCarts);

// ORDER RELATED API'S

route.post('/order/add', userVerifTokenCountroller.verifyToken, ordersCountroller.addOrder);
route.put('/order/update/:id', userVerifTokenCountroller.verifyTokenAndAdmin, ordersCountroller.updateOrder);
route.delete('/order/delete/:id', userVerifTokenCountroller.verifyTokenAndAdmin, ordersCountroller.deleteOrder);
route.get('/findorders/:userId', userVerifTokenCountroller.verifyTokenAndAuthorization, ordersCountroller.getOrders);
route.get('/findAllOrders', userVerifTokenCountroller.verifyTokenAndAdmin, ordersCountroller.getAllOrders);
route.get('/incomeStats', userVerifTokenCountroller.verifyTokenAndAdmin, ordersCountroller.getOrdersIncomeStatistics);

// PAYMENT RELATED API'S

route.post('/stripe/payment', stripeCountroller.stripePayment);


module.exports = route
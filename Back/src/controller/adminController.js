const AdminModel = require("../models/adminModel");

const AdminController = {
  getStats: (req, res) => {
    AdminModel.getUsersCount((err, users) => {
      if (err) return res.status(500).json(err);

      AdminModel.getProductsCount((err, products) => {
        if (err) return res.status(500).json(err);

        AdminModel.getOrdersCount((err, orders) => {
          if (err) return res.status(500).json(err);

          res.json({
            users: users[0].total,
            products: products[0].total,
            orders: orders[0].total,
          });
        });
      });
    });
  },
};

module.exports = AdminController;

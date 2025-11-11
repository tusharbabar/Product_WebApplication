let db=require("../../db.js");

// add user

exports.AddUser = (Name, Email, password, Date, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (Name, Email, password, Date, role) VALUES (?, ?, ?, ?, ?)",
      [Name, Email, password, Date, role],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Registered Successfully" });
        }
      }
    );
  });
};


//login admin


exports.loginadmin = (Email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, Name, Email, password, role FROM users WHERE Email = ? AND role = 'admin'",
      [Email],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};


exports.loginuser = (Email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, Name, Email, password, role FROM users WHERE Email = ? AND role = 'user'",
      [Email],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};





//view users
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


//delete users
exports.DeleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [user_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "User Deleted Successfully", affectedRows: result.affectedRows });
      }
    });
  });
};  

//update user
exports.updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    let { Name, Email, password } = userData;

    let query, values;

    if (password && password.trim() !== "") {
      // Update with password
      query = "UPDATE users SET Name = ?, Email = ?, password = ? WHERE id = ?";
      values = [Name, Email, password, id];
    } else {
      // Update without password
      query = "UPDATE users SET Name = ?, Email = ? WHERE id = ?";
      values = [Name, Email, id];
    }

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


// ========== Order Manage======




exports.createOrder = (orderData, callback) => {
  const { user_id, product_id, address, contact, payment_method } = orderData;

  const sql = `
    INSERT INTO orders (user_id, product_id, address, contact, payment_method, status)
    VALUES (?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(sql, [user_id, product_id, address, contact, payment_method], (err, result) => {
    if (err) return callback(err);

    const orderId = result.insertId;

    const fetchSql = `
      SELECT 
        u.Email, 
        u.Name, 
        p.Name AS product_name, 
        p.price, 
        o.address,
        o.contact
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      WHERE o.id = ?
    `;

    db.query(fetchSql, [orderId], (fetchErr, rows) => {
      if (fetchErr) return callback(fetchErr);
      callback(null, { insertId: orderId, ...rows[0] });
    });
  });
};






// Get Orders by User ID

exports.getOrdersByUser = (userId, callback) => {
  const sql = `
    SELECT 
      o.id AS order_id,
      o.user_id,
      o.address,
      o.contact,
      o.payment_method,
      o.status,
      o.created_at,
      p.Name AS product_name,
      p.image_url,
      p.price
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE o.user_id = ?;
  `;
  
  db.query(sql, [userId], callback);
};



// view all order s in admin dash
exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
          o.id AS order_id,
          u.Name AS user_name,
          p.Name AS product_name,
          p.price AS product_price,
          o.address,
          o.payment_method,
          o.status,
          o.Contact,
          o.created_at
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      ORDER BY o.created_at ASC
    `;
    db.query(sql, (err, results) => (err ? reject(err) : resolve(results)));
  });
};

// =======  delete and update orders ==============

//delete
  // Delete order by id
  exports.deleteById= (id, callback) => {
    db.query("delete from orders where id= ?", [id], callback);
  };

  // Update order by id
 exports.updateById = (id, data, callback) => {
  const { status, payment_method, address } = data;

  db.query(
    "UPDATE orders SET status = ?, payment_method = ?, address = ? WHERE id = ?",
    [status, payment_method, address, id],
    callback
  );
};


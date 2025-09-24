import axios from "axios";

//add user
class Prodservice {
  addUsers(proddata) {
    return axios.post("http://localhost:3000/AddUser", proddata);
  };

  
//admin login
  adminLogin(email, password) {
    return axios.post("http://localhost:3000/loginadmin", {
      Email: email,
      password: password
    });
  };

  //login user by email pass
 userLogin(email, password) {
    return axios.post("http://localhost:3000/userlogin", {
      Email: email,
      password: password,
    });
  };




// view user in all and d postman is correct
getUsersbytable() {
    return axios.get("http://localhost:3000/users");
  }


//delete user
deleteUserById(id) {
  return axios.delete(`http://localhost:3000/users/${id}`);
  }

  // update users
updateUser(id, data) {
  return axios.put(`http://localhost:3000/users/${id}`, data);
}


//   //add product
//  addProduct(prodData) {
//     return axios.post("http://localhost:3000/addProd", prodData);
//   }

 addProduct(prodData) {
    const fd = new FormData();
    fd.append("Name", prodData.Name);
    fd.append("description", prodData.description);
    fd.append("price", prodData.price);
    fd.append("category_id", prodData.category_id);

    if (prodData.image) {
      formData.append("image", selectedFile); // <input type="file" /> से file
    }

    return axios.post("http://localhost:3000/addProd", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }





//get products on category
getProductsByCategory(categoryId){
  return axios.get(`http://localhost:3000/products/${categoryId}`);
  };


getProductById(id) {
    return axios.get(`http://localhost:3000/products/${id}`);
  }
  




//  --------- Add Jwt token  by users    ----
// on login submit
getUsers() {
  const token = localStorage.getItem("token"); 

  return axios.get("http://localhost:3000/users", {
    headers: {
      Authorization: `Bearer ${token}`,  
    }
  })
  .then(res => res.data)
  .catch(err => {
    console.error(err.response?.data || err.message);
    throw err; 
  });
}


  //-----------------  category API --------------------------------
addCategory(categoryData) {
  return axios.post("http://localhost:3000/Addcategory", categoryData);
};


  getAllCategories() {
    return axios.get("http://localhost:3000/getAllCategory");
    
  }

  updateCategory(categoryData) {
    return axios.post("http://localhost:3000/UpdateCategory", categoryData);
  }

  deleteCategory(categoryData) {
    return axios.post("http://localhost:3000/DeleteCategory", categoryData);
  }

//==========product fetch by backend=============

 getProducts() {
    return axios.get("http://localhost:3000/productsview");
  }

  deleteProduct(id) {
    return axios.delete(`http://localhost:3000/productsview/${id}`);
  }

 updateProduct(id, product) {
  return axios.put(`http://localhost:3000/productsview/${id}`, product);
}


//============ All Done AIP      New AIP started date 0f  ====================



//================= Manage Orders =================================


  placeOrder(order) {
    return axios.post("http://localhost:3000/place-order", {
      user_id: order.user_id,
      product_id: order.product_id,
      address: order.address,
      contact:order.contact,
      payment_method: order.payment_method,
      
    });
  }







  getUserOrders(userId) {
    return axios.get(`http://localhost:3000/user-orders/${userId}`);
  };


  // Get all orders (Admin)
  getAllOrders() {
    return axios.get("http://localhost:3000/orders");
  }


/// Delete order
deleteOrder(id) {
  return axios.put(`http://localhost:3000/orders/delete/${id}`);
}



// Update order
updateOrder(id, data) {
  return axios.put(`http://localhost:3000/orders/update/${id}`, data);
}












};



export default new Prodservice();





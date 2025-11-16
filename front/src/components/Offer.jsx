// import React from "react";
// import { Link } from "react-router-dom";
// import "../style/custom.css";

// function OffersPage() {
//   const offers = [
//     {
//       id: 1,
//       title: "Wireless Earbuds 40% Off",
//       price: "₹1,499",
//       oldPrice: "₹2,499",
//       image:
//         "https://m.media-amazon.com/images/I/61kWB+uzR2L._SL1500_.jpg",
//       link: "/electronic",
//     },
//     {
//       id: 2,
//       title: "Men's Denim Jacket",
//       price: "₹1,199",
//       oldPrice: "₹2,499",
//       image:
//         "https://i.pinimg.com/1200x/cf/ea/c7/cfeac7f1fc5247f1f3a80d0b2f23022b.jpg",
//       link: "/men",
//     },
//     {
//       id: 3,
//       title: "Women's Designer Saree",
//       price: "₹1,799",
//       oldPrice: "₹3,599",
//       image:
//         "https://i.pinimg.com/1200x/8b/69/1a/8b691aeb62447e3f95cfc5343db225f1.jpg",
//       link: "/women",
//     },
//     {
//       id: 4,
//       title: "Smart LED TV 32 inch",
//       price: "₹9,999",
//       oldPrice: "₹14,999",
//       image:
//         "https://i.pinimg.com/736x/d6/80/86/d6808602b2b87a6e75dad19c5a064c4d.jpg    ",
//       link: "/electronic",
//     },
    
//     {
//       id: 7,
//       title: "Kitchen Mixer Grinder",
//       price: "₹2,499",
//       oldPrice: "₹3,999",
//       image:
//         "https://i.pinimg.com/736x/e5/cc/0e/e5cc0eea30e0c144defe65de4beeff78.jpg",
//       link: "/electronic",
//     },
//     {
//       id: 8,
//       title: "Beauty Makeup Kit",
//       price: "₹999",
//       oldPrice: "₹1,999",
//       image:
//         "https://i.pinimg.com/736x/6b/9e/33/6b9e3373272e56d1db330eb9d84f7983.jpg",
//       link: "/beauty",
//     },
//   ];
  
//   return (
//     <div className="container my-5 ">
//       <h1 className="text-center mb-4"> Exclusive Offers </h1>
//       <p className="text-center text-muted">
//         Limited-time deals just for you. Hurry before they're gone!
//       </p>

//       <div className="row mt-4 ">
//         {offers.map((offer) => (
//           <div className="col-md-3 mb-4" key={offer.id}>
//             <div className="card h-100 shadow-sm animate__animated animate__zoomIn">
//               <img
//                 src={offer.image}
//                 className="card-img-top"
//                 alt={offer.title}
//                 style={{ height: 220, objectFit: "cover" }}
//               />
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{offer.title}</h5>
//                 <p className="card-text text-success fw-bold">
//                   Now: {offer.price}{" "}
//                   <span className="text-muted text-decoration-line-through">
//                     {offer.oldPrice}
//                   </span>
//                 </p>
//                 <Link to={offer.link} className="btn btn-warning mt-auto">
//                   Grab Offer 
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-4">
//         <Link to="/" className="btn btn-outline-primary">
//           ⬅ Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default OffersPage;



import React from "react";
import { Link } from "react-router-dom";

function OffersPage() {
 const offers = [
  {
    id: 1,
    title: "Wireless Earbuds 40% Off",
    price: "₹1,499",
    oldPrice: "₹2,499",
    image: "https://m.media-amazon.com/images/I/61kWB+uzR2L._SL1500_.jpg",
    link: "/electronic",
  },
  {
    id: 2,
    title: "Men's Denim Jacket",
    price: "₹1,199",
    oldPrice: "₹2,499",
    image:
      "https://m.media-amazon.com/images/I/71ve1GPmR2L._AC_UL1500_.jpg",
    link: "/men",
  },
  {
    id: 3,
    title: "Women's Designer Saree",
    price: "₹1,799",
    oldPrice: "₹3,599",
    image:
      "https://m.media-amazon.com/images/I/71sDdyCjYaL._AC_UL1500_.jpg",
    link: "/women",
  },
  {
    id: 4,
    title: "Smart LED TV 32 inch",
    price: "₹9,999",
    oldPrice: "₹14,999",
    image:
      "https://m.media-amazon.com/images/I/71tIrZqybrL._AC_SL1500_.jpg",
    link: "/electronic",
  },
  {
    id: 7,
    title: "Kitchen Mixer Grinder",
    price: "₹2,499",
    oldPrice: "₹3,999",
    image:
      "https://m.media-amazon.com/images/I/71pFe1PfvBL._AC_SL1500_.jpg",
    link: "/electronic",
  },
  {
    id: 8,
    title: "Beauty Makeup Kit",
    price: "₹999",
    oldPrice: "₹1,999",
    image:
      "https://m.media-amazon.com/images/I/71jvXG3SIlL._AC_SL1500_.jpg",
    link: "/beauty",
  },
  {
    id: 9,
    title: "Smart Fitness Band",
    price: "₹1,299",
    oldPrice: "₹2,499",
    image:
      "https://m.media-amazon.com/images/I/61QJ7hPZrPL._SL1500_.jpg",
    link: "/electronic",
  },
  {
    id: 10,
    title: "Casual Running Shoes",
    price: "₹899",
    oldPrice: "₹1,999",
    image:
      "https://m.media-amazon.com/images/I/71T0A-LN0wL._AC_UL1500_.jpg",
    link: "/men",
  },
  {
    id: 11,
    title: "Women’s Handbag Combo",
    price: "₹1,199",
    oldPrice: "₹2,499",
    image:
      "https://m.media-amazon.com/images/I/718GtPoJ3IL._AC_UL1500_.jpg",
    link: "/women",
  },
  {
    id: 12,
    title: "Portable Bluetooth Speaker",
    price: "₹749",
    oldPrice: "₹1,599",
    image:
      "https://m.media-amazon.com/images/I/71qr0+p9TEL._AC_SL1500_.jpg",
    link: "/electronic",
  },
  {
    id: 13,
    title: "Luxury Fragrance Set",
    price: "₹1,099",
    oldPrice: "₹2,299",
    image:
      "https://m.media-amazon.com/images/I/71u7NbQkvvL._AC_SL1500_.jpg",
    link: "/beauty",
  },
  {
    id: 14,
    title: "Non-Stick Cookware 3-Piece Set",
    price: "₹1,799",
    oldPrice: "₹3,699",
    image:
      "https://m.media-amazon.com/images/I/71WEE-YYLLL._AC_SL1500_.jpg",
    link: "/home",
  },
  {
    id: 15,
    title: "Premium Bed Sheet (King Size)",
    price: "₹999",
    oldPrice: "₹1,899",
    image:
      "https://m.media-amazon.com/images/I/81o9xgUekcL._AC_SL1500_.jpg",
    link: "/home",
  },
  {
    id: 16,
    title: "Trendy Women’s Sneakers",
    price: "₹899",
    oldPrice: "₹1,799",
    image:
      "https://m.media-amazon.com/images/I/61rUuLwHxPL._AC_UL1500_.jpg",
    link: "/women",
  },
  {
    id: 17,
    title: "Gaming Keyboard RGB",
    price: "₹1,499",
    oldPrice: "₹2,999",
    image:
      "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_SL1500_.jpg",
    link: "/electronic",
  },
  {
    id: 18,
    title: "Coffee Maker Machine",
    price: "₹2,299",
    oldPrice: "₹4,499",
    image:
      "https://m.media-amazon.com/images/I/71UDhgkI9SL._AC_SL1500_.jpg",
    link: "/home",
  },
];


  return (
    <>
      {/* 🔥 INBUILT CSS */}
      <style>
        {`
          .offer-card {
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }
          
          .offer-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.18);
          }

          .offer-img {
            height: 220px;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .offer-card:hover .offer-img {
            transform: scale(1.05);
          }
        `}
      </style>

      <div className="container my-5">
        <h1 className="text-center fw-bold mb-3">🔥 Exclusive Offers</h1>
        <p className="text-center text-muted">
          Limited-time deals just for you. Hurry before they're gone!
        </p>

        <div className="row mt-4">
          {offers.map((offer) => (
            <div className="col-md-3 col-sm-6 mb-4" key={offer.id}>
              <div className="card offer-card shadow-sm">
                <img src={offer.image} className="offer-img" alt={offer.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{offer.title}</h5>

                  <p className="card-text text-success fw-bold">
                    Now: {offer.price}{" "}
                    <span className="text-muted text-decoration-line-through">
                      {offer.oldPrice}
                    </span>
                  </p>

                  <Link to={offer.link} className="btn btn-warning mt-auto">
                    Grab Offer
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-outline-primary">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default OffersPage;


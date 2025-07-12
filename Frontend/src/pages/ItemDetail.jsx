import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);
      setProduct(res.data.product);
      console.log(res.data.product);
      const related = await axios.get(`http://localhost:3000/api/products/users/${res.data.product.owner._id}/products`);
      console.log(related.data);
      setRelatedItems(related.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-blue-50 min-h-screen font-poppins">
      <Navbar />

      <div className="p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">👗 {product.title}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div>
            <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
              {product.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Product ${i}`}
                  className="rounded-lg shadow-md max-h-[400px] object-contain w-full"
                />
              ))}
            </Slider>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <p><strong>Uploader:</strong> {product.owner.username || "N/A"}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>Description:</strong> {product.description}</p>

            <div>
              <strong>Tags:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {product.isAvailable ? (
  <div className="flex flex-wrap gap-4 mt-4">
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
      onClick={() => handleSwapRequest(product._id)}
    >
      Swap Request
    </button>
    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold shadow"
      onClick={() => handleRedeemPoints(product._id)}
    >
      Redeem via Points
    </button>
  </div>
) : (
  <button className="mt-4 px-5 py-2 rounded-lg font-semibold text-white bg-gray-400 cursor-not-allowed">
    Not Available
</button>
)}          </div>
        </div>

{/* Previous Listings */}
{relatedItems.length > 0 && (
  <div className="mt-12">
    <h3 className="text-2xl font-semibold mb-4">Previous Listings:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {relatedItems
        .filter((item) => item._id !== product._id) // Exclude current product
        .map((item) => (
          <Link
            key={item._id}
            to={`/item/${item._id}`}
            className="bg-white p-4 rounded shadow hover:shadow-md transition block"
          >
            <img
              src={item.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={item.title}
              className="w-full h-[180px] object-cover rounded"
            />
            <h4 className="mt-2 font-semibold text-blue-700">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.condition}</p>
          </Link>
        ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default ItemDetail;

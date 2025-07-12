// src/pages/AddItem.js
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const AddItem = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: "",
    imageLinks: [""], // for multiple image URLs
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageLinkChange = (index, value) => {
    const updatedLinks = [...form.imageLinks];
    updatedLinks[index] = value;
    setForm({ ...form, imageLinks: updatedLinks });
  };

  const addImageField = () => {
    setForm({ ...form, imageLinks: [...form.imageLinks, ""] });
  };

  const removeImageField = (index) => {
    const updatedLinks = [...form.imageLinks];
    updatedLinks.splice(index, 1);
    setForm({ ...form, imageLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("rewear_token");
        const user = JSON.parse(localStorage.getItem("rewear_user"));

      const payload = {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        images: form.imageLinks.filter((url) => url.trim() !== ""),
      };
      console.log("Token being sent:", token);

      await axios.post("http://localhost:3000/api/products", payload,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item submitted successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        type: "",
        size: "",
        condition: "",
        tags: "",
        imageLinks: [""],
      });
    } catch (err) {
      toast.error("Failed to submit item. Try again.");
      console.error(err);
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="max-w-3xl mx-auto shadow-xl px-4 py-10 font-poppins">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600 text-center">
        📦 List a New Item
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl space-y-5"
      >
        {/* Multiple Image URLs */}
        <div>
          <label className="block font-medium mb-1">Image URLs</label>
          {form.imageLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleImageLinkChange(index, e.target.value)}
                placeholder="Enter image URL"
                className="w-full border rounded p-2"
                required
              />
              {form.imageLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-sm text-blue-600 underline"
          >
            + Add another image
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Size</label>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Gently Used">Gently Used</option>
              <option value="Worn">Worn</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition duration-300 w-full"
        >
          Submit Item
        </button>
      </form>
    </div></div>
  );
};

export default AddItem;

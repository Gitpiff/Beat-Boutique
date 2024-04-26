import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../redux/products";
import { Navigate } from "react-router-dom";

function CreateProduct() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [prodData, setProdData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setProdData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionUser) {
      try {
        console.log("before dispatch   ", prodData)
        await dispatch(createNewProduct(prodData));
        setProdData({
          name: "",
          description: "",
          price: "",
          inventory: "",
          type: "",
        });
      } catch (error) {
        console.error("Error creating product: ", error);
      }
    }
  };

  if (!sessionUser) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={prodData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={prodData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type</label>
        <select
          name="type"
          value={prodData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="MUSICAL_INSTRUMENTS">Musical Instruments</option>
          <option value="CLOTHING">Clothing</option>
          <option value="TAPES">Tapes</option>
          <option value="CDS">CDs</option>
          <option value="PINS">Pins</option>
        </select>
      </div>
      <div>
        <label>Inventory</label>
        <input
          type="number"
          name="inventory"
          value={prodData.inventory}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={prodData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;

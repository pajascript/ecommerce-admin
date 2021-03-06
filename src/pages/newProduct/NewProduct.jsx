import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCat = (e) => {
    setCategories(e.target.value.split(","))
  }

  const handleStockChange = (e) => {
    const convertedStock = parseInt(e.target.value)
    setStock(convertedStock);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime + file.name;
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot).totalBytes* 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        //handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs, img: downloadURL, categories, inStock: stock };
          addProducts(product, dispatch);
          setSuccess(true);
          alert("New Product Added!")
        })
      }
    )
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Item Name" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="description" type="text" placeholder="Description..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="Price" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="e-liquids, devices..." onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock: </label>
          <input type="text" name="inStock" placeholder={0} onChange={handleStockChange} />
        </div>
        {success && <div>New Product Added</div>}
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}

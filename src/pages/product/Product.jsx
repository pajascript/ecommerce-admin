import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { updateProducts } from "../../redux/apiCalls";

export default function Product() {

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

  const product = useSelector(state => state.product.products.find(product => product._id === productId));
    
  const MONTHS = useMemo(
    () => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []
  );

  const handleChange = (e) => {
    setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
      })
  };

  const handleStockChange = (e) => {
    const convertedStock = parseInt(e.target.value)
    setStock(convertedStock);
  }

  const handleClick = (e) => {
    e.preventDefault();
    updateProducts(productId, {...inputs, inStock: product.inStock + stock}, dispatch);
    alert("Product Updated Successfully")
  };

  useEffect(() => {
    const getStats = async() => {
        try {
            const res = await userRequest.get("orders/income?pid=" + productId);
            const list = res.data.sort((a,b) => {
                return a._id - b._id;
            });
            list.map((item) => 
                setPStats((prev) => [
                    ...prev,
                    { name: MONTHS[item._id - 1], Sales: item.total },
                ])
            )
        } catch (err) {
            console.log(err)
        }
    }
    getStats();
  }, [MONTHS, productId])

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">{product._id}</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">In Stock:</span>
                      <span className="productInfoValue stock">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input name="title" type="text" placeholder={product.title} onChange={handleChange} />
                  <label>Product Description</label>
                  <input name="description" type="text" placeholder={product.description} onChange={handleChange} />
                  <label>Price</label>
                  <input name="price" type="number" placeholder={product.price} onChange={handleChange} />
                  <label>Add to Stock:</label>
                  <input type="text" name="inStock" placeholder={0} onChange={handleStockChange} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button onClick={handleClick} className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [cate, setCate] = useState([]);
  const [file, setFile] = useState(null);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const [pr, setPr] = useState({});
  const handleCate = (e) => {
    setCate(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const getpro = async () => {
    try {
      const res = await userRequest.get("/products/find/" + productId);
      setPr(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log([...product.categories].toString());
  const handleUpdate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        // Handle unsuccessful uploads
      },

      () => {
        const result = window.confirm(
          "Are you sure you want to update this product?"
        );

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const udProduct = {
            ...inputs,
            img: downloadURL,
            categories: cate,
            color: color,
            size: size,
          };
          if (result) {
            updateProduct(productId, udProduct, dispatch);
            getpro();
          } else {
            return;
          }
        });

        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      }
    );
  };
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
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product?.img || pr.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product?.title || pr.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id || pr._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product?.inStock.toString() || pr.inStock.toString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder={product?.title || pr.title}
            />
            <label>Product Description </label>
            <input
              type="text"
              name="desc"
              onChange={handleChange}
              placeholder={product?.desc || pr.desc}
            />
            <label>Colors </label>
            <input
              type="text"
              name="color"
              onChange={handleColor}
              // placeholder={[...product?.color] || [...pr.color].toString()}
            />
            <label>Categories </label>

            <input
              type="text"
              name="categories"
              onChange={handleCate}
              // placeholder={[...product.categories] || [...pr.categories]}
            />
            <label>Size </label>
            <input
              type="text"
              name="size"
              onChange={handleSize}
              // placeholder={[...product?.size] || [...pr.size]}
            />
            <label>Price </label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              placeholder={product?.price || pr.price}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={product?.img || pr.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="img"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

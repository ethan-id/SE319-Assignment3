import { useState, useEffect } from "react";
import "./App.css";

function App() {

    const [productData, setProductData] = useState([]);
    const [viewer1, setViewer1] = useState(true);

    const [oneProduct, setOneProduct] = useState([]);
    const [viewer2, setViewer2] = useState(false);

    const [viewer3, setViewer3] = useState(false);
    const [addNewProduct, setAddNewProduct] = useState({
        _id: null,
        id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 },
    });

    const [viewer4, setViewer4] = useState(false);
    const [updateItem, setUpdateItem] = useState(<></>);
    const [itemForUpdate, setItemForUpdate] = useState({
        _id: null,
        id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "",
        rating: { rate: 0.0, count: 0 },
    });

    function deleteOneProduct(deleteid) {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            fetch("http://localhost:4000/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: deleteid }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Delete a product completed : ", deleteid);
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });
            getAllProducts();
        }
    }

    function getAllProducts() { 
        fetch("http://localhost:4000/")
        .then((response) => response.json())
        .then((data) => {
            setProductData(data);
        });
    }

    function getOneProduct(id) {
        fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
            const dataArr = [];
            dataArr.push(data);
                setOneProduct(dataArr);
            });
            setViewer2(!viewer2);
    }

    function handleChange(evt) {
        const value = evt.target.value;
        if (evt.target.name === "id") {
            setAddNewProduct({ ...addNewProduct, id: value });
        } else if (evt.target.name === "title") {
            setAddNewProduct({ ...addNewProduct, title: value });
        } else if (evt.target.name === "price") {
            setAddNewProduct({ ...addNewProduct, price: value });
        } else if (evt.target.name === "description") {
            setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "category") {
            setAddNewProduct({ ...addNewProduct, category: value });
        } else if (evt.target.name === "image") {
            const temp = value;
            setAddNewProduct({ ...addNewProduct, image: temp });
        } else if (evt.target.name === "rate") {
            setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
        } else if (evt.target.name === "count") {
            const temp = addNewProduct.rating.rate;
            setAddNewProduct({
                ...addNewProduct,
                rating: { rate: temp, count: value },
            });
        }
    }

    function updateOneProduct() {
        console.log(itemForUpdate);
        fetch("http://localhost:4000/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemForUpdate),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                const value = Object.values(data);
                alert(value);
            }
        });
        getAllProducts();
    }

    function handleChange2(evt) {
        const value = evt.target.value;
        if (evt.target.name === "id") {
            setItemForUpdate({ ...itemForUpdate, id: value });
        } else if (evt.target.name === "title") {
            setItemForUpdate({ ...itemForUpdate, title: value });
        } else if (evt.target.name === "price") {
            setItemForUpdate({ ...itemForUpdate, price: value });
        } else if (evt.target.name === "description") {
            setItemForUpdate({ ...itemForUpdate, description: value });
        } else if (evt.target.name === "category") {
            setItemForUpdate({ ...itemForUpdate, category: value });
        } else if (evt.target.name === "image") {
            const temp = value;
            setItemForUpdate({ ...itemForUpdate, image: temp });
        } else if (evt.target.name === "rate") {
            setItemForUpdate({ ...itemForUpdate, rating: { rate: value } });
        } else if (evt.target.name === "count") {
            const temp = itemForUpdate.rating.rate;
            setItemForUpdate({
                ...itemForUpdate,
                rating: { rate: temp, count: value },
            });
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:4000/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addNewProduct),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                const value = Object.values(data);
                alert(value);
            }
        });
    }

    const updateItemFunc = (el) => {
        setItemForUpdate({
            id: el.id,
            title: el.title,
            category: el.category,
            description: el.description,
            price: el.price,
            image: el.image,
            rating: {
                rate: el.rating.rate,
                count: el.rating.count
            }
        });
        return (
            <div className="card my-3">
                <div className="row p-2 bg-white border rounded">
                    <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" alt="product" src={el.image}></img></div>
                    <div className="col">
                        <h3>Update Item</h3>
                        <div className="row">
                            <input type="text" name="title" placeholder={`Title: ${el.title}`} onChange={handleChange2}/>
                        </div>
                        <div className="row">
                            <input type="text" name="category" placeholder={`Category: ${el.category}`} onChange={handleChange2}/>
                        </div>
                        <div className="row">
                            <input type="text" name="description" placeholder={`Description: ${el.description}`} onChange={handleChange2}/>
                        </div>
                        <div className="row">
                            <input type="text" name="price" placeholder={`Price: ${el.price}`} onChange={handleChange2}/>
                        </div>
                    </div>
                    <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                        <div className="d-flex flex-column mt-4">
                            <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={() => {
                                updateOneProduct();
                                setViewer4(false);
                            }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const showOneItem = oneProduct.map((el) => (
        <div key={el._id} className="card my-3">
            <div className="row p-2 bg-white border rounded">
                <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" alt="product" src={el.image}></img></div>
                <div className="col-md-6 mt-1">
                    <h1>{el.title}</h1>
                    <div className="mt-1 mb-1 spec-1"><span>{el.category}</span></div>
                    <p className="text-justify para mb-0">{el.description}</p>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div className="d-flex flex-row align-items-center">
                        <h4 className="mr-1">${el.price}</h4>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => {
                            setItemForUpdate({
                                id: el.id,
                                title: el.title,
                                category: el.category,
                                description: el.description,
                                price: el.price,
                                image: el.image,
                                rating: {
                                    rate: el.rating.rate,
                                    count: el.rating.count
                                }
                            });
                            setUpdateItem(updateItemFunc(el));
                            setViewer4(true);
                        }}>Edit</button>
                        <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={() => {
                            deleteOneProduct(el.id);
                            getAllProducts();
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    ));

    const showAllItems = productData.map((el) => (
        <div key={el._id} className="card my-3">
            <div className="row p-2 bg-white border rounded">
                <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" alt="product" src={el.image}></img></div>
                <div className="col-md-6 mt-1">
                    <h3>{el.title}</h3>
                    <div className="mt-1 mb-1 spec-1"><span>{el.category}</span></div>
                    <p className="text-justify para mb-0">{el.description}</p>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div className="d-flex flex-row align-items-center">
                        <h4 className="mr-1">${el.price}</h4>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                        <button className="btn btn-primary btn-sm" type="button"onClick={() => {
                            setItemForUpdate({
                                id: el.id,
                                title: el.title,
                                category: el.category,
                                description: el.description,
                                price: el.price,
                                image: el.image,
                                rating: {
                                    rate: el.rating.rate,
                                    count: el.rating.count
                                }
                            });
                            setUpdateItem(updateItemFunc(el));
                            setViewer4(true);
                        }}>Edit</button>
                        <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={() => {
                            deleteOneProduct(el.id);
                            getAllProducts();
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    ));

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container justify-content-start">
                    <button className="navbar-brand mx-5 btn" onClick={() => {
                        setViewer1(true);
                        setViewer2(true);
                        setViewer3(false);
                        getAllProducts();
                    }}>View Items</button>
                    <button className="navbar-brand mx-5 btn" onClick={() => {
                        setViewer1(false);
                        setViewer2(false);
                        setViewer3(true);
                    }}>Add Item</button>
                </div>
            </nav>
            <div className="container mainBody">
                {viewer4 && 
                <div className="popup">
                    {updateItem}
                </div>}
                {viewer3 && 
                <div>
                    <h3>Add a new product :</h3>
                    <form action="">
                        <input type="number" placeholder="id?" name="id" onChange={handleChange} />
                        <input type="text" placeholder="title?" name="title" onChange={handleChange} />
                        <input type="number" placeholder="price?" name="price" onChange={handleChange} />
                        <input type="text" placeholder="description?" name="description" onChange={handleChange} />
                        <input type="text" placeholder="category?" name="category" onChange={handleChange} />
                        <input type="text" placeholder="image?" name="image" onChange={handleChange} />
                        <input type="number" placeholder="rate?" name="rate" onChange={handleChange} />
                        <input type="number" placeholder="count?" name="count" onChange={handleChange} />
                        <button type="submit" onClick={handleOnSubmit}>
                            Submit
                        </button>
                    </form>
                </div>}
                {viewer1 && 
                <div>
                    <div>
                        <h1>Show one Product by Id:</h1>
                        <input type="text" id="message" name="message" placeholder="id" onChange={(e) =>getOneProduct(e.target.value)} />
                        {viewer2 && 
                        <div>
                            {showOneItem}
                        </div>}
                        <h1 className="mt-3">Catalog of Products</h1>
                        {viewer1 &&
                        <div className="container">
                            {/* <div className="row row-cols-4"> */}
                                {showAllItems}
                            {/* </div> */}
                        </div>}
                        <hr></hr>
                    </div>
                </div>}
            </div>
        </div>
    ) // App end
}

export default App;
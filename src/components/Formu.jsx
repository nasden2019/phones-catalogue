import React from 'react';
import shortid from 'shortid';

const Formu = ({ renderAgain }) => {

    const [mobile, setMobile] = React.useState('');

    const [mobiles, setMobiles] = React.useState([]);

    const [edition, setEdition] = React.useState(false);

    const [id, setId] = React.useState('');

    const [error, setError] = React.useState(null)

    // ESTADOS DEL CRUD
    const [name, setName] = React.useState('Samsung A8');
    const [manufacturer, setManufacturer] = React.useState('Huawei');
    const [price, setPrice] = React.useState('319');
    const [color, setColor] = React.useState('red');
    const [image, setImage] = React.useState('https://storage.googleapis.com/yoigo-statics/img/terminales/ImgMain_mi11-lite-5g-negro-main.png');
    const [ram, setRam] = React.useState('128');
    const [processor, setProcessor] = React.useState('Bionic 790');
    const [screen, setScreen] = React.useState(14);

    // Add Phone
    const addMobile = (e) => {
        e.preventDefault();

        if (!mobile.trim()) {
            console.log('Input is empty');
            return
        }

        setMobiles([
            ...mobiles,
            { id: shortid.generate(), nameMobile: mobile }
        ]);

        setMobile('')
        setError(null)
    }

    // Delete Mobile
    const deleteMobile = id => {
        const filterArray = mobiles.filter(item => item.id !== id)
        setMobiles(filterArray);
    }


    // BTN EDITION
    const editing = item => {
        setEdition(true)
        setMobile(item.nameMobile)
        setId(item.id);
        setError(null)
    }


    // FORM EDITION
    const editMobile = (e) => {
        e.preventDefault();

        if (!mobile.trim()) {
            console.log('Empty');
            return
        }

        const filterArray = mobiles.map(
            item => item.id === id ? { id: id, nameMobile: mobile } : item
        )

        setMobiles(filterArray)
        setEdition(false)
        setMobile('')
        setId('');

    }

    const handleAdd = () => {
        var raw = JSON.stringify({
            name: name,
            manufacturer: manufacturer,
            color: ["black", "green"],
            image: image,
            price: price,
            screen: screen,
            processor: processor,
            ram: ram,
        });


        fetch("https://api-phones.herokuapp.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
        })
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                renderAgain()
            })
            .catch((error) => console.log("error", error));
    }


    return (
        <div className="container mt-5">
            <h2 className="text-center crudTitle">The mobile you are looking for</h2>

            <div className="row d-flex justify-content-center">

                <div className="col-sm-4 col-12 mt-4 mb-5">

                    <form onSubmit={edition ? editMobile : addMobile}>

                        {
                            error ? <span className="text-danger my-2">{error}</span> : null
                        }

                        <input
                            onChange={e => setName(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={name}
                        />
                        <input
                            onChange={e => setManufacturer(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={manufacturer}
                        />
                        <input
                            onChange={e => setImage(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={image}
                        />

                        <input
                            onChange={e => setPrice(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={price}
                        />
                        <input
                            onChange={e => setScreen(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={screen}
                        />
                        <input
                            onChange={e => setColor(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={color}
                        />
                        <input
                            onChange={e => setProcessor(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={processor}
                        />
                        <input
                            onChange={e => setRam(e.target.value)}
                            type="text" className="form-control mb-2"
                            placeholder="Phone Name"
                            value={ram}
                        />


                        {
                            edition ? (
                                <button className="btn btn-warning btn-block" type="submit">Edit</button>
                            ) : (
                                <button className="btn btn-dark btn-block" type="submit"
                                    onClick={() => handleAdd()}
                                >Add</button>
                            )
                        }

                    </form>
                </div>

                {/* <div className="col-sm-8 col-12 my-4">
                    <h4 className="text-center">List of mobiles</h4>
                    <ul className="list-group">

                        {
                            mobiles.length === 0 ? (
                                <li className="list-group-item">No Mobiles were added</li>
                            ) : (
                                mobiles.map(item => (
                                    <li key={item.id} className="list-group-item">
                                        <span className="lead">{item.nameMobile}</span>

                                        <button
                                            className="btn btn-danger btn-sm float-right mx-2"
                                            onClick={() => deleteMobile(item.id)}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            className="btn btn-warning btn-sm float-right py-1 px-3"
                                            onClick={() => editing(item)}
                                        >
                                            Edit
                                        </button>

                                    </li>
                                ))
                            )
                        }

                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default Formu

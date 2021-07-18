import { useEffect, useState } from "react";
import Test from './components/Test';
import Search from './components/Search';
import Formu from './components/Formu'

const HomePage = () => {
    const [phones, setPhones] = useState("");
    const [phonesCopy, setPhonesCopy] = useState("");
    const [render, setRender] = useState(true);

    useEffect(() => {
        if (render) {
            async function getData() {
                let response = await fetch("https://api-phones.herokuapp.com/")
                    .then((response) => response.json())
                    .then((data) => data);

                setPhones(response);
                setPhonesCopy(response);
                setRender(false)
            }
            getData();
        }
    }, [render]);

    // para renderizado instantaneo de cards y ediciones
    function renderAgain() {
        setRender(true);
    }

    // funcion de borrar
    function handleRemove(id) {
        let removed = phones.filter((phone) => phone._id !== id);
        setPhones(removed);
        setPhonesCopy(removed);

        fetch(`https://api-phones.herokuapp.com/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }

    // filter phones
    function handleSearch(e) {
        console.log(phonesCopy);
        let searched = phonesCopy.filter(
            (phone) =>
                phone.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                phone.manufacturer.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setPhones(searched);
    }

    let content;
    if (phones) {

        content = phones.map((phone) => (
            <Test
                key={phone._id}
                handleRemove={handleRemove}
                id={phone._id}
                name={phone.name}
                manufacturer={phone.manufacturer}
                price={phone.price}
                image={phone.image}
                processor={phone.processor}
                ram={phone.ram}
                renderAgain={renderAgain}
                screen={phone.screen}
                color={phone.color}
            />

        ));
        console.log(content);
    }


    if (!phones) return <div className="d-flex justify-content-center mt-5">"LOADING..."</div>;

    if (content)

        return (

            <>
                <Search handleSearch={handleSearch} />

                <div className="container-fluid" id="bigBox">
                    <div className="row">
                        <div className="col-12 col-sm-12 caja text-center ">
                            <div className="row">
                                {content}
                            </div>
                        </div>
                    </div>
                </div >

                <div className="mt-4">
                    <Formu renderAgain={renderAgain} />
                </div>
            </>
        );
};

export default HomePage;
import React from 'react';
import { CgScreenShot } from "react-icons/cg";
import { CgSmartphoneRam } from "react-icons/cg";
import { FiCpu } from "react-icons/fi";
import Colors from './Colors';
import EditForm from './EditForm';


import {
    Heading,
    Box,
    Slide,
} from "@chakra-ui/react";


const Test = ({
    id,
    renderAgain,
    name,
    manufacturer,
    price,
    image,
    screen,
    processor,
    ram,
    handleRemove,
    color
}) => {

    const [isOpen, setIsOpen] = React.useState();

    return (
        <>
            <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-3 col-12 testMargin d-flex justify-content-center">
                <div className="smallCaja d-flex inline-block">
                    <div className="" onClick={() => setIsOpen(!isOpen)}>
                        <img className="image mx-auto" src={image} alt="" />
                        <h4 className="brands my-3">
                            {name}
                            <br />
                            {manufacturer}
                        </h4>

                        <div className="mb-sm-2 spaceColors">
                            {color.map((x, index) => <Colors key={index} color={x} />)}
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <CgScreenShot className="icons mr-sm-2 mr-2" />
                            <p className="data">{screen} inches</p>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <CgSmartphoneRam className="icons mr-sm-2 mr-2" />
                            <p className="data">{ram} GB</p>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <FiCpu className="icons mr-sm-2 mr-2 mr-2" />
                            <p className="data">{processor}</p>
                        </div>
                        <p className="price mt-3">{price} €</p>
                    </div>

                    <div className="d-flex justify-content-end mt-4 ml-2">
                        <EditForm key={id}
                            handleRemove={handleRemove}
                            id={id}
                            renderAgain={renderAgain}
                            name={name}
                            manufacturer={manufacturer}
                            price={price}
                            image={image}
                            processor={processor}
                            ram={ram}
                            screen={screen}
                            color={color} />


                        <div className="text-right ml-2">
                            <button className="btn btn-danger" onClick={() => handleRemove(id)}>X</button>
                        </div>
                    </div>
                </div>
            </div>


            {isOpen && (
                <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
                    <Box
                        p="40px"
                        color="white"
                        mt="4"
                        bg="blue.400"
                        rounded="md"
                        shadow="md"
                    >
                        <Heading fontSize="xl">Smile, you’re in Portrait mode.
                            The advanced camera system with A13 Bionic brings you Portrait mode, <br />which artfully blurs the background to put the focus on your subject — even when you’re taking selfies.</Heading>
                    </Box>
                </Slide>
            )}
        </>
    )
}

export default Test

import React from 'react';
import { GrEdit } from 'react-icons/gr'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    Stack,
    Box,
    FormLabel,
    Textarea,
} from "@chakra-ui/react";


const EditForm = ({
    id,
    renderAgain,
    name: phoneName,
    manufacturer: manufacturerName,
    price: priceName,
    image: imageName,
    screen: screenName,
    processor: processorName,
    ram: ramName,
    color: colorName }) => {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();


    const [name, setName] = React.useState(phoneName);
    const [manufacturer, setManufacturer] = React.useState(manufacturerName);
    const [price, setPrice] = React.useState(priceName);
    const [color, setColor] = React.useState(colorName);
    const [image, setImage] = React.useState(imageName);
    const [ram, setRam] = React.useState(ramName);
    const [processor, setProcessor] = React.useState(processorName);
    const [screen, setScreen] = React.useState(screenName);


    function handleEdit() {
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
        console.log(raw)


        fetch(`https://api-phones.herokuapp.com/${id}`, {
            method: "PATCH",
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
        <>
            <Button color="white" ref={btnRef} colorScheme="yellow" onClick={onOpen}>
                <GrEdit />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add new phone</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="username">Name of Phone</FormLabel>
                                <Input onChange={e => setName(e.target.value)}
                                    id="username" placeholder={name} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Manufacturer</FormLabel>
                                <Input onChange={e => setManufacturer(e.target.value)}
                                    id="username" placeholder={manufacturer} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Price</FormLabel>
                                <Input onChange={e => setPrice(e.target.value)}
                                    id="username" placeholder={price} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Link of image</FormLabel>
                                <Input onChange={e => setImage(e.target.value)}
                                    id="username" placeholder={image} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Processor</FormLabel>
                                <Input onChange={e => setProcessor(e.target.value)}
                                    id="username" placeholder={processor} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Ram</FormLabel>
                                <Input onChange={e => setRam(e.target.value)}
                                    id="username" placeholder={ram} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Color</FormLabel>
                                <Input onChange={e => setColor(e.target.value)}
                                    id="username" placeholder={color} />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="username">Screen</FormLabel>
                                <Input onChange={e => setScreen(e.target.value)}
                                    id="username" placeholder={screen} />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="desc">Description</FormLabel>
                                <Textarea id="desc" />
                            </Box>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue"
                            onClick={() => handleEdit()}
                        >Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default EditForm

import React from 'react'

const BtnAdd = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    console.log(isOpen)


    return (
        <div>
            <button className="btn btn-success"
                onClick={() => setIsOpen(!isOpen)}
            >Add
            </button>

            {isOpen && <div style={{ height: '500px', width: '500px', backgroundColor: 'red' }}></div>}
        </div>
    )
}

export default BtnAdd

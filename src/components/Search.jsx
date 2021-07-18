import React from 'react'

const Search = ({ handleSearch }) => {


    return (
        <div className="container my-sm-5 search mt-4">
            <form>
                <div className="mb-3">
                    <div className="form__group field mx-auto">
                        <input onChange={e => handleSearch(e)}
                            type="input"
                            className=" form__field"
                            placeholder=""
                            name="name" id='name'
                        />
                        <label htmlFor="name" className="form__label">Search</label>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Search

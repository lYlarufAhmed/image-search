import React, {useEffect, useState} from "react";
import {createClient} from 'pexels'

const client = createClient('563492ad6f91700001000001f600d4b0691a48db9dc1fb4924dc754d')

function App() {
    const [query, setQuery] = useState('nature')
    const [results, setResults] = useState([])
    const handleInput = (e) => {
        let value = e.target.value
        if (value) {
            setQuery(value)
        }
    }
    const getPhotos = async () => {

        try {

            let result_obj = await client.photos.search({query, per_page: 15})
            // console.log(photos)
            setResults(result_obj.photos)
        } catch (e) {

            console.log(e)

        }


    }
    useEffect(() => {

        if (query) {

            getPhotos()
        }
    }, [])
    return (
        <div className="App">
            <label>Image search <input type={'text'} onInput={handleInput}/>
                <button onClick={() => getPhotos()}>search</button>
            </label>
            <div className="results">
                {
                    results.map(result_obj => (
                        <div className={'img'}>
                            <img src={result_obj.src.portrait} alt={result_obj.url}/>
                        </div>))
                }
            </div>

        </div>
    );
}

export default App;

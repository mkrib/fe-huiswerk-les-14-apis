import './App.css';
// import worldMap from './assets/world_map.png';
import axios from "axios";
import {useState} from "react";
import worldmap from './assets/world_map.png';

function App() {
    // Vlag, naam van het land en het aantal inwoners wordt opgehaald wanneer de gebruiker op een knop drukt. Wanneer er resultaten op de pagina worden getoond verdwijnt de knop.

    const [countries, setCountries] = useState([]);
    const [specificCountry, setSpecificCountry] = useState([]);

    function translateRegionToColor(region) {
        let color = '';
        if (region === 'Europe') {
            color = "p-yellow";
        } else if (region === 'Africa') {
            color = "p-blue";
        } else if (region === 'Americas') {
            color = "p-green";
        } else if (region === 'Asia') {
            color = "p-red";
        } else if (region === 'Oceania') {
            color = "p-purple";
        } else if (region === 'Antarctic') {
            color = "p-lightblue";
        }
        return color;
    }

    async function fetchCountries() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const sortedData = response.data.sort((a,b) => {
                return a.population - b.population;
            });
            setCountries(sortedData);
        } catch (error) {
            console.error(error);
        }
    }

    async function searchCountry() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/name/netherlands?fullText=true');
            console.log(response.data[0].name.common);
            console.log(response.data[0].capital[0]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <main className="outer-container">

                <header className="inner-container">
                    <img className="img-header" src={worldmap} alt="World Map"/>
                </header>

                <section className="inner-container section-countrylist">
                <h1>World Regions</h1>
                <button
                    type="button"
                    onClick={fetchCountries}
                >
                    Get a list of countries
                </button>
                <ul>
                    { countries.map((country) => {
                        console.log(country)
                        return (
                            <li key={country.name.common}>
                                <div className="div-flag-title-wrapper">
                                     {country.flags.png && <img className="img-flag" src={country.flags.png} alt="Country flag"/>}
                                    <p className={translateRegionToColor(country.region)}>{country.name.common}</p>
                                </div>
                                <p>{country.population != null && ` Has a population of ${country.population} people `}</p>
                            </li>)
                        }
                    )}
                </ul>
                </section>

                <section className="inner-container section-search-country">
                    <h1>Search country information</h1>
                    <span>
                    <input
                        className="input-search"
                        type="text"
                        placeholder="Search for a specific country..."
                        name="search-input"
                    />
                    <button
                    type="button"
                    onClick={searchCountry}
                    >
                        Search
                    </button>
                        </span>
                </section>
            </main>

        </>
    )
}

export default App

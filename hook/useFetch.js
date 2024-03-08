import { useState, useEffect } from "react";
import axios from "axios";

//this useFetch is use for fetch data from database, get method
let config = require('../Config');
let pre_url = config.settings.serverPath;

function transformCompaniesData(response) {
    return response.map((row) => ({
        companyId: row[0],
        name: row[1],
        type: row[2],
        description: row[3],
        address: row[4],
        email: row[5],
        phoneNo: row[6],
        logoPath: row[7],
        locationUrl: row[8],
        websiteUrl: row[9],
    }));
}
const useFetch = (endpoint) => {
    // const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const options = {
    //     method: "GET",
    //     url: `${pre_url}/${endpoint}`,
    // };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${pre_url}/${endpoint}`);

            // console.log(data);
            // setCompanies(data);
            setIsLoading(false);
            return transformCompaniesData(response.data.data);
        } catch (error) {
            setError(error);
            console.log('Error fetching data from database', error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { isLoading, error, refetch };
};

export default useFetch;
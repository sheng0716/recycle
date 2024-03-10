import { useState, useEffect } from "react";
import axios from "axios";

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
        state: row[10],
    }));
}
function transformCompanyDataRow(row) {
    return {
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
        state: row[10],
    };
}

const useFetchByCompanyId = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `${pre_url}/${endpoint}/${query}`,

        // params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            const companiesData = transformCompanyDataRow(response.data);
            setData(companiesData);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
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

    return { data, isLoading, error, refetch };
};

export default useFetchByCompanyId;
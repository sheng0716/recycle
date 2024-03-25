import axios from 'axios';

let config = require('../../Config');
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

// Function to get all books from the database
const getAllCompanies = async () => {
    try {
        const response = await axios.get(`${pre_url}/api/companies`);
        return transformCompaniesData(response.data.companies);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
const getAllRetailer = async () => {
    try {
        const response = await axios.get(`${pre_url}/api/companies/retailer`);
        return transformCompaniesData(response.data.retailer);

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllCenters = async () => {
    try {
        const response = await axios.get(`${pre_url}/api/centers`)
        return response.data.centers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllCompanyDetailsBycompanyId = async (companyId) => {
    try {
        const response = await axios.get(`${pre_url}/api/companies/${companyId}`);
        return transformCompaniesData(response.data.company);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
// /api/centers/<int:materialId></int:materialId>

const getCenterDataByMaterialId = async (materialId, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${pre_url}/api/centers/material/${materialId}`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getCenterDataByCenterId = async (centerId) => {
    try {
        const response = await axios.get(`${pre_url}/api/centers/${centerId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export default {
    getAllCompanies,
    getAllRetailer,
    getAllCompanyDetailsBycompanyId,
    getAllCenters,
    getCenterDataByMaterialId,
    getCenterDataByCenterId
};

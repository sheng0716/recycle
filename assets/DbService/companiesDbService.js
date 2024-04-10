import axios from 'axios';

let config = require('../../Config');
let pre_url = config.settings.serverPath;

// function transformCompaniesData(response) {
//     return response.map((row) => ({
//         companyId: row[0],
//         name: row[1],
//         type: row[2],
//         description: row[3],
//         address: row[4],
//         email: row[5],
//         phoneNo: row[6],
//         logoPath: row[7],
//         locationUrl: row[8],
//         websiteUrl: row[9],
//         state: row[10],
//     }));
// }

// Function to get all books from the database
// const getAllCompanies = async () => {
//     try {
//         const response = await axios.get(`${pre_url}/api/companies`);
//         return transformCompaniesData(response.data.companies);

//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };
// const getAllRetailer = async () => {
//     try {
//         const response = await axios.get(`${pre_url}/api/companies/retailer`);
//         return transformCompaniesData(response.data.retailer);

//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

// const getAllCenters = async () => {
//     try {
//         const response = await axios.get(`${pre_url}/api/centers`)
//         return response.data.centers;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// const getAllCompanyDetailsBycompanyId = async (companyId) => {
//     try {
//         const response = await axios.get(`${pre_url}/api/companies/${companyId}`);
//         return transformCompaniesData(response.data.company);

//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };
// /api/centers/<int:materialId></int:materialId>
const getAllRetailer = async () => {
    try {
        const response = await axios.get(`${pre_url}/api/retailers`)
        return response.data.retailers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

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
const getRetailerDataByRetailerId = async (retailerId) => {
    try {
        const response = await axios.get(`${pre_url}/api/retailer/retailerId=${retailerId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getFavouriteRetailerByUserId = async (userId) => {
    try {
        const response = await axios.get(`${pre_url}/api/favourite/retailer/userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addFavouriteRetailer = async (userId, retailerId) => {
    try {
        const response = await axios.post(`${pre_url}/api/favourite/retailer/add`, { userId, retailerId });
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;

    }
};

const removeFavouriteRetailer = async (userId, retailerId) => {
    try {
        const response = await axios.delete(`${pre_url}/api/favourite/retailer/remove/userId=${userId}/retailerId=${retailerId}`);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;

    }
};

const getFavouriteCenterByUserId = async (userId) => {
    try {
        const response = await axios.get(`${pre_url}/api/favourite/center/userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const addFavouriteCenter = async (userId, centerId) => {
    try {
        const response = await axios.post(`${pre_url}/api/favourite/center/add`, { userId, centerId });
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;

    }
};

const removeFavouriteCenter = async (userId, centerId) => {
    try {
        const response = await axios.delete(`${pre_url}/api/favourite/center/remove/userId=${userId}/centerId=${centerId}`);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;

    }
};

const getReviewCenterByCenterId = async (centerId) => {
    try {
        const response = await axios.get(`${pre_url}/api/review/centerId=${centerId}`)
        return response.data.reviews;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
const getReviewRetailerByRetailerId = async (retailerId) => {
    try {
        const response = await axios.get(`${pre_url}/api/review/retailerId=${retailerId}`)
        return response.data.reviews;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

const addCenterReview = async (centerId, rating, comment) => {
    try {
        const response = await axios.post(`${pre_url}/api/add/review_center`, { centerId, rating, comment });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const addRetailerReview = async (retailerId, rating, comment) => {
    try {
        const response = await axios.post(`${pre_url}/api/add/review_retailer`, { retailerId, rating, comment });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default {

    getAllRetailer,

    getCenterDataByMaterialId,
    getCenterDataByCenterId,
    getRetailerDataByRetailerId,

    getFavouriteRetailerByUserId,
    addFavouriteRetailer,
    removeFavouriteRetailer,

    getFavouriteCenterByUserId,
    addFavouriteCenter,
    removeFavouriteCenter,

    getReviewCenterByCenterId,
    getReviewRetailerByRetailerId,

    addCenterReview,
    addRetailerReview,
};

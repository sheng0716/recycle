import axios from 'axios';

let config = require('../../Config');
let pre_url = config.settings.serverPath;

// this DBservice use to handle material and product

function transformMaterialData(response) {
    return response.map((row) => ({
        materialId: row[0],
        name: row[1],
        desc: row[2],
        imagePath: row[3],
    }));
}
function transformMaterialDataRow(row) {
    return {
        materialId: row[0],
        name: row[1],
        desc: row[2],
        imagePath: row[3],
    };
}
//func to get materials data
const getAllMaterials = async () => {
    try {
        const response = await axios.get(`${pre_url}/api/materials`);
        return response.data.materials;
    } catch (error) {
        console.error(error);
        throw error;
    }

};
const getAllCenterByMaterialId = async (materialId) => {
    try {
        const response = await axios.get(`${pre_url}/api/materials/${materialId}`);
        return transformMaterialData(response.data.materials);
    } catch (error) {
        console.error(error);
        throw error;
    }

};

export default {
    getAllMaterials,
    getAllCenterByMaterialId,
}
import axios from 'axios';

const API_URL = 'http://localhost:8080/v1/user/getAll-pg'; // change to your backend URL

export const getAllPGs = async (pageNumber = 0, pageSize = 10) => {
  try {
    const response = await axios.post(API_URL, {
      filterList: [],
      globalOperator: "AND",
      pageRequestDTO: {
        pageNumber,
        pageSize,
        sort: "ASC",
        sortByColumn: "name"
      }
    });
    return response.data.result.content; // backend response
  } catch (error) {
    console.error("Error fetching PGs:", error);
    throw error;
  }
};

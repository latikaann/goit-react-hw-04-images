import axios from 'axios';

const API_KEY = '34559204-ec632097002210846bac1ec49';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchCards = async (searchQuery, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};

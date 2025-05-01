import axios from 'axios';

export const saveHistoryToServer = async (historyData) => {
    try {
        const response = await axios.post('http://localhost:5000/save-history', {
            data: historyData,
        });
        console.log('History saved successfully:', response.data);
    } catch (error) {
        console.error('Error saving history:', error);
    }
};
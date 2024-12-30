import axios from "axios";
//מחזירה הצעות לכתובת על פי טקסט שמקבלת
export const comleteAddress = async (text) => {
    try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json`);
        return res.data;
    } catch (error) {
        alert(`Error fetching address with ${text}:`, error);
        // throw error;
    }
};





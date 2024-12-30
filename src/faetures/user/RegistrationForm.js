import { useState } from "react";
import { comleteAddress } from "./Methodes";
import '../../styles/RegistrationForm.css';

const RegistrationForm = () => {
    const [office, setOffice] = useState({ name: "", address: "", phone: "", email: "", wifi: false, kitchen: false, coffeeMachine: false, countOfRooms: 0, maxDistance: 0, status: "search"});
    const [suggestions, setSuggestions] = useState([]);
    const [mapLink, setMapLink] = useState('');

    //מספקת הצעות לכתובת, משתמשת בפונקציה comleteAddress שמביאה מידע מהשרת 
    const getOffers = async (text) => { 
        setOffice((prev) => ({ ...prev, address: text }));
        if (text.length >= 2) {
            const results = await comleteAddress(text);
            setSuggestions(results || []);
            console.log(results)
        } else {
            setSuggestions([]);
        }
    }

    //הפונקציה מציגה מפה על פי הכתובת שנבחרה מתוך ההצעות
    const handleSuggestionSelect = (selectedSuggestion) => {
        setOffice((prev) => ({...prev, address: selectedSuggestion.display_name,}));
        setMapLink(`https://www.openstreetmap.org/export/embed.html?bbox=${selectedSuggestion.boundingbox[2]},${selectedSuggestion.boundingbox[0]},${selectedSuggestion.boundingbox[3]},${selectedSuggestion.boundingbox[1]}&layer=mapnik&marker=${selectedSuggestion.lat},${selectedSuggestion.lon}`);
    };

    //מעדכנת את פרטי המשרד החדש על פי השדות 
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        setOffice((prev) => ({ ...prev, [name]: fieldValue }));
    };


    return (<div>
        Name<input type="text" name="name" value={office.name} onChange={handleInputChange}/> <br />
        Address<input type="text" value={office.address} onChange={(e) => { getOffers(e.target.value) }} /> <br />
        <select value=""
            onChange={(e) => handleSuggestionSelect(JSON.parse(e.target.value))}>
            <option value="" disabled>
                Select an address
            </option>
            {suggestions.map((suggestion, index) => (
                <option key={index} value={JSON.stringify(suggestion)}>
                    {suggestion.display_name}
                </option>
            ))}
        </select><br />
        Phone<input type="text" name="phone" value={office.phone} onChange={handleInputChange}/> <br />
        Email<input type="text" name="email" value={office.email} onChange={handleInputChange}/> <br />
        WiFi<input type="checkbox" name="wifi" value={office.wifi} onChange={handleInputChange}/> <br />
        Kitchen<input type="checkbox" name="kitchen" value={office.kitchen} onChange={handleInputChange}/> <br />
        Coffee Machine<input type="checkbox" name="coffeeMachine" value={office.coffeeMachine} onChange={handleInputChange}/> <br />
        Count Of Rooms <input type="number" name="countOfRooms" value={office.countOfRooms} onChange={handleInputChange}/> <br />
        Max Distance <input type="number" name="maxDistance" value={office.maxDistance} onChange={handleInputChange}/> <br />


        {mapLink && (<iframe width="425" height="350" src={mapLink} style={{ border: "none" }} allowFullScreen  scrolling="no" tabIndex="-1" ></iframe>)}







    </div>);
}

export default RegistrationForm;
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';


const HistoricalPlaces = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [placefrom, setPlacefrom] = useState('');
  const [placeto, setPlaceto] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [transportation, setTransportation] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomRules, setRoomRules] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [tripPlan, setTripPlan] = useState(null);

  useEffect(() => {
    const fetchHistoricalPlaces = async () => {
      try {
        const response = await axios.post('/groq-api', {
          messages: [
            { role: 'system', content: 'Recommend the tourist a list of hill station (focus on the adventure activities held their too) destinations in India. ' }
          ],
          model: 'llama3-8b-8192'  // Replace with the correct Groq model
        });

        if (response.data.message) {
          setData(formatResponse(response.data.message));  // Format the response
        } else {
          throw new Error('No message in response');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalPlaces();
  }, []);

  // Function to format the response
  const formatResponse = (response) => {
    // Replace markdown-like bold syntax (**) with <strong> tags for proper rendering
    const formattedResponse = response
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Converts **bold text** to <strong>bold text</strong>
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Optionally converts *italic text* to <em>italic text</em>
  
    // Split the response into lines
    const lines = formattedResponse.split('\n');
    
    // Map over the lines to create JSX elements
    return lines.map((line, index) => (
      <div key={index} style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: line }} />
    ));
  };

  const handleRoomRulesChange = (event) => {
    const { value } = event.target;
    setRoomRules((prev) =>
      prev.includes(value) ? prev.filter((rule) => rule !== value) : [...prev, value]
    );
  };

  // Handle generating the trip plan based on user inputs
  const handleGeneratePlan = async () => {
    if (!budget || !days || !people || !placefrom || !placeto || !transportation || !roomType || roomRules.length === 0 || cuisines.length === 0) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/groq-api', {
        messages: [
          {
            role: 'user',
            content: `Plan a day-wise trip from to the famous touristy spots in  the hill station in ${placefrom} (focus on the adventure activities held their too) destinations in ${placeto} with a budget of ${budget}, for ${days} days, for ${people} people. Make the trip affordable according to budget as much as possible. Divide the entire below trip in ${days} days iterenary:

                      **Preferred Transportation:** ${transportation}. Give me transportation for both sides. If the transportation is Taxi/Self Driving, recommend the car model according to the number of people provided. For example, if it's 2-4 people, a 4-seater cab would do. If it's 5+ people, recommend a bigger, more spacious car and provide the correct rates.

                      **Room Type:** ${roomType}. One single shared room can accommodate up to 3 people max, a private room can accommodate 1 person max, and an entire room (suite) can accommodate a group of 6-8 people. Allocate the number of rooms needed according to the choice of the traveler among the 3 options and cost accordingly. Also, provide the name of the most suitable stay/hotel option. Tell if the hotel has included breakfast or not

                      **Room Rules:** ${roomRules.join(', ')}. 

                      **Preferred Cuisines:** ${cuisines.join(', ')}. Write names of food places where they can get their preferred cuisines. Also, recommend trying the place's famous cuisine apart from their preferred food. Food costs should be estimated correctly and do not make it very pricey, based on the dining location and the number of people for different sets of meals-starting from breakfast(if hotel has already provided breakfast no need to mention it), then lunch, evening snacks, followed by drinks and dinner).

                      Ensure to avoid conflicts in transportation, meet minimum stay requirements for accommodations, and offer diverse restaurants and attractions.

                      If transportation is unavailable between the two cities or if there are no attractions in the city, provide alternative suggestions. Ensure that all information stays within sandboxed city data and within the budget provided by the user.

                      Tell the traveler if they are saving money from their original budget of ${budget} or Only tell the traveller if they need extra money from their original budget of ${budget} to realistically complete the trip tell them that too. Additionally, provide essential local knowledge a traveler needs to visit this place, including the best time to visit the city, city's culture, famous garments/shopping items, famous food, and languages spoken.

                      Start the response with: "Hi, I am Arya, I am your personalized travel planner, and I'm here to craft your itinerary!" and followed by a short paragraph on ${placeto}`}
        ],
        model: 'llama3-8b-8192'  // Replace with the correct Groq model
      });

            
      if (response.data.message) {
        const formattedPlan = formatResponse(response.data.message);  // Format the response
        setTripPlan(formattedPlan);  // Store the formatted trip plan
      } else {
        throw new Error('No trip plan generated');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (<div className="loader-container"><div className='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>);
  if (error) return <div className='loadingerror'><p>Error: {error}</p></div>;

  return (
    <div className='historicalbg' >
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '1000px' }}>
      <h1 >HILLS AND MOUNTAINS</h1>
      <div className='data-container' style={{ marginBottom: '40px' }}>{data}</div> {/* Display the formatted historical places data */}

      {/* Input Form for Trip Details */}
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', backgroundColor: '#ffa2b6', fontFamily: '"Raleway", sans-serif', fontSize: '22px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#E43D12'}}>Plan Your Trip with Arya!</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>You are travelling from: </label>
          <input 
            type="text" 
            value={placefrom} 
            onChange={(e) => setPlacefrom(e.target.value)} 
            placeholder="Enter your current location" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Place to Visit: </label>
          <input 
            type="text" 
            value={placeto} 
            onChange={(e) => setPlaceto(e.target.value)} 
            placeholder="Enter destination" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Budget (in Rupees): </label>
          <input 
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)} 
            placeholder="Enter your budget" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Number of Days: </label>
          <input 
            type="number" 
            value={days} 
            onChange={(e) => setDays(e.target.value)} 
            placeholder="Enter number of days" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Number of People: </label>
          <input 
            type="number" 
            value={people} 
            onChange={(e) => setPeople(e.target.value)} 
            placeholder="Enter number of people" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* New Input Fields */}
        <div style={{ marginBottom: '15px' }}>
          <label>Preferred Transportation: </label>
          <select value={transportation} onChange={(e) => setTransportation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="">Select transportation option</option>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
            <option value="Self-driving">Self-driving</option>
            <option value="taxi">Taxi</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Room Type: </label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="">Select room type</option>
            <option value="shared room">Shared Room</option>
            <option value="private room">Private Room</option>
            <option value="entire room">Entire Room/Suite</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Room Rules: </label><br />
          <label>
            <input
              type="checkbox"
              value="parties-and-smoking-allowed"
              checked={roomRules.includes("parties-and-smoking-allowed")}
              onChange={handleRoomRulesChange}
            />
            Parties & Smoking Allowed
          </label><br/>
          <label>
            <input
              type="checkbox"
              value="pets-allowed"
              checked={roomRules.includes("pets-allowed")}
              onChange={handleRoomRulesChange}
            />
            Pets Allowed
          </label><br/>
          <label>
            <input
              type="checkbox"
              value="couple-friendly"
              checked={roomRules.includes("couple-friendly")}
              onChange={handleRoomRulesChange}
            />
            Couple Friendly
          </label><br/>
          <label>
            <input
              type="checkbox"
              value="family-friendly"
              checked={roomRules.includes("family-friendly")}
              onChange={handleRoomRulesChange}
            />
            Family Friendly
          </label><br/>
          <label>
            <input
              type="checkbox"
              value="no-children"
              checked={roomRules.includes("no-children")}
              onChange={handleRoomRulesChange}
            />
            No Children under 10
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Preferred Cuisines: </label>
          <input 
            type="text" 
            value={cuisines} 
            onChange={(e) => setCuisines(e.target.value.split(',').map(c => c.trim()))} 
            placeholder="Enter preferred cuisines (comma separated)" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

       <center> <button className='generate' 
          onClick={handleGeneratePlan} 
        >
          Generate Trip Plan
          <div className="star-1">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 784.11 815.53"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
</div>

<div className="star-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 784.11 815.53"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
</div>

<div className="star-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 784.11 815.53"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
</div>

<div className="star-4">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 784.11 815.53"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
</div>

<div className="star-5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 784.11 815.53"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
</div>

<div className="star-6">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 784.11 815.53"
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
</div>

        </button> </center>
      </div>

      {/* Display Trip Plan */}
      {tripPlan && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9', fontFamily: '"Raleway", sans-serif', fontSize: '22px' }}>
          <h2 style={{ textAlign: 'center' }}>Your Personalised Trip Plan:</h2>
          <div style={{ whiteSpace: 'pre-line' }}>{tripPlan}</div> {/* Preserves line breaks */}
        </div>
      )}
    </div>
    </div>
  );
};

export default HistoricalPlaces;

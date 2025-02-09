import React, { useEffect, useState } from 'react';

const nestjsUrl = process.env.REACT_APP_NESTJS_API_URL;
const flaskUrl = process.env.REACT_APP_FLASK_API_URL;

async function fetchDataFromFlask() {
  const response = await fetch(`${flaskUrl}/api/v1/hello`);
  const data = await response.json();
  return data;
}

const Flask = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDataFromFlask().then((data) => {
      setData(data);
    }).catch((error) => {
      console.error('Error fetching data from Flask API:', error);
    });
  }, []);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Flask API Data</h1>
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Flask;

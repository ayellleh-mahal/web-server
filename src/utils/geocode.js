const geocode = async (address, callback) => {
  // Gumagamit tayo ng libreng OpenStreetMap Geocoding API (Nominatim)
  // Ligtas ito, walang key, at walang bayad!
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  try {
    // Kailangan ng User-Agent header sa Nominatim para hindi ka ma-block (patakaran ng OpenStreetMap)
    const response = await fetch(url, {
      headers: { 'User-Agent': 'NodeJS-Weather-App-Adiel' },
    });

    if (!response.ok) {
      return callback('Hindi makakonekta sa location services!', undefined);
    }

    const data = await response.json();

    // ERROR HANDLING: Kung walang nahanap na lugar (e.g. nag-type ng random characters)
    if (data.length === 0) {
      return callback(
        'Unable to finde location. Try another search.',
        undefined
      );
    }

    // SUCCESS: I-format natin ang data para eksaktong kapareho ng sasaluhin ng app.js mo mula sa kurso!
    // Tandaan: Ang Nominatim ay nagbabalik ng string kaya ginamitan natin ng parseFloat()
    callback(undefined, {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      location: data[0].display_name,
    });
  } catch (error) {
    // Para sa mga pagkakataong walang internet ang computer mo
    callback('Hindi makakonekta sa internet o network services!', undefined);
  }
};

module.exports = geocode;

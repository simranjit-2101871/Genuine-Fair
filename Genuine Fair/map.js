
mapboxgl.accessToken = 'pk.eyJ1IjoiamtiaGJmdWVyeXV0MDkzIiwiYSI6ImNtMjVsMnVjMDBzY2wybnNkZXgwd3lhNXQifQ.5hX9e_jQAv6WlvusQSRvHQ';

// Get the user's current location using the browser's Geolocation API
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true,
});

// Success callback: User's location is found
function successLocation(position) {
    settingMap([position.coords.longitude, position.coords.latitude]);
}

// Error callback: Default location if user's location is not available
function errorLocation() {
    // Default to Chandigarh if the user denies geolocation
    //settingMap([76.7794, 30.7333]);
    console.log('error')
}

// Initialize the Mapbox map and add directions
function settingMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        projection: 'globe', // Display the map as a globe
        zoom: 12,
        center: center,
    });

    // Add Mapbox Directions control
    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
    });
    map.addControl(directions, 'top-left');

    //add marker to current location
    new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);


}

/*let distance=document.querySelector('.mapbox-directions-component mapbox-directions-route-summary span');
// let tommy=distnace.value;//the variable was not bering read
console.log(distance.textContent);
*/ //elemnet may not be availbel at the time so using time out which check untill the result si displayed

const checkDistanceElement = setInterval(() => {
    // Corrected class selectors to target the distance span element properly
    let distance = document.querySelector('.mapbox-directions-component.mapbox-directions-route-summary span');

    if (distance) {
        console.log(distance.textContent); // Output the distance value from the span
        //clearInterval(checkDistanceElement); // Stop checking once the element is found
    } else {
        console.log('Waiting for distance element...');
    }

    //now calculate according to the ctd fair documented formula
    let totalDistance= parseFloat(distance.textContent);
    let leftoverDistance=totalDistance-1;

    //now fair for first kilomenter is 20 
    let fair1=20;
    //and then 9 per kilometer is added
    let fair2=9*leftoverDistance;
    //add bo the fair
    let totalFair=fair1+fair2;
    console.log(parseFloat(totalFair));




    //ab isse add karo html mai 
    let box1=document.querySelector('.box1 p');
    let box2=document.querySelector('.box2 p');

    box1.innerHTML=totalDistance;
    box2.innerHTML=totalFair;


}, 1000); // Check every 1000ms



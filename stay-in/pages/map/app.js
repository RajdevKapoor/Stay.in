var map = L.map('map').setView([29.6464, -82.3257], 20);

	var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);

	var marker = L.marker([51.5, -0.09]).addTo(map);

	var circle = L.circle([51.508, -0.11], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(map);

	var polygon = L.polygon([
		[51.509, -0.08],
		[51.503, -0.06],
		[51.51, -0.047]
	]).addTo(map);

	//Cordinates to Places to be displayed
	coords = [[29.6267237, -82.3662186], //Location 1
				[29.6340972, -82.3737122], //Location 2
				[29.62798, -82.36333], //Location 3
				[29.6232, -82.36743], //Location 4
				[29.6192, -82.37524], //Location 5
				[29.61655, -82.37331]]; //Location 6

	let l= coords.length;

	for (let i=0; i<l; i++){
		var marker = L.marker(coords[i]).addto(mymap);
	}
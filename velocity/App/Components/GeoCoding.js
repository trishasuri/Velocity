var GeoCoding = {
    fetchLatLng: function (Location) {
        // The fetch() API returns a Promise.  This function
        // exposes a similar API, except the fulfillment
        // value of this function's Promise has had more
        // work done on it.
        return fetch(URI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZWxhc3RpYzpIdEhIbGxYNHJzQ1Z0YXQ0ZkRPdDlKY0M='
            }
        })
            .then((response) => {

                console.log(response);
                //this.setState({'currentData': JSON.stringify(response)});

            }).catch((reason) => console.log("reason for GET failure " + JSON.stringify(reason)));
    },
    standardFunction: function (Location) {
        formattedString = encodeURIComponent(Location);
        return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + formattedString + '&key=AIzaSyB3hDnHGgIzb6IPgAc6b_SgD7FF7rMVs0o')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("geoEncoding responce " + responseJson.results[0].geometry.location);
                return responseJson.results[0].geometry.location;
            })
            .catch((error) => {
                console.error(error);
            }).then();
    },
    endPoints: {
        google: 'https://maps.googleapis.com/maps/api/geocode/json?address='
    }
}
module.exports = GeoCoding

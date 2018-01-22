
var ElasticFunctions = {

  fetch_current_data: function (URI) {
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

  addNewDocument: function (URI, doc) {
    return fetch(URI, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZWxhc3RpYzp2c0hQMGcxRFZEYTNXY3lPeDN2OXRpN0I='
      },
      body: JSON.stringify(doc)
    })
      .then((response) => {
        console.log("successful creation")
      }).catch((reason) => {
        console.log("reason for PUT failure " + reason)
        // console.warn("creation failed");
      });
  },

  querySocialService: function (URI, doc) {
    return fetch(URI, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZWxhc3RpYzp2c0hQMGcxRFZEYTNXY3lPeDN2OXRpN0I='
      },
      body: JSON.stringify(doc)
    })
      .then((response) => {
        return response
      }).catch((reason) => console.log("reason for GET failure " + JSON.stringify(reason)));
  },

  endPoints: {
    bikesDB: 'https://77b4861872dd114c9ef9098cd6ddfb95.us-east-1.aws.found.io:9243/bikes/ridesData',
    socialDB: 'https://dba809650ae608c8e8e2766788314b33.us-east-1.aws.found.io:9243/social_users/locations/',
  }
}

module.exports = ElasticFunctions

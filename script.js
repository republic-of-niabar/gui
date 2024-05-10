// Function to fetch headers
function fetchHeaders() {
    $.ajax({
        url: 'http://guisrvr.niabar.org:3000/headers', // Changed to HTTP
        type: 'GET',
        success: function(response) {
            if (response && response.values) {
                headers = response.values[0]; // Store headers
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch headers:', textStatus, errorThrown);
        }
    });
}

// Function to search data
function searchData() {
    var name = $('#searchInput').val();
    if (name === '') {
        $('#results').html('<p>Please enter a name.</p>');
        return;
    }
    $('#results').html('<p>Searching...</p>');

    $.ajax({
        url: 'http://guisrvr.niabar.org:3000/search?name=' + encodeURIComponent(name), // Changed to HTTP
        type: 'GET',
        success: function(response) {
            if (response && response.values) {
                var data = response.values[0];
                var output = '<ul>';
                data.forEach(function(value, index) {
                    var displayValue = value;
                    if (value === "TRUE") {
                        displayValue = "Yes";
                    } else if (value === "FALSE") {
                        displayValue = "No";
                    } else if (value === "") {
                        displayValue = "N/A";
                    }
                    output += '<li><strong>' + headers[index] + ':</strong> ' + displayValue + '</li>';
                });
                output += '</ul>';
                $('#results').html(output);
            } else {
                $('#results').html('<p>No data found for the given name.</p>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#results').html('<p>Error retrieving data. Status: ' + textStatus + ', Error: ' + errorThrown + '</p>');
        }
    });
}

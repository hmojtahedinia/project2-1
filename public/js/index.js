// Get references to page elements
var $washroomText = $("#washroom-text");
var $washroomDescription = $("#washroom-description");
var $submitBtn = $("#submit");
var $washroomList = $("#washroom-list");

// The API object contains methods for each kind of request we'll make
var API = {
  savewashroom: function(washroom) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/washrooms",
      data: JSON.stringify(washroom)
    });
  },
  getwashrooms: function() {
    return $.ajax({
      url: "api/washrooms",
      type: "GET"
    });
  },
  deletewashroom: function(id) {
    return $.ajax({
      url: "api/washrooms/" + id,
      type: "DELETE"
    });
  }
};

// refreshwashrooms gets new washrooms from the db and repopulates the list
var refreshwashrooms = function() {
  API.getwashrooms().then(function(data) {
    var $washrooms = data.map(function(washroom) {
      var $a = $("<a>")
        .text(washroom.text)
        .attr("href", "/washroom/" + washroom.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": washroom.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $washroomList.empty();
    $washroomList.append($washrooms);
  });
};

// handleFormSubmit is called whenever we submit a new washroom
// Save the new washroom to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var washroom = {
    text: $washroomText.val().trim(),
    description: $washroomDescription.val().trim()
  };

  if (!(washroom.text && washroom.description)) {
    alert("You must enter an washroom text and description!");
    return;
  }

  API.savewashroom(washroom).then(function() {
    refreshwashrooms();
  });

  $washroomText.val("");
  $washroomDescription.val("");
};

// handleDeleteBtnClick is called when an washroom's delete button is clicked
// Remove the washroom from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletewashroom(idToDelete).then(function() {
    refreshwashrooms();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$washroomList.on("click", ".delete", handleDeleteBtnClick);

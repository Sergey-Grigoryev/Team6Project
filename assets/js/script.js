var itemBtn = document.querySelector("#itemBtn");
var itemName = document.querySelector("#itemName");
var itemDuration = document.querySelector("#itemDuration");
var trackedItem1 = document.querySelector("#trackedItem1");
var trackedItem2 = document.querySelector("#trackedItem2");
var trackedItem3 = document.querySelector("#trackedItem3");
var trackedItem4 = document.querySelector("#trackedItem4");
var trackedItem5 = document.querySelector("#trackedItem5");
var trackedItem6 = document.querySelector("#trackedItem6");
var trackedItem7 = document.querySelector("#trackedItem7");
var trackedItem8 = document.querySelector("#trackedItem8");
var trackedItem9 = document.querySelector("#trackedItem9");
var trackedItems = [trackedItem1, trackedItem2, trackedItem3, trackedItem4, trackedItem5, trackedItem6, trackedItem7, trackedItem8, trackedItem9];
var trackingList = [];
var paperBtn = document.querySelector(".paper-btn");


// API call to nutrition facts:
    // API Key for Edamam: 0f5f4bf9a6090d0168c26196cb0a8b55	

var itemInfo = function(saveItemName) {
    fetch (
    `https://api.edamam.com/api/nutrition-data?app_id=48758084&app_key=0f5f4bf9a6090d0168c26196cb0a8b55&nutrition-type=logging&ingr=${saveItemName}`
    )
    .then (function(edamamResponse) {
        return edamamResponse.json();
    })
    .then(function(edamamResponse) {
        console.log(edamamResponse);
    })
};
    
    // API call to Wine Paring:
       // API Key for Spoonacular: 10758b8ba109476c9453aee7b660ad09
var winePair = function(saveItemName) {
    fetch (
        `https://api.spoonacular.com/food/wine/pairing?food=${saveItemName}&apiKey=10758b8ba109476c9453aee7b660ad09`
    )
    .then (function(spoonacularResponse) {
        return spoonacularResponse.json();
    })
    .then (function (spoonacularResponse) {
        console.log(spoonacularResponse);
        console.log(spoonacularResponse.pairedWines)
        console.log(spoonacularResponse.pairingText)
    });
};

// on load - get localStorage info:
function allStorage () {
    trackedItem1.style.display = "none";
    trackedItem2.style.display = "none";
    trackedItem3.style.display = "none";
    trackedItem4.style.display = "none";
    trackedItem5.style.display = "none";
    trackedItem6.style.display = "none";
    trackedItem7.style.display = "none";
    trackedItem8.style.display = "none";
    trackedItem9.style.display = "none";
    var keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        trackingList.push(JSON.parse(localStorage.getItem(keys[i])));
    };
    for (i = 0; i < trackingList.length; i++) {
        trackedItems[i].textContent = trackingList[i].item;
        trackedItems[i].style.display = "block";
    }
    // if statement using moment to move to Shopping List

};

allStorage();
console.log(trackingList);
// Save Purchased Item to tracking list:
var saveItemName;
var saveItemDuration;
var saveItemPurDate;
var saveItemObject;

var saveToTrack = function() {
    saveItemName = itemName.value;
    saveItemDuration = itemDuration.value;
    saveItemPurDate = moment().format(); 
    saveItemObject = {'item':saveItemName, 'duration':saveItemDuration, 'purch':saveItemPurDate};
    localStorage.setItem(trackingList.length, JSON.stringify(saveItemObject));
    trackingList.push(saveItemObject);
    console.log(saveItemObject);
    console.log(trackingList);
    for (i = 0; i < trackingList.length; i++) {
        trackedItems[i].textContent = trackingList[i].item;
        trackedItems[i].style.display = "block";
    };
    itemInfo(saveItemName); //api call - spoonacular
    winePair(saveItemName); //api call - Edamam
};

//saveToTrack();



// click event listener
itemBtn.addEventListener('click', function () {
    saveToTrack() 
});

trackedItem1.addEventListener('click', function() {
    console.log('modal1 clicked');
})
trackedItem2.addEventListener('click', function() {
    console.log('modal2 clicked');
})
trackedItem3.addEventListener('click', function() {
    console.log('modal1 clicked');
})
trackedItem4.addEventListener('click', function() {
    console.log('modal2 clicked');
})
trackedItem5.addEventListener('click', function() {
    console.log('modal1 clicked');
})
trackedItem6.addEventListener('click', function() {
    console.log('modal2 clicked');
})
trackedItem7.addEventListener('click', function() {
    console.log('modal1 clicked');
})
trackedItem8.addEventListener('click', function() {
    console.log('modal2 clicked');
})
trackedItem9.addEventListener('click', function() {
    console.log('modal1 clicked');
})

// Drag & Drop Dom manipulation code:

const list_items = document.querySelectorAll('.paper-btn');
const lists = document.querySelectorAll('.card');
let draggedItem = null;
for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];
	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
	});
	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
	})
	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];
		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		});
		list.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
	}
}


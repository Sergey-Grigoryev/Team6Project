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
var trackedItem10 = document.querySelector("#trackedItem10");
var trackedItems = [trackedItem1, trackedItem2, trackedItem3, trackedItem4, trackedItem5, trackedItem6, trackedItem7, trackedItem8, trackedItem9];

var shoppingItem1 = document.querySelector("#shoppingItem1");
var shoppingItem2 = document.querySelector("#shoppingItem2");
var shoppingItem3 = document.querySelector("#shoppingItem3");
var shoppingItem4 = document.querySelector("#shoppingItem4");
var shoppingItem5 = document.querySelector("#shoppingItem5");
var shoppingItem6 = document.querySelector("#shoppingItem6");
var shoppingItem7 = document.querySelector("#shoppingItem7");
var shoppingItem8 = document.querySelector("#shoppingItem8");
var shoppingItem9 = document.querySelector("#shoppingItem9");
var shoppingItem10 = document.querySelector("#shoppingItem10");
var shoppingItems = [shoppingItem1, shoppingItem2, shoppingItem3, shoppingItem4, shoppingItem5, shoppingItem6, shoppingItem7, shoppingItem8, shoppingItem9, shoppingItem10];
var paperBtn = document.querySelector(".paper-btn");

// modal
var trackedItem = document.querySelector("#trackedItem");
var trackedItemCal = document.querySelector("#trackedItemCal");
var trackedItemFat = document.querySelector("#trackedItemFat");
var trackedItemCarb = document.querySelector("#trackedItemCarb");
var shoppingItem = document.querySelector("#shoppingItem");
var shoppingItemCal = document.querySelector("#shoppingItemCal");
var shoppingItemFat = document.querySelector("#shoppingItemFat");
var shoppingItemCarb = document.querySelector("#shoppingItemCarb");
var winePairSugs = document.querySelector("#winePairSugs");
var wineSugs = [];
var shoppingList = [];
var trackingList = [];

// API call to nutrition facts:
// API Key for Edamam: 0f5f4bf9a6090d0168c26196cb0a8b55
var itemInfo = function (saveItemName, trackOrShop) {
    fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=48758084&app_key=0f5f4bf9a6090d0168c26196cb0a8b55&nutrition-type=logging&ingr=${saveItemName}`
    )
        .then(function (edamamResponse) {
            return edamamResponse.json();
        })
        .then(function (edamamResponse) {
            if (trackOrShop == "track") {
                trackedItem.textContent = saveItemName;
                trackedItemCal.textContent = "Cal: " + edamamResponse.calories + "per serve.";
                trackedItemFat.textContent = "Fat: " + edamamResponse.totalNutrients.FAT.quantity + "g";
                trackedItemCarb.textContent = "Carb: " + edamamResponse.totalNutrients.CHOCDF.quantity + "g";
            } else {
                shoppingItem.textContent = saveItemName;
                shoppingItemCal.textContent = "Cal: " + edamamResponse.calories + "per serve.";
                shoppingItemFat.textContent = "Fat: " + edamamResponse.totalNutrients.FAT.quantity + "g";
                shoppingItemCarb.textContent = "Carb: " + edamamResponse.totalNutrients.CHOCDF.quantity + "g";
            };
        })
};

// API call to Wine Paring:
// API Key for Spoonacular: 10758b8ba109476c9453aee7b660ad09
var winePair = function (saveItemName) {
    fetch(
        `https://api.spoonacular.com/food/wine/pairing?food=${saveItemName}&apiKey=10758b8ba109476c9453aee7b660ad09`
    )
        .then(function (spoonacularResponse) {
            return spoonacularResponse.json();
        })
        .then(function (spoonacularResponse) {
        });
};

var trackToShopping = function (itemToShop) {
    let changePurch = JSON.parse(localStorage.getItem(itemToShop));
    localStorage.removeItem(itemToShop)
    changePurch.purch = "2000-01-01";
    localStorage.setItem(itemToShop, JSON.stringify(changePurch));
    location.reload();
};

function allStorage() {
    trackedItem1.style.display = "none";
    trackedItem2.style.display = "none";
    trackedItem3.style.display = "none";
    trackedItem4.style.display = "none";
    trackedItem5.style.display = "none";
    trackedItem6.style.display = "none";
    trackedItem7.style.display = "none";
    trackedItem8.style.display = "none";
    trackedItem9.style.display = "none";
    trackedItem10.style.display = "none";
    shoppingItem1.style.display = "none";
    shoppingItem2.style.display = "none";
    shoppingItem3.style.display = "none";
    shoppingItem4.style.display = "none";
    shoppingItem5.style.display = "none";
    shoppingItem6.style.display = "none";
    shoppingItem7.style.display = "none";
    shoppingItem8.style.display = "none";
    shoppingItem9.style.display = "none";
    shoppingItem10.style.display = "none";
    var keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        trackingList.push(JSON.parse(localStorage.getItem(keys[i])));
    };
    let j = 0;
    for (i = 0; i < trackingList.length; i++) {
        let itemPurchDate = moment(trackingList[i].purch, 'YYYY-MM-DD');
        let today = moment().startOf('day');
        let daysSince = moment.duration(today.diff(itemPurchDate)).asDays();
        let daysTo = trackingList[i].duration * 2;
        if (daysTo <= daysSince) {
            shoppingList.push(trackingList[i]);
            delete trackingList[i];
        } else {
            trackedItems[j].textContent = trackingList[i].item;
            trackedItems[j].style.display = "block";
            j++;
        };
    };
    for (i = 0; i < trackingList.length; i++) {
        console.log(trackingList);
        if (trackingList[i]) {
        } else {
            trackingList.splice(i, 1);
        };
    };
    for (i = 0; i < shoppingList.length; i++) {
        shoppingItems[i].textContent = shoppingList[i].item;
        shoppingItems[i].style.display = "block";
        if (shoppingList[i].wine.length != 0) {
            wineSugs.push(shoppingList[i].item + " pairs well with: ", shoppingList[i].wine.join(", "))
        };
    };
};

allStorage();

var saveItemName;
var saveItemDuration;
var saveItemPurDate;
var saveItemObject;

var saveToTrack = function () {
    saveItemName = itemName.value;
    saveItemDuration = itemDuration.value;
    saveItemPurDate = moment().format("YYYY-MM-DD");
    fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=48758084&app_key=0f5f4bf9a6090d0168c26196cb0a8b55&nutrition-type=logging&ingr=${saveItemName}`
    )
        .then(function (edamamResponse) {
            return edamamResponse.json();
        })
        .then(function (edamamResponse) {
            fetch(
                `https://api.spoonacular.com/food/wine/pairing?food=${saveItemName}&apiKey=10758b8ba109476c9453aee7b660ad09`
            )
                .then(function (spoonacularResponse) {
                    return spoonacularResponse.json();
                })
                .then(function (spoonacularResponse) {
                    saveItemObject = { 'item': saveItemName, 'duration': saveItemDuration, 'purch': saveItemPurDate, 'cal': edamamResponse.calories, 'fat': edamamResponse.totalNutrients.FAT.quantity, 'carb': edamamResponse.totalNutrients.CHOCDF.quantity, 'wine': spoonacularResponse.pairedWines };
                    localStorage.setItem(saveItemName, JSON.stringify(saveItemObject));
                    trackingList.push(saveItemObject);
                    for (i = 0; i < trackingList.length; i++) {
                        trackedItems[i].textContent = trackingList[i].item;
                        trackedItems[i].style.display = "block";
                    };
                })
        });
};

var deleteItem = function (itemName) {
    localStorage.removeItem(itemName);
    location.reload();
}

var winePairSug = function () {
    shoppingItem.textContent = "The God of Wine suggests:";
    shoppingItemCal.textContent = "";
    shoppingItemFat.textContent = "Based on the items in your shopping list:";
    shoppingItemCarb.textContent = wineSugs.join(" ");
}

// click event listener
itemBtn.addEventListener('click', function () {
    saveToTrack()
});

trackedItem1.addEventListener('click', function () {
    itemInfo(trackedItem1.textContent, "track");
})
trackedItem2.addEventListener('click', function () {
    itemInfo(trackedItem1.textContent, "track");
})
trackedItem3.addEventListener('click', function () {
    itemInfo(trackedItem3.textContent, "track");
})
trackedItem4.addEventListener('click', function () {
    itemInfo(trackedItem4.textContent, "track");
})
trackedItem5.addEventListener('click', function () {
    itemInfo(trackedItem5.textContent, "track");
})
trackedItem6.addEventListener('click', function () {
    itemInfo(trackedItem6.textContent, "track");
})
trackedItem7.addEventListener('click', function () {
    itemInfo(trackedItem7.textContent, "track");
})
trackedItem8.addEventListener('click', function () {
    itemInfo(trackedItem8.textContent, "track");
})
trackedItem9.addEventListener('click', function () {
    itemInfo(trackedItem9.textContent, "track");
})
trackedItem10.addEventListener('click', function () {
    itemInfo(trackedItem10.textContent, "track");
})

shoppingItem1.addEventListener('click', function () {
    itemInfo(shoppingItem1.textContent, "shop");
})
shoppingItem2.addEventListener('click', function () {
    itemInfo(shoppingItem2.textContent, "shop");
})
shoppingItem3.addEventListener('click', function () {
    itemInfo(shoppingItem3.textContent, "shop");
})
shoppingItem4.addEventListener('click', function () {
    itemInfo(shoppingItem4.textContent, "shop");
})
shoppingItem5.addEventListener('click', function () {
    itemInfo(shoppingItem5.textContent, "shop");
})
shoppingItem6.addEventListener('click', function () {
    itemInfo(shoppingItem6.textContent, "shop");
})
shoppingItem7.addEventListener('click', function () {
    itemInfo(shoppingItem7.textContent, "shop");
})
shoppingItem8.addEventListener('click', function () {
    itemInfo(shoppingItem8.textContent, "shop");
})
shoppingItem9.addEventListener('click', function () {
    itemInfo(shoppingItem9.textContent, "shop");
})
shoppingItem10.addEventListener('click', function () {
    itemInfo(shoppingItem10.textContent, "shop");
})

winePairSugs.addEventListener('click', function () {
    winePairSug();
});

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
}
for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    list.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
    list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });
    list.addEventListener('dragleave', function () {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });
    list.addEventListener('drop', function () {
        this.append(draggedItem);
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        if (this.id == "trashCanCard") {
            var itemName = this.textContent;
            deleteItem(itemName.trim());
        } else if (this.id == "shoppingCard") {
            var itemName = this.textContent.split(" ").splice(-1);
            trackToShopping(itemName);
        };
    });
}
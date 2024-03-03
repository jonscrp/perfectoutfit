const dataItem  = require ("data.json");





// // genders 2
console.log(dataItem.data);
// console.log(jsonData.data[0].gender);
// console.log(jsonData.data[1].gender);

// // 4 categories
// console.log(jsonData.data[0].categories[0].category);
// console.log(jsonData.data[0].categories[1].category);
// console.log(jsonData.data[0].categories[2].category);
// console.log(jsonData.data[0].categories[3].category);

// console.log(jsonData.data[0].categories[0].images[0])

/*

console.log(dataItems());


function dataItems(){
    items  = [];
    //console.log(jsonData);
    uniqueIndex = 0;
    
    for(let genderIndex = 0; genderIndex < jsonData.data.length; genderIndex++){
        //console.log("IRUN");
        for(let categoryIndex = 0; categoryIndex < jsonData.data[genderIndex].categories.length; categoryIndex++){
            for( let imageIndex = 0; imageIndex < jsonData.data[genderIndex].categories[categoryIndex].images.length; imageIndex++){
                items.push({

                    id: uniqueIndex,
                    gender: jsonData.data[genderIndex].gender,
                    category: jsonData.data[genderIndex].categories[categoryIndex].category,
                    imagePath:  jsonData.data[genderIndex].categories[categoryIndex].images[imageIndex]
                });
                uniqueIndex++;
            }
        }
    }
    
    return items;
}









//function gettingItems(){
    
  //   data : jsonData.data;


     
    //}

//}

*/
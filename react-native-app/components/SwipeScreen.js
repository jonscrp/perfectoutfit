
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import React from 'react'
import { clothingItemsData } from "./clothingItemsData";

export default function SwipeScreen({ navigation, route }) {

  const gender = route.params?.gender || "male";

  const cardsData = clothingItemsData.filter( (item) => item.gender === gender).sort( () => 0.5 - Math.random() );
  


  return (
    <View style={styles.container}>
      <ItemsCardSwiper navigation={navigation} cardsData={cardsData}></ItemsCardSwiper>
      <StatusBar style="auto"/>
    </View>
  );
}

export function OutfitSwipeScreen({ route, navigation }) {

  const likedItems = route.params.likedItems;
  const selectedOutfits = generateOutfitsFromLikedClothingItems(likedItems);

  return (
    <View style={{...styles.container, backgroundColor: "limegreen"}}>
      {/* <Text style={{ fontSize: 24, fontWeight: "bold" }}>Your Outfits:</Text> */}
      <OutfitsCardSwiper navigation={navigation} cardsData={selectedOutfits}></OutfitsCardSwiper>
      <StatusBar style="auto"/>
    </View>
  )
}

export function MatchedOutfitsScreen({ route, navigation }) {
  
  const likedItems = route.params.likedItems;
  
  return (
    <View style={styles.container}>
      <Text>Matched Outfits</Text>
      {likedItems.map((item) => (
        <Text key={item.id}>{item.displayText}</Text>
      ))}
      <StatusBar style="auto"/>
    </View>
  )
}

function isReadyForCreateOutfit(acceptedItems){
  // accepted items contains  at least 2 tops and 2 bottoms

  // console.log("acceptedItems", acceptedItems);
  // console.log("a", acceptedItems.filter( (item) => item.category === "tops"));

  return acceptedItems.filter( (item) => item.category === "tops").length >= 1 
    && acceptedItems.filter( (item) => item.category === "bottoms").length >= 1
    && acceptedItems.filter( (item) => item.category === "shoes").length >= 1;

}

function generateOutfitsFromLikedClothingItems(likedItems) {
  
  const tops = likedItems.filter( (item) => item.category === "tops");
  const bottoms = likedItems.filter( (item) => item.category === "bottoms");
  const shoes = likedItems.filter( (item) => item.category === "shoes");
  const accessories = likedItems.filter( (item) => item.category === "accesories");

  
  const out = []
  for (const top of tops) {
    for (const bottom of bottoms) {
      for (const shoe of shoes) {
        out.push([top, bottom, shoe]);
        for (const accessory of accessories) {
          out.push([accessory, top, bottom, shoe]);
        }
      }
    }
  }

  console.log(JSON.stringify(out, null, 2))
  shuffleArray(out);
  
  

  return out
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1)); 
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function ItemsCardSwiper( {navigation, cardsData} ) {


  return (
    <CardSwiper
      cardsData={cardsData}
      CardComponent={ClothingItemCard}
      NextButtonComponent={CreateOutfitsButton}
      navigation={navigation}
    />
  )
  
  // return (
  //   <Swiper
  //     cards={cardsData}
  //     renderCard={(card) => {
  //       return (
  //         <Card
  //           card={card}
  //         />
  //       );
  //     }}
  //     onSwipedLeft={(cardIndex) => {
  //       dislikedItems.push(cardsData[cardIndex]);
  //       console.log("left", cardIndex);
  //     }}
  //     onSwipedRight={(cardIndex) => {
  //       setLikedItems([...likedItems, cardsData[cardIndex]]);
  //       console.log("right", cardIndex);
  //     }}
  //     onSwiped={(cardIndex) => {
  //       console.log(cardIndex);
  //     }}
  //     onSwipedAll={() => {
  //       console.log("onSwipedAll");
  //     }}
  //     cardIndex={0}
  //     backgroundColor={"#4FD0E9"}
  //     stackSize={3}
  //     verticalSwipe={false}
      
  //     overlayLabels={{
  //       left: {
  //         title: 'NOPE',
  //         style: {
  //           label: {
  //             backgroundColor: 'red',
  //             borderColor: 'red',
  //             color: 'white',
  //             borderWidth: 1
  //           },
  //           wrapper: {
  //             flexDirection: 'column',
  //             alignItems: 'flex-end',
  //             justifyContent: 'flex-start',
  //             marginTop: 30,
  //             marginLeft: -30
  //           }
  //         }
  //       },
  //       right: {
  //         title: 'LIKE',
  //         style: {
  //           label: {
  //             backgroundColor: 'green',
  //             borderColor: 'green',
  //             color: 'white',
  //             borderWidth: 1
  //           },
  //           wrapper: {
  //             flexDirection: 'column',
  //             alignItems: 'flex-start',
  //             justifyContent: 'flex-start',
  //             marginTop: 30,
  //             marginLeft: 30
  //           }
  //         }
  //       },
  //     }}

  //   >
      
  //     <CreateOutfitButton acceptedItems={likedItems} navigation={navigation}/>
  //   </Swiper>
  // );
}

function CardSwiper({cardsData, CardComponent, NextButtonComponent, navigation, backgroundColor="#4FD0E9"}) {
  
  const [likedItems, setLikedItems] = useState( []);
  const dislikedItems = [];
  return (
    <Swiper
      cards={cardsData}
      renderCard={(card) => {
        return (
          <CardComponent 
            card={card} 
          />
        );
      }}
      onSwipedLeft={(cardIndex) => {
        dislikedItems.push(cardsData[cardIndex]);
      }}
      onSwipedRight={(cardIndex) => {
        setLikedItems([...likedItems, cardsData[cardIndex]]);
      }}
      onSwiped={(cardIndex) => {
      }}
      onSwipedAll={() => {
        console.log("onSwipedAll");
      }}
      cardIndex={0}
      backgroundColor={backgroundColor}
      stackSize={3}
      verticalSwipe={false}
      
      overlayLabels={{
        left: {
          title: 'NOPE',
          style: {
            label: {
              backgroundColor: 'red',
              borderColor: 'red',
              color: 'white',
              borderWidth: 1
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              marginTop: 30,
              marginLeft: -30
            }
          }
        },
        right: {
          title: 'LIKE',
          style: {
            label: {
              backgroundColor: 'green',
              borderColor: 'green',
              color: 'white',
              borderWidth: 1
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 30,
              marginLeft: 30
            }
          }
        },
      }}

    >
      <NextButtonComponent acceptedItems={likedItems} navigation={navigation}/>
    </Swiper>
  );
}


/**
 * Component to render a card.
 * @param {Object} props - Component properties
 * @param {CardData} props.card - Card text
 * @returns {JSX.Element}
 */
function ClothingItemCard({ card }) {
  let cardURI = card["imagePath"]
  return (
    <View style={styles.card}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          style={{
            width: "75%",
            height: "75%",
            aspectRatio: 1,
            resizeMode: "contain",
          }}
          source={cardURI}
        />
      </View>

      <Text style={styles.text}>{card.displayText}</Text>
      
    </View> 
  );
}

function CreateOutfitsButton({acceptedItems, navigation}) {

  const [ready , setReady] = useState(false);

  useEffect(() => {
    if (isReadyForCreateOutfit(acceptedItems)) {
      setReady(true);
    }
  }, [acceptedItems.length])

  function onPress() {
    console.log("HIIIIIII")
    navigation.navigate("OutfitSwipeScreen", {likedItems: acceptedItems});
  }


  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {ready ? (
        <TouchableOpacity
          onPress={onPress}
          // title="Press me"
          style={{
            backgroundColor: "blue",
            borderRadius: 5,
            padding: 10,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Create Outfits
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          // title="Press me"
          style={{
            backgroundColor: "blue",
            borderRadius: 5,
            padding: 10,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            opacity: 0.5
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Create Outfits
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}





function OutfitsCardSwiper({navigation, cardsData}) {
  return (
    <CardSwiper
      cardsData={cardsData}
      CardComponent={OutfitCard}
      NextButtonComponent={SeeMatchesButton}
      navigation={navigation}
      backgroundColor="limegreen"
    />
  );
}

function OutfitCard( { card } ) {
  console.log("Card", card);

  const accessory = card.filter( (item) => item.category === "accesories")[0];
  const top = card.filter( (item) => item.category === "tops")[0];
  const bottom = card.filter( (item) => item.category === "bottoms")[0];
  const shoe = card.filter( (item) => item.category === "shoes")[0];

  return (
    <View style={{...styles.card, marginRight:10}}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        gap: 10,
      }}>
        {/* <Text style={styles.text}> Outfit: </Text> */}
        
        <View style={{
          flexDirection: "row", 
          gap: 10,
          justifyContent: "space-evenly",
        }}>
          <ImageForOutfitCard item={top}/>
          <ImageForOutfitCard item={bottom}/>
        </View>

        <View style={{
          flexDirection: "row", 
          gap: 10,
          justifyContent: "space-evenly",
        }}>
          {accessory && <ImageForOutfitCard item={accessory}/>}
          <ImageForOutfitCard item={shoe}/>
        </View>
      </View>
    </View> 
  );
}

function ImageForOutfitCard({item}){
  return (
    <Image 
        key={item.id}
        style={{
          width: 170, 
          height: 250,
          resizeMode: "contain",
          backgroundColor: "#f5f5f5",
        }}
        source={item.imagePath}
      />
  )
}


function SeeMatchesButton({acceptedItems, navigation}) {
  const [ready , setReady] = useState(false);

  useEffect(() => {
    if (acceptedItems.length >= 1) {
      setReady(true);
    }
  }, [acceptedItems.length])

  function onPress() {
    navigation.navigate("MatchedOutfitsScreen", {likedItems: acceptedItems});
  }

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        // title="Press me"
        onPress={onPress}
        style={{
          backgroundColor: "blue",
          borderRadius: 5,
          padding: 10,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          See Matches
        </Text>
      </TouchableOpacity>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "transparent",
  },

});

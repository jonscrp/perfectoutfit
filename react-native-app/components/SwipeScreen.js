
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import React from 'react'


import jsonData from "C:/Users/jsuco/OneDrive/Desktop/Hackathons/perfectoutfit/react-native-app/components/sampleCardsData.json";
console.log(jsonData.data[0].categories);

export default function SwipeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CardSwiper navigation={navigation}></CardSwiper>
      <StatusBar style="auto"/>
    </View>
  );
}

for (let i=1 ; i <= 10; i++) {
  sampleCardsData.push({...sampleCardsData[0]})
  sampleCardsData[i].id=i
}

function CardSwiper( {navigation} ) {

  const cardsData = [...sampleCardsData];

  // const likedItems = [];
  const [likedItems, setLikedItems] = useState( []);
  const dislikedItems = [];

  
  
  return (
    <Swiper
      cards={cardsData}
      renderCard={(card) => {
        return (
          <Card
            card={card}
          />
        );
      }}
      onSwipedLeft={(cardIndex) => {
        dislikedItems.push(cardsData[cardIndex]);
        console.log("left", cardIndex);
      }}
      onSwipedRight={(cardIndex) => {
        setLikedItems([...likedItems, cardsData[cardIndex]]);
        console.log("right", cardIndex);
      }}
      onSwiped={(cardIndex) => {
        console.log(cardIndex);
      }}
      onSwipedAll={() => {
        console.log("onSwipedAll");
      }}
      cardIndex={0}
      backgroundColor={"#4FD0E9"}
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
      
      <CreateOutfit acceptedItems={likedItems} navigation={navigation}/>
    </Swiper>
  );
}



/**
 * Component to render a card.
 * @param {Object} props - Component properties
 * @param {CardData} props.card - Card text
 * @returns {JSX.Element}
 */
function Card({ card }) {
  return (
    <View style={styles.card}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          style={{
            width: "80%",
            height: "80%",
            aspectRatio: 1,
            resizeMode: "contain",
          }}
          source={{
            uri:  card.images.front,
          }}
        />
      </View>

      <Text style={styles.text}>{card.displayText}</Text>
      
    </View>
  );
}

function CreateOutfit({acceptedItems, navigation}) {

  const [ready , setReady] = useState(false);

  useEffect(() => {
    if (acceptedItems.length >= 3) {
      setReady(true);
    }
  }, [acceptedItems.length])

  function onPress() {
    navigation.navigate("OutfitScreen", {likedOutfits: acceptedItems});
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
            Create Outfit
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
            Create Outfit
          </Text>
        </TouchableOpacity>
      )}
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

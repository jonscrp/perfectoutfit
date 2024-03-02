//@ts-check
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import React from 'react'

export default function SwipeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CardSwiper navigation={navigation}></CardSwiper>

      

      <StatusBar style="auto"/>
    </View>
  );
}


/*
 * @typedef {{
 *   id: number|string
 *   name: string
 *   images: {
 *     front: string
 *     back: string
 *   }
 *   type: string
 *   displayText: string
 *   description: any
 * }} CardData
 * Type definition for a card data object.
 * Subject to change
 */

const sampleCardsData=[
  {
    id: 0,
    name: 'macys black pants 013412',
    displayText: `H&M 
    Men's Baggy Jeans Black`,
    images: {
        front: 'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa9%2Fc9%2Fa9c948b779d1d73c401e3dc5325a9ddf8bc82f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
        back: ''
    },
    description: {
      Length: "Long",
      WaistRise: "Regular waist",
      Fit: "Loose fit",
      Style: "Balloon Leg, Stacked",
      Description: "Dark denim gray, Solid-color",
      Imported: "Yes",
      Concept: "DENIM"
    }
  }
]

function CardSwiper( {navigation} ) {

  const cardsData = [...sampleCardsData, sampleCardsData[0], sampleCardsData[0], sampleCardsData[0]];

  // const likedItems = [];
  const [likedItems, setLikedItems] = useState(/** @type { CardData[] } */([]));
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

//chatgpt wrote
const CardSwiperBad = () => {
  const [swipeDirection, setSwipeDirection] = useState(null);

  const onSwiping = (x, y) => {
    if (x > 0) {
      setSwipeDirection("right");
    } else if (x < 0) {
      setSwipeDirection("left");
    } else {
      setSwipeDirection(null);
    }
  };

  const renderCard = (card, index) => {
    let cardStyle = {};
    if (swipeDirection === "right") {
      cardStyle = { backgroundColor: "rgba(0, 255, 0, 0.5)" }; // Green for right swipe
    } else if (swipeDirection === "left") {
      cardStyle = { backgroundColor: "rgba(255, 0, 0, 0.5)" }; // Red for left swipe
    }

    return (
      <View style={[styles.card, cardStyle]}>
        <Text style={styles.text}>{card}</Text>
      </View>
    );
  };

  return (
    <Swiper
      cards={["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"]}
      renderCard={renderCard}
      onSwiping={onSwiping}
      overlayLabels={{
        left: {
          title: "NOPE",
          style: {
            label: {
              backgroundColor: "red",
              color: "white",
            },
          },
        },
        right: {
          title: "LIKE",
          style: {
            label: {
              backgroundColor: "green",
              color: "white",
            },
          },
        },
      }}
    />
  );
};



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
    if (acceptedItems.length > 0) {
      setReady(true);
    }
  }, [acceptedItems.length])

  function onPress() {
    navigation.navigate("Home", {acceptedItems: acceptedItems});
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

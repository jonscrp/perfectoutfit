import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button } from "react-native";
import { useState } from "react";

export default function SwipeScreen() {
  return (
    <View style={styles.container}>
      <CardSwiper></CardSwiper>
    </View>
  );
}

function CardSwiper() {
  return (
    <Swiper
      cards={["DO", "MORE", "OF", "WHAT", "MAKES", "YOU", "HAPPY"]}
      renderCard={(card) => {
        return (
          <View style={styles.card}>
            <Text style={styles.text}>{card}</Text>
          </View>
        );
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

      
    >
      <Button
        onPress={() => {
          console.log("oulala");
        }}
        title="Press me"
      >
        You can press me
      </Button>
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
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

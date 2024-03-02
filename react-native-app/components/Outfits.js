import { StyleSheet, Text, View } from "react-native";

function generateSelectedOutfits(likedOutfits) {
  return [
    {
      top: likedOutfits[0],
      bottom: likedOutfits[1],
      shoes: likedOutfits[2],
      accessories: null,
    }
  ]
}

export default function OutfitScreen({ route }) {
  const likedOutfits = route.params.likedOutfits;

  const selectedOutfits = generateSelectedOutfits(likedOutfits);

  console.log(selectedOutfits);

  return (
    <View style={styles.container}>
      <Text>Outfits</Text>

      {selectedOutfits.map((item) => (
        <Text key={item}>{item.displayText}</Text>
      ))}
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

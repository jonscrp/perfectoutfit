import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function generateSelectedOutfits(likedItems) {
  return [
    {
      top: likedItems[0],
      bottom: likedItems[1],
      shoes: likedItems[2],
      accessories: null,
    },
  ];
}


export  function OutfitScreenOld({ route }) {
  const likedOutfits = route.params.likedOutfits;

  const selectedOutfits = generateSelectedOutfits(likedOutfits);

  console.log(
    "selectedOutfits",
    JSON.stringify(Object.values(selectedOutfits[0]), null, 2)
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Your Outfit:</Text>
      

      {Object.values(selectedOutfits[0]).map(
        (item) =>
          item !== null && (
            <View
              key={item.id}
              style={{
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 15,
                  margin: 10,
                }}
              >
                <Text style={{ fontSize: 18, marginLeft: 10 }}>
                  {item.name}
                </Text>


                <Image
                  style={{ width: 100, height: 150, resizeMode: "contain" }}
                  source={{ uri: item.images.front }}
                />
              </View>
            </View>
          )
      )}
      
      {/* Buy button */}
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}
        onPress={() => {
          Alert.alert("Purchase", "Purchased");
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          Buy
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

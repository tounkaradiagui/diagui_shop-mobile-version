import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 10,
            backgroundColor: "lightgray",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="md-location-sharp" size={24} color="#078ECB" />
          </TouchableOpacity>
          <Text>Faladié Socoro- Bamako</Text>
          <TouchableOpacity>
            <Ionicons
              name="cart"
              size={24}
              color="#078ECB"
              style={{ marginRight: 3 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
            }}
          >
            Bienvenue sur Diagui Shop
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingHorizontal:6,
            width:"95%",
            borderWidth: 2,
            marginLeft:"auto",
            marginRight:"auto",
            borderColor: "#078ECB",
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor:"lightgray",
            marginTop:10
          }}
        >
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>

          <TextInput placeholder='Recherchez un produit ici !' style={{width:250}}/>

          <TouchableOpacity>
            <Ionicons name="ios-camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

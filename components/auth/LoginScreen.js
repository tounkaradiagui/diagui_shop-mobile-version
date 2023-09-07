import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if(token){
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Message d'erreur", error);
      }
    }
    checkLoginStatus();
  })

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://127.0.0.1:19000/login",user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Erreur de connexion", "Email ou Mot de Passe Incorrecte");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <Image
        source={require("../../assets/images/shopping.png")}
        resizeMode="contain"
        style={{
          width: "50%",
          height: 200,
          marginTop: 50,
        }}
      />

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            Connectez - vous pour continuer !
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderWidth: 2,
              borderColor: "#078ECB",
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 5 }}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ width: 250 }}
              placeholder="Adresse Email"
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderWidth: 2,
              borderColor: "#078ECB",
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 5 }}
              name="lock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              style={{ width: 250 }}
              placeholder="Mot de Passe"
            />

            <MaterialCommunityIcons
              onPress={togglePasswordVisibility}
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="black"
              marginRight={5}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Se souvenir de moi</Text>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Mot de Passe oublié ?
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 5,
              padding: 15,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Connexion
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{ fontWeight: "bold", textAlign: "center", marginTop: 25 }}
          >
            Pas encore inscrit ? Cliquez Ici pour s'inscrire
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

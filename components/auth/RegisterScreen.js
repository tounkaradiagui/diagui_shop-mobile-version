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
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name:name,
      email:email,
      password:password,
    };

    // Envoie d'une requete au backend API en utilisant axios
    axios.post("http://127.0.0.1:19000/register",user).then((response) => {
      console.log(response);
      Alert.alert(
        "Inscription effectuée Succès",
        "Votre inscription a réussie"
      );
      setName("");
      setPassword("");
      setEmail("");

    }).catch((error) => {
      Alert.alert("Inscription echouée", "Veuillez réessayer");
      console.log(error);
    });
  }

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
            Inscription sur Diagui-Shop
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#078ECB",
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 5 }}
              name="person"
              size={24}
              color="black"
            />
            <TextInput
              require={true}
              placeholder="Nom et Prénom"
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ width: 250 }}
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
              placeholder="Mot de passe"
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

        {/* <View style={{ marginTop: 20 }}>
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
            placeholder="Confirmer le mot de passe"
            // color="black"
          />

          <MaterialCommunityIcons
            onPress={togglePasswordVisibility}
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="black"
            marginRight={5}
          />
        </View>
      </View> */}

        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={handleRegister}
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
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack("Login")}>
          <Text
            style={{ fontWeight: "bold", textAlign: "center", marginTop: 25 }}
          >
            Déjà inscrit ? Cliquez Ici pour s'authentifier
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

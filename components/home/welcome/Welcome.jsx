import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

//use for query??
const companyType = ['retailer', 'recycle'];

const Welcome = ({ }) => {
  const router = useRouter();


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello </Text>
        <Text style={styles.welcomeMessage}>What are looking for?</Text>
        <Text style={styles.welcomeMessage}>Today Special</Text>
      </View>

    </View>
  )
}

export default Welcome;
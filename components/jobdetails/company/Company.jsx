import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
//jobTitle = companyName
//companyName = type (retailer or recycle)
const Company = ({ companyLogo, name, location, locationUrl, contact, type }) => {

  const onLocationPress = () => {
    Linking.openURL(locationUrl).catch(err => console.error("An error occurred", err));
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo)
              ? companyLogo
              : "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/retailer_icon_map.png?alt=media&token=6065ac17-b217-41c0-9ecb-8c0071538b43",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      {/* below is the companyName, ignore the style naming */}
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{name}</Text>
      </View>

      {/*this section show the companyType, state*/}
      <View style={styles.companyInfoBox}>

        <Text style={styles.companyName}> {type} / </Text>
        <Text style={styles.companyName}> {contact} </Text>
      </View>


      <TouchableOpacity onPress={onLocationPress}>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          {/* state, selangor */}
          <Text style={styles.locationName}>{location} Click to the Direction</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default Company;
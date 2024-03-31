import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
//jobTitle = companyName
//companyName = type (retailer or recycle)
const Company = ({ companyLogo, name, location, locationUrl, contact }) => {

  const onLocationPress = () => {
    Linking.openURL(locationUrl).catch(err => console.error("An error occurred", err));
  };

  const logoImage = { companyLogo }

  console.log('Logo path: ', { companyLogo })


  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo)
              ? companyLogo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      {/* below is the companyName, ignore the style naming */}
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{name}</Text>
        <Text style={styles.jobTitle}>{companyLogo}</Text>
      </View>

      {/*this section show the companyType, state*/}
      <View style={styles.companyInfoBox}>

        <Text style={styles.companyName}> Recycling Center/ </Text>
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
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./CardInfo.style";
import { checkImageURL } from "../../../utils";


const CardInfo = ({ company, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        {/* <Image
          source={{
            uri: checkImageURL(company.logoPath)
              ? company.logoPath
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logImage} */}
        {/* /> */}
      </TouchableOpacity>

      <View style={styles.textContainer}>

        {/* <Text style={styles.jobName} numberOfLines={1}>
          {item.job_title}
        </Text> */}
        <Text style={styles.jobType}>{company.name}</Text>

        <Text style={styles.location}> {company.state}</Text>
      </View>

    </TouchableOpacity >
  );
};


export default CardInfo
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
        <Image
          source={{
            uri: checkImageURL(company.logoPath)
              ? company.logoPath
              : "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/image_icon.png?alt=media&token=77c40ce3-5b7c-434b-a90d-78099726734e",
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>

        {/* <Text style={styles.jobName} numberOfLines={1}>
          {item.job_title}
        </Text> */}
        <Text style={styles.jobType}>{company.name}</Text>

        <Text style={styles.location}> {company.state}</Text>
      </View>

    </TouchableOpacity>
  );
};


export default CardInfo
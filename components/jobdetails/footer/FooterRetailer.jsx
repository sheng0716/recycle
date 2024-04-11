import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

const FooterRetailer = ({ url, isFavourite, onToggleFavourite }) => {
  console.log('Favourite Status: ', isFavourite);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={onToggleFavourite}>
        <Image
          source={isFavourite ? icons.heartFilled : icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>More Information</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterRetailer;
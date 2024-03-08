import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";
//this screenHeader shows on the top of the screen
const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    //check this handlePress
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
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

const Welcome = () => {
  const router = useRouter();
  //setCompanyType
  const [activeCompanyType, setActiveCompanyType] = useState('retailer');

  // initialise empty array
  const [companies, setCompanies] = useState([]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello </Text>
        <Text style={styles.welcomeMessage}>What are looking for</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=''
            onChangeText={() => { }}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>


        {/* location button */}
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={() => {
            router.push(`/map`);
          }}
        >
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationBtnImage}
          />
        </TouchableOpacity>

      </View>

      {/* if user click on this, it will automatically go to search, whether search 'retailer' or 'recycle' */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={companyType}
          renderItem={({ item }) => (

            <TouchableOpacity
              style={styles.tab(activeCompanyType, item)}
              onPress={() => {
                setActiveCompanyType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeCompanyType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome;
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from './retailer.style'
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
// import useFetch from "../../../hook/useFetch";
import companiesDbService from "../../../assets/DbService/companiesDbService";

const Retailer = () => {
  const router = useRouter();
  // const isLoading = false;
  // const error = false;

  // destructure data from useFetch
  // const { isLoading, error } = useFetch('/api/companies');
  // Initialise with an empty array
  const [retailer, setRetailer] = useState([]);
  const [companies, setCompanies] = useState([]);

  // console.log(data);

  // see what data is fetch
  const fetchData = async () => {
    try {
      const companiesData = await companiesDbService.getAllCompanies();
      setCompanies(companiesData);
      console.log(companies);
    } catch (error) {
      console.error('error fetching data from database', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Retailer</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={companies}
          renderItem={({ item }) => (
            <PopularJobCard
              item={item}
            // selectedJob={selectedJob}
            // handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item) => item?.companyId.toString()}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />

      </View>
    </View>
  )
}
export default Retailer
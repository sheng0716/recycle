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

  // destructure data from useFetch
  // const { isLoading, error } = useFetch('/api/companies');
  // Initialise with an empty array
  const [retailer, setRetailer] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();

  // console.log(data);

  const handleCardPress = (item) => {
    router.push(`/company-details/${item.companyId}`);//route to the specific company page
    setSelectedCompany(item.companyId);
  }
  // see what data is fetch
  const fetchData = async () => {
    try {
      const companiesData = await companiesDbService.getAllRetailer();
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
              selectedCompany={selectedCompany}
              handleCardPress={handleCardPress}
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
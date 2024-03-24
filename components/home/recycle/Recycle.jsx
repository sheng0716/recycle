import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./Recycle.style";
import { COLORS } from "../../../constants";
import CardInfo from "../../common/cards/CardInfo";
import useFetch from "../../../hook/useFetch";
import companiesDbService from "../../../assets/DbService/companiesDbService";

const Recycle = () => {
  const router = useRouter();
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React Native developer",
  //   num_pages: "1",
  // });
  const [companies, setCompanies] = useState([]);
  const isLoading = false;
  const error = false;
  data = [1, 2, 3,];
  const fetchData = async () => {
    try {
      const companiesData = await companiesDbService.getAllRetailer();
      setCompanies(companiesData);
      console.log("This is recycle company data " + company);
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
        <Text style={styles.headerTitle}>Recycle</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          companies?.map((company) => (
            <CardInfo
              company={company}
            // key={company.id.toString()}
            // key={`nearby-job-${job.job_id}`}
            // handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Recycle;
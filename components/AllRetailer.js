import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import companiesDbService from "../assets/DbService/companiesDbService";
import RetailerCard from "./RetailerCard";

const AllRetailer = () => {
    const [retailerData, setRetailerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllRetailerData = async () => {
        setIsLoading(true);
        try {
            const retailerData1 = await companiesDbService.getAllRetailer();
            setRetailerData(retailerData1);
            console.log('All Retailer Information in Retailer Tab: ', retailerData);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    useEffect(() => {
        fetchAllRetailerData();
    }, [])
    return (
        <View>
            {/* Heading */}
            <Text style={styles.heading}>Retailer Nearby Me</Text>

            {/* Retailers List */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text>Error: {error.message}</Text>
                ) : (
                    retailerData.map((retailer, index) => (
                        <RetailerCard
                            key={index}
                            companyName={retailer.name}
                            logoPath={retailer.logoPath}
                            contactNo={retailer.contactNo}
                            state={retailer.state}

                        />
                    ))
                )}
            </ScrollView>
        </View>
    );

}
// Styles
const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10, // Adjusts the alignment to the left with some padding
        marginTop: 10, // Adds a little space above the heading
        marginBottom: 10, // Adds a little space below the heading before the list starts
    },
});
export default AllRetailer;
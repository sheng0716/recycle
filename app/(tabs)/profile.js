import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { React, useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
    Layout,
    Icon,
    ApplicationProvider,
    Button,
    IconRegistry
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { icons } from '../../constants';
import { useAuth } from '../AuthProvider';
import UsersDbService from '../../assets/DbService/userDbService';


const ProfileScreen = () => {
    // const params = useLocalSearchParams();
    // const userId = params.userId;
    // console.log("User ID: ", userId)

    const { userId } = useAuth();//get userId after login
    const router = useRouter();

    const [isEditable, setIsEditable] = useState(false);
    const [userData, setUserData] = useState({
        // get data from database
        userId: "0",
        username: "USER NAME",
        email: "abcd@hotmail.com",
        phoneNumber: "012-3456789",
    });



    const fetchUserData = async () => {
        try {
            const userData = await UsersDbService.getUserDataByUserId(userId);
            console.log(userData)
            setUserData(userData); // Update the state with the fetched user data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Use useEffect to fetch user data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, []); // Ensures it runs once isMember in route.params changed

    const handleEditProcess = () => {
        //function for click on edit icon
        setIsEditable(!isEditable);
    }

    const handleChange = (key, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSaveProcess = async () => {
        //function for click on save icon
        setIsEditable(false);

        await UsersDbService.updateUser(userId, userData);

        Alert.alert("Profile Saving", "Saved Successfully");
    }

    const handleSettingPress = () => {

        router.push({
            pathname: '/setting'
        })
    }
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />

            <ApplicationProvider {...eva} theme={eva.light}>
                <ScrollView>
                    {/* 
                    <View>
                        <Text>Userid: {userId}</Text>
                    </View> */}
                    <Layout style={styles.container}>
                        <View style={styles.topBar}>
                            <Text style={styles.title}>Welcome, {userData.username}</Text>

                            <TouchableOpacity onPress={handleSettingPress}>
                                <Icon style={{ width: 35, height: 45, padding: 5, margin: 5 }}
                                    name='settings-2-outline'
                                />

                            </TouchableOpacity>
                        </View>


                        <View style={{ alignItems: 'center' }}>
                            {/* <UserAvatar size={100} name={userData.username} style={{ width: 100, height: 100, borderRadius: 100, marginTop: 0 }} /> */}
                            <Image
                                source={icons.profile}
                                style={{ width: 100, height: 100, borderRadius: 100, marginTop: 0 }} />

                            <View style={{ alignItems: 'center', flexDirection: "row" }}>
                                <Text style={styles.userName}>{userData.username}</Text>
                                {/* below onPress is put navMember inside */}
                                {/*{userData.isMember ? (
                                    <TouchableOpacity onPress={() => { }}>
                                        <Icon
                                            style={{ width: 40, height: 45, marginLeft: 10, marginBottom: -10 }}
                                            name="cube"
                                        />
                                        <Text>Cube</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { }}>
                                        <Icon
                                            style={{ width: 40, height: 45, marginLeft: 10, marginBottom: -10 }}
                                            name="cube-outline"
                                        />
                                        {/* <Text>Cube-outline</Text> */}
                                {/* </TouchableOpacity> */}
                                {/* )} */}

                                {/* aa */}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ width: 25, height: 25, padding: 5, margin: 5 }}
                                    name='email-outline'
                                />
                                <Text style={styles.email}>{userData.email}</Text>
                            </View>

                        </View>

                        <View style={styles.editSave}>
                            <TouchableOpacity onPress={handleEditProcess}>
                                <Icon style={{ width: 35, height: 45, padding: 5, margin: 5 }}
                                    name='edit-outline'
                                />

                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSaveProcess}>
                                <Icon style={{ width: 35, height: 45, padding: 5, margin: 5 }}
                                    name='save-outline'
                                />

                            </TouchableOpacity>
                        </View>

                        {/* Subcontainer that contained all the personal information */}
                        <View style={styles.subcontainer}>
                            <Text style={styles.subTitle}>Username:</Text>
                            <TextInput
                                style={styles.inputText}
                                value={userData.username}
                                onChangeText={(text) => handleChange('username', text)}
                                editable={isEditable}
                            />
                            <View style={styles.hrLine} />

                            <Text style={styles.subTitle}>Email:</Text>
                            <TextInput
                                style={styles.inputText}
                                keyboardType='email-address'
                                value={userData.email}
                                onChangeText={(text) => handleChange('email', text)}
                                editable={isEditable}
                            />
                            <View style={styles.hrLine} />


                            <Text style={styles.subTitle}>Phone Number:</Text>
                            <TextInput
                                style={styles.inputText}
                                keyboardType='phone-pad'
                                value={userData.phoneNumber}
                                onChangeText={(text) => handleChange('phoneNumber', text)}
                                editable={isEditable}
                            />
                            <View style={styles.hrLine} />

                        </View>

                    </Layout>
                </ScrollView>
            </ApplicationProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },

    topBar:
    {
        margin: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        justifyContent: 'space-between',
    },

    title:
    {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },

    userName:
    {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 10,
        color: 'black',
    },

    email:
    {
        fontSize: 15,
        fontWeight: 'bold',
        padding: -10,
        color: 'grey',
    },

    editSave:
    {
        margin: 10,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        justifyContent: 'center'
    },

    subcontainer:
    {
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: "90%",
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 5,
        marginBottom: 20,
    },

    inputText:
    {
        fontSize: 16,
        margin: 7,
        marginTop: 1,
        marginBottom: 0,
    },

    subTitle:
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'black',
    },

    hrLine:
    {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
    }

});

export default ProfileScreen;
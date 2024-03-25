import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarIconStyle: { marginTop: 3 }, tabBarActiveTintColor: 'blue', tabBarLabelStyle: { fontSize: 15 } }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="recycle"
                options={{
                    title: 'Recycling Center',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="recycle" color={color} />,
                }}
            />
            <Tabs.Screen
                name="retailer"
                options={{
                    title: 'Retailer',
                    tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="store" color={color} />,
                }}
            />
            <Tabs.Screen
                name="location"
                options={{
                    href: null,//will not show on tabs
                    title: 'Location',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}

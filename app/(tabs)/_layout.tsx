import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF9D00",
          tabBarInactiveTintColor: "#999999",
          tabBarStyle: {
            height: 75,
            paddingTop: 0,
            paddingBottom: 10,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
            // 그림자 제거
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Default-Font",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            title: "채팅",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/chat_selected_icon.png")
                    : require("../../assets/images/chat_unselected_icon.png")
                }
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: "리포트",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/report_selected_icon.png")
                    : require("../../assets/images/report_unselected_icon.png")
                }
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "프로필",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/images/profile_selected_icon.png")
                    : require("../../assets/images/profile_unselected_icon.png")
                }
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

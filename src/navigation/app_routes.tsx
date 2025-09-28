
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home_screen/home_screen';

import JournalScreen from '../screens/journal/journal_screen';



export type RootNavigationStack = {

    HomeProp:undefined,
    JournalScreenProp:undefined,
  
};

const Stack = createNativeStackNavigator<RootNavigationStack>();
function AppNavigation() {

    return (
     
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                    // ✅ Center title on both iOS & Android
                }}
            >
                <Stack.Screen name="HomeProp" component={HomeScreen} />
                <Stack.Screen name="JournalScreenProp" component={JournalScreen} />
    
            </Stack.Navigator>
        </NavigationContainer>

    );
};


export default AppNavigation;



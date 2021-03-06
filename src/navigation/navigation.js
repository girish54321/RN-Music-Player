import React from 'react'
import Home from '../screens/Home/Home.screen'
import PlayList from '../screens/PlayList/PlayList.screen'
import MediaPlayer from '../screens/MediaPlayer/MediaPlayer.screen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* headerMode="none" */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Play List" component={PlayList} />
        <Stack.Screen name="MediaPlayer" component={MediaPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation

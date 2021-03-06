import React from 'react'
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native'

const WIDTH = Dimensions.get('window').width
export const CoverArt = props => {
  return (
    <View style={[styles.coverImageStyle, { height: 260, width: 260 }]}>
      <Image
        source={{ uri: props.imageUrl }}
        style={{
          flex: 1,
          height: 260,
          width: 260,
          borderRadius: 6,
          alignSelf: 'center'
        }}
      />

      <View
        style={{
          position: 'absolute',
          marginBottom: 14,
          bottom: 0,
          marginHorizontal: 10,
          flex: 1,
          borderRadius: 6,
          alignSelf: 'center'
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '500',
            color: '#fff'
          }}
          numberOfLines={2}>
          {props.title}
        </Text>
        <Text style={{ textAlign: 'center', color: '#fff' }}>
          {props.subtitle}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  coverImageStyle: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 30,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5
    },

    borderRadius: 6,
    alignSelf: 'center',
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  }
})

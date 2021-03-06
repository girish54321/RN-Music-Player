import React from 'react'
import { SafeAreaView, StatusBar, FlatList } from 'react-native'
import styles from './PlayList.style'
import data from '../../api/playListData'
import { List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base'
const PlayList = ({ navigation }) => {
  const goToPlayer = item => {
    navigation.navigate('MediaPlayer', { data: item })
  }
  const Item = ({ title, description, artwork, item, duration }) => (
    <List>
      <ListItem
        thumbnail
        onPress={() => {
          goToPlayer(item)
        }}>
        <Left>
          <Thumbnail
            source={{
              uri: artwork
            }}
          />
        </Left>
        <Body>
          <Text>{title}</Text>
          <Text note>{description}</Text>
        </Body>
        <Right>
          <Text note>{duration}</Text>
        </Right>
      </ListItem>
    </List>
  )

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      description={item.description}
      artwork={item.artwork}
      duration={item.duration}
      item={item}
    />
  )

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView1}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  )
}

export default PlayList

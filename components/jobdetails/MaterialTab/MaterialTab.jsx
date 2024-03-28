import React from 'react'
import { View, Text, FlatList } from 'react-native'

import styles from './materialTab.style'
import Product from '../../home/product/Product'
import ProductCard from '../../home/product/ProductCard'

const CenterReceiveMaterial = () => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        numColumns={4}
        data={[1, 2, 3, 4]}
        renderItem={({ item }) =>
          <ProductCard
            item={item}
          />
        }
      />
    </View>
  )
}

export default CenterReceiveMaterial
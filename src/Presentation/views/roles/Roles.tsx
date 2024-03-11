import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import useViewModel from './ViewModel';
import { RolesItem } from './Item';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'> { };

export const RolesScreen = ({navigation, route}: Props) => {

  const { user } = useViewModel();
  const width = Dimensions.get('window').width;
  //const height = Dimensions.get('window').height;

  return (
  
    <View>
      <FlatList
      data={user?.roles}
      renderItem={({item}) => <RolesItem rol={item} height={420} width={width - 100} navigation={navigation} />}
      keyExtractor={item => item.id}
  />


    </View>

  );
}
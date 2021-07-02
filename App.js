import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Banner, Recipes} from './src/components';

const QueryClient = new QueryClient();

const App = () => {
<SafeAreaView style={styles.safeAreaView}>
    <View style={styles.view}>
      <Banner text="🥘 Recipes App" />
      <QueryClientProvider client={queryClient}>
        <Recipes />
      </QueryClientProvider>
      <Banner text="©️ 2021 - No rights reserved! 😃" />
    </View>
  </SafeAreaView>

};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  view: {alignItems: 'center', 
  justifyContent: 'center'}, 
});

export default App;

import React from 'react';
import { StyleSheet, View } from 'react-native';

const SkeletonUI = () => {
  return (
    <View style={styles.profileWrap}>
      <View style={styles.mask}></View>

      <View style={styles.infoWrap}>
        <View style={styles.nameWrap} />
        <View style={styles.locationWarp} />
        <View style={styles.likeWarp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileWrap: {
    flexDirection: 'row',
    position: 'relative',
    marginTop: 25.12,
    marginLeft: 30,
  },
  mask: {
    marginRight: 12,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e9ecef',
  },
  infoWrap: {
    paddingTop: 4,
    paddingBottom: 2,
  },
  nameWrap: {
    width: 80,
    height: 14,
    backgroundColor: '#e9ecef',
    borderRadius: 40,
    marginBottom: 7,
  },
  locationWarp: {
    width: 100,
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 40,
    marginBottom: 7,
  },
  likeWarp: {
    width: 40,
    height: 12,
    borderRadius: 40,
    backgroundColor: '#e9ecef',
  },
});

export default SkeletonUI;

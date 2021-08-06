import React from 'react';
import {MultiValue} from '../interfaces/survey';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import Bus from '../assets/icons/productGroups/Bus.svg';
import Pc from '../assets/icons/productGroups/PC.svg';
import Truck from '../assets/icons/productGroups/Truck.svg';
import Unimog from '../assets/icons/productGroups/UNIMOG.svg';
import Van from '../assets/icons/productGroups/Van.svg';
import BharatBenz from '../assets/icons/brands/Bharat Benz.svg';
import Freightliner from '../assets/icons/brands/Freightliner.svg';
import Fuso from '../assets/icons/brands/FUSO.svg';
import Maybach from '../assets/icons/brands/Maybach.svg';
import MersedesBenz from '../assets/icons/brands/Mercedes-Benz.svg';
import Mitsubishi from '../assets/icons/brands/Mitsubishi.svg';
import Setra from '../assets/icons/brands/SETRA.svg';
import Smart from '../assets/icons/brands/Smart.svg';
import WesternStarTrucks from '../assets/icons/brands/WesternStarTrucks.svg';

interface ServicesProps {
  services: MultiValue[];
}

function Services({services}: ServicesProps) {
  const servicesValues = services.map(i => i.value);
  return (
    <View style={styles.servicesContainer}>
      {servicesValues.map(i => {
        const [productGroup, brand, activity] = i.split(' : ');
        return (
          <View style={styles.serviceContainer} key={i}>
            <View style={styles.iconContainer}>
              {getProductGroupIcon(productGroup)}
            </View>
            <View style={styles.iconContainer}>{getBrandIcon(brand)}</View>
            <View>
              <Title style={styles.activity}>{activity}</Title>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default React.memo(Services);

const styles = StyleSheet.create({
  servicesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconContainer: {
    marginRight: 8,
  },
  activity: {
    height: 30,
  },
  serviceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
});

function getProductGroupIcon(v: string) {
  switch (v.toLowerCase()) {
    case 'bus': {
      return <Bus />;
    }
    case 'pc': {
      return <Pc />;
    }
    case 'truck': {
      return <Truck />;
    }
    case 'unimog': {
      return <Unimog />;
    }
    case 'van': {
      return <Van />;
    }
    default:
      return <Pc />;
  }
}

function getBrandIcon(v: string) {
  switch (v.toLowerCase()) {
    case 'bharat benz': {
      return <BharatBenz />;
    }
    case 'freightliner': {
      return <Freightliner />;
    }
    case 'fuso': {
      return <Fuso />;
    }
    case 'maybach': {
      return <Maybach />;
    }
    case 'mercedes-benz': {
      return <MersedesBenz />;
    }
    case 'mitsubishi': {
      return <Mitsubishi />;
    }
    case 'setra': {
      return <Setra />;
    }
    case 'smart': {
      return <Smart />;
    }
    case 'westernstartrucks': {
      return <WesternStarTrucks />;
    }
    default:
      return <MersedesBenz />;
  }
}

import React from 'react';
import {Caption, Headline, Paragraph, Text} from 'react-native-paper';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import themeConfig from '../../../themeConfig';
import {ScrollView} from 'react-native-gesture-handler';

const providerData = {
  'Name:': 'Mercedes-Benz AG',
  'Address:': '2200, 70546 Stuttgart, Germany',
  'Commercial Register:': 'Stuttgart, No. HRB 762873',
  'VAT registration number:': 'DE321281763',
  'Field:': 'MS / DCN',
  'Plant:': '0000',
};

function LegalNoticesAndTermsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.section}>
              <Headline style={styles.header}>Legal notices and Terms</Headline>
              <Paragraph style={styles.paragraph}>
                The GNSA is provided by the Mercedes-Benz AG to Daimler
                wholesale companies. It is used to evaluate the fulfillment of
                retail standards - agreed upon in the contracts - at dealerships
                which are part of the Mercedes-Benz AG retail network.
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                The user is able to download Audits from the central server,
                evaluate standards and then upload the results again. The GNSA
                is solely provided for this specific purpose.
              </Paragraph>
              <Paragraph>
                Usage is restricted to authorized persons only. By accessing the
                GNSA the user agrees to the Mercedes-Benz AG terms and
                conditions.
              </Paragraph>
            </View>
            <View style={styles.section}>
              <Headline style={styles.header}>Provider</Headline>
              <View style={styles.table}>
                <View style={styles.leftColumn}>
                  {Object.keys(providerData).map(i => (
                    <Text style={labelStyle} key={i}>
                      {i}
                    </Text>
                  ))}
                </View>
                <View style={styles.rightColumn}>
                  {Object.values(providerData).map(i => (
                    <Text style={styles.cell} key={i}>
                      {i}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <Caption>Mercedes-Benz AG ©</Caption>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(LegalNoticesAndTermsScreen);

const styles = StyleSheet.create({
  leftColumn: {width: '45%'},
  rightColumn: {width: '55%'},
  paragraph: {
    marginBottom: 15,
  },
  header: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '700',
  },
  cell: {
    marginBottom: 8,
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  section: {
    marginBottom: 40,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 30,
    paddingRight: 80,
    paddingLeft: 80,
    paddingBottom: 40,
    backgroundColor: themeConfig.defaultTheme.colors.background,
  },
});

const labelStyle = StyleSheet.flatten([styles.cell, styles.label]);

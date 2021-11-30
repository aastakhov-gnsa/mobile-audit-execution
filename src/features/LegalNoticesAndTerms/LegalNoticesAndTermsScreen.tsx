import React from 'react';
import {Caption} from 'react-native-paper';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import themeConfig from '../../../themeConfig';
import Typography from '../../components/Typography';

const providerData = {
  'Name:': 'Mercedes-Benz AG',
  'Address:': 'L542, 70546 Stuttgart, Germany',
  'Commercial Register:': 'Stuttgart, No. HRB 762873',
  'VAT registration number:': 'DE321281763',
  'Department:': 'MS/DDS',
  'Plant:': '000',
};

function LegalNoticesAndTermsScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View style={styles.section}>
            <Typography size="Headline 6" style={styles.header}>
              Disclaimer
            </Typography>
            <Typography size="Body 1" style={styles.paragraph}>
              GNSA and its components are operated by Mercedes-Benz AG for the
              sole purpose of evaluating the continued fulfillment of automotive
              retail standards agreed upon in the respective contracts between
              the manufacturer or distributor and its authorized network.
            </Typography>
            <Typography size="Body 1" style={styles.paragraph}>
              The user is able to download Surveys to a mobile device from the
              central server, evaluate the standards contained in these Surveys
              and then upload the results again. GNSA and its components are
              solely provided for this specific purpose.
            </Typography>
            <Typography size="Body 1">
              Usage is restricted to authorized persons only. By accessing GNSA,
              the user agrees to the Mercedes-Benz AG Terms and Conditions.
            </Typography>
          </View>
          <View style={styles.section}>
            <Typography size="Headline 6" style={styles.header}>
              Provider
            </Typography>
            <View style={styles.table}>
              <View style={styles.leftColumn}>
                {Object.keys(providerData).map(i => (
                  <Typography size="Body 1" style={labelStyle} key={i}>
                    {i}
                  </Typography>
                ))}
              </View>
              <View style={styles.rightColumn}>
                {Object.values(providerData).map(i => (
                  <Typography size="Body 1" style={styles.cell} key={i}>
                    {i}
                  </Typography>
                ))}
              </View>
            </View>
          </View>
        </View>
        <Caption>Mercedes-Benz AG ©</Caption>
      </View>
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
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
  row: {
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

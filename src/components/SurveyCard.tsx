import React from 'react';
import {Survey} from '../interfaces/survey';
import {Card, Subheading, Title, Button} from 'react-native-paper';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {StyleSheet, View} from 'react-native';
import Services from './Services';
import StatusWithIcon from './StatusWithIcon';

function SurveyCard({survey}: {survey: Survey}) {
  const {
    id,
    plannedDate,
    outletInfo,
    outletAddress,
    auditNumber,
    resultCd,
    services,
  } = survey;

  const RightContent = () => <StatusWithIcon status={resultCd} />;
  return (
    <Card style={styles.card} key={id}>
      <Card.Title
        style={styles.title}
        title={auditNumber}
        subtitle={`Planned Date: ${
          plannedDate
            ? format(
                parse(plannedDate, "yyyy-MM-dd'T'HH:mm:SS", new Date()),
                'dd.MM.yyyy',
              )
            : ''
        }`}
        rightStyle={styles.rightContainer}
        right={RightContent}
      />
      <Card.Content>
        <View style={styles.nameContainer}>
          <Title>{outletInfo}</Title>
          <Subheading>{outletAddress}</Subheading>
        </View>
        <Services services={services} />
      </Card.Content>
      <Card.Actions style={styles.actionsContainer}>
        <Button icon="information-outline">Show Details</Button>
        <Button>Download</Button>
      </Card.Actions>
    </Card>
  );
}

export default React.memo(SurveyCard);

const styles = StyleSheet.create({
  title: {
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  rightContainer: {
    paddingRight: 16,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  card: {
    marginBottom: '2%',
  },
});

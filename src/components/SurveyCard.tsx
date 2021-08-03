import React from 'react';
import {Survey} from '../interfaces/survey';
import {Card, Subheading, Title} from 'react-native-paper';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {StyleSheet, Text, View} from 'react-native';

function SurveyCard({survey}: {survey: Survey}) {
  const {
    id,
    plannedDate,
    receivingEntityConcatName,
    auditNumber,
    number,
    statusCd,
    services,
  } = survey;
  return (
    <Card style={styles.card} key={id}>
      <Card.Title
        title={auditNumber}
        subtitle={`Planned Date: ${format(
          parse(plannedDate, "yyyy-MM-dd'T'HH:mm:SS", new Date()),
          'dd.MM.yyyy',
        )}`}
        right={() => <Text>{statusCd}</Text>}
      />
      <Card.Content>
        <View>
          <Title>{receivingEntityConcatName}</Title>
          <Subheading>{receivingEntityConcatName}</Subheading>
        </View>
      </Card.Content>
    </Card>
  );
}

export default React.memo(SurveyCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: '2%',
  },
});

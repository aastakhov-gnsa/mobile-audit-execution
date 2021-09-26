import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useAllSurveysQuery} from '../Survey/surveyService';
import ScreenContainer from '../../components/ScreenContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import ItemWrapper from '../../components/ItemWrapper';
import Services from '../../components/Services';
import Typography from '../../components/Typography';
import CompanyAddress from '../../components/CompanyAddress';
import NoDataFallback from '../../components/NoDataFallback';

interface AuditDetailsParams {
  id: string;
}
function AuditDetailsScreen() {
  const route = useRoute();
  const {id} = route.params as AuditDetailsParams;
  const {auditData} = useAllSurveysQuery('', {
    selectFromResult: result => ({
      ...result,
      auditData: result.data?.find(i => i.id === id),
    }),
  });

  const content: {title: string; component: React.ReactNode}[] = [
    {title: 'Services', component: <Services services={auditData?.services} />},
    {
      title: 'Audit Name',
      component: <Typography size="Body 1">{auditData?.number}</Typography>,
    },
    {
      title: 'Location Info',
      component: (
        <CompanyAddress
          companyId={auditData?.companyId}
          outletAddress={auditData?.outletAddress}
          copyable
        />
      ),
    },
    {
      title: 'Auditor',
      component: (
        <>
          {auditData?.auditorName ? (
            <Typography size="Body 1">{auditData.auditorName}</Typography>
          ) : (
            <NoDataFallback />
          )}
        </>
      ),
    },
    {
      title: 'Signed', // todo
      component: <NoDataFallback />,
    },
    {
      title: 'Comments', // todo
      component: <NoDataFallback />,
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView>
        {content.map((i, index) => (
          <React.Fragment key={i.title}>
            <ItemWrapper title={i.title}>{i.component}</ItemWrapper>
            {index !== content.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

export default React.memo(AuditDetailsScreen);

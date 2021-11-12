import React from 'react';
import {useRoute} from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import ItemWrapper from '../../components/ItemWrapper';
import Services from '../../components/Services';
import Typography from '../../components/Typography';
import CompanyAddress from '../../components/CompanyAddress';
import NoDataFallback from '../../components/NoDataFallback';
import {useSelector} from '../../utils/store/configureStore';
import {shallowEqual} from 'react-redux';
import AuditProgress from '../../components/AuditProgress';
import {useTranslation} from 'react-i18next';

interface AuditDetailsParams {
  id: string;
}
function AuditDetailsScreen() {
  const route = useRoute();
  const {id} = route.params as AuditDetailsParams;
  const {services, number, companyId, outletAddress, auditorName} = useSelector(
    state => {
      const s = state.evaluation[id];
      return {
        services: s.services,
        number: s.number,
        companyId: s.companyId,
        outletAddress: s.outletAddress,
        auditorName: s.auditorName,
      };
    },
    shallowEqual,
  );

  const {t} = useTranslation();

  const content: {title: string; component: React.ReactNode}[] = [
    {
      title: t('Progress'),
      component: <AuditProgress surveyId={id} />,
    },
    {title: t('Services'), component: <Services services={services} />},
    {
      title: t('Audit Name'),
      component: <Typography size="Body 1">{number}</Typography>,
    },
    {
      title: t('Location Info'),
      component: (
        <CompanyAddress
          companyId={companyId}
          outletAddress={outletAddress}
          copyable
        />
      ),
    },
    {
      title: t('Auditor'),
      component: (
        <>
          {auditorName ? (
            <Typography size="Body 1">{auditorName}</Typography>
          ) : (
            <NoDataFallback />
          )}
        </>
      ),
    },
    {
      title: t('Signed'), // todo
      component: <NoDataFallback />,
    },
    {
      title: t('Comments'), // todo
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

import React from 'react';
import {ICON_SIZE} from '../../constants/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useModalVisibility from '../../hooks/useModalVisibility';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import {useLanguagesQuery} from '../Survey/surveyService';
import {skipToken} from '@reduxjs/toolkit/query';
import {changeLanguageCd, fillLangList} from './languagesReducer';
import Modal from '../../components/Modal';
import ItemWrapper from '../../components/ItemWrapper';
import {Divider, RadioButton, TextInput, useTheme} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

interface ContentLanguageSwitcherProps {
  iconStyle?: StyleProp<TextStyle>;
}

function ContentLanguageSwitcher({iconStyle}: ContentLanguageSwitcherProps) {
  const {colors} = useTheme();
  const {langList, currentLang} = useSelector(state => ({
    langList: state.dataLanguage.languages,
    currentLang: state.dataLanguage.languageCd,
  }));
  const dispatch = useDispatch();
  const {data} = useLanguagesQuery(langList.length !== 0 ? skipToken : null);
  React.useEffect(() => {
    if (!langList.length && data) {
      dispatch(fillLangList(data));
    }
  }, [data, dispatch, langList.length]);
  const [visible, handleVisible] = useModalVisibility();
  const [v, setV] = React.useState(currentLang);
  const [query, setQuery] = React.useState('');
  const handleCancel = React.useCallback(() => {
    setV(currentLang);
    handleVisible();
  }, [currentLang, handleVisible]);
  const handleSave = React.useCallback(() => {
    dispatch(changeLanguageCd(v));
    handleVisible();
  }, [dispatch, handleVisible, v]);
  const handleQueryChange = React.useCallback(newQ => setQuery(newQ), []);
  const handleRadioChange = React.useCallback(newV => setV(newV), []);
  const list = query.length
    ? langList.filter(i => i.value.toLowerCase().includes(query.toLowerCase()))
    : langList;
  const {t} = useTranslation();
  return (
    <>
      <Icon
        name="translate"
        size={ICON_SIZE}
        onPress={handleVisible}
        style={iconStyle}
      />
      <Modal
        visible={visible}
        onCancel={handleCancel}
        title={t('Content Language')}
        onSave={handleSave}>
        <ItemWrapper paddingValue={[0, 28]} style={styles.wrapper}>
          <TextInput
            left={<TextInput.Icon name="magnify" color={colors.text50} />}
            value={query}
            onChangeText={handleQueryChange}
            placeholder={t('Search for a language')}
          />
        </ItemWrapper>
        <ItemWrapper paddingValue={0} style={styles.wrapper}>
          <ScrollView style={styles.scrollView}>
            <RadioButton.Group value={v} onValueChange={handleRadioChange}>
              {list?.map((i, index) => {
                return (
                  <React.Fragment key={i.key}>
                    <RadioButton.Item
                      value={i.key}
                      key={i.key}
                      label={t(i.value)}
                      style={styles.radio}
                      color={colors.primary}
                    />
                    {index + 1 !== list.length && <Divider />}
                  </React.Fragment>
                );
              })}
            </RadioButton.Group>
          </ScrollView>
        </ItemWrapper>
      </Modal>
    </>
  );
}

export default React.memo(ContentLanguageSwitcher);

const styles = StyleSheet.create({
  wrapper: {paddingLeft: 24, paddingRight: 24},
  scrollView: {maxHeight: 335},
  radio: {width: '100%'},
});

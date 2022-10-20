import {clone, map} from 'lodash';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Divider, RadioButton, Text} from 'react-native-paper';

import {Questionnaire} from '~state/ducks/questions/questions.interface';

import Popup from './Popup';

type QuestionnaireModalProps = {
  questionnaire: Questionnaire | undefined;
  visible: boolean;
  onSubmit: (data: number[]) => void;
};

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  questionnaire,
  onSubmit,
  visible,
}) => {
  const [answers, setAnswers] = useState<string[]>(
    map(questionnaire ? questionnaire.questions : [], () => '2'),
  );
  if (!questionnaire) return null;

  const handleChange = (value: string, idx: number) => {
    const tmp = clone(answers);
    tmp[idx] = value;
    setAnswers(tmp);
  };

  const handleSubmit = () =>
    // eslint-disable-next-line radix
    onSubmit(map(answers, (answer) => parseInt(answer)));

  return (
    <Popup
      title={questionnaire.name}
      visible={visible && questionnaire !== undefined}
      actions={<Button onPress={() => handleSubmit()}>Submit answers</Button>}
      contentContainerStyle={styles.popup}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        {questionnaire.questions.map((item, idx) => (
          <View
            key={item.question}
            style={idx > 0 ? styles.question : undefined}>
            <Text style={styles.questionTitle}>{item.question}</Text>
            <RadioButton.Group
              onValueChange={(value) => handleChange(value, idx)}
              value={answers[idx]}>
              <View style={styles.radioGroup}>
                {Array.from(Array(5).keys()).map((val) => (
                  <View style={styles.radioButton} key={val}>
                    <RadioButton value={val.toString()} />
                  </View>
                ))}
              </View>
              <View style={styles.boundaries}>
                <Text style={styles.boundariesText}>{item.minVal}</Text>
                <Text style={styles.boundariesText}>{item.maxVal}</Text>
              </View>
            </RadioButton.Group>
            {idx < questionnaire.questions.length - 1 && <Divider />}
          </View>
        ))}
      </ScrollView>
    </Popup>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: '90%',
  },
  wrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  question: {
    marginTop: 16,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioButton: {
    marginHorizontal: 8,
  },
  boundaries: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boundariesText: {
    fontSize: 10,
  },
});

export default QuestionnaireModal;
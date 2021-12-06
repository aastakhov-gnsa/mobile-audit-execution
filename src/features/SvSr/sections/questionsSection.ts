import {failedStatuses, passedStatuses} from '../../../interfaces/common';
import {
  AuditStandardExecution,
  Option,
  StandardQuestion,
} from '../../../interfaces/standard';
import {surveyDetails} from '../../../interfaces/survey';
import {grayBackground} from './styles';
import {langMapping} from '../../../constants/languages';
import {localeCode} from '../../../../index';

function getStandardDescription(
  show: boolean,
  question: StandardQuestion,
  showComments: boolean,
) {
  return show
    ? `
<div>
Description: ${
        question.textTranslations[langMapping[localeCode]]
          ? question.textTranslations[langMapping[localeCode]]
          : question.mcDescription
      }
    <div>
    ${
      question.attachedComment && showComments
        ? `Comment: ${question.attachedComment}`
        : ''
    }
    </div>
</div>
`
    : '';
}

export function getQuestionsSection(
  standards: AuditStandardExecution[],
  outletType: string,
  filters: Record<string, boolean>,
) {
  const showDescription = filters[surveyDetails.description];
  const showComments = filters[surveyDetails.publicComments];
  const descriptionBlock = showDescription
    ? (item: AuditStandardExecution) => `
<div>
    Description: ${
      item.textTranslations?.[langMapping[localeCode]]
        ? item.textTranslations?.[langMapping[localeCode]]
        : item.standardText
    }
    <div>
        ${item.infoForAuditor ? `Info for Auditor: ${item.infoForAuditor}` : ''}
    </div>
    <div>
        ${
          item.requiredDocuments
            ? `Additional documents: ${item.requiredDocuments}`
            : ''
        }
    </div>
    <div>
        ${
          Boolean(item.attachedComment) && showComments
            ? `Comment: ${item.attachedComment}`
            : ''
        }
    </div>
    <div>
        ${
          item.overruleComment?.value
            ? `Overrule comment: ${item.overruleComment?.value}`
            : ''
        }
    </div>
</div>
`
    : () => '';

  const rows = standards
    .map(item => {
      const questions = item.questionDTOList
        ?.map((question, index) => {
          return getQuestionRow(question, index, showDescription, showComments);
        })
        .join('');

      return `
<tr style="${grayBackground}">
    <td style="font-weight: 700; vertical-align: top;" width="25%">
        <div>
            ${item.standardNumber}
        </div> 
        <div>
            ${outletType?.substr(0, 1)}
        </div>
    </td>
    <td style="vertical-align: top;">
        <div style="font-weight: 700; ">
            ${
              item.nameTranslations?.[langMapping[localeCode]]
                ? item.nameTranslations?.[langMapping[localeCode]]
                : item.standardName
            } 
        </div>
        ${descriptionBlock(item)}
    </td>
    <td style="font-weight: 400; vertical-align: top;" width="10%">
       ${item.status ?? 'Open'} 
    </td>
</tr>
${questions}
`;
    })
    .join('');
  return `
<table width="100%" style="border-collapse: collapse; margin-top: 16px;">
    <thead>
        <tr>
            <th />
        </tr>
    </thead>
    ${rows}
</table>
`;
}

function getQuestionRow(
  question: StandardQuestion,
  index: number,
  showDescription: boolean,
  showComments: boolean,
) {
  const isArrayQuestion = question.optionsExecution?.length > 0;
  return `
    <tr>
        <td style="text-align: center; vertical-align: top; padding-top: 14px;">
            ${index + 1}
        </td>
        <td style="padding-bottom: 8px; padding-top: 8px;">
            <div style="font-weight: 700">
                ${
                  question.nameTranslations[langMapping[localeCode]]
                    ? question.nameTranslations[langMapping[localeCode]]
                    : question.mcName
                }
            </div>
            ${
              showDescription
                ? getStandardDescription(
                    showDescription,
                    question,
                    showComments,
                  )
                : ''
            }
        </td>
        <td style="padding-bottom: 8px; padding-top: 8px;">
            ${
              isArrayQuestion
                ? ''
                : passedStatuses.includes(question.resultCd as any)
                ? 'Yes'
                : 'No'
            }
        </td>
    </tr>
    ${question.optionsExecution?.map(getQuestionOption).join('')}
`;
}

function getQuestionOption(option: Option, index: number) {
  return `
<tr>
    <td />
    <td style="padding-top: 4px; padding-bottom: 4px">
        <div style="font-weight: 700">
            ${questionOptionsIndexLetters[index]}) ${
    option.valueTranslations?.[langMapping[localeCode]]
      ? option.valueTranslations?.[langMapping[localeCode]]
      : option.value
  }
        </div>
        Description: ${
          option.hintTranslations?.[langMapping[localeCode]]
            ? option.hintTranslations?.[langMapping[localeCode]]
            : option.hint
        }
    </td>
    <td>
        ${
          !option.resultCd || failedStatuses.includes(option.resultCd)
            ? ''
            : 'Yes'
        }
    </td>
</tr>
`;
}

const questionOptionsIndexLetters = (() => {
  const result = [];
  for (let i = 'a'.charCodeAt(0); i < 'z'.charCodeAt(0); i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
})();

import {DaimlerService} from '../interfaces/survey';

/**
 * @return Concatanated labels of service separated by ` : ` ending with \n
 * e.g. `Truck : Mercedes-Benz : After-Sales/Customer Service\n`
 */
export function getServiceLabel(service: DaimlerService) {
  if ((service as any).value) {
    // TODO: remove after https://git.daimler.com/GNSA/gnsa-sm-am/pull/2246
    return (service as any).value;
  }
  return `${service.productGroup} : ${service.brand} : ${service.activity}\n`;
}

const uppercase = /[A-Z]/;

export function getOnlyUpperCase(item?: string) {
  if (!item) {
    return '';
  }
  let result = '';
  for (let i = 0; i < item.length; i++) {
    if (uppercase.test(item[i])) {
      result += item[i];
    }
  }
  return result;
}

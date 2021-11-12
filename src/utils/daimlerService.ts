import { DaimlerService } from "../interfaces/survey";

/**
 * @return Concatanated labels of service separated by ` : ` ending with \n
 * e.g. `Truck : Mercedes-Benz : After-Sales/Customer Service\n`
 */
export function getServiceLabel(service: DaimlerService) {
    return `${service.productGroup} : ${service.brand} : ${service.activity}\n`
}

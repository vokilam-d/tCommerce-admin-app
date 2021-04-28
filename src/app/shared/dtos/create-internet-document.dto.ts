import { ShipmentPayerEnum } from '../enums/shipment-payer.enum';

export class CreateInternetDocumentDto {
  senderId: number;
  trackingNumber: string;
  backwardMoneyDelivery: string;
  cost: number;
  description: string;
  height: string;
  length: string;
  payerType: ShipmentPayerEnum;
  weight: string;
  width: string;
}

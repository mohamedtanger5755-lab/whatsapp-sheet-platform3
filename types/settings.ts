export interface UserSettings {
  userId: string;
  email?: string;
  whatsappNumber: string;
  apiToken: string;       // Ultramsg token أو Instance token
  instanceId: string;     // Ultramsg Instance ID
  sheetUrl: string;
  sellerPhone: string;    // رقم التاجر لاستقبال الإشعارات
  updatedAt: string;
}

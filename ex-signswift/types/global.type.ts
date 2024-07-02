export interface IRecepient {
  id: Number;
  documentId: Number;
  templateId: Number;
  email: string;
  name: string;
  token: string;
  expire: Date;
  signedAt: Date;
  role: string;
  readStatus: string;
  signingStatus: string;
  sendStatus: string;
  signNumber: number;
}
export interface IField {
  id: number;
  documentId: number;
  left: string;
  top: string;
  width: string;
  height: string;
  page: number;
  text: string;
  icon: string;
  recipientId: number;
}

export interface VSCredentialSchema {
  schemaID: string;
  claimLinkExpiration: Date;
  limitedClaims: number;
  signatureProof: boolean;
  mtProof: boolean;
  credentialSubject: CredentialSubject;
}

export interface CredentialSubject {
  studentAddress: number;
  isVerifiedStudent: boolean;
  studentEmail: string;
}

export interface IssueRequest {
  studentEmail: string;
  address: string;
  addressLast15: number;
}

export interface IssueDetails {
  studentEmail: string;
  address: string;
  addressLast15: number;
  qrCodeData: string;
  expirationDate: Date;
}

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

/** Difficulty enum */
export enum Difficulty {
  Difficile = 'difficile',
  Facile = 'facile',
  Moyen = 'moyen'
}

export type EpreuveCreateEntity = {
  description?: InputMaybe<Scalars['String']['input']>;
  easyToDo?: InputMaybe<Scalars['String']['input']>;
  hardToDo?: InputMaybe<Scalars['String']['input']>;
  mediumToDo?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  videoLink?: InputMaybe<Scalars['String']['input']>;
};

export type EpreuveEntity = {
  __typename?: 'EpreuveEntity';
  description?: Maybe<Scalars['String']['output']>;
  easyToDo?: Maybe<Scalars['String']['output']>;
  hardToDo?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ImageEpreuveEntity>>;
  mediumToDo?: Maybe<Scalars['String']['output']>;
  parkours?: Maybe<Array<ParkourEntity>>;
  title: Scalars['String']['output'];
  videoLink?: Maybe<Scalars['String']['output']>;
};

export type EpreuveUpdateEntity = {
  description?: InputMaybe<Scalars['String']['input']>;
  easyToDo?: InputMaybe<Scalars['String']['input']>;
  hardToDo?: InputMaybe<Scalars['String']['input']>;
  mediumToDo?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  videoLink?: InputMaybe<Scalars['String']['input']>;
};

export type ImageEpreuveEntity = {
  __typename?: 'ImageEpreuveEntity';
  id: Scalars['ID']['output'];
  id_epreuve: EpreuveEntity;
  isCouverture: Scalars['Boolean']['output'];
  lien: Scalars['String']['output'];
};

export type ImageParkourEntity = {
  __typename?: 'ImageParkourEntity';
  id: Scalars['ID']['output'];
  id_parkour: ParkourEntity;
  isCouverture: Scalars['Boolean']['output'];
  lien: Scalars['String']['output'];
};

export type JoinUserParkourFavorisEntity = {
  __typename?: 'JoinUserParkourFavorisEntity';
  parkour: ParkourEntity;
  parkour_id: Scalars['ID']['output'];
  user: UserEntity;
  user_id: Scalars['ID']['output'];
};

export type JoinUserParkourNoteCreateEntity = {
  commentaire?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['Float']['input']>;
  parkour_id: Scalars['Float']['input'];
};

export type JoinUserParkourNoteEntity = {
  __typename?: 'JoinUserParkourNoteEntity';
  commentaire?: Maybe<Scalars['String']['output']>;
  note: Scalars['Float']['output'];
  parkour: ParkourEntity;
  parkour_id: Scalars['ID']['output'];
  user: UserEntity;
  user_id: Scalars['ID']['output'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: MessageEntity;
  createEpreuve: EpreuveEntity;
  createJoinUserParkourFavoris: MessageEntity;
  createJoinUserParkourNote: MessageEntity;
  createParkour: ParkourEntity;
  deleteEpreuve: MessageEntity;
  deleteJoinUserParkourFavoris: MessageEntity;
  deleteJoinUserParkourNote: MessageEntity;
  deleteNoteAndAddOneReportValide: MessageEntity;
  deleteNoteAndAddOneReportValideAndCreateReport: MessageEntity;
  deleteParkour: MessageEntity;
  deleteUser: MessageEntity;
  deleteUserByAdmin: MessageEntity;
  inscription: MessageEntity;
  letNote: MessageEntity;
  modifyEpreuve: EpreuveEntity;
  modifyParkour: ParkourEntity;
  modifyUser: MessageEntity;
  reportNote: MessageEntity;
  resetPassword: ResetPasswordEntity;
};


export type MutationChangePasswordArgs = {
  data: ResetPasswordUpdateEntity;
};


export type MutationCreateEpreuveArgs = {
  infos: EpreuveCreateEntity;
};


export type MutationCreateJoinUserParkourFavorisArgs = {
  idParkour: Scalars['Float']['input'];
};


export type MutationCreateJoinUserParkourNoteArgs = {
  infos: JoinUserParkourNoteCreateEntity;
};


export type MutationCreateParkourArgs = {
  infos: ParkourCreateEntity;
};


export type MutationDeleteEpreuveArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteJoinUserParkourFavorisArgs = {
  idParkour: Scalars['Float']['input'];
};


export type MutationDeleteJoinUserParkourNoteArgs = {
  idParkour: Scalars['Float']['input'];
};


export type MutationDeleteNoteAndAddOneReportValideArgs = {
  commentaire: Scalars['String']['input'];
  malfratId: Scalars['String']['input'];
  parkourId: Scalars['Float']['input'];
  reportId: Scalars['Float']['input'];
};


export type MutationDeleteNoteAndAddOneReportValideAndCreateReportArgs = {
  commentaire: Scalars['String']['input'];
  malfratId: Scalars['String']['input'];
  parkourId: Scalars['Float']['input'];
};


export type MutationDeleteParkourArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserByAdminArgs = {
  malfratId: Scalars['String']['input'];
};


export type MutationInscriptionArgs = {
  infos: UserInputRegisterEntity;
};


export type MutationLetNoteArgs = {
  reportId: Scalars['Float']['input'];
};


export type MutationModifyEpreuveArgs = {
  id: Scalars['Float']['input'];
  infos: EpreuveUpdateEntity;
};


export type MutationModifyParkourArgs = {
  id: Scalars['Float']['input'];
  infos: ParkourUpdateEntity;
};


export type MutationModifyUserArgs = {
  infos: UserUpdateEntity;
};


export type MutationReportNoteArgs = {
  commentaire: Scalars['String']['input'];
  malfratId: Scalars['String']['input'];
  parkourId: Scalars['Float']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};

export type ParkourCreateEntity = {
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Difficulty>;
  epreuves?: InputMaybe<Array<Scalars['Int']['input']>>;
  length?: InputMaybe<Scalars['Float']['input']>;
  start: Scalars['String']['input'];
  time?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type ParkourEntity = {
  __typename?: 'ParkourEntity';
  city?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Difficulty>;
  epreuves?: Maybe<Array<EpreuveEntity>>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ImageParkourEntity>>;
  length?: Maybe<Scalars['Float']['output']>;
  nbVote?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['Float']['output']>;
  notesParkours?: Maybe<Array<JoinUserParkourNoteEntity>>;
  start: Scalars['String']['output'];
  time?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
};

export type ParkourUpdateEntity = {
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Difficulty>;
  epreuves?: InputMaybe<Array<Scalars['Int']['input']>>;
  length?: InputMaybe<Scalars['Float']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authentification: MessageEntity;
  checkResetTokenValidity: MessageEntity;
  getAllEpreuve: Array<EpreuveEntity>;
  getAllParkourForMap: Array<ParkourEntity>;
  getAllUserFavByToken: Array<JoinUserParkourFavorisEntity>;
  getAllUserNoteByToken: Array<JoinUserParkourNoteEntity>;
  getEpreuveById: EpreuveEntity;
  getParkourById: ParkourEntity;
  getReportsBySearch: Array<ReportEntity>;
  getTheParkourTotalForSearch: Scalars['Float']['output'];
  getTop20EpreuveByTitle: Array<EpreuveEntity>;
  getTop20ParkourBySearch: Array<ParkourEntity>;
  getTop20ParkourByTitle: Array<ParkourEntity>;
  getUserByIdForPageReport: UserEntity;
  getUserByToken: UserEntity;
  getUserFavByTokenAndParkourId: Scalars['Boolean']['output'];
  getUserNoteByTokenAndParkourId: JoinUserParkourNoteEntity;
  getUsersWithReports: Array<UserEntity>;
  isAdmin: Scalars['Boolean']['output'];
  isClient: Scalars['Boolean']['output'];
  logout: MessageEntity;
};


export type QueryAuthentificationArgs = {
  infos: UserInputAuthEntity;
};


export type QueryCheckResetTokenValidityArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetEpreuveByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetParkourByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetReportsBySearchArgs = {
  status: Scalars['String']['input'];
};


export type QueryGetTheParkourTotalForSearchArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  lengthMax?: InputMaybe<Scalars['Float']['input']>;
  lengthMin?: InputMaybe<Scalars['Float']['input']>;
  noteMin?: InputMaybe<Scalars['Float']['input']>;
  timeMax?: InputMaybe<Scalars['Float']['input']>;
  timeMin?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetTop20EpreuveByTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTop20ParkourBySearchArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  lengthMax?: InputMaybe<Scalars['Float']['input']>;
  lengthMin?: InputMaybe<Scalars['Float']['input']>;
  noteMin?: InputMaybe<Scalars['Float']['input']>;
  startPage: Scalars['Float']['input'];
  timeMax?: InputMaybe<Scalars['Float']['input']>;
  timeMin?: InputMaybe<Scalars['Float']['input']>;
  triParField: Scalars['String']['input'];
  triParSort: Scalars['String']['input'];
};


export type QueryGetTop20ParkourByTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserByIdForPageReportArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserFavByTokenAndParkourIdArgs = {
  parkourId: Scalars['Float']['input'];
};


export type QueryGetUserNoteByTokenAndParkourIdArgs = {
  parkourId: Scalars['Float']['input'];
};

export type ReportEntity = {
  __typename?: 'ReportEntity';
  commentaireEnFaute: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  malfrat?: Maybe<UserEntity>;
  malfrat_id?: Maybe<Scalars['String']['output']>;
  parkour?: Maybe<ParkourEntity>;
  parkour_id?: Maybe<Scalars['Float']['output']>;
  reporter?: Maybe<UserEntity>;
  reporter_id?: Maybe<Scalars['String']['output']>;
  status: ReportStatus;
};

/** ReportStatus enum */
export enum ReportStatus {
  NonVu = 'NON_VU',
  Supprime = 'SUPPRIME'
}

export type ResetPasswordEntity = {
  __typename?: 'ResetPasswordEntity';
  expirationDate: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  resetToken: Scalars['String']['output'];
  user: UserEntity;
};

export type ResetPasswordUpdateEntity = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

/** Role enum */
export enum Role {
  Admin = 'ADMIN',
  Client = 'CLIENT'
}

export type UserEntity = {
  __typename?: 'UserEntity';
  city?: Maybe<Scalars['String']['output']>;
  codePostal?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  favorisParkours?: Maybe<Array<JoinUserParkourFavorisEntity>>;
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nbReportAjoute?: Maybe<Scalars['Float']['output']>;
  nbReportValide?: Maybe<Scalars['Float']['output']>;
  notesParkours?: Maybe<Array<JoinUserParkourNoteEntity>>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  reports?: Maybe<Array<ReportEntity>>;
  role: Role;
};

export type UserInputAuthEntity = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserInputRegisterEntity = {
  city?: InputMaybe<Scalars['String']['input']>;
  codePostal?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateEntity = {
  city?: InputMaybe<Scalars['String']['input']>;
  codePostal?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type InscriptionMutationVariables = Exact<{
  infos: UserInputRegisterEntity;
}>;


export type InscriptionMutation = { __typename?: 'Mutation', inscription: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type CreateEpreuveMutationVariables = Exact<{
  infos: EpreuveCreateEntity;
}>;


export type CreateEpreuveMutation = { __typename?: 'Mutation', createEpreuve: { __typename?: 'EpreuveEntity', id: string, title: string } };

export type ModifyEpreuveMutationVariables = Exact<{
  infos: EpreuveUpdateEntity;
  modifyEpreuveId: Scalars['Float']['input'];
}>;


export type ModifyEpreuveMutation = { __typename?: 'Mutation', modifyEpreuve: { __typename?: 'EpreuveEntity', id: string, title: string } };

export type DeleteEpreuveMutationVariables = Exact<{
  deleteEpreuveId: Scalars['Float']['input'];
}>;


export type DeleteEpreuveMutation = { __typename?: 'Mutation', deleteEpreuve: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type CreateJoinUserParkourFavorisMutationVariables = Exact<{
  idParkour: Scalars['Float']['input'];
}>;


export type CreateJoinUserParkourFavorisMutation = { __typename?: 'Mutation', createJoinUserParkourFavoris: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type DeleteJoinUserParkourFavorisMutationVariables = Exact<{
  idParkour: Scalars['Float']['input'];
}>;


export type DeleteJoinUserParkourFavorisMutation = { __typename?: 'Mutation', deleteJoinUserParkourFavoris: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type CreateJoinUserParkourNoteMutationVariables = Exact<{
  infos: JoinUserParkourNoteCreateEntity;
}>;


export type CreateJoinUserParkourNoteMutation = { __typename?: 'Mutation', createJoinUserParkourNote: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type DeleteJoinUserParkourNoteMutationVariables = Exact<{
  idParkour: Scalars['Float']['input'];
}>;


export type DeleteJoinUserParkourNoteMutation = { __typename?: 'Mutation', deleteJoinUserParkourNote: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type CreateParkourMutationVariables = Exact<{
  infos: ParkourCreateEntity;
}>;


export type CreateParkourMutation = { __typename?: 'Mutation', createParkour: { __typename?: 'ParkourEntity', id: string, title: string } };

export type ModifyParkourMutationVariables = Exact<{
  infos: ParkourUpdateEntity;
  modifyParkourId: Scalars['Float']['input'];
}>;


export type ModifyParkourMutation = { __typename?: 'Mutation', modifyParkour: { __typename?: 'ParkourEntity', id: string, title: string } };

export type DeleteParkourMutationVariables = Exact<{
  deleteParkourId: Scalars['Float']['input'];
}>;


export type DeleteParkourMutation = { __typename?: 'Mutation', deleteParkour: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type ReportNoteMutationVariables = Exact<{
  malfratId: Scalars['String']['input'];
  parkourId: Scalars['Float']['input'];
  commentaire: Scalars['String']['input'];
}>;


export type ReportNoteMutation = { __typename?: 'Mutation', reportNote: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type LetNoteMutationVariables = Exact<{
  reportId: Scalars['Float']['input'];
}>;


export type LetNoteMutation = { __typename?: 'Mutation', letNote: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type DeleteNoteAndAddOneReportValideMutationVariables = Exact<{
  commentaire: Scalars['String']['input'];
  reportId: Scalars['Float']['input'];
  parkourId: Scalars['Float']['input'];
  malfratId: Scalars['String']['input'];
}>;


export type DeleteNoteAndAddOneReportValideMutation = { __typename?: 'Mutation', deleteNoteAndAddOneReportValide: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type DeleteNoteAndAddOneReportValideAndCreateReportMutationVariables = Exact<{
  commentaire: Scalars['String']['input'];
  malfratId: Scalars['String']['input'];
  parkourId: Scalars['Float']['input'];
}>;


export type DeleteNoteAndAddOneReportValideAndCreateReportMutation = { __typename?: 'Mutation', deleteNoteAndAddOneReportValideAndCreateReport: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type DeleteUserByAdminMutationVariables = Exact<{
  malfratId: Scalars['String']['input'];
}>;


export type DeleteUserByAdminMutation = { __typename?: 'Mutation', deleteUserByAdmin: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordEntity', id: string, resetToken: string, expirationDate: any } };

export type ChangePasswordMutationVariables = Exact<{
  data: ResetPasswordUpdateEntity;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type ModifyUserMutationVariables = Exact<{
  infos: UserUpdateEntity;
}>;


export type ModifyUserMutation = { __typename?: 'Mutation', modifyUser: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type AuthentificationQueryVariables = Exact<{
  infos: UserInputAuthEntity;
}>;


export type AuthentificationQuery = { __typename?: 'Query', authentification: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type GetEpreuveByIdQueryVariables = Exact<{
  getEpreuveByIdId: Scalars['Float']['input'];
}>;


export type GetEpreuveByIdQuery = { __typename?: 'Query', getEpreuveById: { __typename?: 'EpreuveEntity', id: string, title: string, description?: string | null, easyToDo?: string | null, mediumToDo?: string | null, hardToDo?: string | null, videoLink?: string | null, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien: string, isCouverture: boolean }> | null } };

export type GetAllEpreuveQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEpreuveQuery = { __typename?: 'Query', getAllEpreuve: Array<{ __typename?: 'EpreuveEntity', id: string, title: string, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien: string }> | null }> };

export type GetTop20EpreuveByTitleQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTop20EpreuveByTitleQuery = { __typename?: 'Query', getTop20EpreuveByTitle: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> };

export type GetUserFavByTokenAndParkourIdQueryVariables = Exact<{
  parkourId: Scalars['Float']['input'];
}>;


export type GetUserFavByTokenAndParkourIdQuery = { __typename?: 'Query', getUserFavByTokenAndParkourId: boolean };

export type GetAllUserFavByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserFavByTokenQuery = { __typename?: 'Query', getAllUserFavByToken: Array<{ __typename?: 'JoinUserParkourFavorisEntity', parkour: { __typename?: 'ParkourEntity', id: string, title: string, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien: string }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } }> };

export type GetUserNoteByTokenAndParkourIdQueryVariables = Exact<{
  parkourId: Scalars['Float']['input'];
}>;


export type GetUserNoteByTokenAndParkourIdQuery = { __typename?: 'Query', getUserNoteByTokenAndParkourId: { __typename?: 'JoinUserParkourNoteEntity', note: number, commentaire?: string | null } };

export type GetAllUserNoteByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserNoteByTokenQuery = { __typename?: 'Query', getAllUserNoteByToken: Array<{ __typename?: 'JoinUserParkourNoteEntity', note: number, commentaire?: string | null, parkour: { __typename?: 'ParkourEntity', id: string, title: string, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien: string }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } }> };

export type GetParkourByIdQueryVariables = Exact<{
  getParkourByIdId: Scalars['Float']['input'];
}>;


export type GetParkourByIdQuery = { __typename?: 'Query', getParkourById: { __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien: string, isCouverture: boolean }> | null, notesParkours?: Array<{ __typename?: 'JoinUserParkourNoteEntity', note: number, commentaire?: string | null, user: { __typename?: 'UserEntity', id: string, name: string, firstname: string } }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien: string, isCouverture: boolean }> | null }> | null } };

export type GetAllParkourForMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParkourForMapQuery = { __typename?: 'Query', getAllParkourForMap: Array<{ __typename?: 'ParkourEntity', id: string, title: string, start: string }> };

export type GetListTop20ParkourByTitleQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListTop20ParkourByTitleQuery = { __typename?: 'Query', getTop20ParkourByTitle: Array<{ __typename?: 'ParkourEntity', id: string, title: string }> };

export type GetTop20ParkourBySearchQueryVariables = Exact<{
  triParField: Scalars['String']['input'];
  triParSort: Scalars['String']['input'];
  startPage: Scalars['Float']['input'];
  noteMin?: InputMaybe<Scalars['Float']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  lengthMax?: InputMaybe<Scalars['Float']['input']>;
  lengthMin?: InputMaybe<Scalars['Float']['input']>;
  timeMax?: InputMaybe<Scalars['Float']['input']>;
  timeMin?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTop20ParkourBySearchQuery = { __typename?: 'Query', getTop20ParkourBySearch: Array<{ __typename?: 'ParkourEntity', id: string, title: string, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien: string }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string }> | null }> };

export type GetTheParkourTotalForSearchQueryVariables = Exact<{
  noteMin?: InputMaybe<Scalars['Float']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  lengthMax?: InputMaybe<Scalars['Float']['input']>;
  lengthMin?: InputMaybe<Scalars['Float']['input']>;
  timeMax?: InputMaybe<Scalars['Float']['input']>;
  timeMin?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTheParkourTotalForSearchQuery = { __typename?: 'Query', getTheParkourTotalForSearch: number };

export type GetUserByIdForPageReportQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserByIdForPageReportQuery = { __typename?: 'Query', getUserByIdForPageReport: { __typename?: 'UserEntity', id: string, name: string, firstname: string, email: string, nbReportValide?: number | null, nbReportAjoute?: number | null, notesParkours?: Array<{ __typename?: 'JoinUserParkourNoteEntity', commentaire?: string | null, parkour: { __typename?: 'ParkourEntity', id: string, title: string } }> | null, reports?: Array<{ __typename?: 'ReportEntity', id: string, commentaireEnFaute: string, createdAt: any, status: ReportStatus, parkour?: { __typename?: 'ParkourEntity', id: string, title: string } | null, reporter?: { __typename?: 'UserEntity', id: string, name: string, firstname: string, nbReportAjoute?: number | null } | null }> | null } };

export type GetReportsBySearchQueryVariables = Exact<{
  status: Scalars['String']['input'];
}>;


export type GetReportsBySearchQuery = { __typename?: 'Query', getReportsBySearch: Array<{ __typename?: 'ReportEntity', id: string, commentaireEnFaute: string, createdAt: any, status: ReportStatus, reporter?: { __typename?: 'UserEntity', id: string, name: string, firstname: string, nbReportAjoute?: number | null } | null, malfrat?: { __typename?: 'UserEntity', id: string, name: string, firstname: string, nbReportValide?: number | null } | null, parkour?: { __typename?: 'ParkourEntity', id: string, title: string } | null }> };

export type GetUsersWithReportsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWithReportsQuery = { __typename?: 'Query', getUsersWithReports: Array<{ __typename?: 'UserEntity', id: string, name: string, firstname: string, nbReportValide?: number | null, nbReportAjoute?: number | null }> };

export type CheckResetTokenValidityQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type CheckResetTokenValidityQuery = { __typename?: 'Query', checkResetTokenValidity: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type GetUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByTokenQuery = { __typename?: 'Query', getUserByToken: { __typename?: 'UserEntity', id: string, name: string, firstname: string, email: string, city?: string | null, codePostal?: string | null, phone?: string | null } };

export type IsAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAdminQuery = { __typename?: 'Query', isAdmin: boolean };

export type IsClientQueryVariables = Exact<{ [key: string]: never; }>;


export type IsClientQuery = { __typename?: 'Query', isClient: boolean };


export const InscriptionDocument = gql`
    mutation Inscription($infos: UserInputRegisterEntity!) {
  inscription(infos: $infos) {
    message
    success
  }
}
    `;
export type InscriptionMutationFn = Apollo.MutationFunction<InscriptionMutation, InscriptionMutationVariables>;

/**
 * __useInscriptionMutation__
 *
 * To run a mutation, you first call `useInscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inscriptionMutation, { data, loading, error }] = useInscriptionMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useInscriptionMutation(baseOptions?: Apollo.MutationHookOptions<InscriptionMutation, InscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InscriptionMutation, InscriptionMutationVariables>(InscriptionDocument, options);
      }
export type InscriptionMutationHookResult = ReturnType<typeof useInscriptionMutation>;
export type InscriptionMutationResult = Apollo.MutationResult<InscriptionMutation>;
export type InscriptionMutationOptions = Apollo.BaseMutationOptions<InscriptionMutation, InscriptionMutationVariables>;
export const CreateEpreuveDocument = gql`
    mutation CreateEpreuve($infos: EpreuveCreateEntity!) {
  createEpreuve(infos: $infos) {
    id
    title
  }
}
    `;
export type CreateEpreuveMutationFn = Apollo.MutationFunction<CreateEpreuveMutation, CreateEpreuveMutationVariables>;

/**
 * __useCreateEpreuveMutation__
 *
 * To run a mutation, you first call `useCreateEpreuveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEpreuveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEpreuveMutation, { data, loading, error }] = useCreateEpreuveMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateEpreuveMutation(baseOptions?: Apollo.MutationHookOptions<CreateEpreuveMutation, CreateEpreuveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEpreuveMutation, CreateEpreuveMutationVariables>(CreateEpreuveDocument, options);
      }
export type CreateEpreuveMutationHookResult = ReturnType<typeof useCreateEpreuveMutation>;
export type CreateEpreuveMutationResult = Apollo.MutationResult<CreateEpreuveMutation>;
export type CreateEpreuveMutationOptions = Apollo.BaseMutationOptions<CreateEpreuveMutation, CreateEpreuveMutationVariables>;
export const ModifyEpreuveDocument = gql`
    mutation ModifyEpreuve($infos: EpreuveUpdateEntity!, $modifyEpreuveId: Float!) {
  modifyEpreuve(infos: $infos, id: $modifyEpreuveId) {
    id
    title
  }
}
    `;
export type ModifyEpreuveMutationFn = Apollo.MutationFunction<ModifyEpreuveMutation, ModifyEpreuveMutationVariables>;

/**
 * __useModifyEpreuveMutation__
 *
 * To run a mutation, you first call `useModifyEpreuveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyEpreuveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyEpreuveMutation, { data, loading, error }] = useModifyEpreuveMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *      modifyEpreuveId: // value for 'modifyEpreuveId'
 *   },
 * });
 */
export function useModifyEpreuveMutation(baseOptions?: Apollo.MutationHookOptions<ModifyEpreuveMutation, ModifyEpreuveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyEpreuveMutation, ModifyEpreuveMutationVariables>(ModifyEpreuveDocument, options);
      }
export type ModifyEpreuveMutationHookResult = ReturnType<typeof useModifyEpreuveMutation>;
export type ModifyEpreuveMutationResult = Apollo.MutationResult<ModifyEpreuveMutation>;
export type ModifyEpreuveMutationOptions = Apollo.BaseMutationOptions<ModifyEpreuveMutation, ModifyEpreuveMutationVariables>;
export const DeleteEpreuveDocument = gql`
    mutation DeleteEpreuve($deleteEpreuveId: Float!) {
  deleteEpreuve(id: $deleteEpreuveId) {
    message
    success
  }
}
    `;
export type DeleteEpreuveMutationFn = Apollo.MutationFunction<DeleteEpreuveMutation, DeleteEpreuveMutationVariables>;

/**
 * __useDeleteEpreuveMutation__
 *
 * To run a mutation, you first call `useDeleteEpreuveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEpreuveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEpreuveMutation, { data, loading, error }] = useDeleteEpreuveMutation({
 *   variables: {
 *      deleteEpreuveId: // value for 'deleteEpreuveId'
 *   },
 * });
 */
export function useDeleteEpreuveMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEpreuveMutation, DeleteEpreuveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEpreuveMutation, DeleteEpreuveMutationVariables>(DeleteEpreuveDocument, options);
      }
export type DeleteEpreuveMutationHookResult = ReturnType<typeof useDeleteEpreuveMutation>;
export type DeleteEpreuveMutationResult = Apollo.MutationResult<DeleteEpreuveMutation>;
export type DeleteEpreuveMutationOptions = Apollo.BaseMutationOptions<DeleteEpreuveMutation, DeleteEpreuveMutationVariables>;
export const CreateJoinUserParkourFavorisDocument = gql`
    mutation CreateJoinUserParkourFavoris($idParkour: Float!) {
  createJoinUserParkourFavoris(idParkour: $idParkour) {
    message
    success
  }
}
    `;
export type CreateJoinUserParkourFavorisMutationFn = Apollo.MutationFunction<CreateJoinUserParkourFavorisMutation, CreateJoinUserParkourFavorisMutationVariables>;

/**
 * __useCreateJoinUserParkourFavorisMutation__
 *
 * To run a mutation, you first call `useCreateJoinUserParkourFavorisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJoinUserParkourFavorisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJoinUserParkourFavorisMutation, { data, loading, error }] = useCreateJoinUserParkourFavorisMutation({
 *   variables: {
 *      idParkour: // value for 'idParkour'
 *   },
 * });
 */
export function useCreateJoinUserParkourFavorisMutation(baseOptions?: Apollo.MutationHookOptions<CreateJoinUserParkourFavorisMutation, CreateJoinUserParkourFavorisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJoinUserParkourFavorisMutation, CreateJoinUserParkourFavorisMutationVariables>(CreateJoinUserParkourFavorisDocument, options);
      }
export type CreateJoinUserParkourFavorisMutationHookResult = ReturnType<typeof useCreateJoinUserParkourFavorisMutation>;
export type CreateJoinUserParkourFavorisMutationResult = Apollo.MutationResult<CreateJoinUserParkourFavorisMutation>;
export type CreateJoinUserParkourFavorisMutationOptions = Apollo.BaseMutationOptions<CreateJoinUserParkourFavorisMutation, CreateJoinUserParkourFavorisMutationVariables>;
export const DeleteJoinUserParkourFavorisDocument = gql`
    mutation DeleteJoinUserParkourFavoris($idParkour: Float!) {
  deleteJoinUserParkourFavoris(idParkour: $idParkour) {
    message
    success
  }
}
    `;
export type DeleteJoinUserParkourFavorisMutationFn = Apollo.MutationFunction<DeleteJoinUserParkourFavorisMutation, DeleteJoinUserParkourFavorisMutationVariables>;

/**
 * __useDeleteJoinUserParkourFavorisMutation__
 *
 * To run a mutation, you first call `useDeleteJoinUserParkourFavorisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJoinUserParkourFavorisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJoinUserParkourFavorisMutation, { data, loading, error }] = useDeleteJoinUserParkourFavorisMutation({
 *   variables: {
 *      idParkour: // value for 'idParkour'
 *   },
 * });
 */
export function useDeleteJoinUserParkourFavorisMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJoinUserParkourFavorisMutation, DeleteJoinUserParkourFavorisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJoinUserParkourFavorisMutation, DeleteJoinUserParkourFavorisMutationVariables>(DeleteJoinUserParkourFavorisDocument, options);
      }
export type DeleteJoinUserParkourFavorisMutationHookResult = ReturnType<typeof useDeleteJoinUserParkourFavorisMutation>;
export type DeleteJoinUserParkourFavorisMutationResult = Apollo.MutationResult<DeleteJoinUserParkourFavorisMutation>;
export type DeleteJoinUserParkourFavorisMutationOptions = Apollo.BaseMutationOptions<DeleteJoinUserParkourFavorisMutation, DeleteJoinUserParkourFavorisMutationVariables>;
export const CreateJoinUserParkourNoteDocument = gql`
    mutation CreateJoinUserParkourNote($infos: JoinUserParkourNoteCreateEntity!) {
  createJoinUserParkourNote(infos: $infos) {
    message
    success
  }
}
    `;
export type CreateJoinUserParkourNoteMutationFn = Apollo.MutationFunction<CreateJoinUserParkourNoteMutation, CreateJoinUserParkourNoteMutationVariables>;

/**
 * __useCreateJoinUserParkourNoteMutation__
 *
 * To run a mutation, you first call `useCreateJoinUserParkourNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJoinUserParkourNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJoinUserParkourNoteMutation, { data, loading, error }] = useCreateJoinUserParkourNoteMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateJoinUserParkourNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateJoinUserParkourNoteMutation, CreateJoinUserParkourNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJoinUserParkourNoteMutation, CreateJoinUserParkourNoteMutationVariables>(CreateJoinUserParkourNoteDocument, options);
      }
export type CreateJoinUserParkourNoteMutationHookResult = ReturnType<typeof useCreateJoinUserParkourNoteMutation>;
export type CreateJoinUserParkourNoteMutationResult = Apollo.MutationResult<CreateJoinUserParkourNoteMutation>;
export type CreateJoinUserParkourNoteMutationOptions = Apollo.BaseMutationOptions<CreateJoinUserParkourNoteMutation, CreateJoinUserParkourNoteMutationVariables>;
export const DeleteJoinUserParkourNoteDocument = gql`
    mutation DeleteJoinUserParkourNote($idParkour: Float!) {
  deleteJoinUserParkourNote(idParkour: $idParkour) {
    message
    success
  }
}
    `;
export type DeleteJoinUserParkourNoteMutationFn = Apollo.MutationFunction<DeleteJoinUserParkourNoteMutation, DeleteJoinUserParkourNoteMutationVariables>;

/**
 * __useDeleteJoinUserParkourNoteMutation__
 *
 * To run a mutation, you first call `useDeleteJoinUserParkourNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJoinUserParkourNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJoinUserParkourNoteMutation, { data, loading, error }] = useDeleteJoinUserParkourNoteMutation({
 *   variables: {
 *      idParkour: // value for 'idParkour'
 *   },
 * });
 */
export function useDeleteJoinUserParkourNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJoinUserParkourNoteMutation, DeleteJoinUserParkourNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJoinUserParkourNoteMutation, DeleteJoinUserParkourNoteMutationVariables>(DeleteJoinUserParkourNoteDocument, options);
      }
export type DeleteJoinUserParkourNoteMutationHookResult = ReturnType<typeof useDeleteJoinUserParkourNoteMutation>;
export type DeleteJoinUserParkourNoteMutationResult = Apollo.MutationResult<DeleteJoinUserParkourNoteMutation>;
export type DeleteJoinUserParkourNoteMutationOptions = Apollo.BaseMutationOptions<DeleteJoinUserParkourNoteMutation, DeleteJoinUserParkourNoteMutationVariables>;
export const CreateParkourDocument = gql`
    mutation CreateParkour($infos: ParkourCreateEntity!) {
  createParkour(infos: $infos) {
    id
    title
  }
}
    `;
export type CreateParkourMutationFn = Apollo.MutationFunction<CreateParkourMutation, CreateParkourMutationVariables>;

/**
 * __useCreateParkourMutation__
 *
 * To run a mutation, you first call `useCreateParkourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParkourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParkourMutation, { data, loading, error }] = useCreateParkourMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateParkourMutation(baseOptions?: Apollo.MutationHookOptions<CreateParkourMutation, CreateParkourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateParkourMutation, CreateParkourMutationVariables>(CreateParkourDocument, options);
      }
export type CreateParkourMutationHookResult = ReturnType<typeof useCreateParkourMutation>;
export type CreateParkourMutationResult = Apollo.MutationResult<CreateParkourMutation>;
export type CreateParkourMutationOptions = Apollo.BaseMutationOptions<CreateParkourMutation, CreateParkourMutationVariables>;
export const ModifyParkourDocument = gql`
    mutation ModifyParkour($infos: ParkourUpdateEntity!, $modifyParkourId: Float!) {
  modifyParkour(infos: $infos, id: $modifyParkourId) {
    id
    title
  }
}
    `;
export type ModifyParkourMutationFn = Apollo.MutationFunction<ModifyParkourMutation, ModifyParkourMutationVariables>;

/**
 * __useModifyParkourMutation__
 *
 * To run a mutation, you first call `useModifyParkourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyParkourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyParkourMutation, { data, loading, error }] = useModifyParkourMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *      modifyParkourId: // value for 'modifyParkourId'
 *   },
 * });
 */
export function useModifyParkourMutation(baseOptions?: Apollo.MutationHookOptions<ModifyParkourMutation, ModifyParkourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyParkourMutation, ModifyParkourMutationVariables>(ModifyParkourDocument, options);
      }
export type ModifyParkourMutationHookResult = ReturnType<typeof useModifyParkourMutation>;
export type ModifyParkourMutationResult = Apollo.MutationResult<ModifyParkourMutation>;
export type ModifyParkourMutationOptions = Apollo.BaseMutationOptions<ModifyParkourMutation, ModifyParkourMutationVariables>;
export const DeleteParkourDocument = gql`
    mutation DeleteParkour($deleteParkourId: Float!) {
  deleteParkour(id: $deleteParkourId) {
    message
    success
  }
}
    `;
export type DeleteParkourMutationFn = Apollo.MutationFunction<DeleteParkourMutation, DeleteParkourMutationVariables>;

/**
 * __useDeleteParkourMutation__
 *
 * To run a mutation, you first call `useDeleteParkourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteParkourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteParkourMutation, { data, loading, error }] = useDeleteParkourMutation({
 *   variables: {
 *      deleteParkourId: // value for 'deleteParkourId'
 *   },
 * });
 */
export function useDeleteParkourMutation(baseOptions?: Apollo.MutationHookOptions<DeleteParkourMutation, DeleteParkourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteParkourMutation, DeleteParkourMutationVariables>(DeleteParkourDocument, options);
      }
export type DeleteParkourMutationHookResult = ReturnType<typeof useDeleteParkourMutation>;
export type DeleteParkourMutationResult = Apollo.MutationResult<DeleteParkourMutation>;
export type DeleteParkourMutationOptions = Apollo.BaseMutationOptions<DeleteParkourMutation, DeleteParkourMutationVariables>;
export const ReportNoteDocument = gql`
    mutation ReportNote($malfratId: String!, $parkourId: Float!, $commentaire: String!) {
  reportNote(
    malfratId: $malfratId
    parkourId: $parkourId
    commentaire: $commentaire
  ) {
    message
    success
  }
}
    `;
export type ReportNoteMutationFn = Apollo.MutationFunction<ReportNoteMutation, ReportNoteMutationVariables>;

/**
 * __useReportNoteMutation__
 *
 * To run a mutation, you first call `useReportNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportNoteMutation, { data, loading, error }] = useReportNoteMutation({
 *   variables: {
 *      malfratId: // value for 'malfratId'
 *      parkourId: // value for 'parkourId'
 *      commentaire: // value for 'commentaire'
 *   },
 * });
 */
export function useReportNoteMutation(baseOptions?: Apollo.MutationHookOptions<ReportNoteMutation, ReportNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportNoteMutation, ReportNoteMutationVariables>(ReportNoteDocument, options);
      }
export type ReportNoteMutationHookResult = ReturnType<typeof useReportNoteMutation>;
export type ReportNoteMutationResult = Apollo.MutationResult<ReportNoteMutation>;
export type ReportNoteMutationOptions = Apollo.BaseMutationOptions<ReportNoteMutation, ReportNoteMutationVariables>;
export const LetNoteDocument = gql`
    mutation LetNote($reportId: Float!) {
  letNote(reportId: $reportId) {
    message
    success
  }
}
    `;
export type LetNoteMutationFn = Apollo.MutationFunction<LetNoteMutation, LetNoteMutationVariables>;

/**
 * __useLetNoteMutation__
 *
 * To run a mutation, you first call `useLetNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLetNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [letNoteMutation, { data, loading, error }] = useLetNoteMutation({
 *   variables: {
 *      reportId: // value for 'reportId'
 *   },
 * });
 */
export function useLetNoteMutation(baseOptions?: Apollo.MutationHookOptions<LetNoteMutation, LetNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LetNoteMutation, LetNoteMutationVariables>(LetNoteDocument, options);
      }
export type LetNoteMutationHookResult = ReturnType<typeof useLetNoteMutation>;
export type LetNoteMutationResult = Apollo.MutationResult<LetNoteMutation>;
export type LetNoteMutationOptions = Apollo.BaseMutationOptions<LetNoteMutation, LetNoteMutationVariables>;
export const DeleteNoteAndAddOneReportValideDocument = gql`
    mutation DeleteNoteAndAddOneReportValide($commentaire: String!, $reportId: Float!, $parkourId: Float!, $malfratId: String!) {
  deleteNoteAndAddOneReportValide(
    commentaire: $commentaire
    reportId: $reportId
    parkourId: $parkourId
    malfratId: $malfratId
  ) {
    message
    success
  }
}
    `;
export type DeleteNoteAndAddOneReportValideMutationFn = Apollo.MutationFunction<DeleteNoteAndAddOneReportValideMutation, DeleteNoteAndAddOneReportValideMutationVariables>;

/**
 * __useDeleteNoteAndAddOneReportValideMutation__
 *
 * To run a mutation, you first call `useDeleteNoteAndAddOneReportValideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteAndAddOneReportValideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteAndAddOneReportValideMutation, { data, loading, error }] = useDeleteNoteAndAddOneReportValideMutation({
 *   variables: {
 *      commentaire: // value for 'commentaire'
 *      reportId: // value for 'reportId'
 *      parkourId: // value for 'parkourId'
 *      malfratId: // value for 'malfratId'
 *   },
 * });
 */
export function useDeleteNoteAndAddOneReportValideMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteAndAddOneReportValideMutation, DeleteNoteAndAddOneReportValideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteAndAddOneReportValideMutation, DeleteNoteAndAddOneReportValideMutationVariables>(DeleteNoteAndAddOneReportValideDocument, options);
      }
export type DeleteNoteAndAddOneReportValideMutationHookResult = ReturnType<typeof useDeleteNoteAndAddOneReportValideMutation>;
export type DeleteNoteAndAddOneReportValideMutationResult = Apollo.MutationResult<DeleteNoteAndAddOneReportValideMutation>;
export type DeleteNoteAndAddOneReportValideMutationOptions = Apollo.BaseMutationOptions<DeleteNoteAndAddOneReportValideMutation, DeleteNoteAndAddOneReportValideMutationVariables>;
export const DeleteNoteAndAddOneReportValideAndCreateReportDocument = gql`
    mutation DeleteNoteAndAddOneReportValideAndCreateReport($commentaire: String!, $malfratId: String!, $parkourId: Float!) {
  deleteNoteAndAddOneReportValideAndCreateReport(
    commentaire: $commentaire
    malfratId: $malfratId
    parkourId: $parkourId
  ) {
    message
    success
  }
}
    `;
export type DeleteNoteAndAddOneReportValideAndCreateReportMutationFn = Apollo.MutationFunction<DeleteNoteAndAddOneReportValideAndCreateReportMutation, DeleteNoteAndAddOneReportValideAndCreateReportMutationVariables>;

/**
 * __useDeleteNoteAndAddOneReportValideAndCreateReportMutation__
 *
 * To run a mutation, you first call `useDeleteNoteAndAddOneReportValideAndCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteAndAddOneReportValideAndCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteAndAddOneReportValideAndCreateReportMutation, { data, loading, error }] = useDeleteNoteAndAddOneReportValideAndCreateReportMutation({
 *   variables: {
 *      commentaire: // value for 'commentaire'
 *      malfratId: // value for 'malfratId'
 *      parkourId: // value for 'parkourId'
 *   },
 * });
 */
export function useDeleteNoteAndAddOneReportValideAndCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteAndAddOneReportValideAndCreateReportMutation, DeleteNoteAndAddOneReportValideAndCreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteAndAddOneReportValideAndCreateReportMutation, DeleteNoteAndAddOneReportValideAndCreateReportMutationVariables>(DeleteNoteAndAddOneReportValideAndCreateReportDocument, options);
      }
export type DeleteNoteAndAddOneReportValideAndCreateReportMutationHookResult = ReturnType<typeof useDeleteNoteAndAddOneReportValideAndCreateReportMutation>;
export type DeleteNoteAndAddOneReportValideAndCreateReportMutationResult = Apollo.MutationResult<DeleteNoteAndAddOneReportValideAndCreateReportMutation>;
export type DeleteNoteAndAddOneReportValideAndCreateReportMutationOptions = Apollo.BaseMutationOptions<DeleteNoteAndAddOneReportValideAndCreateReportMutation, DeleteNoteAndAddOneReportValideAndCreateReportMutationVariables>;
export const DeleteUserByAdminDocument = gql`
    mutation DeleteUserByAdmin($malfratId: String!) {
  deleteUserByAdmin(malfratId: $malfratId) {
    message
    success
  }
}
    `;
export type DeleteUserByAdminMutationFn = Apollo.MutationFunction<DeleteUserByAdminMutation, DeleteUserByAdminMutationVariables>;

/**
 * __useDeleteUserByAdminMutation__
 *
 * To run a mutation, you first call `useDeleteUserByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserByAdminMutation, { data, loading, error }] = useDeleteUserByAdminMutation({
 *   variables: {
 *      malfratId: // value for 'malfratId'
 *   },
 * });
 */
export function useDeleteUserByAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserByAdminMutation, DeleteUserByAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserByAdminMutation, DeleteUserByAdminMutationVariables>(DeleteUserByAdminDocument, options);
      }
export type DeleteUserByAdminMutationHookResult = ReturnType<typeof useDeleteUserByAdminMutation>;
export type DeleteUserByAdminMutationResult = Apollo.MutationResult<DeleteUserByAdminMutation>;
export type DeleteUserByAdminMutationOptions = Apollo.BaseMutationOptions<DeleteUserByAdminMutation, DeleteUserByAdminMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!) {
  resetPassword(email: $email) {
    id
    resetToken
    expirationDate
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ResetPasswordUpdateEntity!) {
  changePassword(data: $data) {
    message
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ModifyUserDocument = gql`
    mutation ModifyUser($infos: UserUpdateEntity!) {
  modifyUser(infos: $infos) {
    message
    success
  }
}
    `;
export type ModifyUserMutationFn = Apollo.MutationFunction<ModifyUserMutation, ModifyUserMutationVariables>;

/**
 * __useModifyUserMutation__
 *
 * To run a mutation, you first call `useModifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyUserMutation, { data, loading, error }] = useModifyUserMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useModifyUserMutation(baseOptions?: Apollo.MutationHookOptions<ModifyUserMutation, ModifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyUserMutation, ModifyUserMutationVariables>(ModifyUserDocument, options);
      }
export type ModifyUserMutationHookResult = ReturnType<typeof useModifyUserMutation>;
export type ModifyUserMutationResult = Apollo.MutationResult<ModifyUserMutation>;
export type ModifyUserMutationOptions = Apollo.BaseMutationOptions<ModifyUserMutation, ModifyUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser {
    message
    success
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const AuthentificationDocument = gql`
    query Authentification($infos: UserInputAuthEntity!) {
  authentification(infos: $infos) {
    message
    success
  }
}
    `;

/**
 * __useAuthentificationQuery__
 *
 * To run a query within a React component, call `useAuthentificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthentificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthentificationQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useAuthentificationQuery(baseOptions: Apollo.QueryHookOptions<AuthentificationQuery, AuthentificationQueryVariables> & ({ variables: AuthentificationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthentificationQuery, AuthentificationQueryVariables>(AuthentificationDocument, options);
      }
export function useAuthentificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthentificationQuery, AuthentificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthentificationQuery, AuthentificationQueryVariables>(AuthentificationDocument, options);
        }
export function useAuthentificationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AuthentificationQuery, AuthentificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthentificationQuery, AuthentificationQueryVariables>(AuthentificationDocument, options);
        }
export type AuthentificationQueryHookResult = ReturnType<typeof useAuthentificationQuery>;
export type AuthentificationLazyQueryHookResult = ReturnType<typeof useAuthentificationLazyQuery>;
export type AuthentificationSuspenseQueryHookResult = ReturnType<typeof useAuthentificationSuspenseQuery>;
export type AuthentificationQueryResult = Apollo.QueryResult<AuthentificationQuery, AuthentificationQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    message
    success
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const GetEpreuveByIdDocument = gql`
    query GetEpreuveById($getEpreuveByIdId: Float!) {
  getEpreuveById(id: $getEpreuveByIdId) {
    id
    title
    description
    easyToDo
    mediumToDo
    hardToDo
    videoLink
    images {
      id
      lien
      isCouverture
    }
  }
}
    `;

/**
 * __useGetEpreuveByIdQuery__
 *
 * To run a query within a React component, call `useGetEpreuveByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpreuveByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpreuveByIdQuery({
 *   variables: {
 *      getEpreuveByIdId: // value for 'getEpreuveByIdId'
 *   },
 * });
 */
export function useGetEpreuveByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables> & ({ variables: GetEpreuveByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables>(GetEpreuveByIdDocument, options);
      }
export function useGetEpreuveByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables>(GetEpreuveByIdDocument, options);
        }
export function useGetEpreuveByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables>(GetEpreuveByIdDocument, options);
        }
export type GetEpreuveByIdQueryHookResult = ReturnType<typeof useGetEpreuveByIdQuery>;
export type GetEpreuveByIdLazyQueryHookResult = ReturnType<typeof useGetEpreuveByIdLazyQuery>;
export type GetEpreuveByIdSuspenseQueryHookResult = ReturnType<typeof useGetEpreuveByIdSuspenseQuery>;
export type GetEpreuveByIdQueryResult = Apollo.QueryResult<GetEpreuveByIdQuery, GetEpreuveByIdQueryVariables>;
export const GetAllEpreuveDocument = gql`
    query GetAllEpreuve {
  getAllEpreuve {
    id
    title
    images {
      id
      lien
    }
  }
}
    `;

/**
 * __useGetAllEpreuveQuery__
 *
 * To run a query within a React component, call `useGetAllEpreuveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEpreuveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEpreuveQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEpreuveQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>(GetAllEpreuveDocument, options);
      }
export function useGetAllEpreuveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>(GetAllEpreuveDocument, options);
        }
export function useGetAllEpreuveSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>(GetAllEpreuveDocument, options);
        }
export type GetAllEpreuveQueryHookResult = ReturnType<typeof useGetAllEpreuveQuery>;
export type GetAllEpreuveLazyQueryHookResult = ReturnType<typeof useGetAllEpreuveLazyQuery>;
export type GetAllEpreuveSuspenseQueryHookResult = ReturnType<typeof useGetAllEpreuveSuspenseQuery>;
export type GetAllEpreuveQueryResult = Apollo.QueryResult<GetAllEpreuveQuery, GetAllEpreuveQueryVariables>;
export const GetTop20EpreuveByTitleDocument = gql`
    query GetTop20EpreuveByTitle($title: String) {
  getTop20EpreuveByTitle(title: $title) {
    id
    title
  }
}
    `;

/**
 * __useGetTop20EpreuveByTitleQuery__
 *
 * To run a query within a React component, call `useGetTop20EpreuveByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTop20EpreuveByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTop20EpreuveByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetTop20EpreuveByTitleQuery(baseOptions?: Apollo.QueryHookOptions<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>(GetTop20EpreuveByTitleDocument, options);
      }
export function useGetTop20EpreuveByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>(GetTop20EpreuveByTitleDocument, options);
        }
export function useGetTop20EpreuveByTitleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>(GetTop20EpreuveByTitleDocument, options);
        }
export type GetTop20EpreuveByTitleQueryHookResult = ReturnType<typeof useGetTop20EpreuveByTitleQuery>;
export type GetTop20EpreuveByTitleLazyQueryHookResult = ReturnType<typeof useGetTop20EpreuveByTitleLazyQuery>;
export type GetTop20EpreuveByTitleSuspenseQueryHookResult = ReturnType<typeof useGetTop20EpreuveByTitleSuspenseQuery>;
export type GetTop20EpreuveByTitleQueryResult = Apollo.QueryResult<GetTop20EpreuveByTitleQuery, GetTop20EpreuveByTitleQueryVariables>;
export const GetUserFavByTokenAndParkourIdDocument = gql`
    query GetUserFavByTokenAndParkourId($parkourId: Float!) {
  getUserFavByTokenAndParkourId(parkourId: $parkourId)
}
    `;

/**
 * __useGetUserFavByTokenAndParkourIdQuery__
 *
 * To run a query within a React component, call `useGetUserFavByTokenAndParkourIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavByTokenAndParkourIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavByTokenAndParkourIdQuery({
 *   variables: {
 *      parkourId: // value for 'parkourId'
 *   },
 * });
 */
export function useGetUserFavByTokenAndParkourIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables> & ({ variables: GetUserFavByTokenAndParkourIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables>(GetUserFavByTokenAndParkourIdDocument, options);
      }
export function useGetUserFavByTokenAndParkourIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables>(GetUserFavByTokenAndParkourIdDocument, options);
        }
export function useGetUserFavByTokenAndParkourIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables>(GetUserFavByTokenAndParkourIdDocument, options);
        }
export type GetUserFavByTokenAndParkourIdQueryHookResult = ReturnType<typeof useGetUserFavByTokenAndParkourIdQuery>;
export type GetUserFavByTokenAndParkourIdLazyQueryHookResult = ReturnType<typeof useGetUserFavByTokenAndParkourIdLazyQuery>;
export type GetUserFavByTokenAndParkourIdSuspenseQueryHookResult = ReturnType<typeof useGetUserFavByTokenAndParkourIdSuspenseQuery>;
export type GetUserFavByTokenAndParkourIdQueryResult = Apollo.QueryResult<GetUserFavByTokenAndParkourIdQuery, GetUserFavByTokenAndParkourIdQueryVariables>;
export const GetAllUserFavByTokenDocument = gql`
    query GetAllUserFavByToken {
  getAllUserFavByToken {
    parkour {
      id
      title
      time
      length
      difficulty
      city
      note
      nbVote
      images {
        id
        lien
      }
      epreuves {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useGetAllUserFavByTokenQuery__
 *
 * To run a query within a React component, call `useGetAllUserFavByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserFavByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserFavByTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserFavByTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>(GetAllUserFavByTokenDocument, options);
      }
export function useGetAllUserFavByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>(GetAllUserFavByTokenDocument, options);
        }
export function useGetAllUserFavByTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>(GetAllUserFavByTokenDocument, options);
        }
export type GetAllUserFavByTokenQueryHookResult = ReturnType<typeof useGetAllUserFavByTokenQuery>;
export type GetAllUserFavByTokenLazyQueryHookResult = ReturnType<typeof useGetAllUserFavByTokenLazyQuery>;
export type GetAllUserFavByTokenSuspenseQueryHookResult = ReturnType<typeof useGetAllUserFavByTokenSuspenseQuery>;
export type GetAllUserFavByTokenQueryResult = Apollo.QueryResult<GetAllUserFavByTokenQuery, GetAllUserFavByTokenQueryVariables>;
export const GetUserNoteByTokenAndParkourIdDocument = gql`
    query GetUserNoteByTokenAndParkourId($parkourId: Float!) {
  getUserNoteByTokenAndParkourId(parkourId: $parkourId) {
    note
    commentaire
  }
}
    `;

/**
 * __useGetUserNoteByTokenAndParkourIdQuery__
 *
 * To run a query within a React component, call `useGetUserNoteByTokenAndParkourIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNoteByTokenAndParkourIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNoteByTokenAndParkourIdQuery({
 *   variables: {
 *      parkourId: // value for 'parkourId'
 *   },
 * });
 */
export function useGetUserNoteByTokenAndParkourIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables> & ({ variables: GetUserNoteByTokenAndParkourIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables>(GetUserNoteByTokenAndParkourIdDocument, options);
      }
export function useGetUserNoteByTokenAndParkourIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables>(GetUserNoteByTokenAndParkourIdDocument, options);
        }
export function useGetUserNoteByTokenAndParkourIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables>(GetUserNoteByTokenAndParkourIdDocument, options);
        }
export type GetUserNoteByTokenAndParkourIdQueryHookResult = ReturnType<typeof useGetUserNoteByTokenAndParkourIdQuery>;
export type GetUserNoteByTokenAndParkourIdLazyQueryHookResult = ReturnType<typeof useGetUserNoteByTokenAndParkourIdLazyQuery>;
export type GetUserNoteByTokenAndParkourIdSuspenseQueryHookResult = ReturnType<typeof useGetUserNoteByTokenAndParkourIdSuspenseQuery>;
export type GetUserNoteByTokenAndParkourIdQueryResult = Apollo.QueryResult<GetUserNoteByTokenAndParkourIdQuery, GetUserNoteByTokenAndParkourIdQueryVariables>;
export const GetAllUserNoteByTokenDocument = gql`
    query GetAllUserNoteByToken {
  getAllUserNoteByToken {
    note
    commentaire
    parkour {
      id
      title
      time
      length
      difficulty
      city
      note
      nbVote
      images {
        id
        lien
      }
      epreuves {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useGetAllUserNoteByTokenQuery__
 *
 * To run a query within a React component, call `useGetAllUserNoteByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserNoteByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserNoteByTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserNoteByTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>(GetAllUserNoteByTokenDocument, options);
      }
export function useGetAllUserNoteByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>(GetAllUserNoteByTokenDocument, options);
        }
export function useGetAllUserNoteByTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>(GetAllUserNoteByTokenDocument, options);
        }
export type GetAllUserNoteByTokenQueryHookResult = ReturnType<typeof useGetAllUserNoteByTokenQuery>;
export type GetAllUserNoteByTokenLazyQueryHookResult = ReturnType<typeof useGetAllUserNoteByTokenLazyQuery>;
export type GetAllUserNoteByTokenSuspenseQueryHookResult = ReturnType<typeof useGetAllUserNoteByTokenSuspenseQuery>;
export type GetAllUserNoteByTokenQueryResult = Apollo.QueryResult<GetAllUserNoteByTokenQuery, GetAllUserNoteByTokenQueryVariables>;
export const GetParkourByIdDocument = gql`
    query GetParkourById($getParkourByIdId: Float!) {
  getParkourById(id: $getParkourByIdId) {
    id
    title
    description
    time
    length
    difficulty
    city
    start
    note
    nbVote
    images {
      id
      lien
      isCouverture
    }
    notesParkours {
      note
      commentaire
      user {
        id
        name
        firstname
      }
    }
    epreuves {
      id
      title
      images {
        id
        lien
        isCouverture
      }
    }
  }
}
    `;

/**
 * __useGetParkourByIdQuery__
 *
 * To run a query within a React component, call `useGetParkourByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParkourByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParkourByIdQuery({
 *   variables: {
 *      getParkourByIdId: // value for 'getParkourByIdId'
 *   },
 * });
 */
export function useGetParkourByIdQuery(baseOptions: Apollo.QueryHookOptions<GetParkourByIdQuery, GetParkourByIdQueryVariables> & ({ variables: GetParkourByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParkourByIdQuery, GetParkourByIdQueryVariables>(GetParkourByIdDocument, options);
      }
export function useGetParkourByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParkourByIdQuery, GetParkourByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParkourByIdQuery, GetParkourByIdQueryVariables>(GetParkourByIdDocument, options);
        }
export function useGetParkourByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetParkourByIdQuery, GetParkourByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetParkourByIdQuery, GetParkourByIdQueryVariables>(GetParkourByIdDocument, options);
        }
export type GetParkourByIdQueryHookResult = ReturnType<typeof useGetParkourByIdQuery>;
export type GetParkourByIdLazyQueryHookResult = ReturnType<typeof useGetParkourByIdLazyQuery>;
export type GetParkourByIdSuspenseQueryHookResult = ReturnType<typeof useGetParkourByIdSuspenseQuery>;
export type GetParkourByIdQueryResult = Apollo.QueryResult<GetParkourByIdQuery, GetParkourByIdQueryVariables>;
export const GetAllParkourForMapDocument = gql`
    query GetAllParkourForMap {
  getAllParkourForMap {
    id
    title
    start
  }
}
    `;

/**
 * __useGetAllParkourForMapQuery__
 *
 * To run a query within a React component, call `useGetAllParkourForMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllParkourForMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllParkourForMapQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllParkourForMapQuery(baseOptions?: Apollo.QueryHookOptions<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>(GetAllParkourForMapDocument, options);
      }
export function useGetAllParkourForMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>(GetAllParkourForMapDocument, options);
        }
export function useGetAllParkourForMapSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>(GetAllParkourForMapDocument, options);
        }
export type GetAllParkourForMapQueryHookResult = ReturnType<typeof useGetAllParkourForMapQuery>;
export type GetAllParkourForMapLazyQueryHookResult = ReturnType<typeof useGetAllParkourForMapLazyQuery>;
export type GetAllParkourForMapSuspenseQueryHookResult = ReturnType<typeof useGetAllParkourForMapSuspenseQuery>;
export type GetAllParkourForMapQueryResult = Apollo.QueryResult<GetAllParkourForMapQuery, GetAllParkourForMapQueryVariables>;
export const GetListTop20ParkourByTitleDocument = gql`
    query GetListTop20ParkourByTitle($title: String) {
  getTop20ParkourByTitle(title: $title) {
    id
    title
  }
}
    `;

/**
 * __useGetListTop20ParkourByTitleQuery__
 *
 * To run a query within a React component, call `useGetListTop20ParkourByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListTop20ParkourByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListTop20ParkourByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetListTop20ParkourByTitleQuery(baseOptions?: Apollo.QueryHookOptions<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>(GetListTop20ParkourByTitleDocument, options);
      }
export function useGetListTop20ParkourByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>(GetListTop20ParkourByTitleDocument, options);
        }
export function useGetListTop20ParkourByTitleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>(GetListTop20ParkourByTitleDocument, options);
        }
export type GetListTop20ParkourByTitleQueryHookResult = ReturnType<typeof useGetListTop20ParkourByTitleQuery>;
export type GetListTop20ParkourByTitleLazyQueryHookResult = ReturnType<typeof useGetListTop20ParkourByTitleLazyQuery>;
export type GetListTop20ParkourByTitleSuspenseQueryHookResult = ReturnType<typeof useGetListTop20ParkourByTitleSuspenseQuery>;
export type GetListTop20ParkourByTitleQueryResult = Apollo.QueryResult<GetListTop20ParkourByTitleQuery, GetListTop20ParkourByTitleQueryVariables>;
export const GetTop20ParkourBySearchDocument = gql`
    query GetTop20ParkourBySearch($triParField: String!, $triParSort: String!, $startPage: Float!, $noteMin: Float, $difficulty: String, $lengthMax: Float, $lengthMin: Float, $timeMax: Float, $timeMin: Float, $city: String) {
  getTop20ParkourBySearch(
    triParField: $triParField
    triParSort: $triParSort
    startPage: $startPage
    noteMin: $noteMin
    difficulty: $difficulty
    lengthMax: $lengthMax
    lengthMin: $lengthMin
    timeMax: $timeMax
    timeMin: $timeMin
    city: $city
  ) {
    id
    title
    time
    length
    difficulty
    city
    note
    nbVote
    images {
      id
      lien
    }
    epreuves {
      id
    }
  }
}
    `;

/**
 * __useGetTop20ParkourBySearchQuery__
 *
 * To run a query within a React component, call `useGetTop20ParkourBySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTop20ParkourBySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTop20ParkourBySearchQuery({
 *   variables: {
 *      triParField: // value for 'triParField'
 *      triParSort: // value for 'triParSort'
 *      startPage: // value for 'startPage'
 *      noteMin: // value for 'noteMin'
 *      difficulty: // value for 'difficulty'
 *      lengthMax: // value for 'lengthMax'
 *      lengthMin: // value for 'lengthMin'
 *      timeMax: // value for 'timeMax'
 *      timeMin: // value for 'timeMin'
 *      city: // value for 'city'
 *   },
 * });
 */
export function useGetTop20ParkourBySearchQuery(baseOptions: Apollo.QueryHookOptions<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables> & ({ variables: GetTop20ParkourBySearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables>(GetTop20ParkourBySearchDocument, options);
      }
export function useGetTop20ParkourBySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables>(GetTop20ParkourBySearchDocument, options);
        }
export function useGetTop20ParkourBySearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables>(GetTop20ParkourBySearchDocument, options);
        }
export type GetTop20ParkourBySearchQueryHookResult = ReturnType<typeof useGetTop20ParkourBySearchQuery>;
export type GetTop20ParkourBySearchLazyQueryHookResult = ReturnType<typeof useGetTop20ParkourBySearchLazyQuery>;
export type GetTop20ParkourBySearchSuspenseQueryHookResult = ReturnType<typeof useGetTop20ParkourBySearchSuspenseQuery>;
export type GetTop20ParkourBySearchQueryResult = Apollo.QueryResult<GetTop20ParkourBySearchQuery, GetTop20ParkourBySearchQueryVariables>;
export const GetTheParkourTotalForSearchDocument = gql`
    query GetTheParkourTotalForSearch($noteMin: Float, $difficulty: String, $lengthMax: Float, $lengthMin: Float, $timeMax: Float, $timeMin: Float, $city: String) {
  getTheParkourTotalForSearch(
    noteMin: $noteMin
    difficulty: $difficulty
    lengthMax: $lengthMax
    lengthMin: $lengthMin
    timeMax: $timeMax
    timeMin: $timeMin
    city: $city
  )
}
    `;

/**
 * __useGetTheParkourTotalForSearchQuery__
 *
 * To run a query within a React component, call `useGetTheParkourTotalForSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTheParkourTotalForSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTheParkourTotalForSearchQuery({
 *   variables: {
 *      noteMin: // value for 'noteMin'
 *      difficulty: // value for 'difficulty'
 *      lengthMax: // value for 'lengthMax'
 *      lengthMin: // value for 'lengthMin'
 *      timeMax: // value for 'timeMax'
 *      timeMin: // value for 'timeMin'
 *      city: // value for 'city'
 *   },
 * });
 */
export function useGetTheParkourTotalForSearchQuery(baseOptions?: Apollo.QueryHookOptions<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>(GetTheParkourTotalForSearchDocument, options);
      }
export function useGetTheParkourTotalForSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>(GetTheParkourTotalForSearchDocument, options);
        }
export function useGetTheParkourTotalForSearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>(GetTheParkourTotalForSearchDocument, options);
        }
export type GetTheParkourTotalForSearchQueryHookResult = ReturnType<typeof useGetTheParkourTotalForSearchQuery>;
export type GetTheParkourTotalForSearchLazyQueryHookResult = ReturnType<typeof useGetTheParkourTotalForSearchLazyQuery>;
export type GetTheParkourTotalForSearchSuspenseQueryHookResult = ReturnType<typeof useGetTheParkourTotalForSearchSuspenseQuery>;
export type GetTheParkourTotalForSearchQueryResult = Apollo.QueryResult<GetTheParkourTotalForSearchQuery, GetTheParkourTotalForSearchQueryVariables>;
export const GetUserByIdForPageReportDocument = gql`
    query GetUserByIdForPageReport($userId: String!) {
  getUserByIdForPageReport(userId: $userId) {
    id
    name
    firstname
    email
    nbReportValide
    nbReportAjoute
    notesParkours {
      commentaire
      parkour {
        id
        title
      }
    }
    reports {
      id
      commentaireEnFaute
      createdAt
      status
      parkour {
        id
        title
      }
      reporter {
        id
        name
        firstname
        nbReportAjoute
      }
    }
  }
}
    `;

/**
 * __useGetUserByIdForPageReportQuery__
 *
 * To run a query within a React component, call `useGetUserByIdForPageReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdForPageReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdForPageReportQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdForPageReportQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables> & ({ variables: GetUserByIdForPageReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables>(GetUserByIdForPageReportDocument, options);
      }
export function useGetUserByIdForPageReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables>(GetUserByIdForPageReportDocument, options);
        }
export function useGetUserByIdForPageReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables>(GetUserByIdForPageReportDocument, options);
        }
export type GetUserByIdForPageReportQueryHookResult = ReturnType<typeof useGetUserByIdForPageReportQuery>;
export type GetUserByIdForPageReportLazyQueryHookResult = ReturnType<typeof useGetUserByIdForPageReportLazyQuery>;
export type GetUserByIdForPageReportSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdForPageReportSuspenseQuery>;
export type GetUserByIdForPageReportQueryResult = Apollo.QueryResult<GetUserByIdForPageReportQuery, GetUserByIdForPageReportQueryVariables>;
export const GetReportsBySearchDocument = gql`
    query GetReportsBySearch($status: String!) {
  getReportsBySearch(status: $status) {
    id
    commentaireEnFaute
    createdAt
    status
    reporter {
      id
      name
      firstname
      nbReportAjoute
    }
    malfrat {
      id
      name
      firstname
      nbReportValide
    }
    parkour {
      id
      title
    }
  }
}
    `;

/**
 * __useGetReportsBySearchQuery__
 *
 * To run a query within a React component, call `useGetReportsBySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportsBySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportsBySearchQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetReportsBySearchQuery(baseOptions: Apollo.QueryHookOptions<GetReportsBySearchQuery, GetReportsBySearchQueryVariables> & ({ variables: GetReportsBySearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportsBySearchQuery, GetReportsBySearchQueryVariables>(GetReportsBySearchDocument, options);
      }
export function useGetReportsBySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportsBySearchQuery, GetReportsBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportsBySearchQuery, GetReportsBySearchQueryVariables>(GetReportsBySearchDocument, options);
        }
export function useGetReportsBySearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReportsBySearchQuery, GetReportsBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReportsBySearchQuery, GetReportsBySearchQueryVariables>(GetReportsBySearchDocument, options);
        }
export type GetReportsBySearchQueryHookResult = ReturnType<typeof useGetReportsBySearchQuery>;
export type GetReportsBySearchLazyQueryHookResult = ReturnType<typeof useGetReportsBySearchLazyQuery>;
export type GetReportsBySearchSuspenseQueryHookResult = ReturnType<typeof useGetReportsBySearchSuspenseQuery>;
export type GetReportsBySearchQueryResult = Apollo.QueryResult<GetReportsBySearchQuery, GetReportsBySearchQueryVariables>;
export const GetUsersWithReportsDocument = gql`
    query GetUsersWithReports {
  getUsersWithReports {
    id
    name
    firstname
    nbReportValide
    nbReportAjoute
  }
}
    `;

/**
 * __useGetUsersWithReportsQuery__
 *
 * To run a query within a React component, call `useGetUsersWithReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersWithReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersWithReportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersWithReportsQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>(GetUsersWithReportsDocument, options);
      }
export function useGetUsersWithReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>(GetUsersWithReportsDocument, options);
        }
export function useGetUsersWithReportsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>(GetUsersWithReportsDocument, options);
        }
export type GetUsersWithReportsQueryHookResult = ReturnType<typeof useGetUsersWithReportsQuery>;
export type GetUsersWithReportsLazyQueryHookResult = ReturnType<typeof useGetUsersWithReportsLazyQuery>;
export type GetUsersWithReportsSuspenseQueryHookResult = ReturnType<typeof useGetUsersWithReportsSuspenseQuery>;
export type GetUsersWithReportsQueryResult = Apollo.QueryResult<GetUsersWithReportsQuery, GetUsersWithReportsQueryVariables>;
export const CheckResetTokenValidityDocument = gql`
    query checkResetTokenValidity($token: String!) {
  checkResetTokenValidity(token: $token) {
    message
    success
  }
}
    `;

/**
 * __useCheckResetTokenValidityQuery__
 *
 * To run a query within a React component, call `useCheckResetTokenValidityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckResetTokenValidityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckResetTokenValidityQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCheckResetTokenValidityQuery(baseOptions: Apollo.QueryHookOptions<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables> & ({ variables: CheckResetTokenValidityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables>(CheckResetTokenValidityDocument, options);
      }
export function useCheckResetTokenValidityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables>(CheckResetTokenValidityDocument, options);
        }
export function useCheckResetTokenValiditySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables>(CheckResetTokenValidityDocument, options);
        }
export type CheckResetTokenValidityQueryHookResult = ReturnType<typeof useCheckResetTokenValidityQuery>;
export type CheckResetTokenValidityLazyQueryHookResult = ReturnType<typeof useCheckResetTokenValidityLazyQuery>;
export type CheckResetTokenValiditySuspenseQueryHookResult = ReturnType<typeof useCheckResetTokenValiditySuspenseQuery>;
export type CheckResetTokenValidityQueryResult = Apollo.QueryResult<CheckResetTokenValidityQuery, CheckResetTokenValidityQueryVariables>;
export const GetUserByTokenDocument = gql`
    query GetUserByToken {
  getUserByToken {
    id
    name
    firstname
    email
    city
    codePostal
    phone
  }
}
    `;

/**
 * __useGetUserByTokenQuery__
 *
 * To run a query within a React component, call `useGetUserByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserByTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByTokenQuery, GetUserByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, options);
      }
export function useGetUserByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByTokenQuery, GetUserByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, options);
        }
export function useGetUserByTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByTokenQuery, GetUserByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, options);
        }
export type GetUserByTokenQueryHookResult = ReturnType<typeof useGetUserByTokenQuery>;
export type GetUserByTokenLazyQueryHookResult = ReturnType<typeof useGetUserByTokenLazyQuery>;
export type GetUserByTokenSuspenseQueryHookResult = ReturnType<typeof useGetUserByTokenSuspenseQuery>;
export type GetUserByTokenQueryResult = Apollo.QueryResult<GetUserByTokenQuery, GetUserByTokenQueryVariables>;
export const IsAdminDocument = gql`
    query IsAdmin {
  isAdmin
}
    `;

/**
 * __useIsAdminQuery__
 *
 * To run a query within a React component, call `useIsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsAdminQuery(baseOptions?: Apollo.QueryHookOptions<IsAdminQuery, IsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, options);
      }
export function useIsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAdminQuery, IsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, options);
        }
export function useIsAdminSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsAdminQuery, IsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, options);
        }
export type IsAdminQueryHookResult = ReturnType<typeof useIsAdminQuery>;
export type IsAdminLazyQueryHookResult = ReturnType<typeof useIsAdminLazyQuery>;
export type IsAdminSuspenseQueryHookResult = ReturnType<typeof useIsAdminSuspenseQuery>;
export type IsAdminQueryResult = Apollo.QueryResult<IsAdminQuery, IsAdminQueryVariables>;
export const IsClientDocument = gql`
    query IsClient {
  isClient
}
    `;

/**
 * __useIsClientQuery__
 *
 * To run a query within a React component, call `useIsClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsClientQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsClientQuery(baseOptions?: Apollo.QueryHookOptions<IsClientQuery, IsClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsClientQuery, IsClientQueryVariables>(IsClientDocument, options);
      }
export function useIsClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsClientQuery, IsClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsClientQuery, IsClientQueryVariables>(IsClientDocument, options);
        }
export function useIsClientSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsClientQuery, IsClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsClientQuery, IsClientQueryVariables>(IsClientDocument, options);
        }
export type IsClientQueryHookResult = ReturnType<typeof useIsClientQuery>;
export type IsClientLazyQueryHookResult = ReturnType<typeof useIsClientLazyQuery>;
export type IsClientSuspenseQueryHookResult = ReturnType<typeof useIsClientSuspenseQuery>;
export type IsClientQueryResult = Apollo.QueryResult<IsClientQuery, IsClientQueryVariables>;
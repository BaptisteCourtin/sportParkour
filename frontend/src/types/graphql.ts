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
  lien?: Maybe<Scalars['String']['output']>;
};

export type ImageParkourEntity = {
  __typename?: 'ImageParkourEntity';
  id: Scalars['ID']['output'];
  id_parkour: ParkourEntity;
  lien?: Maybe<Scalars['String']['output']>;
};

export type JoinUserParkourEntity = {
  __typename?: 'JoinUserParkourEntity';
  favoris: Scalars['Boolean']['output'];
  note?: Maybe<Scalars['Float']['output']>;
  parkour_id: Scalars['ID']['output'];
  parkours: ParkourEntity;
  user_id: Scalars['ID']['output'];
  users: UserEntity;
};

export type JoinUserParkourFavEntity = {
  favoris?: InputMaybe<Scalars['Boolean']['input']>;
  parkour_id: Scalars['Float']['input'];
};

export type JoinUserParkourNoteEntity = {
  note?: InputMaybe<Scalars['Float']['input']>;
  parkour_id: Scalars['Float']['input'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEpreuve: EpreuveEntity;
  createParkour: ParkourEntity;
  deleteEpreuve: MessageEntity;
  deleteParkour: MessageEntity;
  deleteUser: MessageEntity;
  favJoinUserParkour: MessageEntity;
  inscription: MessageEntity;
  modifyEpreuve: EpreuveEntity;
  modifyParkour: ParkourEntity;
  modifyUser: UserEntity;
  noteJoinUserParkour: MessageEntity;
};


export type MutationCreateEpreuveArgs = {
  infos: EpreuveCreateEntity;
};


export type MutationCreateParkourArgs = {
  infos: ParkourCreateEntity;
};


export type MutationDeleteEpreuveArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteParkourArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationFavJoinUserParkourArgs = {
  infos: JoinUserParkourFavEntity;
};


export type MutationInscriptionArgs = {
  infos: UserInputRegisterEntity;
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


export type MutationNoteJoinUserParkourArgs = {
  infos: JoinUserParkourNoteEntity;
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
  getAllParkour: Array<ParkourEntity>;
  getAllUserFavByToken: Array<JoinUserParkourEntity>;
  getEpreuveById: EpreuveEntity;
  getListEpreuve: Array<EpreuveEntity>;
  getListEpreuveByTitle: Array<EpreuveEntity>;
  getParkourById: ParkourEntity;
  getParkourByTitle: ParkourEntity;
  getUserByToken: UserEntity;
  getUserFavByTokenAndIdParkour: JoinUserParkourEntity;
  isAdmin: Scalars['Boolean']['output'];
  isClient: Scalars['Boolean']['output'];
  logout: MessageEntity;
};


export type QueryAuthentificationArgs = {
  infos: UserInputAuthEntity;
};


export type QueryGetEpreuveByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetListEpreuveByTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetParkourByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetParkourByTitleArgs = {
  title: Scalars['String']['input'];
};


export type QueryGetUserFavByTokenAndIdParkourArgs = {
  parkourId: Scalars['Float']['input'];
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
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parkours?: Maybe<Array<JoinUserParkourEntity>>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
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


export type CreateEpreuveMutation = { __typename?: 'Mutation', createEpreuve: { __typename?: 'EpreuveEntity', videoLink?: string | null, hardToDo?: string | null, mediumToDo?: string | null, easyToDo?: string | null, description?: string | null, title: string, id: string, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien?: string | null }> | null } };

export type ModifyEpreuveMutationVariables = Exact<{
  infos: EpreuveUpdateEntity;
  modifyEpreuveId: Scalars['Float']['input'];
}>;


export type ModifyEpreuveMutation = { __typename?: 'Mutation', modifyEpreuve: { __typename?: 'EpreuveEntity', id: string, title: string, description?: string | null, easyToDo?: string | null, mediumToDo?: string | null, hardToDo?: string | null, videoLink?: string | null, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien?: string | null }> | null } };

export type DeleteEpreuveMutationVariables = Exact<{
  deleteEpreuveId: Scalars['Float']['input'];
}>;


export type DeleteEpreuveMutation = { __typename?: 'Mutation', deleteEpreuve: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type FavJoinUserParkourMutationVariables = Exact<{
  infos: JoinUserParkourFavEntity;
}>;


export type FavJoinUserParkourMutation = { __typename?: 'Mutation', favJoinUserParkour: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type NoteJoinUserParkourMutationVariables = Exact<{
  infos: JoinUserParkourNoteEntity;
}>;


export type NoteJoinUserParkourMutation = { __typename?: 'Mutation', noteJoinUserParkour: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type CreateParkourMutationVariables = Exact<{
  infos: ParkourCreateEntity;
}>;


export type CreateParkourMutation = { __typename?: 'Mutation', createParkour: { __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } };

export type ModifyParkourMutationVariables = Exact<{
  infos: ParkourUpdateEntity;
  modifyParkourId: Scalars['Float']['input'];
}>;


export type ModifyParkourMutation = { __typename?: 'Mutation', modifyParkour: { __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } };

export type DeleteParkourMutationVariables = Exact<{
  deleteParkourId: Scalars['Float']['input'];
}>;


export type DeleteParkourMutation = { __typename?: 'Mutation', deleteParkour: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type ModifyUserMutationVariables = Exact<{
  infos: UserUpdateEntity;
}>;


export type ModifyUserMutation = { __typename?: 'Mutation', modifyUser: { __typename?: 'UserEntity', id: string, name: string, firstname: string, email: string, city?: string | null, codePostal?: string | null, phone?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String']['input'];
}>;


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


export type GetEpreuveByIdQuery = { __typename?: 'Query', getEpreuveById: { __typename?: 'EpreuveEntity', id: string, title: string, description?: string | null, easyToDo?: string | null, mediumToDo?: string | null, hardToDo?: string | null, videoLink?: string | null, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien?: string | null }> | null } };

export type GetListEpreuveByTitleQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListEpreuveByTitleQuery = { __typename?: 'Query', getListEpreuveByTitle: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> };

export type GetListEpreuveQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListEpreuveQuery = { __typename?: 'Query', getListEpreuve: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> };

export type GetUserFavByTokenAndIdParkourQueryVariables = Exact<{
  parkourId: Scalars['Float']['input'];
}>;


export type GetUserFavByTokenAndIdParkourQuery = { __typename?: 'Query', getUserFavByTokenAndIdParkour: { __typename?: 'JoinUserParkourEntity', note?: number | null, favoris: boolean } };

export type GetAllUserFavByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserFavByTokenQuery = { __typename?: 'Query', getAllUserFavByToken: Array<{ __typename?: 'JoinUserParkourEntity', parkours: { __typename?: 'ParkourEntity', id: string, title: string, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } }> };

export type GetParkourByIdQueryVariables = Exact<{
  getParkourByIdId: Scalars['Float']['input'];
}>;


export type GetParkourByIdQuery = { __typename?: 'Query', getParkourById: { __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } };

export type GetParkourByTitleQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type GetParkourByTitleQuery = { __typename?: 'Query', getParkourByTitle: { __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } };

export type GetAllParkourQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParkourQuery = { __typename?: 'Query', getAllParkour: Array<{ __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null }> };

export type GetUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByTokenQuery = { __typename?: 'Query', getUserByToken: { __typename?: 'UserEntity', id: string, name: string, firstname: string, email: string, city?: string | null, codePostal?: string | null, phone?: string | null, parkours?: Array<{ __typename?: 'JoinUserParkourEntity', user_id: string, parkour_id: string, favoris: boolean, note?: number | null, parkours: { __typename?: 'ParkourEntity', id: string, title: string } }> | null } };

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
    videoLink
    hardToDo
    mediumToDo
    easyToDo
    description
    title
    id
    images {
      id
      lien
    }
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
    description
    easyToDo
    mediumToDo
    hardToDo
    videoLink
    images {
      id
      lien
    }
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
export const FavJoinUserParkourDocument = gql`
    mutation FavJoinUserParkour($infos: JoinUserParkourFavEntity!) {
  favJoinUserParkour(infos: $infos) {
    message
    success
  }
}
    `;
export type FavJoinUserParkourMutationFn = Apollo.MutationFunction<FavJoinUserParkourMutation, FavJoinUserParkourMutationVariables>;

/**
 * __useFavJoinUserParkourMutation__
 *
 * To run a mutation, you first call `useFavJoinUserParkourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavJoinUserParkourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favJoinUserParkourMutation, { data, loading, error }] = useFavJoinUserParkourMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useFavJoinUserParkourMutation(baseOptions?: Apollo.MutationHookOptions<FavJoinUserParkourMutation, FavJoinUserParkourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavJoinUserParkourMutation, FavJoinUserParkourMutationVariables>(FavJoinUserParkourDocument, options);
      }
export type FavJoinUserParkourMutationHookResult = ReturnType<typeof useFavJoinUserParkourMutation>;
export type FavJoinUserParkourMutationResult = Apollo.MutationResult<FavJoinUserParkourMutation>;
export type FavJoinUserParkourMutationOptions = Apollo.BaseMutationOptions<FavJoinUserParkourMutation, FavJoinUserParkourMutationVariables>;
export const NoteJoinUserParkourDocument = gql`
    mutation NoteJoinUserParkour($infos: JoinUserParkourNoteEntity!) {
  noteJoinUserParkour(infos: $infos) {
    message
    success
  }
}
    `;
export type NoteJoinUserParkourMutationFn = Apollo.MutationFunction<NoteJoinUserParkourMutation, NoteJoinUserParkourMutationVariables>;

/**
 * __useNoteJoinUserParkourMutation__
 *
 * To run a mutation, you first call `useNoteJoinUserParkourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNoteJoinUserParkourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [noteJoinUserParkourMutation, { data, loading, error }] = useNoteJoinUserParkourMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useNoteJoinUserParkourMutation(baseOptions?: Apollo.MutationHookOptions<NoteJoinUserParkourMutation, NoteJoinUserParkourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NoteJoinUserParkourMutation, NoteJoinUserParkourMutationVariables>(NoteJoinUserParkourDocument, options);
      }
export type NoteJoinUserParkourMutationHookResult = ReturnType<typeof useNoteJoinUserParkourMutation>;
export type NoteJoinUserParkourMutationResult = Apollo.MutationResult<NoteJoinUserParkourMutation>;
export type NoteJoinUserParkourMutationOptions = Apollo.BaseMutationOptions<NoteJoinUserParkourMutation, NoteJoinUserParkourMutationVariables>;
export const CreateParkourDocument = gql`
    mutation CreateParkour($infos: ParkourCreateEntity!) {
  createParkour(infos: $infos) {
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
    }
    epreuves {
      id
      title
    }
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
    }
    epreuves {
      id
      title
    }
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
export const ModifyUserDocument = gql`
    mutation ModifyUser($infos: UserUpdateEntity!) {
  modifyUser(infos: $infos) {
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
    mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId) {
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
 *      deleteUserId: // value for 'deleteUserId'
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
export const GetListEpreuveByTitleDocument = gql`
    query GetListEpreuveByTitle($title: String) {
  getListEpreuveByTitle(title: $title) {
    id
    title
  }
}
    `;

/**
 * __useGetListEpreuveByTitleQuery__
 *
 * To run a query within a React component, call `useGetListEpreuveByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListEpreuveByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListEpreuveByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetListEpreuveByTitleQuery(baseOptions?: Apollo.QueryHookOptions<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>(GetListEpreuveByTitleDocument, options);
      }
export function useGetListEpreuveByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>(GetListEpreuveByTitleDocument, options);
        }
export function useGetListEpreuveByTitleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>(GetListEpreuveByTitleDocument, options);
        }
export type GetListEpreuveByTitleQueryHookResult = ReturnType<typeof useGetListEpreuveByTitleQuery>;
export type GetListEpreuveByTitleLazyQueryHookResult = ReturnType<typeof useGetListEpreuveByTitleLazyQuery>;
export type GetListEpreuveByTitleSuspenseQueryHookResult = ReturnType<typeof useGetListEpreuveByTitleSuspenseQuery>;
export type GetListEpreuveByTitleQueryResult = Apollo.QueryResult<GetListEpreuveByTitleQuery, GetListEpreuveByTitleQueryVariables>;
export const GetListEpreuveDocument = gql`
    query GetListEpreuve {
  getListEpreuve {
    id
    title
  }
}
    `;

/**
 * __useGetListEpreuveQuery__
 *
 * To run a query within a React component, call `useGetListEpreuveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListEpreuveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListEpreuveQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListEpreuveQuery(baseOptions?: Apollo.QueryHookOptions<GetListEpreuveQuery, GetListEpreuveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListEpreuveQuery, GetListEpreuveQueryVariables>(GetListEpreuveDocument, options);
      }
export function useGetListEpreuveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListEpreuveQuery, GetListEpreuveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListEpreuveQuery, GetListEpreuveQueryVariables>(GetListEpreuveDocument, options);
        }
export function useGetListEpreuveSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListEpreuveQuery, GetListEpreuveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListEpreuveQuery, GetListEpreuveQueryVariables>(GetListEpreuveDocument, options);
        }
export type GetListEpreuveQueryHookResult = ReturnType<typeof useGetListEpreuveQuery>;
export type GetListEpreuveLazyQueryHookResult = ReturnType<typeof useGetListEpreuveLazyQuery>;
export type GetListEpreuveSuspenseQueryHookResult = ReturnType<typeof useGetListEpreuveSuspenseQuery>;
export type GetListEpreuveQueryResult = Apollo.QueryResult<GetListEpreuveQuery, GetListEpreuveQueryVariables>;
export const GetUserFavByTokenAndIdParkourDocument = gql`
    query GetUserFavByTokenAndIdParkour($parkourId: Float!) {
  getUserFavByTokenAndIdParkour(parkourId: $parkourId) {
    note
    favoris
  }
}
    `;

/**
 * __useGetUserFavByTokenAndIdParkourQuery__
 *
 * To run a query within a React component, call `useGetUserFavByTokenAndIdParkourQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavByTokenAndIdParkourQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavByTokenAndIdParkourQuery({
 *   variables: {
 *      parkourId: // value for 'parkourId'
 *   },
 * });
 */
export function useGetUserFavByTokenAndIdParkourQuery(baseOptions: Apollo.QueryHookOptions<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables> & ({ variables: GetUserFavByTokenAndIdParkourQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables>(GetUserFavByTokenAndIdParkourDocument, options);
      }
export function useGetUserFavByTokenAndIdParkourLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables>(GetUserFavByTokenAndIdParkourDocument, options);
        }
export function useGetUserFavByTokenAndIdParkourSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables>(GetUserFavByTokenAndIdParkourDocument, options);
        }
export type GetUserFavByTokenAndIdParkourQueryHookResult = ReturnType<typeof useGetUserFavByTokenAndIdParkourQuery>;
export type GetUserFavByTokenAndIdParkourLazyQueryHookResult = ReturnType<typeof useGetUserFavByTokenAndIdParkourLazyQuery>;
export type GetUserFavByTokenAndIdParkourSuspenseQueryHookResult = ReturnType<typeof useGetUserFavByTokenAndIdParkourSuspenseQuery>;
export type GetUserFavByTokenAndIdParkourQueryResult = Apollo.QueryResult<GetUserFavByTokenAndIdParkourQuery, GetUserFavByTokenAndIdParkourQueryVariables>;
export const GetAllUserFavByTokenDocument = gql`
    query GetAllUserFavByToken {
  getAllUserFavByToken {
    parkours {
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
    }
    epreuves {
      id
      title
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
export const GetParkourByTitleDocument = gql`
    query GetParkourByTitle($title: String!) {
  getParkourByTitle(title: $title) {
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
    }
    epreuves {
      id
      title
    }
  }
}
    `;

/**
 * __useGetParkourByTitleQuery__
 *
 * To run a query within a React component, call `useGetParkourByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParkourByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParkourByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetParkourByTitleQuery(baseOptions: Apollo.QueryHookOptions<GetParkourByTitleQuery, GetParkourByTitleQueryVariables> & ({ variables: GetParkourByTitleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParkourByTitleQuery, GetParkourByTitleQueryVariables>(GetParkourByTitleDocument, options);
      }
export function useGetParkourByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParkourByTitleQuery, GetParkourByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParkourByTitleQuery, GetParkourByTitleQueryVariables>(GetParkourByTitleDocument, options);
        }
export function useGetParkourByTitleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetParkourByTitleQuery, GetParkourByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetParkourByTitleQuery, GetParkourByTitleQueryVariables>(GetParkourByTitleDocument, options);
        }
export type GetParkourByTitleQueryHookResult = ReturnType<typeof useGetParkourByTitleQuery>;
export type GetParkourByTitleLazyQueryHookResult = ReturnType<typeof useGetParkourByTitleLazyQuery>;
export type GetParkourByTitleSuspenseQueryHookResult = ReturnType<typeof useGetParkourByTitleSuspenseQuery>;
export type GetParkourByTitleQueryResult = Apollo.QueryResult<GetParkourByTitleQuery, GetParkourByTitleQueryVariables>;
export const GetAllParkourDocument = gql`
    query GetAllParkour {
  getAllParkour {
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
    }
    epreuves {
      id
      title
    }
  }
}
    `;

/**
 * __useGetAllParkourQuery__
 *
 * To run a query within a React component, call `useGetAllParkourQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllParkourQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllParkourQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllParkourQuery(baseOptions?: Apollo.QueryHookOptions<GetAllParkourQuery, GetAllParkourQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllParkourQuery, GetAllParkourQueryVariables>(GetAllParkourDocument, options);
      }
export function useGetAllParkourLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllParkourQuery, GetAllParkourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllParkourQuery, GetAllParkourQueryVariables>(GetAllParkourDocument, options);
        }
export function useGetAllParkourSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllParkourQuery, GetAllParkourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllParkourQuery, GetAllParkourQueryVariables>(GetAllParkourDocument, options);
        }
export type GetAllParkourQueryHookResult = ReturnType<typeof useGetAllParkourQuery>;
export type GetAllParkourLazyQueryHookResult = ReturnType<typeof useGetAllParkourLazyQuery>;
export type GetAllParkourSuspenseQueryHookResult = ReturnType<typeof useGetAllParkourSuspenseQuery>;
export type GetAllParkourQueryResult = Apollo.QueryResult<GetAllParkourQuery, GetAllParkourQueryVariables>;
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
    parkours {
      user_id
      parkour_id
      favoris
      note
      parkours {
        id
        title
      }
    }
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
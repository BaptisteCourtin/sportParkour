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
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
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

export type JoinUserParkourCreateEntity = {
  favoris: Scalars['Boolean']['input'];
  note?: InputMaybe<Scalars['Float']['input']>;
  parkour_id: Scalars['Float']['input'];
  user_id: Scalars['String']['input'];
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

export type MessageEntity = {
  __typename?: 'MessageEntity';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEpreuve: EpreuveEntity;
  createJoinUserParkour: JoinUserParkourEntity;
  createParkour: ParkourEntity;
  deleteEpreuve: MessageEntity;
  deleteParkour: MessageEntity;
  deleteUser: MessageEntity;
  inscription: MessageEntity;
  modifyEpreuve: EpreuveEntity;
  modifyParkour: ParkourEntity;
  modifyUser: UserEntity;
};


export type MutationCreateEpreuveArgs = {
  infos: EpreuveCreateEntity;
};


export type MutationCreateJoinUserParkourArgs = {
  infos: JoinUserParkourCreateEntity;
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
  id: Scalars['String']['input'];
  infos: UserUpdateEntity;
};

export type ParkourCreateEntity = {
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Difficulty>;
  epreuves?: InputMaybe<Array<Scalars['Int']['input']>>;
  length?: InputMaybe<Scalars['Float']['input']>;
  nbVote?: InputMaybe<Scalars['Float']['input']>;
  note?: InputMaybe<Scalars['Float']['input']>;
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
  nbVote?: InputMaybe<Scalars['Float']['input']>;
  note?: InputMaybe<Scalars['Float']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authentification: MessageEntity;
  getAllParkour: Array<ParkourEntity>;
  getEpreuve: EpreuveEntity;
  getListBySearch: Array<EpreuveEntity>;
  getListEpreuve: Array<EpreuveEntity>;
  getParkour: ParkourEntity;
  getUser: UserEntity;
  logout: MessageEntity;
};


export type QueryAuthentificationArgs = {
  infos: UserInputAuthEntity;
};


export type QueryGetEpreuveArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetListBySearchArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetParkourArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
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
  modifyUserId: Scalars['String']['input'];
}>;


export type ModifyUserMutation = { __typename?: 'Mutation', modifyUser: { __typename?: 'UserEntity', id: string, name: string, firstname: string, email: string, city?: string | null, codePostal?: string | null, phone?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'MessageEntity', message: string, success: boolean } };

export type GetEpreuveQueryVariables = Exact<{
  getEpreuveId: Scalars['Float']['input'];
}>;


export type GetEpreuveQuery = { __typename?: 'Query', getEpreuve: { __typename?: 'EpreuveEntity', id: string, title: string, description?: string | null, easyToDo?: string | null, mediumToDo?: string | null, hardToDo?: string | null, videoLink?: string | null, images?: Array<{ __typename?: 'ImageEpreuveEntity', id: string, lien?: string | null }> | null } };

export type GetListEpreuvesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListEpreuvesQuery = { __typename?: 'Query', getListEpreuve: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> };

export type GetListEpreuvesBySearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListEpreuvesBySearchQuery = { __typename?: 'Query', getListBySearch: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> };

export type GetParkourQueryVariables = Exact<{
  getParkourId: Scalars['Float']['input'];
}>;


export type GetParkourQuery = { __typename?: 'Query', getParkour: { __typename?: 'ParkourEntity', id: string, description?: string | null, title: string, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null } };

export type GetAllParkourQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParkourQuery = { __typename?: 'Query', getAllParkour: Array<{ __typename?: 'ParkourEntity', id: string, title: string, description?: string | null, time?: number | null, length?: number | null, difficulty?: Difficulty | null, city?: string | null, start: string, note?: number | null, nbVote?: number | null, images?: Array<{ __typename?: 'ImageParkourEntity', id: string, lien?: string | null }> | null, epreuves?: Array<{ __typename?: 'EpreuveEntity', id: string, title: string }> | null }> };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserEntity', id: string, name: string, firstname: string, email: string, city?: string | null, codePostal?: string | null, phone?: string | null, parkours?: Array<{ __typename?: 'JoinUserParkourEntity', note?: number | null, parkour_id: string, favoris: boolean, user_id: string, parkours: { __typename?: 'ParkourEntity', id: string, title: string } }> | null } };


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
    mutation ModifyUser($infos: UserUpdateEntity!, $modifyUserId: String!) {
  modifyUser(infos: $infos, id: $modifyUserId) {
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
 *      modifyUserId: // value for 'modifyUserId'
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
export const GetEpreuveDocument = gql`
    query GetEpreuve($getEpreuveId: Float!) {
  getEpreuve(id: $getEpreuveId) {
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
 * __useGetEpreuveQuery__
 *
 * To run a query within a React component, call `useGetEpreuveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpreuveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpreuveQuery({
 *   variables: {
 *      getEpreuveId: // value for 'getEpreuveId'
 *   },
 * });
 */
export function useGetEpreuveQuery(baseOptions: Apollo.QueryHookOptions<GetEpreuveQuery, GetEpreuveQueryVariables> & ({ variables: GetEpreuveQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEpreuveQuery, GetEpreuveQueryVariables>(GetEpreuveDocument, options);
      }
export function useGetEpreuveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEpreuveQuery, GetEpreuveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEpreuveQuery, GetEpreuveQueryVariables>(GetEpreuveDocument, options);
        }
export function useGetEpreuveSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEpreuveQuery, GetEpreuveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEpreuveQuery, GetEpreuveQueryVariables>(GetEpreuveDocument, options);
        }
export type GetEpreuveQueryHookResult = ReturnType<typeof useGetEpreuveQuery>;
export type GetEpreuveLazyQueryHookResult = ReturnType<typeof useGetEpreuveLazyQuery>;
export type GetEpreuveSuspenseQueryHookResult = ReturnType<typeof useGetEpreuveSuspenseQuery>;
export type GetEpreuveQueryResult = Apollo.QueryResult<GetEpreuveQuery, GetEpreuveQueryVariables>;
export const GetListEpreuvesDocument = gql`
    query GetListEpreuves {
  getListEpreuve {
    id
    title
  }
}
    `;

/**
 * __useGetListEpreuvesQuery__
 *
 * To run a query within a React component, call `useGetListEpreuvesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListEpreuvesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListEpreuvesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListEpreuvesQuery(baseOptions?: Apollo.QueryHookOptions<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>(GetListEpreuvesDocument, options);
      }
export function useGetListEpreuvesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>(GetListEpreuvesDocument, options);
        }
export function useGetListEpreuvesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>(GetListEpreuvesDocument, options);
        }
export type GetListEpreuvesQueryHookResult = ReturnType<typeof useGetListEpreuvesQuery>;
export type GetListEpreuvesLazyQueryHookResult = ReturnType<typeof useGetListEpreuvesLazyQuery>;
export type GetListEpreuvesSuspenseQueryHookResult = ReturnType<typeof useGetListEpreuvesSuspenseQuery>;
export type GetListEpreuvesQueryResult = Apollo.QueryResult<GetListEpreuvesQuery, GetListEpreuvesQueryVariables>;
export const GetListEpreuvesBySearchDocument = gql`
    query GetListEpreuvesBySearch($search: String) {
  getListBySearch(search: $search) {
    id
    title
  }
}
    `;

/**
 * __useGetListEpreuvesBySearchQuery__
 *
 * To run a query within a React component, call `useGetListEpreuvesBySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListEpreuvesBySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListEpreuvesBySearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetListEpreuvesBySearchQuery(baseOptions?: Apollo.QueryHookOptions<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>(GetListEpreuvesBySearchDocument, options);
      }
export function useGetListEpreuvesBySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>(GetListEpreuvesBySearchDocument, options);
        }
export function useGetListEpreuvesBySearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>(GetListEpreuvesBySearchDocument, options);
        }
export type GetListEpreuvesBySearchQueryHookResult = ReturnType<typeof useGetListEpreuvesBySearchQuery>;
export type GetListEpreuvesBySearchLazyQueryHookResult = ReturnType<typeof useGetListEpreuvesBySearchLazyQuery>;
export type GetListEpreuvesBySearchSuspenseQueryHookResult = ReturnType<typeof useGetListEpreuvesBySearchSuspenseQuery>;
export type GetListEpreuvesBySearchQueryResult = Apollo.QueryResult<GetListEpreuvesBySearchQuery, GetListEpreuvesBySearchQueryVariables>;
export const GetParkourDocument = gql`
    query GetParkour($getParkourId: Float!) {
  getParkour(id: $getParkourId) {
    id
    description
    title
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
 * __useGetParkourQuery__
 *
 * To run a query within a React component, call `useGetParkourQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParkourQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParkourQuery({
 *   variables: {
 *      getParkourId: // value for 'getParkourId'
 *   },
 * });
 */
export function useGetParkourQuery(baseOptions: Apollo.QueryHookOptions<GetParkourQuery, GetParkourQueryVariables> & ({ variables: GetParkourQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParkourQuery, GetParkourQueryVariables>(GetParkourDocument, options);
      }
export function useGetParkourLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParkourQuery, GetParkourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParkourQuery, GetParkourQueryVariables>(GetParkourDocument, options);
        }
export function useGetParkourSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetParkourQuery, GetParkourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetParkourQuery, GetParkourQueryVariables>(GetParkourDocument, options);
        }
export type GetParkourQueryHookResult = ReturnType<typeof useGetParkourQuery>;
export type GetParkourLazyQueryHookResult = ReturnType<typeof useGetParkourLazyQuery>;
export type GetParkourSuspenseQueryHookResult = ReturnType<typeof useGetParkourSuspenseQuery>;
export type GetParkourQueryResult = Apollo.QueryResult<GetParkourQuery, GetParkourQueryVariables>;
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
export const GetUserDocument = gql`
    query GetUser($getUserId: String!) {
  getUser(id: $getUserId) {
    id
    name
    firstname
    email
    city
    codePostal
    phone
    parkours {
      note
      parkour_id
      favoris
      user_id
      parkours {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUserId: // value for 'getUserId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
/* eslint-disable */
export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Folder_Entry = {
  __typename?: 'folder_entry'
  id: Scalars['Int']
  path: Scalars['String']
  folder_id: Scalars['Int']
  type: Scalars['String']
  folder?: Maybe<Namer_Watch_Folder>
}

export type Folder_Entry_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Folder_Entry_Bool_Exp>>>
  _or?: Maybe<Array<Maybe<Folder_Entry_Bool_Exp>>>
  _not?: Maybe<Folder_Entry_Bool_Exp>
  id?: Maybe<Int_Comparison_Exp>
  path?: Maybe<String_Comparison_Exp>
  folder_id?: Maybe<Int_Comparison_Exp>
  type?: Maybe<String_Comparison_Exp>
  folder?: Maybe<Namer_Watch_Folder_Bool_Exp>
}

export type Folder_Entry_Inc_Input = {
  id?: Maybe<Scalars['Int']>
  folder_id?: Maybe<Scalars['Int']>
}

export type Folder_Entry_Insert_Input = {
  id?: Maybe<Scalars['Int']>
  path?: Maybe<Scalars['String']>
  folder_id?: Maybe<Scalars['Int']>
  type?: Maybe<Scalars['String']>
}

export type Folder_Entry_Mutation_Response = {
  __typename?: 'folder_entry_mutation_response'
  affected_rows: Scalars['Int']
  returning: Array<Folder_Entry>
}

export type Folder_Entry_On_Conflict = {
  merge: Scalars['Boolean']
}

export type Folder_Entry_Order_By = {
  id?: Maybe<Order_By>
  path?: Maybe<Order_By>
  folder_id?: Maybe<Order_By>
  type?: Maybe<Order_By>
  folder?: Maybe<Namer_Watch_Folder_Order_By>
}

export type Folder_Entry_Pk_Columns_Input = {
  id: Scalars['Int']
}

export type Folder_Entry_Set_Input = {
  id?: Maybe<Scalars['Int']>
  path?: Maybe<Scalars['String']>
  folder_id?: Maybe<Scalars['Int']>
  type?: Maybe<Scalars['String']>
}

export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>
  _neq?: Maybe<Scalars['Int']>
  _in?: Maybe<Array<Scalars['Int']>>
  _nin?: Maybe<Array<Scalars['Int']>>
  _lt?: Maybe<Scalars['Int']>
  _gt?: Maybe<Scalars['Int']>
  _gte?: Maybe<Scalars['Int']>
  _lte?: Maybe<Scalars['Int']>
  _is_null?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
  insert_namer?: Maybe<Namer_Mutation_Response>
  insert_namer_one?: Maybe<Namer>
  delete_namer?: Maybe<Namer_Mutation_Response>
  update_namer?: Maybe<Namer_Mutation_Response>
  delete_namer_by_pk?: Maybe<Namer>
  update_namer_by_pk?: Maybe<Namer>
  insert_namer_watch_folder?: Maybe<Namer_Watch_Folder_Mutation_Response>
  insert_namer_watch_folder_one?: Maybe<Namer_Watch_Folder>
  delete_namer_watch_folder?: Maybe<Namer_Watch_Folder_Mutation_Response>
  update_namer_watch_folder?: Maybe<Namer_Watch_Folder_Mutation_Response>
  delete_namer_watch_folder_by_pk?: Maybe<Namer_Watch_Folder>
  update_namer_watch_folder_by_pk?: Maybe<Namer_Watch_Folder>
  insert_folder_entry?: Maybe<Folder_Entry_Mutation_Response>
  insert_folder_entry_one?: Maybe<Folder_Entry>
  delete_folder_entry?: Maybe<Folder_Entry_Mutation_Response>
  update_folder_entry?: Maybe<Folder_Entry_Mutation_Response>
  delete_folder_entry_by_pk?: Maybe<Folder_Entry>
  update_folder_entry_by_pk?: Maybe<Folder_Entry>
  scan_namer?: Maybe<Scalars['Boolean']>
}

export type MutationInsert_NamerArgs = {
  objects: Array<Namer_Insert_Input>
  on_conflict?: Maybe<Namer_On_Conflict>
}

export type MutationInsert_Namer_OneArgs = {
  object?: Maybe<Namer_Insert_Input>
  on_conflict?: Maybe<Namer_On_Conflict>
}

export type MutationDelete_NamerArgs = {
  where?: Maybe<Namer_Bool_Exp>
}

export type MutationUpdate_NamerArgs = {
  _inc?: Maybe<Namer_Inc_Input>
  _set?: Maybe<Namer_Set_Input>
  where?: Maybe<Namer_Bool_Exp>
}

export type MutationDelete_Namer_By_PkArgs = {
  id: Scalars['Int']
}

export type MutationUpdate_Namer_By_PkArgs = {
  _inc?: Maybe<Namer_Inc_Input>
  _set?: Maybe<Namer_Set_Input>
  pk_columns: Namer_Pk_Columns_Input
}

export type MutationInsert_Namer_Watch_FolderArgs = {
  objects: Array<Namer_Watch_Folder_Insert_Input>
  on_conflict?: Maybe<Namer_Watch_Folder_On_Conflict>
}

export type MutationInsert_Namer_Watch_Folder_OneArgs = {
  object?: Maybe<Namer_Watch_Folder_Insert_Input>
  on_conflict?: Maybe<Namer_Watch_Folder_On_Conflict>
}

export type MutationDelete_Namer_Watch_FolderArgs = {
  where?: Maybe<Namer_Watch_Folder_Bool_Exp>
}

export type MutationUpdate_Namer_Watch_FolderArgs = {
  _inc?: Maybe<Namer_Watch_Folder_Inc_Input>
  _set?: Maybe<Namer_Watch_Folder_Set_Input>
  where?: Maybe<Namer_Watch_Folder_Bool_Exp>
}

export type MutationDelete_Namer_Watch_Folder_By_PkArgs = {
  id: Scalars['Int']
}

export type MutationUpdate_Namer_Watch_Folder_By_PkArgs = {
  _inc?: Maybe<Namer_Watch_Folder_Inc_Input>
  _set?: Maybe<Namer_Watch_Folder_Set_Input>
  pk_columns: Namer_Watch_Folder_Pk_Columns_Input
}

export type MutationInsert_Folder_EntryArgs = {
  objects: Array<Folder_Entry_Insert_Input>
  on_conflict?: Maybe<Folder_Entry_On_Conflict>
}

export type MutationInsert_Folder_Entry_OneArgs = {
  object?: Maybe<Folder_Entry_Insert_Input>
  on_conflict?: Maybe<Folder_Entry_On_Conflict>
}

export type MutationDelete_Folder_EntryArgs = {
  where?: Maybe<Folder_Entry_Bool_Exp>
}

export type MutationUpdate_Folder_EntryArgs = {
  _inc?: Maybe<Folder_Entry_Inc_Input>
  _set?: Maybe<Folder_Entry_Set_Input>
  where?: Maybe<Folder_Entry_Bool_Exp>
}

export type MutationDelete_Folder_Entry_By_PkArgs = {
  id: Scalars['Int']
}

export type MutationUpdate_Folder_Entry_By_PkArgs = {
  _inc?: Maybe<Folder_Entry_Inc_Input>
  _set?: Maybe<Folder_Entry_Set_Input>
  pk_columns: Folder_Entry_Pk_Columns_Input
}

export type MutationScan_NamerArgs = {
  id: Scalars['Int']
}

export type Namer = {
  __typename?: 'namer'
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  active?: Maybe<Scalars['Int']>
  to_dir?: Maybe<Scalars['String']>
  folders?: Maybe<Array<Maybe<Namer_Watch_Folder>>>
}

export type Namer_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Namer_Bool_Exp>>>
  _or?: Maybe<Array<Maybe<Namer_Bool_Exp>>>
  _not?: Maybe<Namer_Bool_Exp>
  id?: Maybe<Int_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  type?: Maybe<String_Comparison_Exp>
  active?: Maybe<Int_Comparison_Exp>
  to_dir?: Maybe<String_Comparison_Exp>
  folders?: Maybe<Namer_Watch_Folder_Bool_Exp>
}

export type Namer_Inc_Input = {
  id?: Maybe<Scalars['Int']>
  active?: Maybe<Scalars['Int']>
}

export type Namer_Insert_Input = {
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  active?: Maybe<Scalars['Int']>
  to_dir?: Maybe<Scalars['String']>
}

export type Namer_Mutation_Response = {
  __typename?: 'namer_mutation_response'
  affected_rows: Scalars['Int']
  returning: Array<Namer>
}

export type Namer_On_Conflict = {
  merge: Scalars['Boolean']
}

export type Namer_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  type?: Maybe<Order_By>
  active?: Maybe<Order_By>
  to_dir?: Maybe<Order_By>
  folders?: Maybe<Namer_Watch_Folder_Order_By>
}

export type Namer_Pk_Columns_Input = {
  id: Scalars['Int']
}

export type Namer_Set_Input = {
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  active?: Maybe<Scalars['Int']>
  to_dir?: Maybe<Scalars['String']>
}

export type Namer_Watch_Folder = {
  __typename?: 'namer_watch_folder'
  id: Scalars['Int']
  namer_id: Scalars['Int']
  folder: Scalars['String']
  frequency?: Maybe<Scalars['Int']>
  method: Scalars['String']
  namer?: Maybe<Namer>
  folders?: Maybe<Array<Maybe<Folder_Entry>>>
}

export type Namer_Watch_Folder_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Namer_Watch_Folder_Bool_Exp>>>
  _or?: Maybe<Array<Maybe<Namer_Watch_Folder_Bool_Exp>>>
  _not?: Maybe<Namer_Watch_Folder_Bool_Exp>
  id?: Maybe<Int_Comparison_Exp>
  namer_id?: Maybe<Int_Comparison_Exp>
  folder?: Maybe<String_Comparison_Exp>
  frequency?: Maybe<Int_Comparison_Exp>
  method?: Maybe<String_Comparison_Exp>
  namer?: Maybe<Namer_Bool_Exp>
  folders?: Maybe<Folder_Entry_Bool_Exp>
}

export type Namer_Watch_Folder_Inc_Input = {
  id?: Maybe<Scalars['Int']>
  namer_id?: Maybe<Scalars['Int']>
  frequency?: Maybe<Scalars['Int']>
}

export type Namer_Watch_Folder_Insert_Input = {
  id?: Maybe<Scalars['Int']>
  namer_id?: Maybe<Scalars['Int']>
  folder?: Maybe<Scalars['String']>
  frequency?: Maybe<Scalars['Int']>
  method?: Maybe<Scalars['String']>
}

export type Namer_Watch_Folder_Mutation_Response = {
  __typename?: 'namer_watch_folder_mutation_response'
  affected_rows: Scalars['Int']
  returning: Array<Namer_Watch_Folder>
}

export type Namer_Watch_Folder_On_Conflict = {
  merge: Scalars['Boolean']
}

export type Namer_Watch_Folder_Order_By = {
  id?: Maybe<Order_By>
  namer_id?: Maybe<Order_By>
  folder?: Maybe<Order_By>
  frequency?: Maybe<Order_By>
  method?: Maybe<Order_By>
  namer?: Maybe<Namer_Order_By>
  folders?: Maybe<Folder_Entry_Order_By>
}

export type Namer_Watch_Folder_Pk_Columns_Input = {
  id: Scalars['Int']
}

export type Namer_Watch_Folder_Set_Input = {
  id?: Maybe<Scalars['Int']>
  namer_id?: Maybe<Scalars['Int']>
  folder?: Maybe<Scalars['String']>
  frequency?: Maybe<Scalars['Int']>
  method?: Maybe<Scalars['String']>
}

export enum Order_By {
  Desc = 'desc',
  Asc = 'asc',
}

export type Query = {
  __typename?: 'Query'
  namer: Array<Namer>
  namer_by_pk?: Maybe<Namer>
  namer_watch_folder: Array<Namer_Watch_Folder>
  namer_watch_folder_by_pk?: Maybe<Namer_Watch_Folder>
  folder_entry: Array<Folder_Entry>
  folder_entry_by_pk?: Maybe<Folder_Entry>
}

export type QueryNamerArgs = {
  order?: Maybe<Array<Namer_Order_By>>
  where?: Maybe<Namer_Bool_Exp>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryNamer_By_PkArgs = {
  id: Scalars['Int']
}

export type QueryNamer_Watch_FolderArgs = {
  order?: Maybe<Array<Namer_Watch_Folder_Order_By>>
  where?: Maybe<Namer_Watch_Folder_Bool_Exp>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryNamer_Watch_Folder_By_PkArgs = {
  id: Scalars['Int']
}

export type QueryFolder_EntryArgs = {
  order?: Maybe<Array<Folder_Entry_Order_By>>
  where?: Maybe<Folder_Entry_Bool_Exp>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryFolder_Entry_By_PkArgs = {
  id: Scalars['Int']
}

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  _nin?: Maybe<Array<Scalars['String']>>
  _lt?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _is_null?: Maybe<Scalars['Boolean']>
  _like?: Maybe<Scalars['String']>
  _nlike?: Maybe<Scalars['String']>
}

export type Subscription = {
  __typename?: 'Subscription'
  namer_entries?: Maybe<Folder_Entry>
}

export type SubscriptionNamer_EntriesArgs = {
  id: Scalars['Int']
}

export type InsertFolderMutationVariables = {
  namer_id: Scalars['Int']
  folder: Scalars['String']
}

export type InsertFolderMutation = { __typename?: 'Mutation' } & {
  insert_namer_watch_folder_one?: Maybe<
    { __typename?: 'namer_watch_folder' } & Pick<
      Namer_Watch_Folder,
      'id' | 'folder'
    >
  >
}

export type InsertNamerMutationVariables = {
  name: Scalars['String']
  type: Scalars['String']
}

export type InsertNamerMutation = { __typename?: 'Mutation' } & {
  insert_namer_one?: Maybe<
    { __typename?: 'namer' } & Pick<Namer, 'id' | 'name'>
  >
}

export type NamerEntriesSubscriptionVariables = {
  id: Scalars['Int']
}

export type NamerEntriesSubscription = { __typename?: 'Subscription' } & {
  namer_entries?: Maybe<
    { __typename?: 'folder_entry' } & Pick<
      Folder_Entry,
      'id' | 'folder_id' | 'path' | 'type'
    >
  >
}

export type GetFoldersQueryVariables = {
  id: Scalars['Int']
}

export type GetFoldersQuery = { __typename?: 'Query' } & {
  folder_entry: Array<
    { __typename?: 'folder_entry' } & Pick<
      Folder_Entry,
      'id' | 'folder_id' | 'path'
    >
  >
}

export type GetNamersQueryVariables = {}

export type GetNamersQuery = { __typename?: 'Query' } & {
  namer: Array<{ __typename?: 'namer' } & Pick<Namer, 'id' | 'name' | 'type'>>
}

export type GetNamerQueryVariables = {
  id: Scalars['Int']
}

export type GetNamerQuery = { __typename?: 'Query' } & {
  namer_by_pk?: Maybe<
    { __typename?: 'namer' } & Pick<
      Namer,
      'id' | 'name' | 'type' | 'to_dir'
    > & {
        folders?: Maybe<
          Array<
            Maybe<
              { __typename?: 'namer_watch_folder' } & Pick<
                Namer_Watch_Folder,
                'id' | 'folder' | 'method'
              >
            >
          >
        >
      }
  >
}

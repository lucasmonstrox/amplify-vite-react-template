/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Attachment = {
  __typename: "Attachment",
  createdAt: string,
  data?: string | null,
  id: string,
  owner?: string | null,
  updatedAt: string,
};

export type ModelAttachmentFilterInput = {
  and?: Array< ModelAttachmentFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  data?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAttachmentFilterInput | null,
  or?: Array< ModelAttachmentFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelAttachmentConnection = {
  __typename: "ModelAttachmentConnection",
  items:  Array<Attachment | null >,
  nextToken?: string | null,
};

export type ModelAttachmentConditionInput = {
  and?: Array< ModelAttachmentConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  data?: ModelStringInput | null,
  not?: ModelAttachmentConditionInput | null,
  or?: Array< ModelAttachmentConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateAttachmentInput = {
  data?: string | null,
  id?: string | null,
};

export type DeleteAttachmentInput = {
  id: string,
};

export type UpdateAttachmentInput = {
  data?: string | null,
  id: string,
};

export type ModelSubscriptionAttachmentFilterInput = {
  and?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type GetAttachmentQueryVariables = {
  id: string,
};

export type GetAttachmentQuery = {
  getAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type ListAttachmentsQueryVariables = {
  filter?: ModelAttachmentFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAttachmentsQuery = {
  listAttachments?:  {
    __typename: "ModelAttachmentConnection",
    items:  Array< {
      __typename: "Attachment",
      createdAt: string,
      data?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateAttachmentMutationVariables = {
  condition?: ModelAttachmentConditionInput | null,
  input: CreateAttachmentInput,
};

export type CreateAttachmentMutation = {
  createAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteAttachmentMutationVariables = {
  condition?: ModelAttachmentConditionInput | null,
  input: DeleteAttachmentInput,
};

export type DeleteAttachmentMutation = {
  deleteAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateAttachmentMutationVariables = {
  condition?: ModelAttachmentConditionInput | null,
  input: UpdateAttachmentInput,
};

export type UpdateAttachmentMutation = {
  updateAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
  owner?: string | null,
};

export type OnCreateAttachmentSubscription = {
  onCreateAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAttachmentSubscription = {
  onDeleteAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAttachmentSubscription = {
  onUpdateAttachment?:  {
    __typename: "Attachment",
    createdAt: string,
    data?: string | null,
    id: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

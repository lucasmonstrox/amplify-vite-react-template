/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAttachment = /* GraphQL */ `query GetAttachment($id: ID!) {
  getAttachment(id: $id) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAttachmentQueryVariables,
  APITypes.GetAttachmentQuery
>;
export const listAttachments = /* GraphQL */ `query ListAttachments(
  $filter: ModelAttachmentFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAttachments(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      data
      id
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAttachmentsQueryVariables,
  APITypes.ListAttachmentsQuery
>;

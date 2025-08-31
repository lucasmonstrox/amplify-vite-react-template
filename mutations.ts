/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAttachment = /* GraphQL */ `mutation CreateAttachment(
  $condition: ModelAttachmentConditionInput
  $input: CreateAttachmentInput!
) {
  createAttachment(condition: $condition, input: $input) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAttachmentMutationVariables,
  APITypes.CreateAttachmentMutation
>;
export const deleteAttachment = /* GraphQL */ `mutation DeleteAttachment(
  $condition: ModelAttachmentConditionInput
  $input: DeleteAttachmentInput!
) {
  deleteAttachment(condition: $condition, input: $input) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAttachmentMutationVariables,
  APITypes.DeleteAttachmentMutation
>;
export const updateAttachment = /* GraphQL */ `mutation UpdateAttachment(
  $condition: ModelAttachmentConditionInput
  $input: UpdateAttachmentInput!
) {
  updateAttachment(condition: $condition, input: $input) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAttachmentMutationVariables,
  APITypes.UpdateAttachmentMutation
>;

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAttachment = /* GraphQL */ `subscription OnCreateAttachment(
  $filter: ModelSubscriptionAttachmentFilterInput
  $owner: String
) {
  onCreateAttachment(filter: $filter, owner: $owner) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAttachmentSubscriptionVariables,
  APITypes.OnCreateAttachmentSubscription
>;
export const onDeleteAttachment = /* GraphQL */ `subscription OnDeleteAttachment(
  $filter: ModelSubscriptionAttachmentFilterInput
  $owner: String
) {
  onDeleteAttachment(filter: $filter, owner: $owner) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAttachmentSubscriptionVariables,
  APITypes.OnDeleteAttachmentSubscription
>;
export const onUpdateAttachment = /* GraphQL */ `subscription OnUpdateAttachment(
  $filter: ModelSubscriptionAttachmentFilterInput
  $owner: String
) {
  onUpdateAttachment(filter: $filter, owner: $owner) {
    createdAt
    data
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAttachmentSubscriptionVariables,
  APITypes.OnUpdateAttachmentSubscription
>;

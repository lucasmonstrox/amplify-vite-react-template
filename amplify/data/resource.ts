import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

export const schema = a.schema({
  Attachment: a
    .model({
      id: a.id(),
      data: a.json(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

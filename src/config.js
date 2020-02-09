export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_UJQs7zJIzntPN1pXdLRBBIIq00tzxVN5PJ",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-uploads-cl"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://6u26xn64ub.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_FpxUDSX3U",
    APP_CLIENT_ID: "5841laobkcujjki7m4guekhuem",
    IDENTITY_POOL_ID: "eu-central-1:75455d4f-32c5-43fd-bd17-ac75f0df9936"
  }
};
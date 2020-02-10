export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_UJQs7zJIzntPN1pXdLRBBIIq00tzxVN5PJ",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-api-dev-attachmentsbucket-b2i0nj5hnvd0"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://uz3245lz3f.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_xdKkCn7qL",
    APP_CLIENT_ID: "1uu4r19qn5irj592itjr9th9md",
    IDENTITY_POOL_ID: "eu-central-1:602aebe3-423b-4f33-b8fd-c66d4979b0be"
  }
};
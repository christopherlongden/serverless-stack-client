const dev = {
  Environment_Name: "Development",
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

const prod = {
  Environment_Name: "Production",
  STRIPE_KEY: "pk_test_UJQs7zJIzntPN1pXdLRBBIIq00tzxVN5PJ",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-api-prod-attachmentsbucket-18f4bre50zw21"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://9fiwq44h75.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_RzWP6juIg",
    APP_CLIENT_ID: "1tjujqp131kqv2lm0k0r65dkt6",
    IDENTITY_POOL_ID: "eu-central-1:08ab8c9b-15ea-45ef-9e8c-e28461801629"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
// import { CubeApi, CubejsClient } from '@cubejs-client/core';
// import { CubejsReactClient } from '@cubejs-client/react';
import cube from "@cubejs-client/core";
// import { CubeProvider, useCubeQuery } from "@cubejs-client/react";

// const cubejsApi = new CubeApi(process.env.REACT_APP_CUBEJS_TOKEN);
console.log('7');
const cubejsApi = cube(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMDI2NzV9.bxMmsCMS4jWzzRTsr9_efC4EidYEew6jR_SZJ-S5eZw",
    {
      apiUrl:
        "https://indigo-earwig.aws-eu-central-1.cubecloudapp.dev/cubejs-api/v1",
    }
  );
  console.log('15');
  console.log('14', {cubejsApi})

  export const cubejs = cubejsApi;
// export const cubejs = new CubejsClient(cubejsApi);
// export const CubejsProvider = CubejsReactClient;

const queryHasuraGQL = async (
  operationsDoc: string,
  operationName: string,
  variables: any,
  token: string
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      operationName: operationName,
      variables: variables,
    }),
  });

  return await result.json();
};

export const isNewUser = async (token: string, issuer: string) => {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;
  const res = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    {
      issuer,
    },
    token
  );
  return res?.users?.length === 0;
};

export const createNewUser = async (token: string, metadata: any) => {
  const { id, email, issuer, publicAddress } = metadata;
  const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}){
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  const res = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    {
      id,
      email,
      issuer,
      publicAddress,
    },
    token
  );
  return res?.users?.length === 0;
};

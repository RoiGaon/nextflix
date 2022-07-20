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

const queryHasuraGQL = async (
  operationsDoc: string,
  operationName: string,
  variables: any
) => {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL!, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      operationName: operationName,
      variables: variables,
    }),
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
    },
  });

  return await result.json();
};

const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuer
        publicAddress
      }
    }
  `;

function fetchMyQuery() {
  return queryHasuraGQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

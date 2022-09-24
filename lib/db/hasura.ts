import { VideoStatGraphQLData } from "types";

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
  return res?.data?.users?.length === 0;
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
  return res?.data?.users?.length === 0;
};

export const findVideoIdByUser = async (
  token: string,
  userId: string,
  videoId: string
) => {
  const operationsDoc = `query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }`;

  const res = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      userId,
      videoId,
    },
    token
  );

  return res?.data?.stats;
};

export const insertStat = async (
  token: string,
  { favourited, watched, userId, videoId }: VideoStatGraphQLData
) => {
  const operationsDoc = `mutation insertStat($favourited: Int!, $watched: Boolean!, $userId: String!, $videoId: String!) {
    insert_stats_one(object: {
      favourited: $favourited,
      userId: $userId,
      videoId: $videoId,
      watched: $watched
    }) {
      favourited
      userId
    }
  }`;

  return await queryHasuraGQL(
    operationsDoc,
    "insertStat",
    {
      favourited,
      watched,
      userId,
      videoId,
    },
    token
  );
};

export const updateStat = async (
  token: string,
  { favourited, watched, userId, videoId }: VideoStatGraphQLData
) => {
  const operationsDoc = `mutation updateStat($watched: Boolean!, $userId: String!, $videoId: String!, $favourited: Int!) {
    update_stats(
      _set: {watched: $watched, favourited: $favourited},
      where: {
        userId: {_eq: $userId},
        videoId: {_eq: $videoId}
      }) {
      returning {
        favourited,
        userId,
        videoId,
        watched
      }
    }
  }`;

  return await queryHasuraGQL(
    operationsDoc,
    "updateStat",
    {
      favourited,
      watched,
      userId,
      videoId,
    },
    token
  );
};

export async function getWatchedVideos(userId: string, token: string) {
  const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {
      watched: {_eq: true}, 
      userId: {_eq: $userId},
    }) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "watchedVideos",
    {
      userId,
    },
    token
  );

  return response?.data?.stats;
}

export async function getMyListVideos(userId: string, token: string) {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    stats(where: {
      userId: {_eq: $userId},
      favourited: {_eq: 1}
    }) {
      favourited
      userId
      videoId
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "favouritedVideos",
    {
      userId,
    },
    token
  );

  return response?.data?.stats;
}

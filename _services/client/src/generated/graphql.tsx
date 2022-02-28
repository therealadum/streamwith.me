import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createStream: Stream;
  ping: Scalars['String'];
};


export type MutationCreateStreamArgs = {
  uuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  streams: Array<Stream>;
};

export type Stream = {
  __typename?: 'Stream';
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  ping: Scalars['String'];
  streams?: Maybe<Array<Maybe<Stream>>>;
};

export type StreamFragmentFragment = { __typename: 'Stream', id: string };

export type StreamsQueryVariables = Exact<{ [key: string]: never; }>;


export type StreamsQuery = { __typename?: 'Query', streams: Array<{ __typename: 'Stream', id: string }> };

export type CreateStreamMutationVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type CreateStreamMutation = { __typename?: 'Mutation', createStream: { __typename: 'Stream', id: string } };

export type SubStreamsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubStreamsSubscription = { __typename?: 'Subscription', streams?: Array<{ __typename: 'Stream', id: string } | null> | null };

export const StreamFragmentFragmentDoc = gql`
    fragment streamFragment on Stream {
  __typename
  id
}
    `;
export const StreamsDocument = gql`
    query streams {
  streams {
    ...streamFragment
  }
}
    ${StreamFragmentFragmentDoc}`;

/**
 * __useStreamsQuery__
 *
 * To run a query within a React component, call `useStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamsQuery(baseOptions?: Apollo.QueryHookOptions<StreamsQuery, StreamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamsQuery, StreamsQueryVariables>(StreamsDocument, options);
      }
export function useStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamsQuery, StreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamsQuery, StreamsQueryVariables>(StreamsDocument, options);
        }
export type StreamsQueryHookResult = ReturnType<typeof useStreamsQuery>;
export type StreamsLazyQueryHookResult = ReturnType<typeof useStreamsLazyQuery>;
export type StreamsQueryResult = Apollo.QueryResult<StreamsQuery, StreamsQueryVariables>;
export const CreateStreamDocument = gql`
    mutation createStream($uuid: ID!) {
  createStream(uuid: $uuid) {
    ...streamFragment
  }
}
    ${StreamFragmentFragmentDoc}`;
export type CreateStreamMutationFn = Apollo.MutationFunction<CreateStreamMutation, CreateStreamMutationVariables>;

/**
 * __useCreateStreamMutation__
 *
 * To run a mutation, you first call `useCreateStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStreamMutation, { data, loading, error }] = useCreateStreamMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useCreateStreamMutation(baseOptions?: Apollo.MutationHookOptions<CreateStreamMutation, CreateStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStreamMutation, CreateStreamMutationVariables>(CreateStreamDocument, options);
      }
export type CreateStreamMutationHookResult = ReturnType<typeof useCreateStreamMutation>;
export type CreateStreamMutationResult = Apollo.MutationResult<CreateStreamMutation>;
export type CreateStreamMutationOptions = Apollo.BaseMutationOptions<CreateStreamMutation, CreateStreamMutationVariables>;
export const SubStreamsDocument = gql`
    subscription subStreams {
  streams {
    ...streamFragment
  }
}
    ${StreamFragmentFragmentDoc}`;

/**
 * __useSubStreamsSubscription__
 *
 * To run a query within a React component, call `useSubStreamsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubStreamsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubStreamsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubStreamsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubStreamsSubscription, SubStreamsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubStreamsSubscription, SubStreamsSubscriptionVariables>(SubStreamsDocument, options);
      }
export type SubStreamsSubscriptionHookResult = ReturnType<typeof useSubStreamsSubscription>;
export type SubStreamsSubscriptionResult = Apollo.SubscriptionResult<SubStreamsSubscription>;
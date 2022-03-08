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
  setStreamState: StreamState;
};


export type MutationCreateStreamArgs = {
  uuid: Scalars['ID'];
};


export type MutationSetStreamStateArgs = {
  streamStateInput: StreamStateInput;
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  streamState: StreamState;
  streams: Array<Stream>;
};

export type Stream = {
  __typename?: 'Stream';
  id: Scalars['ID'];
};

export type StreamMetadata = {
  __typename?: 'StreamMetadata';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type StreamMetadataInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type StreamState = {
  __typename?: 'StreamState';
  metadata?: Maybe<Array<Maybe<StreamMetadata>>>;
  mode: Scalars['String'];
};

export type StreamStateInput = {
  metadata?: InputMaybe<Array<InputMaybe<StreamMetadataInput>>>;
  mode: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  ping: Scalars['String'];
  streamState?: Maybe<StreamState>;
  streams?: Maybe<Array<Maybe<Stream>>>;
};

export type StreamFragmentFragment = { __typename: 'Stream', id: string };

export type StreamStateFragmentFragment = { __typename: 'StreamState', mode: string, metadata?: Array<{ __typename: 'StreamMetadata', key: string, value: string } | null> | null };

export type StreamsQueryVariables = Exact<{ [key: string]: never; }>;


export type StreamsQuery = { __typename?: 'Query', streams: Array<{ __typename: 'Stream', id: string }> };

export type CreateStreamMutationVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type CreateStreamMutation = { __typename?: 'Mutation', createStream: { __typename: 'Stream', id: string } };

export type SubStreamsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubStreamsSubscription = { __typename?: 'Subscription', streams?: Array<{ __typename: 'Stream', id: string } | null> | null };

export type StreamStateQueryVariables = Exact<{ [key: string]: never; }>;


export type StreamStateQuery = { __typename?: 'Query', streamState: { __typename: 'StreamState', mode: string, metadata?: Array<{ __typename: 'StreamMetadata', key: string, value: string } | null> | null } };

export type SubStreamStateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubStreamStateSubscription = { __typename?: 'Subscription', streamState?: { __typename: 'StreamState', mode: string, metadata?: Array<{ __typename: 'StreamMetadata', key: string, value: string } | null> | null } | null };

export type SetStreamStateMutationVariables = Exact<{
  streamStateInput: StreamStateInput;
}>;


export type SetStreamStateMutation = { __typename?: 'Mutation', setStreamState: { __typename: 'StreamState', mode: string, metadata?: Array<{ __typename: 'StreamMetadata', key: string, value: string } | null> | null } };

export const StreamFragmentFragmentDoc = gql`
    fragment streamFragment on Stream {
  __typename
  id
}
    `;
export const StreamStateFragmentFragmentDoc = gql`
    fragment streamStateFragment on StreamState {
  __typename
  mode
  metadata {
    __typename
    key
    value
  }
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
export const StreamStateDocument = gql`
    query streamState {
  streamState {
    ...streamStateFragment
  }
}
    ${StreamStateFragmentFragmentDoc}`;

/**
 * __useStreamStateQuery__
 *
 * To run a query within a React component, call `useStreamStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamStateQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamStateQuery(baseOptions?: Apollo.QueryHookOptions<StreamStateQuery, StreamStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamStateQuery, StreamStateQueryVariables>(StreamStateDocument, options);
      }
export function useStreamStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamStateQuery, StreamStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamStateQuery, StreamStateQueryVariables>(StreamStateDocument, options);
        }
export type StreamStateQueryHookResult = ReturnType<typeof useStreamStateQuery>;
export type StreamStateLazyQueryHookResult = ReturnType<typeof useStreamStateLazyQuery>;
export type StreamStateQueryResult = Apollo.QueryResult<StreamStateQuery, StreamStateQueryVariables>;
export const SubStreamStateDocument = gql`
    subscription subStreamState {
  streamState {
    ...streamStateFragment
  }
}
    ${StreamStateFragmentFragmentDoc}`;

/**
 * __useSubStreamStateSubscription__
 *
 * To run a query within a React component, call `useSubStreamStateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubStreamStateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubStreamStateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubStreamStateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubStreamStateSubscription, SubStreamStateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubStreamStateSubscription, SubStreamStateSubscriptionVariables>(SubStreamStateDocument, options);
      }
export type SubStreamStateSubscriptionHookResult = ReturnType<typeof useSubStreamStateSubscription>;
export type SubStreamStateSubscriptionResult = Apollo.SubscriptionResult<SubStreamStateSubscription>;
export const SetStreamStateDocument = gql`
    mutation setStreamState($streamStateInput: StreamStateInput!) {
  setStreamState(streamStateInput: $streamStateInput) {
    ...streamStateFragment
  }
}
    ${StreamStateFragmentFragmentDoc}`;
export type SetStreamStateMutationFn = Apollo.MutationFunction<SetStreamStateMutation, SetStreamStateMutationVariables>;

/**
 * __useSetStreamStateMutation__
 *
 * To run a mutation, you first call `useSetStreamStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStreamStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStreamStateMutation, { data, loading, error }] = useSetStreamStateMutation({
 *   variables: {
 *      streamStateInput: // value for 'streamStateInput'
 *   },
 * });
 */
export function useSetStreamStateMutation(baseOptions?: Apollo.MutationHookOptions<SetStreamStateMutation, SetStreamStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStreamStateMutation, SetStreamStateMutationVariables>(SetStreamStateDocument, options);
      }
export type SetStreamStateMutationHookResult = ReturnType<typeof useSetStreamStateMutation>;
export type SetStreamStateMutationResult = Apollo.MutationResult<SetStreamStateMutation>;
export type SetStreamStateMutationOptions = Apollo.BaseMutationOptions<SetStreamStateMutation, SetStreamStateMutationVariables>;
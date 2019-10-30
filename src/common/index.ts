import { ApolloCache } from 'apollo-cache'
import { IdGetter, NormalizedCacheObject } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { Response } from 'express'
import { GraphQLResolveInfo } from 'graphql'

export type AllowedNames<TBase, TCondition> = FilterFlags<
  TBase,
  TCondition
>[keyof TBase]

type FieldResolver<
  TSource = any,
  TContext = any,
  TArgs = Record<string, any>
> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any

export type FilterFlags<TBase, TCondition> = {
  [TKey in keyof TBase]: TCondition extends Extract<TBase[TKey], TCondition>
    ? TKey
    : never
}

type Primitive<TBase> = SubType<TBase, string | number | boolean>

export type Queried<TBase> = { __typename: string } & Primitive<TBase>

export type Resolvers<TSource = any, TContext = any> = Record<
  string,
  Record<string, FieldResolver<TSource, TContext>>
>

export type SubType<TBase, TCondition> = Pick<
  TBase,
  AllowedNames<TBase, TCondition>
>

export interface Context {
  locale: string
  res: Response
}

export interface LocalContext {
  cache: ApolloCache<NormalizedCacheObject>
  client: ApolloClient<NormalizedCacheObject>
  getCacheKey: IdGetter
}

export * from './translation'

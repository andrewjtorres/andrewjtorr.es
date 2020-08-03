import { ApolloClient } from '@apollo/client'
import {
  ApolloCache,
  IdGetter,
  NormalizedCacheObject,
} from '@apollo/client/cache'
import { FragmentMap } from '@apollo/client/utilities'
import { Response } from 'express'
import { FieldNode } from 'graphql'

export type AllowedNames<TBase, TCondition> = FilterFlags<
  TBase,
  TCondition
>[keyof TBase]

type FieldResolver<
  TSource = any,
  TContext = any,
  TArgs = Record<string, any>
> = (source?: TSource, args?: TArgs, context?: TContext, info?: Info) => any

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

interface Info {
  field: FieldNode
  fragmentMap: FragmentMap
}

export interface LocalContext {
  cache: ApolloCache<NormalizedCacheObject>
  client: ApolloClient<NormalizedCacheObject>
  getCacheKey: IdGetter
}

export * from './translation'

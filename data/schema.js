/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  User,
  Widget,
  VisitorCountWidget,
  PostCountWidget,
  getUser,
  getViewer,
  getWidget,
  getWidgets
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (['Widget', 'VisitorCountWidget', 'PostCountWidget'].includes(type)) {
      return getWidget(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    } else if (obj instanceof Widget)  {
      return WidgetType;
    } else if (obj instanceof VisitorCountWidget)  {
      return VisitorCountWidgetType;
    } else if (obj instanceof PostCountWidget)  {
      return PostCountWidgetType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    widgets: {
      type: widgetConnection,
      description: 'A person\'s collection of widgets',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getWidgets(), args)
    }
  }),
  interfaces: [nodeInterface]
});

var VisitorCountWidgetType = new GraphQLObjectType({
  name: 'VisitorCountWidget',
  description: 'Widget to display visitor count',
  fields: () => ({
    id: globalIdField('VisitorCountWidget'),
    visitorCount: {
      type: GraphQLInt,
      resolve: () => 10
    }
  }),
  interfaces: [nodeInterface]
});

var PostCountWidgetType = new GraphQLObjectType({
  name: 'PostCountWidget',
  description: 'Widget to display post count',
  fields: () => ({
    id: globalIdField('PostCountWidgetType'),
    postCount: {
      type: GraphQLInt,
      resolve: () => 123
    }
  }),
  interfaces: [nodeInterface]
});

var WidgetType = new GraphQLUnionType({
  name: 'Widget',
  description: 'A shiny widget',
  types: [VisitorCountWidgetType, PostCountWidgetType],
  resolveType: value => {
    if (value instanceof VisitorCountWidget) {
      return VisitorCountWidgetType;
    } else if (value instanceof PostCountWidget) {
      return PostCountWidgetType;
    } else {
      return null;
    }
  }
});

/**
 * Define your own connection types here
 */
var {connectionType: widgetConnection} =
  connectionDefinitions({name: 'Widget', nodeType: WidgetType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: UserType,
      resolve: () => getViewer()
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});

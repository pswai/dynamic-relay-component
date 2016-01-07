/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class User extends Object {}
class Widget extends Object {}
class VisitorCountWidget extends Widget {}
class PostCountWidget extends Widget {}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

let visitorCountWidget = new VisitorCountWidget();
visitorCountWidget.id = 'v1';
visitorCountWidget.visitorCount = 10;

let postCountWidget = new PostCountWidget();
postCountWidget.id = 'p1';
postCountWidget.postCount = 123;

let widgets = [visitorCountWidget, postCountWidget];

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: () => widgets,
  User,
  Widget,
  VisitorCountWidget,
  PostCountWidget
};

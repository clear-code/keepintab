'use strict';

const configs = new Configs({
  ignoreTargetBlank:          true,
  ignoreTargetSelfOrAncestor: true,
  ignoreTargetNamed:          false
});

browser.runtime.onMessage.addListener((message, sender) => {
  if (!message ||
      message.type != 'get-options')
    return;

  return Promise.resolve({
    ignoreTargetBlank:          configs.ignoreTargetBlank,
    ignoreTargetSelfOrAncestor: configs.ignoreTargetSelfOrAncestor,
    ignoreTargetNamed:          configs.ignoreTargetNamed
  });
});

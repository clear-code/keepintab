'use strict';

browser.runtime.onMessage.addListener((message, sender) => {
  if (!message ||
      message.type != 'get-options')
    return;

  return configs.$loaded.then(() => {
    return {
      ignoreTargetBlank:          configs.ignoreTargetBlank,
      ignoreTargetSelfOrAncestor: configs.ignoreTargetSelfOrAncestor,
      ignoreTargetNamed:          configs.ignoreTargetNamed
    };
  });
});

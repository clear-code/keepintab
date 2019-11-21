let options;

function tryRemoveTarget(element)
{
  let currentTarget = element.getAttribute('target');
  switch (currentTarget) {
    case '_blank':
      if (!options.ignoreTargetBlank)
        return;
      break;
    case '_self':
    case '_parent':
    case '_top':
      if (!options.ignoreTargetSelfOrAncestor)
        return;
      break;
    default:
      if (!currentTarget || !options.ignoreTargetNamed)
        return;
  }
  element.removeAttribute('target');
}

function removeTargetAttributes(parent)
{
  Array.from(parent.querySelectorAll('a[target]')).forEach(tryRemoveTarget);
}

// Create an observer instance
let observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.type === 'attributes' && m.target.hasAttribute('target')) {
      tryRemoveTarget(m.target);
    } else {
      removeTargetAttributes(m.target);
    }
  });
});

// Pass in the target node, as well as the observer options
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['target']
});


browser.runtime.sendMessage({ type: 'get-options' }).then(response => {
  options = response;
  removeTargetAttributes(document);
});

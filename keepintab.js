let options;

const SELF_OR_ANCESTOR = new Set(['_self', '_parent', '_top']);

function tryRemoveTarget(element)
{
  let currentTarget = element.getAttribute('target');
  if (!currentTarget) {
    return;
  }
  if ((options.ignoreTargetBlank &&
       currentTarget == '_blank') ||
      (options.ignoreTargetSelfOrAncestor &&
       SELF_OR_ANCESTOR.has(currentTarget)) ||
      options.ignoreTargetNamed) {
    element.removeAttribute('target');
  }
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

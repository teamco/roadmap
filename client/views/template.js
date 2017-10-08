import {runTemplateHelper} from '../../lib/utils';
import {pageTitle} from '../../lib/utils';
import {templateName} from '../../lib/utils';

/**
 * @method subscribe
 * @param models
 */
export const subscribe = modules => {
  if (typeof modules === 'string') {
    modules = [modules];
  }
  for (let i = 0; i < modules.length; i++) {
    Meteor.subscribe(modules[i]);
  }
};

Template.registerHelper('formatDate', (date, format) => {
  if (format === 'long') format = 'MMMM DD, YYYY H:mm:ss';
  if (format === 'short') format = 'MM-DD-YYYY H:mm:ss';
  return moment(date).format(format);
});

Template.registerHelper('fetchCountedTitle', () => {
  let title = pageTitle();
  const name = templateName();
  try {
    const counter = runTemplateHelper(Template[name], name + 'Count');
    return [title, counter].join(': ');
  } catch (e) {
    return 'Admin Dashboard';
  }
});

Template.registerHelper('fetchTitle', () => pageTitle());
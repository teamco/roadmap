import {runTemplateHelper} from '../../lib/utils';
import {pageTitle} from '../../lib/utils';
import {templateName} from '../../lib/utils';

/**
 * @method subscribe
 * @param models
 */
export const subscribe = models => {
  if (typeof models === 'string') {
    models = [models];
  }
  for (let i = 0; i < models.length; i++) {
    Meteor.subscribe(models[i]);
  }
};

/**
 * Get the parent template instance
 * @method parentTemplate
 * @memberOf Blaze.TemplateInstance
 * @param {Number} [levels] How many levels to go up. Default is 1
 * @returns {Blaze.TemplateInstance}
 */
Blaze.TemplateInstance.prototype.parentTemplate = function (levels) {
  let view = this.view;
  if (typeof levels === "undefined") {
    levels = 1;
  }
  while (view) {
    if (view.name.substring(0, 9) === "Template." && !(levels--)) {
      return view.templateInstance();
    }
    view = view.parentView;
  }
};

Template.registerHelper('formatDate', (date, format) => {
  if (format === 'long') format = 'MMMM DD, YYYY H:mm:ss';
  if (format === 'short') format = 'MM-DD-YYYY H:mm:ss';
  return moment(date).format(format);
});

Template.registerHelper('fetchCountedTitle', () => {
  FlowRouter.watchPathChange();
  let title = pageTitle();
  const name = templateName();
  try {
    const counter = runTemplateHelper(Template[name], name + 'Count');
    return [title, counter].join(': ');
  } catch (e) {
    return 'Admin Dashboard';
  }
});

Template.registerHelper('fetchTitle', () => {
  FlowRouter.watchPathChange();
  return pageTitle();
});
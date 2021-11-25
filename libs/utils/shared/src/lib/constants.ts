export const DEFAULT_UI_CONFIG = {};

export class DefaultQuery {
  static IS_RECORD: { query: { match: { isTemplate: 'n' } } };
  static IS_RECORD_OR_TEMPLATE = {
    query: { match: { isTemplate: ['n', 'y'] } },
  };
}

export class DefaultSource {
  static FOR_SEARCH = [
    'uuid',
    'resourceType',
    'resourceTitleObject',
    'resourceAbstractObject',
    'tag',
    'overview',
    'resourceType',
    'OrgForResource',
  ];
}

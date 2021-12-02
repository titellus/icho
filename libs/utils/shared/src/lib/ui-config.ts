export const DEFAULT_UI_CONFIG = {
  search: {
    size: 10,
    aggregations: {
      resourceType: {},
      "tag.default": {},
      OrgForResource: {
        meta: {
          type: "SingleList",
          props: {
            componentId: "OrgForResource",
            dataField: "OrgForResource",
            title: "Organisation",
            showSearch: false
          }
        }
      }
    }
  }
};

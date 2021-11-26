export const DEFAULT_UI_CONFIG = {
  search: {
    size: 10,
    aggregation: {
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

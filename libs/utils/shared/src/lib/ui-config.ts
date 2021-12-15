export const DEFAULT_UI_CONFIG = {
  search: {
    size: 10,
    aggregations: {
      format: {},
      "tag.default": {
        // meta: {
        //   type: "TagCloud",
        //   props: {
        //     multiSelect: true
        //   }
        // }
      },
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
      },
      creationYearForResource: {
        meta: {
          type: 'RangeSlider',
          props: {
            dataField:"creationYearForResource",
            range: {
              start: 1970,
              end: 2021
            }
          }
        }
      }
    }
  }
};

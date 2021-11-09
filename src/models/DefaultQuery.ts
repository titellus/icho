export class DefaultQuery {
  static IS_RECORD: { query: { match: { isTemplate: "n" } } };
  static IS_RECORD_OR_TEMPLATE = {
    query: { match: { isTemplate: ["n", "y"] } },
  };
}

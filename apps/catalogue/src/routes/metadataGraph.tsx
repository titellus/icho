import React from "react";
import {useParams} from "react-router-dom";
import {MetadataResultGraph} from "@catalogue/ui/view";

export function MetadataGraph() {
  const {id} = useParams();
  return <MetadataResultGraph uuid={id ||''}/>;
}

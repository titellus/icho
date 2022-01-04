import React from 'react';
import {MetadataResult} from "@catalogue/ui/search"
import {useParams} from "react-router-dom";

export function Metadata() {
  const {id} = useParams();
  return <MetadataResult uuid={id ||''}/>;
}

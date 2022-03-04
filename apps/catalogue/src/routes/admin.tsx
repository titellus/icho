import React from 'react';
import { Suspense } from 'react';

import {UiAdmin} from "@catalogue/ui/admin";

export function Admin() {

  return (<Suspense fallback="...is loading">
    <UiAdmin />
  </Suspense>)
}

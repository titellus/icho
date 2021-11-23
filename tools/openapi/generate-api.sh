#!/usr/bin/env bash

libName=$1
libRootPath="libs/api/$libName/src"
specPath="libs/api/$libName/"
specFile=$specPath/spec.yaml

rm -rf "$libRootPath"

mkdir -p "$specPath"
curl -o "$specFile" -H 'Accept: text/yaml,*/*' http://localhost:8080/geonetwork/srv/api/doc.yml


./node_modules/.bin/openapi-generator-cli generate \
  -i "$specFile" \
  -g typescript-axios \
  -o "$libRootPath" \
  --skip-validate-spec

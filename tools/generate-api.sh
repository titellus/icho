#!/usr/bin/env bash

libName=$1
libRootPath="src/libs/$libName/src"
specPath="src/libs/$libName/src"
specFile=$specPath/spec.yaml

rm -rf "$libRootPath"

mkdir -p "$specPath"
curl -o "$specFile" -H 'Accept: text/yaml,*/*' http://localhost:8080/geonetwork/srv/api/doc.yml


./node_modules/.bin/openapi-generator-cli generate \
  -i "$specFile" \
  -g typescript-axios \
  -o "$libRootPath" \
  --skip-validate-spec
#  -c tools/openapi-codegen-config.json \


./node_modules/prettier/bin-prettier.js  --write "$libRootPath/**/*.ts"

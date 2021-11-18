#!/usr/bin/env bash

libName=$1
libRootPath="libs/$libName/src"
specPath="libs/$libName/src"
specFile=$specPath/spec.yaml

rm -rf "$libRootPath"

mkdir -p "$specPath"
curl -o "$specFile" -H 'Accept: text/yaml,*/*' http://localhost:8080/geonetwork/srv/api/doc.yml


./node_modules/.bin/openapi-generator-cli generate \
  -i "$specFile" \
  -g typescript-axios \
  -o "$libRootPath" \
  -c tools/openapi-codegen-config.json \
  --skip-validate-spec \

./node_modules/prettier/bin-prettier.js  --write "$libRootPath/**/*.ts"

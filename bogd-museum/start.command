#!/bin/zsh
cd "${0:A:h}"
if command -v node >/dev/null 2>&1; then
  node server.mjs
else
  ruby server.rb
fi

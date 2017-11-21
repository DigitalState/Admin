#!/usr/bin/env bash
#echo 'Running the app in PROD mode'
#npm run server:prod

#tail -f /dev/null

DISCOVERY="${DISCOVERY:-''}"

sed -i -e "s/\(<script id=\"ds-discovery-env\">\).*\(<\/script>\)/<script id=\"ds-discovery-env\">window.dsDiscoveryEnv = $DISCOVERY<\/script>/g" ./dist/index.html

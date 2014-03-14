#!/bin/bash
get() {
    echo Generating mock for $1
    mkdir -p test/www.gittip.com/$(dirname $1)
    wget https://www.gittip.com/$1 -qO test/www.gittip.com/$1
}

get gittip/public.json
get gittip/charts.json

get rummik/public.json
get rummik/charts.json

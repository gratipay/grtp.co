#!/bin/bash
get() {
    echo Generating mock for $1
    mkdir -p test/www.gratipay.com/$(dirname $1)
    wget https://www.gratipay.com/$1 -qO test/www.gratipay.com/$1
}

get gratipay/public.json
get gratipay/charts.json

get rummik/public.json
get rummik/charts.json

#!/bin/bash
get() {
    echo Generating mock for $1
    mkdir -p test/gratipay.com/$(dirname $1)
    wget https://gratipay.com/$1 -qO test/gratipay.com/$1
}

get gratipay/public.json
get gratipay/charts.json

get rummik/public.json
get rummik/charts.json

get rummik/public.json
get rummik/charts.json

get northern-plains-athletics/public.json
get northern-plains-athletics/charts.json

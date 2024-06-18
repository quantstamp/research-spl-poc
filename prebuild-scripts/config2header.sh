#!/bin/sh

CONFIG_FILE=".config"
HEADER_FILE="config.h"

echo "/* Automatically generated from .config */" > $HEADER_FILE

grep "CONFIG_" $CONFIG_FILE | while read -r line; do
    # Handle boolean configs
    if echo $line | grep -q "=y"; then
        macro=$(echo $line | sed 's/=y//' | tr 'a-z' 'A-Z')
        echo "#define $macro 1" >> $HEADER_FILE
    elif echo $line | grep -q "=n"; then
        macro=$(echo $line | sed 's/=n//' | tr 'a-z' 'A-Z')
        echo "/* #undef $macro */" >> $HEADER_FILE
    fi
done
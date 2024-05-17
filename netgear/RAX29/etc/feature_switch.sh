#!/bin/sh
set -eu
# NOTE: For this script to work properly, the feature name should be the same as the field name in featureSwitch DAL table
help() {

    cat <<EOF
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
-=- Unified Feature Switch Utility Tool -=-
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

Usage:
 feature_switch.sh <Supported state> <Supported feature>

Eg. feature_switch.sh enable rp

Supported Features:
  rp                    -- Router Protection
  armorra               -- Armor Router Analytics

Supported states:
  enable                -- enable a feature
  disable               -- disable a feature

EOF
}

list_contains() {
    list="$1"
    item="$2"
    for list_item in $list; do
        if [ "$item" = "$list_item" ]; then
            return 0
        fi
    done
    return 1
}

validate_feature() {
    feature="$2"
    available_features="rp armorra"
    if [ "$feature" != "" ] && ! list_contains "$available_features" "$feature"; then
        logger -s -t feature_switch.sh "Error: Invalid feature: '$2'."
        help
        exit 1
    fi
}

validate_state() {
    state="$1"
    available_states="enable disable"
    if [ "$state" != "" ] && ! list_contains "$available_states" "$state"; then
        logger -s -t feature_switch.sh "Error: Invalid state: '$1'."
        help
        exit 1
    fi
}

if [ $# -lt 1 ]; then
    logger -s -t feature_switch.sh "ERROR: No. of arguments are less than 2"
    help
    exit 1
fi

validate_feature "$@"
validate_state "$@"

echo "Integrated feature $2 is being $1d"
d2 -c featureSwitch[0]."$2" "$1"

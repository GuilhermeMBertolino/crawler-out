#!/bin/sh
# Initialize or uninitialize the iptables/ip6tables to be used by EIOT agent.
# It assumes a trivial case, where a jump rule to the user defined-chain
# (by default named BD_FILTER) is added on the first position in filter/FORWARD
# (or filter/OUTPUT) and nat/PREROUTING built-in chain

# by default, in filter table, we add rules in FORWARD built-in chain
BUILTIN_CHAIN=FORWARD
# set the default user-defined chain name
USER_CHAIN=BD_FILTER
# by default only IPv4
IPV6=false
# support for -w option
OPTION_W=""
# flag indicating if ip6tables supports filter table
IP6TABLES_FILTER=false
# flag indicating if ip6tables supports nat table
IP6TABLES_NAT=false

die() {
    echo "$*" 1>&2
    exit 1
}

usage()
{
    echo "Usage: iptables.sh (init | list | reset | uninit) [-c USER_CHAIN] [-o] [-6]"
    echo
    echo "Commands:"
    echo "    init    initialize the iptables/ip6tables"
    echo "    list    list the related iptables/ip6tables chains"
    echo "    reset   reset the related iptables/ip6tables chains"
    echo "    uninit  uninitialize the iptables/ip6tables"
    echo
    echo "Options:"
    echo "    -c USER_CHAIN  specify the user-defined chain to be used."
    echo "                   Default: $USER_CHAIN."
    echo "    -6             flag indicating if IPv6 support is required."
    echo "                   By default only iptables is initialize/uninitialized."
    echo "    -o             for filter table, use OUTPUT instead of FORWARD built-in chain"
}

# check iptables support
check()
{
    iptables -V > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        die "iptables is not available"
    fi

    iptables -L -n > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        die "iptables permission denied"
    fi

    # check if -w option is available
    iptables -L -n -w > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        OPTION_W="-w"
    fi

    # check if ip6tables supports filter table
    ip6tables -t filter -L -n $OPTION_W > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        IP6TABLES_FILTER=true
    fi

    # check if ip6tables supports nat table
    ip6tables -t nat -L -n $OPTION_W > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        IP6TABLES_NAT=true
    fi
}

# initialize the iptables/ip6tables
init()
{
    # filter table
    if $2; then
        # create the user defined-chain
        $1 -t filter -N $USER_CHAIN $OPTION_W > /dev/null 2>&1
        # add the jump rule to built-in chain on the first position,  if it doesn't exists
        $1 -t filter -C $BUILTIN_CHAIN -j $USER_CHAIN $OPTION_W 2> /dev/null \
                || $1 -t filter -I $BUILTIN_CHAIN 1 -j $USER_CHAIN $OPTION_W \
                || die "Failed to add jump rule"
    fi

    # nat table
    if $3; then
        # create the user defined-chain
        $1 -t nat -N $USER_CHAIN $OPTION_W > /dev/null 2>&1
        # add the jump rule to built-in chain on the first position, if it doesn't exists
        $1 -t nat -C PREROUTING -j $USER_CHAIN $OPTION_W 2> /dev/null \
                || $1 -t nat -I PREROUTING 1 -j $USER_CHAIN $OPTION_W \
                || die "Failed to add jump rule"
    fi
}

# list the iptables/ip6tables
list()
{
    # filter table
    if $3; then
        echo
        echo "$2 filter"
        echo "-----------------------------------------------------"
        $1 -t filter -L $BUILTIN_CHAIN -n $OPTION_W
        echo
        $1 -t filter -L BD_FILTER -n $OPTION_W 2> /dev/null
        echo
        $1 -t filter -L bd_block -n $OPTION_W 2> /dev/null
        echo
        $1 -t filter -L bd_ghostr -n $OPTION_W 2> /dev/null
    fi

    # nat table
    if $4; then
        echo
        echo "$2 nat"
        echo "-----------------------------------------------------"
        $1 -t nat -L PREROUTING -n $OPTION_W
        echo
        $1 -t nat -L BD_FILTER -n $OPTION_W 2> /dev/null
        echo
        $1 -t nat -L bd_dns -n $OPTION_W 2> /dev/null
    fi
}

# reset the iptables/ip6tables
reset()
{
    if $2; then
        $1 -t filter -F BD_FILTER $OPTION_W
        $1 -t filter -F bd_block $OPTION_W
        $1 -t filter -X bd_block $OPTION_W
        $1 -t filter -F bd_ghostr $OPTION_W
        $1 -t filter -X bd_ghostr $OPTION_W
    fi

    if $3; then
        $1 -t nat -F BD_FILTER $OPTION_W
        $1 -t nat -F bd_dns $OPTION_W
        $1 -t nat -X bd_dns $OPTION_W
    fi
}

# uninitialize the iptables/ip6tables
uninit()
{
    # try best effort: execute all commands

    # filter table
    if $2; then
        # remove rule from built-in chain
        $1 -t filter -D $BUILTIN_CHAIN -j $USER_CHAIN $OPTION_W 2> /dev/null
        # flush user-defined chain
        $1 -t filter -F $USER_CHAIN $OPTION_W 2> /dev/null
        # remove user defined chain
        $1 -t filter -X $USER_CHAIN $OPTION_W 2> /dev/null
    fi

    # nat table
    if $3; then
        # remove rule from built-in chain
        $1 -t nat -D PREROUTING -j $USER_CHAIN $OPTION_W 2> /dev/null
        # flush user-defined chain
        $1 -t nat -F $USER_CHAIN $OPTION_W 2> /dev/null
        # remove user defined chain
        $1 -t nat -X $USER_CHAIN $OPTION_W 2> /dev/null
    fi
}

# we must have at least one argument
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

# extract the command: init or uninit
case $1 in
    init )
        COMMAND=init
        ;;

    list )
        COMMAND=list
        ;;

    reset )
        COMMAND=reset
        ;;

    uninit )
        COMMAND=uninit
        ;;
    * )
        usage
        exit 1
        ;;
esac

shift

# parse the options
while [ "$1" != "" ]; do
    case $1 in
        -c )
            shift
            USER_CHAIN=$1
            ;;
        -o )
            BUILTIN_CHAIN=OUTPUT
            ;;
        -6 )
            IPV6=true
            ;;
        -h )
            usage
            exit 0
            ;;
        * )
            usage
            exit 1
            ;;
    esac
    shift
done

check

# process the commands
case $COMMAND in

    init )
        init iptables true true
        if $IPV6; then
            init ip6tables $IP6TABLES_FILTER $IP6TABLES_NAT
        fi
        ;;

    list )
        list iptables IPv4 true true
        if $IPV6; then
            list ip6tables IPv6 $IP6TABLES_FILTER $IP6TABLES_NAT
        fi
        ;;

    reset )
        reset iptables true true
        if $IPV6; then
            reset ip6tables $IP6TABLES_FILTER $IP6TABLES_NAT
        fi
        ;;

    uninit )
        uninit iptables true true
        if $IPV6; then
            uninit ip6tables $IP6TABLES_FILTER $IP6TABLES_NAT
        fi
        ;;

esac

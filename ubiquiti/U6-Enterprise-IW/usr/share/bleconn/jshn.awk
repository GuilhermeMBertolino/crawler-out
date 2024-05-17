# Callbacks for jshn.sh
# Mawk must always define all callbacks.
# Gawk and busybox awk must define callbacks when STREAM=1 only.
# More info in FAQ.md#5.

# cb_parse_array_empty - parse an empty JSON array.
# Called in JSON.awk's main loop when STREAM=0 only.
# This example returns the standard representation of an empty array.
function cb_parse_array_empty(jpath) {
	return "[]"
}

# cb_parse_object_empty - parse an empty JSON object.
# Called in JSON.awk's main loop when STREAM=0 only.
# This example returns the standard representation of an empty object.
function cb_parse_object_empty(jpath) {
	return "{}"
}

# cb_parse_array_enter - begin parsing an array.
# Called in JSON.awk's main loop when STREAM=0 only.
# Use this function to initialize or output other values involved in
# processing each new JSON array.
function cb_parse_array_enter(jpath) {
	if ("" != jpath)
		print "json_add_array "jpath";"
	else
		print "json_init;"
}

# cb_parse_array_exit - end parsing an array.
# Called in JSON.awk's main loop when STREAM=0 only.
# If status == 0 then global CB_VALUE holds the JSON text of the parsed array.
function cb_parse_array_exit(jpath, status) {
	if ("" != jpath)
		print "json_close_array;"
}

# cb_parse_object_enter - begin parsing an object.
# Called in JSON.awk's main loop when STREAM=0 only.
# Use this function to initialize or output other values involved in
# processing each new JSON object.
function cb_parse_object_enter(jpath) {
	if ("" != jpath)
		print "json_add_object "jpath";"
	else
		print "json_init;"
}

# cb_parse_object_exit - end parsing an object.
# Called in JSON.awk's main loop when STREAM=0 only.
# If status == 0 then global CB_VALUE holds the JSON text of the parsed object.
function cb_parse_object_exit(jpath, status) {
	if ("" != jpath)
		print "json_close_object;"
}

# cb_append_jpath_component - format jpath components
# Called in JSON.awk's main loop when STREAM=0 only.
# This example formats jpaths exactly as JSON.awk does when STREAM=1.
function cb_append_jpath_component (jpath, component) {
	return component
}

# cb_append_jpath_value - format a jpath / value pair
# Called in JSON.awk's main loop when STREAM=0 only.
# This example formats the jpath / value pair exactly as JSON.awk does when
# STREAM=1.
function cb_append_jpath_value (jpath, value) {
	if (value == "null")
		print "json_add_null "jpath";"
	else if (value == "true")
		print "json_add_boolean "jpath" 1;"
	else if (value == "false")
		print "json_add_boolean "jpath" 0;"
	else if (value ~ /^[0-9]+$/)
		print "json_add_int "jpath" "value";"
	else if (value ~ /^[0-9]+\.[0-9]*$/)
		print "json_add_double "jpath" "value";"
	else
		print "json_add_string "jpath" "value";"
}

# cb_jpaths - process cb_append_jpath_value outputs
# Called in JSON.awk's main loop when STREAM=0 only.
# This example illustrates printing jpaths to stdout as JSON.awk does when STREAM=1.
# See also cb_parse_array_enter and cb_parse_object_enter.
function cb_jpaths (ary, size,   i) {
	return
}

# cb_fails - process all error messages at once after parsing
# has completed. Called in JSON.awk's END action when STREAM=0 only.
# This example illustrates printing parsing errors to stdout,
function cb_fails (ary, size,   k) {

	# Print ary - associative array of parsing failures.
	# ary's keys are the size input file names that JSON.awk read.
	for(k in ary) {
		system("logger -t \"jshn.awk\" -p user.warn \""k": "FAILS[k]"\"")
	}
	if (size > 0)
		exit 1
}

# cb_fail1 - process a single parse error as soon as it is
# encountered.  Called in JSON.awk's main loop when STREAM=0 only.
# Return non-zero to let JSON.awk also print the message to stderr.
# This example illustrates printing the error message to stdout only.
function cb_fail1 (message) {
	return
}


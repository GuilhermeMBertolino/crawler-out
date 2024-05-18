-- server   : used by normal information request
-- eweb     : used by webpage request
-- utils    : used by oui request
-- nbu      : used by ifttt request
-- resources：used by tm signature request
-- smart_home	: used by smart_home request
token_path_tbl = {
	["server"] = {
					serviceid = "server",
					tokenfile = "/tmp/cloud/cloud_token_server",
					trackfile = "/lib/deleteToken.sh"
				},
	["eweb"] = {
					serviceid = "eweb",
					tokenfile = "/tmp/cloud/cloud_token_eweb",
					trackfile = "/lib/deleteToken.sh"
				},
	["utils"] = {
					serviceid = "utils",
					tokenfile = "/tmp/cloud/cloud_token_utils",
					trackfile = "/lib/deleteToken.sh"
				},
	["nbu"] = {
					serviceid = "nbu.ifttt-router.api",
					tokenfile = "/tmp/cloud/cloud_token_nbu",
					trackfile = "/lib/deleteToken.sh"
				},
	["resources"] = {
					serviceid = "resources",
					tokenfile = "/tmp/cloud/cloud_token_resources",
					trackfile = "/lib/deleteToken.sh"
				},
	["homecareTransition"] = {
					serviceid = "nbu.event.homecare-transition",
					tokenfile = "/tmp/cloud/cloud_token_homecareTransition",
					trackfile = "/lib/deleteToken.sh"
				},
	["homecare"] = {
					serviceid = "nbu.homecare-cloud",
					tokenfile = "/tmp/cloud/cloud_token_homecare",
					trackfile = "/lib/deleteToken.sh"
				},				
	["smart_home"] = {
					serviceid = "nbu.event.gw",
					tokenfile = "/tmp/cloud/cloud_token_smart_home",
					trackfile = "/lib/deleteToken.sh"
				}				
}

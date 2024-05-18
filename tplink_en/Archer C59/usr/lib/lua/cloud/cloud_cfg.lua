response_tbl ={
    --["method"] = "response.lua"
    ["update"] = "cloud.update",
    ["notifyEvent"] = "cloud.notifyEvent",
    ["push"] = "cloud.push",
    ["passthrough"] = "cloud.passthrough",
    ["unbindDevice"] = "cloud.unbindDevice",
	["setAlias"] = "cloud.setAlias"
}

hello_tbl ={
    --void tlcc_build_request_of_hello_cloud(char** request)
    ["request"] = "cloud.get_firm",
    --void tlcc_recv_response_of_hello_cloud(const char* response)
    ["response"] = "cloud.hello_cloud_response"
}

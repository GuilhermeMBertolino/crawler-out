
module("cloud.tp_apps.tp_app_error", package.seeall)

ERROR_MSG = {
	-- Common
	ERROR_NONE = {0, "Everything is OK"},
	ERROR_CFG_HAVE_BEEN_SET = {1, "Configuration has been set"},
	ERROR_HANDLER_NOT_FOUND = {4, "handler does not exist"},
	ERROR_DFT_CUSTOM_MODE_CFG = {100, "QoS: Default custom mode configuration"},

	ERROR_GENERIC = {-1000, "Generic error"},
	ERROR_PARSE_JSON = {-1001, "JSON format error"},
	ERROR_UNSUPPORTED_TYPE = {-1002, "Unsupported service type"},
	ERROR_UNSUPPORTED_METHOD = {-1003, "Unsupported request method"},
	ERROR_INCOMPLETE_PARAMETER = {-1100, "Incomplete parmeter"},
	ERROR_INVAILD_PARAMETER = {-1101, "Invaild parmeter"},
	ERROR_OPERATION_FAIL = {-1102, "Operation fail"},

	-- for ALEXA
	ERROR_LED_CONFLICT_WITH_NIGHT_MODE = {-1110, "LED can not be set during night mode take affect"},
	ERROR_WPS_NOT_WORK_WHEN_WLS_OFF = {-1111, "WPS can not be connected when wireless is disabled"},
	ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF = {-1112, "Guest Network can not be set when wireless is disabled"},
	ERROR_NIGHT_MODE_CONFLICT_WITH_SYSTIME = {-1113, "Night mode can be enable before setting system time"},
	ERROR_WPS_NOT_WORK_WHEN_SWITCH_OFF = {-1114, "WPS can not be connected when switch is off"},
	ERROR_QOS_NOT_WORK_IN_AP_MODE = {-1115, "QoS can't work in ap mode"},
	ERROR_GUEST_CONFLICT_WITH_WDS = {-1116, "Guest Network can't work when WDS enabled"},
	ERROR_SPEED_TEST_RUN_FAILED = {-1117, "Speed test run failed."},
	ERROR_ALEXA_NOT_WORK_IN_AP_MODE = {-1118, "This case can not work in ap mode"},

	-- for IFTTT
	ERROR_UNMATCHED_FACTORY_ID = {-2100, "Unmactched factory id"},
	ERROR_INVAILD_TOKEN = {-2101, "Invaild token"},
	ERROR_UNMATCHED_TRIGGER_ITEM = {-2102, "Unmactched trigger item"},
	ERROR_MAX_TRIGGER_ITEMS = {-2103, "Max trigger items"},
	ERROR_QOS_NO_CONNECT_RECORD = {-2104, "Priority Device failed because not connect record exists"},
	ERROR_INVALID_DEV_ID = {-2105, "Invalid Devcie ID."},
	ERROR_IFTTT_NOT_WORK_IN_AP_MODE = {-2106, "This case can not work in ap mode"},
}


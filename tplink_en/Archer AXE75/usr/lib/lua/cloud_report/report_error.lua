
module("cloud_report.report_error", package.seeall)

ERROR_MSG = {
	ERROR_NONE = {0, "Everything is OK"},
	ERROR_GENERAL_ERROR = {-5000, "General error"},
	ERROR_INVALID_USER_TOKEN = {-5001, "Invalid user token"},
	ERROR_PARAMETER_INVALID_OR_MISSED = {-5002, "Parameter invalid or missed"},
	ERROR_THIRDPART_SERVICE_ERROR = {-5004, "Third-part service not available"},
	ERROR_AUTHORIZATION_MISSED = {-5005, "Authorization missed"},
	ERROR_API_KEY_ERROR = {-5006, "Api key error"},
	ERROR_INVALID_DEVICE_TOKEN = {-5007, "Invalid device token"},
	ERROR_INVALID_DEVICE_ID = {-5008, "Invalid device id"},
	ERROR_DEVICE_UNBOUND = {-5009, "Device_id and account_id are not bound"},
	ERROR_NO_DATA = {-5010, "No data found for this device"},
	ERROR_NO_DEVICE = {-5011, "No device found for this token"},
	ERROR_EXPECTED_STATE = {-5012, "Device is already in expected state"},
	ERROR_INSIGHTS_MISSED = {-5013, "Insights data missing"},
	ERROR_MONTH_MISSED = {-5014, "Monthly/Weekly report data missing"},
	ERROR_TIMEZONE_MISSED = {-5015, "TimeZone missing"},
	ERROR_INVALID_TIMESTAMP = {-5016, "Invalid time stamp"},
	ERROR_NOT_REGISTER = {-5026, "Device doesn't register"},
	ERROR_MSG_ID_MAX = {-5050, NULL}
}


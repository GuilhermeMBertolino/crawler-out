#!/bin/lua

socket = require("posix.sys.socket")
unistd = require("posix.unistd")
struct = require("struct")
fd = assert(socket.socket(socket.AF_UNIX, socket.SOCK_STREAM, 0))
socket.connect(fd, {family = socket.AF_UNIX, path = "/var/run/uicmd.sock"})
socket.send(fd, struct.pack("<!4iih", 0, 2, 0))
unistd.close(fd)

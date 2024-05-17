#!/bin/sh

function RedirectToDebugPath()
{
  echo "<HTML>"
  echo "<meta http-equiv=\"Refresh\" content=\"1; url=../debug.htm\">"
  echo "</HTML>"
}

#if [ "$1" == "DebugPage" ]; then
RedirectToDebugPath
#fi

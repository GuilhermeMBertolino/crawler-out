if (HelpItem=='Server'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'Outbound proxy/port are optional.<br><br>' +
					'<a href="helpvoice.html#Server">More...</a>';

} else if (HelpItem=='useragent'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'You should finish server config in "VOICE -> Server Setup" before add User Agent.<br><br>' +
					'<a href="helpvoice.html#UA">More...</a>';

} else if (HelpItem=='P2P'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'You can use peer to peer without setting server and user agent.<br><br>' +
					'<a href="helpvoice.html#P2P">More...</a>';

} else if (HelpItem=='Telephony'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Do not change these settings unless directed by your ISP.<br><br>' +
					'<a href="helpvoice.html#Telephony">More...</a>';

} else if (HelpItem=='prefix'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Dialing Example: For dialing 0800-XXX-XXX through PSTN, add a prefix 0800 and choose PSTN, then any number you dial prefixed with 0800 will dial out through PSTN.<br><br>' +
					'<a href="helpvoice.html#prefix">More...</a>';

} else if (HelpItem=='Account'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'10 voip accounts can be added here.<br><br>' +
					'<a href="helpvoice.html#account">More...</a>';

} else if (HelpItem=='Pstn'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'After setting, you can see your pstn telephone number in \'Line Setting\'.<br><br>' +
					'<a href="helpvoice.html#pstn">More...</a>';

} else if (HelpItem=='linesetting'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'You can go to the STATUS->Voice page for all registration status.<br><br>' +
					'<a href="helpvoice.html#linesetting">More...</a>';

}  else if (HelpItem=='callrej'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This feature is also called \'Call waiting\'.<br><br>' +
					'<a href="helpvoice.html#callrej">More...</a>';

}    else if (HelpItem=='Incoming'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'The device checks advanced rules before it checks the rules in the \'Forward to Number\' Section<br><br>' +
					'<a href="helpvoice.html#incoming">More...</a>';

}
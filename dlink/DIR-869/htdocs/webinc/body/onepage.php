<form id="mainform" onsubmit="return false;">
<!-- start of internet status -->
<div id="wizard_title_bg" class="wizard_title_bg1"><div id="wizard_title1" class="wizard_title"><script>I18N("h","Welcome");</script></div></div>
<div id="closeCreatePopBtn" class="closeCreatePopBtn" onclick="PAGE.ClearCreateRulePOP()" style="cursor:pointer"></div>
<div id="internet_status">
	<div class="networkmap" align=center>
	<div class="gap"></div>
		<div id="wizard_topology">
				<table  id="wizard_deviceLigh"  border="0">
					<tbody>
						<tr>
							<td width="260"><img id="wan_Light1" src="image/connected.png" width="35" height="35" /></td>
							<td width="50"><img id="wan_Light2" src="image/disconnected.png" width="35" height="35" /></td>
						</tr>
					</tbody>
				</table>
				<table  id="wizard_deviceMaige"  border="0">
					<tbody>
						<tr>
							<td width="0"><img src="../image/wifiCients_z.gif" style="width:auto"/></td>
							<td width="0"><img src="../image/line_onepage.png" width="200" height="18" /></td>
							<td width="0"><img src="../image/router_z_off.gif" style="width:auto"/></td>
							<td width="0"><img src="../image/line_onepage.png" width="200" height="18" /></td>
							<td width="0"><img src="../image/internet_z.png" style="width:auto"/></td>
						</tr>
					</tbody>
				</table>
				<div class="gap"></div>
				<table  id="wizard_deviceName" class="wizard_deviceName"  border="0">
					<tbody>
						<tr>
							<td width="280"><script>I18N("h","Wi-Fi Clients");</script></td>
							<td width="250"><? echo query("/runtime/device/modelname"); ?></td>
							<td width="90" style="text-align:center"><script>I18N("h","Internet");</script></td>
						</tr>
					</tbody>
				</table>
			</div>
	</div>
</div>
<!-- end of internet status -->
<div class="gap"></div>
<!-- start of stage setting -->
<div id="stage_set" style="display:none;">
	<div id="wan_set" class="networkmap">
		<!-- start of wan mode -->
		<table width="100%">
			<tbody>
				<tr>
					<td class="br_tb" width="55%" style="font-weight:bold;"><script>I18N("h","Internet Connection Type");</script></td>
					<td class="l_tb" width="45%"><b>:</b>&nbsp;
						<select class="text_style3" id="wan_mode" onChange="PAGE.OnChangeWanType(this.value);">
							<option value="STATIC" ><script>I18N("h","Static IP");</script></option>
							<option value="DHCP"><script>I18N("h","Dynamic IP (DHCP)");</script></option>
							<option value="PPPoE"><script>I18N("h","PPPoE");</script></option>
						</select>
					</td>
				</tr>	
			</tbody>
		</table>
		<div class="gap"></div>
		<!-- end of wan mode -->
		<!-- start of WAN configuration -->
		<div id="box_wan_cfg">
			<input id="ipv4_mtu" type="hidden" />
			<input id="ppp4_mtu" type="hidden" />
			<input id="ppp4_mru" type="hidden" />
			<input id="ppp4_timeout" type="hidden" />
			<input id="ppp4_mode" type="hidden" />
			<!-- start of STATIC -->
			<div id="STATIC">
				<table width="100%">
					<tbody>
						<tr>
							<td class="br_tb" width="55%"><script>I18N("h","IP Address");</script></td>
							<td class="l_tb" width="45%"><b>:</b>&nbsp;
								<input id="wiz_static_ipaddr" class="text_style" type="text" size="32" maxlength="15" />
							</td>
						</tr>
						<tr>
							<td class="br_tb" width="55%"><script>I18N("h","Subnet Mask");</script></td>
							<td class="l_tb" width="45%"><b>:</b>&nbsp;
								<input id="wiz_static_mask" class="text_style" type="text" size="32" maxlength="15" />
							</td>
						</tr>
						<tr>
							<td class="br_tb" width="55%"><script>I18N("h","Gateway Address");</script></td>
							<td class="l_tb" width="45%"><b>:</b>&nbsp;
								<input id="wiz_static_gw" class="text_style" type="text" size="32" maxlength="15" />
							</td>
						</tr>
						<tr>
							<td class="br_tb" width="55%"><script>I18N("h","Primary DNS Server");</script></td>
							<td class="l_tb" width="45%"><b>:</b>&nbsp;
								<input id="wiz_static_dns1" class="text_style" type="text" size="32" maxlength="15" />
							</td>
						</tr>
						<tr>
							<td class="br_tb" width="55%"><script>I18N("h","Secondary DNS Server");</script></td>
							<td class="l_tb" width="45%"><b>:</b>&nbsp;
								<input id="wiz_static_dns2" class="text_style" type="text" size="32" maxlength="15" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- end of STATIC -->
			<!-- start of DHCP -->
			<div id="DHCP"></div>
			<!-- end of DHCP -->
			<!-- start of DHCPPLUS -->
			<div id="DHCPPLUS">
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="55%"><font color="#0000FF">*</font><b><?echo I18N("h","Username");?></b></td>
						<td class="l_tb" width="45%"><b>:</b>&nbsp;
							<input id="wiz_dhcpplus_user" class="text_style" type="text" size="32" maxlength="63" /><font color="#0000FF"><b><?echo " (".I18N("h","* is required field.").")";?></b></font>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="55%"><font color="#0000FF">*</font><b><?echo I18N("h","Password");?></b></td>
						<td class="l_tb" width="45%"><b>:</b>&nbsp;
							<input id="wiz_dhcpplus_pass" class="text_style" type="password" size="32" maxlength="63" />
						</td>
					</tr>
				</tbody></table>
			</div>
			<!-- end of DHCPPLUS -->
			<!-- start of PPPoE -->
			<div id="PPPoE">
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="55%"><script>I18N("h","User Name");</script></b></td>
						<td class="l_tb" width="45%"><b>:</b>&nbsp;
							<input id="wiz_pppoe_usr" class="text_style" type="text" size="32" maxlength="63" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="55%"><script>I18N("h","User Passwd");</script></b></td>
						<td class="l_tb" width="45%"><b>:</b>&nbsp;
							<input id="wiz_pppoe_passwd" class="text_style" type="password" size="32" maxlength="63" />
						</td>
					</tr>
				</tbody></table>
			</div>
			<!-- end of PPPoE -->
			<!-- start of PPTP -->
			<div id="PPTP">
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="40%"><b><?echo I18N("h","Address Mode");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input name="wiz_pptp_conn_mode" class="text_style" type="radio" value="dynamic" checked onClick="PAGE.OnChangePPTPMode();" />
							<?echo I18N("h","Dynamic IP (DHCP)");?>
							<input name="wiz_pptp_conn_mode" class="text_style" type="radio" value="static" onClick="PAGE.OnChangePPTPMode();" />
							<?echo I18N("h","Static IP");?>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","PPTP IP Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_ipaddr" class="text_style" type="text" size="20" maxlength="15" /><font color="#0000FF"><b><?echo " (".I18N("h","* is required field.").")";?></b></font>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","PPTP Subnet Mask");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_mask" class="text_style" type="text" size="20" maxlength="15" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","PPTP Gateway IP Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_gw" class="text_style" type="text" size="20" maxlength="15" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","PPTP Server IP Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_svr" class="text_style" type="text" size="20" maxlength="30" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","User Name");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_usr" class="text_style" type="text" size="20" maxlength="63"/>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","Password");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_passwd" class="text_style" type="password" size="20" maxlength="63" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><b><?echo I18N("h","Primary DNS Server");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_dns1" class="text_style" type="text" size="20" maxlength="15"/>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><b><?echo I18N("h","Secondary DNS Server");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_dns2" class="text_style" type="text" size="20" maxlength="15"/>
						</td>
					</tr>
					<tr style="display:none;">
						<td class="br_tb" width="40%"><b><?echo I18N("h","MAC Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_pptp_mac" class="text_style" type="text" size="20" maxlength="17"/> 
						</td>
					</tr>
					<tr style="display:none;">
						<td class="br_tb" width="40%">&nbsp;</td>
						<td class="l_tb" width="60%">&nbsp;&nbsp;
							<input class="button_submit" type="button" id="wiz_pptp_clone_mac_addr" value="<?echo I18N("h","Clone Your PC's MAC Address");?>" onclick="PAGE.OnClickMacButton('wiz_pptp_mac');"/>
						</td>
					</tr>
				</tbody></table>
			</div>
			<!-- end of PPTP -->
			<!-- start of L2TP -->
			<div id="L2TP">
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="40%"><b><?echo I18N("h","Address Mode");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input name="wiz_l2tp_conn_mode" type="radio" value="dynamic" checked onClick="PAGE.OnChangeL2TPMode();" />
							<?echo I18N("h","Dynamic IP")." (".I18N("h","DHCP").")";?>
							<input name="wiz_l2tp_conn_mode" type="radio" value="static" onClick="PAGE.OnChangeL2TPMode();" />
							<?echo I18N("h","Static IP");?>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","L2TP IP Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_ipaddr" class="text_style" type="text" size="20" maxlength="15" /><font color="#0000FF"><b><?echo " (".I18N("h","* is required field.").")";?></b></font>
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","L2TP Subnet Mask");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_mask" class="text_style" type="text" size="20" maxlength="15" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","L2TP Gateway IP Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_gw" class="text_style" type="text" size="20" maxlength="15" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","L2TP Server IP Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_svr" class="text_style" type="text" size="20" maxlength="30" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","User Name");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_usr" class="text_style" type="text" size="20" maxlength="63" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><font color="#0000FF">*</font><b><?echo I18N("h","Password");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_passwd" class="text_style" type="password" size="20" maxlength="63" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><b><?echo I18N("h","Primary DNS Server");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_dns1" class="text_style" type="text" size="20" maxlength="15" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="40%"><b><?echo I18N("h","Secondary DNS Server");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_dns2" class="text_style" type="text" size="20" maxlength="15" />
						</td>
					</tr>
					<tr style="display:none;">
						<td class="br_tb" width="40%"><b><?echo I18N("h","MAC Address");?></b></td>
						<td class="l_tb" width="60%"><b>:</b>&nbsp;
							<input id="wiz_l2tp_mac" class="text_style" type="text" size="20" maxlength="17" />
						</td>
					</tr>
					<tr style="display:none;">
						<td class="br_tb" width="40%">&nbsp;</td>
						<td class="l_tb" width="60%">&nbsp;&nbsp;
							<input class="button_submit" type="button" id="l2tp_clone_mac_addr" value="<?echo I18N("h","Clone Your PC's MAC Address");?>" onclick="PAGE.OnClickMacButton('wiz_l2tp_mac');"/>
						</td>
					</tr>
				</tbody></table>
			</div>
			<!-- end of L2TP -->
			<div id="wan_error" class="error"></div>
			<div class="gap"></div>
		</div>
		<!-- end of WAN configuration -->
	</div>
	<div class="gap"></div>
	<!-- start of WLAN configuration -->
	<div id="wlan_set" class="networkmap">
		<div><p id="wifi24_name_pwd_show" class="wiz_strong">
		<script>I18N("h","Give your Wi-Fi network a Name(2.4GHz)");</script>
		</p></div>
		<table width="100%"><tbody>
			<tr>
				<td class="br_tb" width="55%"><script>I18N("h","Wireless Network Name (SSID)");</script></td>
				<td class="l_tb" width="45%"><b>:</b>&nbsp;
					<input id="wiz_ssid" class="text_style" type="text" size="32" maxlength="32" />
				</td>
			</tr>
			<tr>
				<td class="br_tb" width="55%"><script>I18N("h","Wireless Password");</script></td>
				<td class="l_tb" width="45%"><b>:</b>&nbsp;
					<input id="wiz_key" class="text_style" type="text" size="32" maxlength="63" />
				</td>
			</tr>
		</tbody></table>
		<div id="wifi24_error" class="error"></div>
		</div>
		<div class="gap"></div>
		<div id="wlan_set5G" class="networkmap">
			<div id="div_ssid_A" name="div_ssid_A">
				<div><p class="wiz_strong">
					<script>I18N("h","Give your Wi-Fi network a Name(5GHz)");</script>
				</p></div>
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="55%"><script>I18N("h","Wireless Network Name (SSID)");</script></td>
						<td class="l_tb" width="45"><b>:</b>&nbsp;
							<input id="wiz_ssid_Aband" class="text_style" type="text" size="32" maxlength="32" />
						</td>
					</tr>
					<tr>
						<td class="br_tb" width="55%"><script>I18N("h","Wireless Password");</script></td>
						<td class="l_tb" width="45%"><b>:</b>&nbsp;
							<input id="wiz_key_Aband" class="text_style" type="text" size="32" maxlength="63" />
						</td>
					</tr>
				</tbody></table>
			</div>
			<div id="wifi5_error" class="error"></div>
		</div>
		<!-- end of WLAN configuration -->
		<!--start of MyDlink-->
		<!-- <div class="gap"></div> -->
		<!-- <hr color="beige"> -->
		<div class="gap"></div>
		<div id="mydlink" class="networkmap"  style="display:none;">
			<div id="div_mydlink_A1" name="div_mydlink_A1">
				<img src="image/logo_2_updated.PNG" style="position: absolute; left:60px;"/>
				<div class="gap"></div>

				<div id="mydlink_disconnectd" style="display:block">
					<table width="100%">
					<tr wight="100%">
						<td class="mydlink1" width="20%" align="right" >
							<script>I18N("h","Status");</script>:<script>I18N("h","Not Connected");</script>
						</td>
						<td class="mydlink1" width="10%" align="left">
							<img id="disconnected_mydlink1" src="image/disconnected.png" width="20" height="20" />
						</td>
					</tr>
					</table>
					<table width="100%">
					<tr>
						<td class="mydlink" width="100%" style="color:#FF0000">
							<script>I18N("h","mydlink service not activated for this device");</script>
						</td>
					</tr>
					</table>

					<table width="100%">
					<tr>
					<td class="mydlink_adv" width="100%" style="color:#4598aa" onclick="showAdv('div_mydlink_login','login_mydlink');"><script>I18N("h","Advanced Network Settings");</script>...</td>
					</tr>
					</table>
				</div>

				<div id="mydlink_connectd" style="display:block">
					<table width="100%">
					<tr wight="100%">
						<td class="mydlink1" width="20%" align="right" >
						<script>I18N("h","Status");</script>:<script>I18N("h","Connected");</script>
						</td>
						<td class="mydlink1" width="10%" align="left">
							<img id="connected_mydlink12" src="image/connected.png" width="20" height="20" />
						</td>
					</tr>
					</table>
					<table width="100%">
					<tr>
						<td class="mydlink" width="100%" style="color:#0000FF"><script>I18N("h","mydlink service activated for this device");</script>
						</td>
					</tr>
					</table>

					<table width="100%">
					<tr>
					<td class="mydlink_adv" width="100%" style="color:#4598aa" onclick="showAdv('div_mydlink_login','logout_mydlink');"><script>I18N("h","Advanced Network Settings");</script>...</td>
					</tr>
					</table>

				</div>

				<div style="height:20px"></div>
			</div>
			<!--kity add mydlink start-->
			<div id="div_mydlink_login" style="display:none;" align="center">
				<hr color="beige">
				<div id="login_mydlink" style="display:block">
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="20%"></td>
						<td class="l_tb" width="80%"><script>I18N("h","Do you have an existing mydlink account?");</script></td>
					</tr>
					<tr id="Select_Yes">
						<td width="20%"><div id="cb_yes" class="unclick1" OnClick="mydlinkAccount('yes');"></div></td>
						<td class="l_tb" width="80%"><script>I18N("h","Yes, I have a mydlink account");</script></td>
					</tr>
					<tr id="Select_No">
						<td width="20%"><div id="cb_no" class="clicked1" OnClick="mydlinkAccount('no');"></div></td>
						<td class="l_tb" width="80%"><script>I18N("h","No, I want to create a new mydlink account");</script></td>
					</tr>
					<tr id="M_Account" style="display:none;">
						<td class="br_tb" width="40%"><script>I18N("h","E-mail Address (Account Name)");</script>:</td>
						<td class="l_tb" width="60%"><input class="text_style" type="text" name="user_Account" size="30" maxlength="255" id="user_Account"></td>
					</tr>
					<tr id="M_UserPassword" style="display:none;">
						<td class="br_tb" width="40%"><script>I18N("h","Password");</script>:</td>
						<td class="l_tb" width="60%"><input class="text_style" type="password" name="user_Password" size="30" maxlength="255" id="user_Password"></td>
					</tr>
					<tr id="First_Name" style="display:none;">
						<td class="br_tb" width="40%"><script>I18N("h","First Name");</script>:</td>
						<td class="l_tb" width="60%"><input class="text_style" type="text" name="user_FirstName" size="30" maxlength="255" id="user_FirstName"></td>
					</tr>
					<tr id="Last_Name" style="display:none;">
						<td class="br_tb" width="40%"><script>I18N("h","Last Name");</script>:</td>
						<td class="l_tb" width="60%"><input class="text_style" type="text" name="user_LastName" size="30" maxlength="255" id="user_LastName"></td>
					</tr>
					<tr id="Mydlink_TermsAndConditions" style="display:none;">
						<td class="br_tb" width="40%"><input type="checkbox" name="option1" id="option1" value="mydlinkTermsAndConditions"></td>
						<td class="l_tb" width="60%"><script>I18N("h","I accept the mydlink");</script></td>
					</tr>
					<tr>
						<td></td>
						<td><li id="signIn_Button" style="display:none;"><center><div id="Sing_in" class="Save_btn" onclick="PAGE.OnClickMydlinkLogin();" style="cursor:pointer"><script>I18N("h", "Log In");</script></div></center></li> </td>
					</tr>
					<tr>
						<td></td>
						<td><li id="signUp_Button" style="display:none;"><center><div id="Sing_up" class="Save_btn" onclick="PAGE.OnClickMydlinkRegister();" style="cursor:pointer;"><script>I18N("h", "Sign Up");</script></div></center></li></td>
					</tr>
				</tbody></table>
				</div>
				<div>
					<table>	
					<tbody>				
						<tr id="show_loadingImageDefault" display="none">
							<td></td>
							<td colspan="3" style="text-align: left;">
								<img src="image/loading.gif" width="62" height="62"/>
							</td>
						</tr>
					</tbody>
					</table>
				</div>
				<div id="logout_mydlink" style="display:none">
					<table>
						<tr>
							<td class="l_tb"><script>I18N("h","De-register this device from current mydlink account?");</script></td>
						</tr>
						<tr>
							<td align="right"><div id="Log_out" class="Save_btn" onclick="PAGE.OnClickMydlinkLogout();" style="cursor:pointer;"><script>I18N("h", "De-register");</script></div></td>
						</tr>
					</table>
				</div>
				<div id="MyDLink_description" class="error"></div>	
			</div>
			<!--kity add mydlink end-->
		</div>
		<!--end of MyDlink-->
		<!--Start of AdminPassword-->
		<div class="gap"></div>
		<div class="gap"></div>
		<div id="adminpwd" class="networkmap">
			<div id="adminpwd1" name="adminpwd1">
				<table width="100%"><tbody>
					<tr>
						<td class="br_tb" width="55%"><script>I18N("h","Set Device Admin Password");</script></td>
						<td class="l_tb" width="45%"><b>:</b>&nbsp;
							<input id="adminpwd2" class="text_style" type="text" size="32" maxlength="32" />
						</td>
					</tr>
				</tbody></table>
				<div id="adminpwd_error" class="error"></div>
			</div>
		</div>
		<!--end of AdminPassword-->
	<div class="gap"></div>
	<div class="centerline">
		<table width="100%">
			<tr>
				<td width="20%"></td>
				<td width="10%"><div id="connect" class="Save_btn" onclick="PAGE.OnClickConnectButton();" style="cursor:pointer"><script>I18N("h", "Connect");</script></div></td>
				<td width="30%"><div id="save_logout" class="Save_btn" onclick="PAGE.OnClickSave();" style="cursor:pointer;"><script>I18N("h", "Save & Logout");</script></div></td>
			</tr>		
		</table>
	</div>
	
	
<!--pop -->					
<div id="scan_wifi_list_block" class="PopAlertBlackBg" style="display:none">
	<div class="scanPopBox">
		<div id="scan_waiting" class="waitScanBox" style="display:none">
			<div class="popbox">
				<div style="height:30px; top:5px; position:relative"><img src="image/Infor2.png" /></div>
				<div style="text-align:left"><script>I18N("h", "You're about to change Wi-Fi password.After the router restarts the service,please use the Wi-Fi setting below to connect to the router again.");</script></div>
				<div style="height:10px"></div>
				<div style="text-align:left"><script>I18N("h", "Wi-Fi SSId and Password (2.4GHz):");</script></div>
				<div style="height:10px"></div>
				<div>
					<table align="center">
						<tr>
							<td><label id="24Gssid_megg"></label></td>
							<td>/</td>
							<td><label id="24Gkey_megg"></label></td>
						</tr>
					</table>
				</div>
				<div style="height:10px"></div>
				<div style="text-align:left"><script>I18N("h", "Wi-Fi SSId and Password (5GHz):");</script></span></div>
				<div style="height:10px"></div>
				<div>
					<table align="center">
						<tr>
							<td><label id="5Gssid_megg"></label></td>
							<td>/</td>
							<td><label id="5Gkey_megg"></label></td>
						</tr>
					</table>
				</div>
				<div style="height:10px"></div>
				<div>
					<table width="100%">
						<tr>
							<td width="10%"></td>
							<td width="35%"><div id="complete_No" class="Save_btn_change" onclick="PAGE.OnClickCompleteNo();" style="cursor:pointer"><script>I18N("h", "No,let me decide it later.");</script></div></td>
							<td width="35%"><div id="complete_Yes" class="Save_btn_change" onclick="PAGE.OnClickSLLink();" style="cursor:pointer"><script>I18N("h", "Yes,I understand.");</script></div></td>
							<td width="20%"></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
	
</div>
					

<!-- end of stage setting -->
<!-- start of stage connection to internet connection -->
<div id="stage_check_connect" style="display:none;">
	<div class="gap"></div>
	<div><p class="text_style2" style="margin-left:2px"><script>I18N("h","Connecting to the Internet, please wait a moment.");</script></p></div>
	<div class="blackgap"></div>

</div>
<!-- end of stage connection to internet connection -->
<!-- start of stage no cable connected -->
<div id="stage_no_cable" style="display:none;">
	<div>
		<div><p class="text_style2" style="margin-left:2px"><script>I18N("h","Complete Installation");</script></p></div>
		<div class="gap"></div>
		<div>
			<p class="text_style2" style="margin-left:2px"><script>I18N("h","Please make sure the cable between the ADSL/cable modem and the router is properly connected.");</script></p>
		</div>
		<div class="gap"></div>
		<div>
			<p class="text_style2" style="margin-left:2px"><script>I18N("h","Please check that the hardware is properly connected and configured (refer to the Quick Installation Guide for details) and click \"try again\"");</script></p>
		</div>

		<div class="gap"></div>

	</div>
	<div class="gap"></div>
	<div id="ta_button" style="display:block;">
		<table width="100%">
			<tr>
				<td width="20%"></td>
				<td <td width="10%">
					<div id="complete_config" class="Save_btn" onclick="PAGE.OnClickTAButton();" style="cursor:pointer"><script>I18N("h", "Try Again");</script></div>
				</td>
				<td width="30%">
					<div id="complete_back" class="Save_btn" onclick="PAGE.OnBackButton();" style="cursor:pointer"><script>I18N("h", "Back");</script></div>
				</td>
			</tr>
		</table>
	</div>
	<div class="gap"></div>
</div>
<!-- end of stage no cable connected -->
<!-- start of stage pppoe username/passwd failed -->
<div id="stage_pppoe_error" style="display:none;">
	<div>
		<div>
			<p class="text_style2" style="margin-left:2px"><script>I18N("h","PPPoE user name or password is incorrect.");</script></p>
		</div>
		<div class="gap"></div>
		<div><p class="text_style2" style="text-align:left; margin-left:2px"><script>I18N("h","*User name and password are case-sensitive. Please ensure that Caps Lock is off, then click \"Previous\", re-enter the PPPoE user name and password, and click \"Connect\".");</script></p>
		</div>
		<div class="gap"></div>
		<div><p class="text_style2" style="text-align:left; margin-left:2px"><script>I18N("h","*Please check your Internet account information or contact your Internet service provider for your PPPoE details, then click \"Previous\", re-enter the PPPoE user name and password, and click \"Connect\".");</script></p>
		</div>
	</div>
	<div class="blackgap"></div>
	<table width="100%">
		<tr>
			<td align="center">
				<div id="complete_config" class="Save_btn" onclick="PAGE.OnClickPreviousButton();" style="cursor:pointer"><script>I18N("h", "Previous");</script></div>
			</td>
		</tr>
	</table>
</div>
<!-- end of stage pppoe username/passwd failed -->
<!-- start of stage login success -->
<div id="stage_login_success" style="display:none;">
	<div>
		<div>
			<p class="text_style2" style="margin-left:2px"><script>I18N("h","Congratulations, you are now connected to the Internet.");</script></p>
		</div>
		<div class="gap"></div>
	</div>
	<div class="blackgap"></div>
	<table width="100%">
		<tr>
			<td align="center">
				<div id="complete_config" class="Save_btn" onclick="PAGE.OnConnecting();" style="cursor:pointer"><script>I18N("h", "Complete");</script></div>
			</td>
		</tr>
	</table>
	<div class="gap"></div>
	<div id="scan_wifi_list_block1" class="PopAlertBlackBg" style="display:none">
		<div class="scanPopBox">
			<div id="scan_waiting1" class="waitScanBox" style="display:none">
				<div class="popbox">
					<div style="height:30px; top:5px; position:relative"><img src="image/Infor2.png" /></div>
					<div style="text-align:left"><script>I18N("h", "You're about to change Wi-Fi password.After the router restarts the service,please use the Wi-Fi setting below to connect to the router again.");</script></div>
					<div style="height:10px"></div>
					<div style="text-align:left"><script>I18N("h", "Wi-Fi SSId and Password (2.4GHz):");</script></div>
					<div style="height:10px"></div>
					<div>
						<table align="center">
							<tr>
								<td><label id="24Gssid_megg1"></label></td>
								<td>/</td>
								<td><label id="24Gkey_megg1"></label></td>
							</tr>
						</table>
					</div>
					<div style="height:10px"></div>
					<div style="text-align:left"><script>I18N("h", "Wi-Fi SSId and Password (5GHz):");</script></span></div>
					<div style="height:10px"></div>
					<div>
						<table align="center">
							<tr>
								<td><label id="5Gssid_megg1"></label></td>
								<td>/</td>
								<td><label id="5Gkey_megg1"></label></td>
							</tr>
						</table>
					</div>
					<div style="height:10px"></div>
					<div>
						<table width="100%">
							<tr>
								<td width="10%"></td>
								<td width="70%"><div id="connecting" class="Save_btn_change" onclick="PAGE.OnClickCCButton();" style="cursor:pointer; width:290px; height:30px"><script>I18N("h", "Yes,I understand.");</script></div></td>
								<td width="20%"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end of stage login success -->
</form>

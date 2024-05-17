//Fix IE can't support Array.prototype.includes
if(!Array.prototype.includes){
  //or use Object.defineProperty
  Array.prototype.includes = function(search){
    return !!~this.indexOf(search);
  }
}

function generate_2GChannel(country)
{
  var ch_map = {"0" : 11, "AF" : 13, "TH" : 13, "AU" : 13, "CA" : 11, "CN" : 13,
             "EU" : 13, "IN" : 13, "IL" : 13, "JP" : 13, "KR" : 13, "MY" : 13,
             "MX" : 11, "DZ" : 13, "QA" : 13, "KW" : 13, "TR" : 13, "AE" : 13,
             "RU" : 13, "SG" : 13, "BR" : 13, "TW" : 11, "US" : 11, "HK" : 13};

  // hidden un-supported channels
  $.each($("select[name=2GChannel] option"), function(index) {
    if (index == 12 || index == 13) {
      if (ch_map[country] == 11) {
        this.hidden = true;
      }
      else {
        this.hidden = false;
      }
    }
  });
}

function generate_5G_band1(country, bandwidth)
{
  var ch_map = {"0" : 1, "AF" : 1, "TH" : 1, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 1, "IN" : 1, "IL" : 1, "JP" : 1, "KR" : 1, "MY" : 1,
             "MX" : 1, "DZ" : 0, "QA" : 0, "KW" : 1, "TR" : 1, "AE" : 1,
             "RU" : 1, "SG" : 1, "BR" : 1, "TW" : 1, "US" : 1, "HK" : 1};

  var Band1Channel= [36,40,44,48];
  
  // hidden un-supported channels
  $.each($("select[name=5GChannel] option"), function(index) {
    if (Band1Channel.includes(parseInt(this.value))) {
      if (ch_map[country] == 0) {
        this.hidden = true;
      }
      else {
        this.hidden = false;
      }
    }
  });
}

function generate_5G_band2(country, bandwidth)
{
  //2022.05.26, PegaBU6, YochengLian, For RAX5, no open DFS channels. Set TW, CA, US to 0.
  var ch_map = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 1, "CA" : 0, "CN" : 1,
             "EU" : 1, "IN" : 1, "IL" : 0, "JP" : 1, "KR" : 1, "MY" : 0,
             "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
             "RU" : 1, "SG" : 1, "BR" : 0, "TW" : 0, "US" : 0, "HK" : 1};

  var Band2Channel = [52,56,60,64];

  // hidden un-supported channels
  $.each($("select[name=5GChannel] option"), function(index) {
    if (Band2Channel.includes(parseInt(this.value))) {
      if (ch_map[country] == 0) {
        this.hidden = true;
      }
      else {
        this.hidden = false;
      }
    }
  });
}

function generate_5G_band3(country, bandwidth)
{
  //2022.05.26, PegaBU6, YochengLian, For RAX5, no open DFS channels. Set TW, CA, US to 0.
  var ch_map_20M_40M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 2, "CA" : 0, "CN" : 0,
             "EU" : 1, "IN" : 0, "IL" : 0, "JP" : 1, "KR" : 4, "MY" : 0,
             "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
             "RU" : 3, "SG" : 1, "BR" : 0, "TW" : 0, "US" : 0, "HK" : 2};
             
  //2022.05.26, PegaBU6, YochengLian, For RAX5, no open DFS channels. Set TW, CA, US to 0.
  var ch_map_80M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 2, "CA" : 0, "CN" : 0,
             "EU" : 1, "IN" : 0, "IL" : 0, "JP" : 1, "KR" : 1, "MY" : 0,
             "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
             "RU" : 0, "SG" : 1, "BR" : 0, "TW" : 0, "US" : 0, "HK" : 2};
  
  var ch_map_target;

  var Band3Channel_full =  [100,104,108,112,116,120,124,128,132,136,140];
  var Band3Channel_1_20M = [100,104,108,112,116,120,124,128,132,136,140];
  var Band3Channel_2_20M = [100,104,108,112,116,132,136,140];
  var Band3Channel_3_20M = [132,136,140];
  var Band3Channel_4_20M = [100,104,108,112,116,120,124,128];
  var Band3Channel_1_40M = [100,104,108,112,116,120,124,128,132,136];
  var Band3Channel_2_40M = [100,104,108,112,132,136];
  var Band3Channel_3_40M = [132,136];
  var Band3Channel_4_40M = [100,104,108,112,116,120,124,128];
  var Band3Channel_1_80M = [100,104,108,112,116,120,124,128];
  var Band3Channel_2_80M = [100,104,108,112];
  var Band3Channel_target;

    if (bandwidth == "20MHz") {
        if (ch_map_20M_40M[country] == 0) {
            Band3Channel_target = Band3Channel_full;
        }
        else if (ch_map_20M_40M[country] == 1) {
            Band3Channel_target = Band3Channel_1_20M;
        }
        else if (ch_map_20M_40M[country] == 2) {
            Band3Channel_target = Band3Channel_2_20M;
        }
        else if (ch_map_20M_40M[country] == 3) {
            Band3Channel_target = Band3Channel_3_20M;
        }
        else if (ch_map_20M_40M[country] == 4) {
            Band3Channel_target = Band3Channel_4_20M;
        }    
        
        ch_map_target = ch_map_20M_40M;
    }
    else if (bandwidth == "40MHz") {
        if (ch_map_20M_40M[country] == 0) {
            Band3Channel_target = Band3Channel_full;
        }
        else if (ch_map_20M_40M[country] == 1) {
            Band3Channel_target = Band3Channel_1_40M;
        }
        else if (ch_map_20M_40M[country] == 2) {
            Band3Channel_target = Band3Channel_2_40M;
        }
        else if (ch_map_20M_40M[country] == 3) {
            Band3Channel_target = Band3Channel_3_40M;
        }
        else if (ch_map_20M_40M[country] == 4) {
            Band3Channel_target = Band3Channel_4_40M;
        }   
        
        ch_map_target = ch_map_20M_40M;
    }
    else if (bandwidth == "80MHz") {
        if (ch_map_80M[country] == 0) {
            Band3Channel_target = Band3Channel_full;
        }
        else if (ch_map_80M[country] == 1) {
            Band3Channel_target = Band3Channel_1_80M;
        }
        else if (ch_map_80M[country] == 2) {
            Band3Channel_target = Band3Channel_2_80M;
        }
        
        ch_map_target = ch_map_80M;
    }

  // hidden un-supported channels
  $.each($("select[name=5GChannel] option"), function(index) {  
      if (Band3Channel_full.includes(parseInt(this.value)) == true) {
          if (Band3Channel_target.includes(parseInt(this.value)) == true) {
              if (ch_map_target[country] == 0) {
                  this.hidden = true;
              }
              else {
                  this.hidden = false;
              }
          }
          else {
              this.hidden = true;
          }
      }
  });
}

function generate_5G_band4(country, bandwidth)
{
  var ch_map_20M = {"0" : 1, "AF" : 0, "TH" : 1, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 0, "IN" : 1, "IL" : 0, "JP" : 0, "KR" : 1, "MY" : 1,
             "MX" : 1, "DZ" : 0, "QA" : 1, "KW" : 0, "TR" : 0, "AE" : 1,
             "RU" : 1, "SG" : 1, "BR" : 1, "TW" : 1, "US" : 1, "HK" : 1};
  
  var ch_map_40M_80M = {"0" : 1, "AF" : 1, "TH" : 1, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 0, "IN" : 1, "IL" : 1, "JP" : 0, "KR" : 1, "MY" : 1,
             "MX" : 1, "DZ" : 0, "QA" : 1, "KW" : 1, "TR" : 1, "AE" : 1,
             "RU" : 1, "SG" : 1, "BR" : 1, "TW" : 1, "US" : 1, "HK" : 1};
             
  var ch_map_target;

  var Band4Channel_full =    [149,153,157,161,165];
  var Band4Channel_20M =     [149,153,157,161,165];
  var Band4Channel_40M_80M = [149,153,157,161];
  var Band4Channel_target;

  if (bandwidth == "20MHz")
  {
      if (ch_map_20M[country] == 0) {
          Band4Channel_target = Band4Channel_full;
      }
      else if (ch_map_20M[country] == 1) {
          Band4Channel_target = Band4Channel_20M;
      }
      
      ch_map_target = ch_map_20M;
  }
  else if (bandwidth == "40MHz" || bandwidth == "80MHz")
  {
      if (ch_map_40M_80M[country] == 0) {
          Band4Channel_target = Band4Channel_full;
      }
      else if (ch_map_40M_80M[country] == 1) {
          Band4Channel_target = Band4Channel_40M_80M;
      }
      
      ch_map_target = ch_map_40M_80M;
  }

  // hidden un-supported channels
  $.each($("select[name=5GChannel] option"), function(index) {
      if (Band4Channel_full.includes(parseInt(this.value)) == true) {
          if (Band4Channel_target.includes(parseInt(this.value))) {
              if (ch_map_target[country] == 0) {
                  this.hidden = true;
              }
              else {
                  this.hidden = false;
              }
          }
          else {
              this.hidden = true;
          }
      }
  });
}


//FCC called the 5.850GHz~5.925GHz to "DSRC band". DSRC is "Dedicated Short Range Communications". It includes part of U-NII-4 channels, the ch169~ch183.
//For MTK solution, it opens ch169~ch177.
function generate_5G_band_DSRC(country, bandwidth)
{
  var ch_map_20M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 0, "CA" : 0, "CN" : 0,
                   "EU" : 0, "IN" : 0, "IL" : 0, "JP" : 0, "KR" : 0, "MY" : 0,
                   "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
                   "RU" : 0, "SG" : 0, "BR" : 0, "TW" : 0, "US" : 1, "HK" : 0};

  var ch_map_40M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 0, "CA" : 0, "CN" : 0,
                   "EU" : 0, "IN" : 0, "IL" : 0, "JP" : 0, "KR" : 0, "MY" : 0,
                   "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
                   "RU" : 0, "SG" : 0, "BR" : 0, "TW" : 0, "US" : 1, "HK" : 0};

  var ch_map_80M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 0, "CA" : 0, "CN" : 0,
                   "EU" : 0, "IN" : 0, "IL" : 0, "JP" : 0, "KR" : 0, "MY" : 0,
                   "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
                   "RU" : 0, "SG" : 0, "BR" : 0, "TW" : 0, "US" : 1, "HK" : 0};

  var ch_map_target;

  var dsrcBandChannel_full =    [169, 171, 173, 177];
  var dsrcBandChannel_20M =     [169, 171, 173, 177]; //No spec defined how to show these channels in different bandwidth, open them all for now(2022/01/21).
  var dsrcBandChannel_40M =     [169, 173, 177]; //No spec defined how to show these channels in different bandwidth, open them all for now(2022/01/21).
  var dsrcBandChannel_80M =     [169, 173, 177]; //No spec defined how to show these channels in different bandwidth, open them all for now(2022/01/21).
  var dsrcBandChannel_target;

  if( bandwidth == "20MHz" )
  {
      if( ch_map_20M[country] == 0 )
      {
          dsrcBandChannel_target = dsrcBandChannel_full; //Because most of countries did not open DSRC band, we don't provide any channel in DSRC band as default.
      }
      else if( ch_map_20M[country] == 1 )
      {
          dsrcBandChannel_target = dsrcBandChannel_20M;
      }

      ch_map_target = ch_map_20M;
  }
  else if( bandwidth == "40MHz" )
  {
      if( ch_map_40M[country] == 0 )
      {
          dsrcBandChannel_target = dsrcBandChannel_full; //Because most of countries did not open DSRC band, we don't provide any channel in DSRC band as default.
      }
      else if( ch_map_40M[country] == 1 )
      {
          dsrcBandChannel_target = dsrcBandChannel_40M;
      }

      ch_map_target = ch_map_40M;
  }
  else if( bandwidth == "80MHz" )
  {
      if( ch_map_80M[country] == 0 )
      {
          dsrcBandChannel_target = dsrcBandChannel_full; //Because most of countries did not open DSRC band, we don't provide any channel in DSRC band as default.
      }
      else if( ch_map_80M[country] == 1 )
      {
          dsrcBandChannel_target = dsrcBandChannel_80M;
      }

      ch_map_target = ch_map_80M;
  }

  // hidden un-supported channels
  $.each($("select[name=5GChannel] option"), function(index) {
      if (dsrcBandChannel_full.includes(parseInt(this.value)) == true) {
          if (dsrcBandChannel_target.includes(parseInt(this.value))) {
              if (ch_map_target[country] == 0) {
                  this.hidden = true;
              }
              else {
                  this.hidden = false;
              }
          }
          else {
              this.hidden = true;
          }
      }
  });
}

function generate_5G1_band1(country, bandwidth)
{
  var ch_map = {"0" : 1, "AF" : 1, "TH" : 1, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 1, "IN" : 1, "IL" : 1, "JP" : 1, "KR" : 1, "MY" : 1,
             "MX" : 1, "DZ" : 0, "QA" : 0, "KW" : 1, "TR" : 1, "AE" : 1,
             "RU" : 1, "SG" : 1, "BR" : 1, "TW" : 1, "US" : 1};

  var Band1Channel= [36,40,44,48];
  
  // hidden un-supported channels
  $.each($("#5G1Channel option"), function(index) {
    if (Band1Channel.includes(parseInt(this.value))) {
      if (ch_map[country] == 0) {
        this.hidden = true;
      }
      else {
        this.hidden = false;
      }
    }
  });
}

function generate_5G1_band2(country, bandwidth)
{
  var ch_map = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 1, "IN" : 1, "IL" : 0, "JP" : 1, "KR" : 1, "MY" : 0,
             "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
             "RU" : 1, "SG" : 0, "BR" : 0, "TW" : 1, "US" : 1};

  var Band2Channel = [52,56,60,64];

  // hidden un-supported channels
  $.each($("#5G1Channel option"), function(index) {
    if (Band2Channel.includes(parseInt(this.value))) {
      if (ch_map[country] == 0) {
        this.hidden = true;
      }
      else {
        this.hidden = false;
      }
    }
  });
}

function generate_5G1_band3(country, bandwidth)
{
  var ch_map_20M_40M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 2, "CA" : 2, "CN" : 0,
             "EU" : 1, "IN" : 0, "IL" : 0, "JP" : 1, "KR" : 4, "MY" : 0,
             "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
             "RU" : 3, "SG" : 0, "BR" : 0, "TW" : 1, "US" : 1};
             
  var ch_map_80M_160M = {"0" : 1, "AF" : 0, "TH" : 0, "AU" : 2, "CA" : 2, "CN" : 0,
             "EU" : 1, "IN" : 0, "IL" : 0, "JP" : 1, "KR" : 1, "MY" : 0,
             "MX" : 0, "DZ" : 0, "QA" : 0, "KW" : 0, "TR" : 0, "AE" : 0,
             "RU" : 0, "SG" : 0, "BR" : 0, "TW" : 1, "US" : 1};
  
  var ch_map_target;

  var Band3Channel_full =  [100,104,108,112,116,120,124,128,132,136,140];
  var Band3Channel_1_20M = [100,104,108,112,116,120,124,128,132,136,140];
  var Band3Channel_2_20M = [100,104,108,112,116,132,136,140];
  var Band3Channel_3_20M = [132,136,140];
  var Band3Channel_4_20M = [100,104,108,112,116,120,124,128];
  var Band3Channel_1_40M = [100,104,108,112,116,120,124,128,132,136];
  var Band3Channel_2_40M = [100,104,108,112,132,136];
  var Band3Channel_3_40M = [132,136];
  var Band3Channel_4_40M = [100,104,108,112,116,120,124,128];
  var Band3Channel_1_80M_160M = [100,104,108,112,116,120,124,128];
  var Band3Channel_2_80M_160M = [100,104,108,112];
  var Band3Channel_target;

    if (bandwidth == "20MHz") {
        if (ch_map_20M_40M[country] == 0) {
            Band3Channel_target = Band3Channel_full;
        }
        else if (ch_map_20M_40M[country] == 1) {
            Band3Channel_target = Band3Channel_1_20M;
        }
        else if (ch_map_20M_40M[country] == 2) {
            Band3Channel_target = Band3Channel_2_20M;
        }
        else if (ch_map_20M_40M[country] == 3) {
            Band3Channel_target = Band3Channel_3_20M;
        }
        else if (ch_map_20M_40M[country] == 4) {
            Band3Channel_target = Band3Channel_4_20M;
        }    
        
        ch_map_target = ch_map_20M_40M;
    }
    else if (bandwidth == "40MHz") {
        if (ch_map_20M_40M[country] == 0) {
            Band3Channel_target = Band3Channel_full;
        }
        else if (ch_map_20M_40M[country] == 1) {
            Band3Channel_target = Band3Channel_1_40M;
        }
        else if (ch_map_20M_40M[country] == 2) {
            Band3Channel_target = Band3Channel_2_40M;
        }
        else if (ch_map_20M_40M[country] == 3) {
            Band3Channel_target = Band3Channel_3_40M;
        }
        else if (ch_map_20M_40M[country] == 4) {
            Band3Channel_target = Band3Channel_4_40M;
        }   
        
        ch_map_target = ch_map_20M_40M;
    }
    else if (bandwidth == "80MHz" || bandwidth == "160MHz") {
        if (ch_map_80M_160M[country] == 0) {
            Band3Channel_target = Band3Channel_full;
        }
        else if (ch_map_80M_160M[country] == 1) {
            Band3Channel_target = Band3Channel_1_80M_160M;
        }
        else if (ch_map_80M_160M[country] == 2) {
            Band3Channel_target = Band3Channel_2_80M_160M;
        }
        
        ch_map_target = ch_map_80M_160M;
    }

  // hidden un-supported channels
  $.each($("#5G1Channel option"), function(index) {  
      if (Band3Channel_full.includes(parseInt(this.value)) == true) {
          if (Band3Channel_target.includes(parseInt(this.value)) == true) {
              if (ch_map_target[country] == 0) {
                  this.hidden = true;
              }
              else {
                  this.hidden = false;
              }
          }
          else {
              this.hidden = true;
          }
      }
  });
}

function generate_5G1_band4(country, bandwidth)
{
  var ch_map_20M = {"0" : 1, "AF" : 0, "TH" : 1, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 0, "IN" : 1, "IL" : 0, "JP" : 0, "KR" : 1, "MY" : 1,
             "MX" : 1, "DZ" : 0, "QA" : 1, "KW" : 0, "TR" : 0, "AE" : 1,
             "RU" : 1, "SG" : 1, "BR" : 1, "TW" : 1, "US" : 1};
  
  var ch_map_40M_80M = {"0" : 1, "AF" : 1, "TH" : 1, "AU" : 1, "CA" : 1, "CN" : 1,
             "EU" : 0, "IN" : 1, "IL" : 1, "JP" : 0, "KR" : 1, "MY" : 1,
             "MX" : 1, "DZ" : 0, "QA" : 1, "KW" : 1, "TR" : 1, "AE" : 1,
             "RU" : 1, "SG" : 1, "BR" : 1, "TW" : 1, "US" : 1};
             
  var ch_map_target;

  var Band4Channel_full =    [149,153,157,161,165];
  var Band4Channel_20M =     [149,153,157,161,165];
  var Band4Channel_40M_80M = [149,153,157,161];
  var Band4Channel_target;

  if (bandwidth == "20MHz")
  {
      if (ch_map_20M[country] == 0) {
          Band4Channel_target = Band4Channel_full;
      }
      else if (ch_map_20M[country] == 1) {
          Band4Channel_target = Band4Channel_20M;
      }
      
      ch_map_target = ch_map_20M;
  }
  else if (bandwidth == "40MHz" || bandwidth == "80MHz")
  {
      if (ch_map_40M_80M[country] == 0) {
          Band4Channel_target = Band4Channel_full;
      }
      else if (ch_map_40M_80M[country] == 1) {
          Band4Channel_target = Band4Channel_40M_80M;
      }
      
      ch_map_target = ch_map_40M_80M;
  }
  else if (bandwidth == "160MHz")
  {
      //band4 not support 160MHz channel
      Band4Channel_target = [0,0];
  }

  // hidden un-supported channels
  $.each($("#5G1Channel option"), function(index) {
      if (Band4Channel_full.includes(parseInt(this.value)) == true) {
          if (Band4Channel_target.includes(parseInt(this.value))) {
              if (ch_map_target[country] == 0) {
                  this.hidden = true;
              }
              else {
                  this.hidden = false;
              }
          }
          else {
              this.hidden = true;
          }
      }
  });
}

function generate_5GChannel(country, bandwidth)
{
  var dfs_en = 1;  //no CMS data model for DFS status, so we REX default is DFS enabled.
  generate_5G_band1(country, bandwidth);
  generate_5G_band2(country, bandwidth);
  generate_5G_band3(country, bandwidth);
  generate_5G_band4(country, bandwidth);
  generate_5G_band_DSRC(country, bandwidth);
}

function generate_5G1Channel(country, bandwidth)
{
  generate_5G1_band1(country, bandwidth);
  generate_5G1_band2(country, bandwidth);
  generate_5G1_band3(country, bandwidth);
  generate_5G1_band4(country, bandwidth);
}

function handle_channel_OutOfRange(country)
{
    var selected_2gCh = parseInt($("select[name=2GChannel]").val());
    var selected_5gCh = parseInt($("select[name=5GChannel]").val());
    //var selected_5g1Ch = parseInt($("#5G1Channel").val());
    
    $.each($("select[name=2GChannel] option"), function(index) {
        if (selected_2gCh == this.value && this.hidden == true) {
            $("select[name=2GChannel]").val("0").change();
        }
    });
    
    $.each($("select[name=5GChannel] option"), function(index) {
        if (selected_5gCh == this.value && this.hidden == true) {
            // Middle East(Iran/Lebanon/Qater) only support band4 
            if (country == "QA") {
                $("select[name=5GChannel]").val("153").change();
            }
            else {
                $("select[name=5GChannel]").val("36").change();
            }
        }
    });
/*    
    $.each($("#5G1Channel option"), function(index) {
        if (selected_5g1Ch == this.value && this.hidden == true) {
            // Middle East(Iran/Lebanon/Qater) only support band4
            if (country == "QA") {
                $("#5G1Channel").val("153").change();
            }
            else if (country == "RU") {
                $("#5G1Channel").val("132").change();
            }
            else {
                $("#5G1Channel").val("100").change();
            }
        }
    });
*/
}

function reGenerate_ChannelSelectMenu(freq)
{
    var country = $("select[name=country]").val();
    var opmode_5g = $("select[name=5GMode]").val();
    //var opmode_5g1 = $("#5G1Mode").val();
    var bandwidth_5g;
    //var bandwidth_5g1;
       
    if (freq == "2g" || freq == "all") {
        generate_2GChannel(country);
    }
        
    if (freq == "5g" || freq == "all") {
        if (opmode_5g == 1) {
            bandwidth_5g = "20MHz";
        }
        else if (opmode_5g == 2) {
            bandwidth_5g = "40MHz";
        }
        else if (opmode_5g == 3) {
            bandwidth_5g = "80MHz";
        }
        
        generate_5GChannel(country, bandwidth_5g);
    }
/*
    if (freq == "5g1" || freq == "all") {
        if (opmode_5g1 == 1) {
            bandwidth_5g1 = "20MHz";
        }
        else if (opmode_5g1 == 2) {
            bandwidth_5g1 = "40MHz";
        }
        else if (opmode_5g1 == 3) {
            bandwidth_5g1 = "80MHz";
        }
        else if (opmode_5g1 == 4) {
            bandwidth_5g1 = "160MHz";
        }
        
        generate_5G1Channel(country, bandwidth_5g1);
    }
*/        
    /* To handle the original selected channel is out of the range of the new generated channel select menu*/
    handle_channel_OutOfRange(country);
        
    // ToDo : grayout channel menu when country don't support 5G
}

function generate_2GOpMode(ax_en)
{
  var mlang_upto = window.top.mlang["PCVP_006"];  // "Up to "
  var mlang_mbps = window.top.mlang["AQS035"];    // "Mbps"

  mlang_upto = decodeHtml(mlang_upto);

  /* 54 = g mode, 145 = n mode + 20MHz, 300 = n mode + 40MHz */
  var g_n_speed = [54, 145, 300];
  /* 0 = hidden option,  286 = ax mode + 20MHz, 600 = ax mode + 40MHz */ //general for AX mode 1024QAM.
  /* 0 = hidden option,  230 = ax mode + 20MHz, 460 = ax mode + 40MHz */ //RAX5 2.4G only 256 QAM
  var ax_speed = [54, 230, 460];
  
  //update option text accprding to AX enable
  $.each($("select[name=2GMode] option"), function (index) {
    if (ax_en == "false") {
      if (index == 0 && this.hidden == true) {
        this.hidden = false;
      }
      this.text = mlang_upto + g_n_speed[index] + " " + mlang_mbps;
    }
    else {
      if (ax_speed[index] == 0) {
        this.hidden = true;
      }
      this.text = mlang_upto + ax_speed[index] + " " + mlang_mbps;
    }
  });
}

function generate_5GOpMode(ax_en, country)
{
  var mlang_upto = window.top.mlang["PCVP_006"];  // "Up to "
  var mlang_mbps = window.top.mlang["AQS035"];    // "Mbps"

  mlang_upto = decodeHtml(mlang_upto);

  /* 173 = ac mode + 20MHz, 400 = ac mode + 40MHz, 867 = ac mode + 80MHz */
  var ac_speed_2x2 = [173, 400, 866]; //According to Home Router Sepc 16a, 5G without AX enable(ac mode), the 2x2 + 80MHz, max link rate should be 866Mbps.
  /* 286 = ax mode + 20MHz, 600 = ax mode + 40MHz, 1200 = ax mode + 80MHz */
  var ax_speed_2x2 = [286, 572, 1200]; //According to Home Router Sepc 16a, 5G with AX enable, the 2x2 + 40MHz, max link rate should be 572Mbps.
  /* 288 = ac mode + 20MHz, 600 = ac mode + 40MHz, 1300 = ac mode + 80MHz */
  var ac_speed_3x3 = [288, 600, 1300]; 
  /* 430 = ax mode + 20MHz, 860 = ax mode + 40MHz, 1800 = ax mode + 80MHz*/
  var ax_speed_3x3 = [430, 860, 1800];
  
  //var ac_speed = ac_speed_3x3;
  //var ax_speed = ax_speed_3x3;
  var ac_speed = ac_speed_2x2; //RAX5 uses 2x2 spatial streams.
  var ax_speed = ax_speed_2x2; //RAX5 uses 2x2 spatial streams.
  
  //update option text accprding to AX enable
  $.each($("select[name=5GMode] option"), function (index) {
    if (ax_en == "false") {
      this.text = mlang_upto + ac_speed[index] + " " + mlang_mbps;
    }
    else {
      this.text = mlang_upto + ax_speed[index] + " " + mlang_mbps;
    }
    
    /* Africa, Israel, Middle East(Algeria/Syria/Yemen), Middle East(Turkey/Egypt/Tunisia/Kuwait) not support 40M above */
    if (country == "AF" || country == "IL" || country == "KW" || country == "TR") {
        if (this.value == "2" || this.value == "3") {
            this.hidden = true;
        }
    }
    else if (country == "RU") {
        /* Russia not support 80MHz and 160MHz */
        if (this.value == "3") {
            this.hidden = true;
        }
    }
    else {
        this.hidden = false;
    }
  });
}

function generate_5G1OpMode(ax_en, country)
{
  var mlang_upto = window.top.mlang["PCVP_006"];  // "Up to "
  var mlang_mbps = window.top.mlang["AQS035"];    // "Mbps"

  /* 346 = ac mode + 20MHz, 800 = ac mode + 40MHz, 1733 = ac mode + 80MHz, 3466 = ac mode + 160MHz */
  var ac_speed_4x4 = [346, 800, 1733, 3466]; 
  /* 574 = ax mode + 20MHz, 1147 = ax mode + 40MHz, 2400 = ax mode + 80MHz, 4800 = ax mode + 160MHz */
  var ax_speed_4x4 = [574, 1147, 2400, 4800];
  /* 288 = ac mode + 20MHz, 600 = ac mode + 40MHz, 1300 = ac mode + 80MHz */
  var ac_speed_3x3 = [288, 600, 1300]; 
  /* 430 = ax mode + 20MHz, 860 = ax mode + 40MHz, 1800 = ax mode + 80MHz*/
  var ax_speed_3x3 = [430, 860, 1800];
  
  var ac_speed = ac_speed_3x3;
  var ax_speed = ax_speed_3x3;
  //update option text accprding to AX enable
  $.each($("#5G1Mode option"), function (index) {
    if (ax_en == "false") {
      this.text = mlang_upto + ac_speed[index] + mlang_mbps;
    }
    else {
      this.text = mlang_upto + ax_speed[index] + mlang_mbps;
    }
    
    /* Africa, Israel, Middle East(Algeria/Syria/Yemen), Middle East(Turkey/Egypt/Tunisia/Kuwait) not support 40M above */
    if (country == "AF" || country == "IL" || country == "KW" || country == "TR") {
        if (this.value == "2" || this.value == "3" || this.value == "4") {
            this.hidden = true;
        }
    }
    else if (country == "RU") {
        /* Russia not support 80MHz and 160MHz */
        if (this.value == "3" || this.value == "4") {
            this.hidden = true;
        }
    }
    else {
        this.hidden = false;
    }
  });
}

function reGenerate_OpModeSelectMenu()
{
    var ax_en = $("[name=enableAX]").val();
    var country = $("select[name=country]").val();
    
    generate_2GOpMode(ax_en);
    generate_5GOpMode(ax_en, country);
    //generate_5G1OpMode(ax_en, country);
    handle_OpMode_OutOfRange();
}

function handle_OpMode_OutOfRange()
{
    var selected_2gOpMode = parseInt($("select[name=2GMode]").val());
    var selected_5gOpMode = parseInt($("select[name=5GMode]").val());
    //var selected_5g1OpMode = parseInt($("#5G1Mode").val());

    $.each($("select[name=2GMode] option"), function(index) {
        if (selected_2gOpMode == this.value && this.hidden == true) {
            if (selected_2gOpMode == 1) {
                $("select[name=2GMode]").val("2").change();
            }
        }
    });
    
    $.each($("select[name=5GMode] option"), function(index) {
        if (selected_5gOpMode == this.value && this.hidden == true) {
            $("select[name=5GMode]").val("1").change();
        }
    });
/*    
    $.each($("#5G1Mode option"), function(index) {
        if (selected_5g1OpMode == this.value && this.hidden == true) {
            $("#5G1Mode").val("1").change();
        }
    });
*/
}

function init_SecurityType() {
    init_2gSecurityType();
    init_5gSecurityType();
    //init_5g1SecurityType();
}

function init_2gSecurityType()
{
    var security_2g = $("input[name='2GSecurity']:checked").val();
    
    /* none */
    if (security_2g == "1")
    {
        $('#wpa_2G_pass')[0].style.display="none";
        $('#wpa_2G_radius')[0].style.display="none";
    }
    /* WPA2-PSK, WPA-PSK+WPA2-PSK, WPA3-PSK, WPA2+WPA3 show passphrase field */
    else if (security_2g == "2" || security_2g == "3" || security_2g == "5" || security_2g == "6")
    {
        $('#wpa_2G_pass')[0].style.display="block";
        $('#wpa_2G_radius')[0].style.display="none";
    }
    /* Enterprise */
    else if (security_2g == "4")
    {
        $('#wpa_2G_pass')[0].style.display="none";
        $('#wpa_2G_radius')[0].style.display="block";
    }
}
    
function init_5gSecurityType()
{
    var security_5g = $("input[name='5GSecurity']:checked").val();
        
    /* none */
    if (security_5g == "1")
    {
        $('#wpa_5G_pass')[0].style.display="none";
        $('#wpa_5G_radius')[0].style.display="none";
    }
    /* WPA2-PSK, WPA-PSK+WPA2-PSK, WPA3-PSK, WPA2+WPA3 show passphrase field */
    else if (security_5g == "2" || security_5g == "3" || security_5g == "5" || security_5g == "6")
    {
        $('#wpa_5G_pass')[0].style.display="block";
        $('#wpa_5G_radius')[0].style.display="none";
    }
    /* Enterprise */
    else if (security_5g == "4")
    {
        $('#wpa_5G_pass')[0].style.display="none";
        $('#wpa_5G_radius')[0].style.display="block";
    } 
}

function init_5g1SecurityType()
{
    var security_5g1 = $("input[name='5G1Security']:checked").val();
        
    /* none */
    if (security_5g1 == "1")
    {
        $('#wpa_5G1_pass')[0].style.display="none";
        $('#wpa_5G1_radius')[0].style.display="none";
    }
    /* WPA2-PSK, WPA-PSK+WPA2-PSK, WPA3-PSK, WPA2+WPA3 show passphrase field */
    else if (security_5g1 == "2" || security_5g1 == "3" || security_5g1 == "5" || security_5g1 == "6")
    {
        $('#wpa_5G1_pass')[0].style.display="block";
        $('#wpa_5G1_radius')[0].style.display="none";
    }
    /* Enterprise */
    else if (security_5g1 == "4")
    {
        $('#wpa_5G1_pass')[0].style.display="none";
        $('#wpa_5G1_radius')[0].style.display="block";
    } 
}

var WpaAuto_alert_already_show_2g = false;
var WpaEnterprise_alert_already_show_2g = false;
function security_2g_alert()
{
    var security_2g = $("input[name='2GSecurity']:checked").val();
    
    if(security_2g == 3) //WPA-PSK+WPA2-PSK
    { 
        var is_54Mbps = ($("select[name=2GMode]").val() == "1")
        if (is_54Mbps == false && WpaAuto_alert_already_show_2g == false) // opmode != 54Mbps
        {
            WpaAuto_alert_already_show_2g = true;
            /* Show alert message "WPA-PSK [TKIP] may only operate at Up to 54Mbps" */
            setTimeout(function(){
                alert(window.top.mlang["SWSW04"]);
            },10);
        }
    }
    if(security_2g == 4) //WPA/WPA2 enterprise
    {
        if (WpaEnterprise_alert_already_show_2g == false) {
            WpaEnterprise_alert_already_show_2g = true;
            /* Show alert message "WPA/WPA2 Enterprise cannot work with WPS" */
            setTimeout(function(){
                alert(window.top.mlang["SGNW01"]);
            },10);
        }
    }
}

var WpaAuto_alert_already_show_5g = false;
var WpaEnterprise_alert_already_show_5g = false;
function security_5g_alert()
{
    var security_5g = $("input[name='5GSecurity']:checked").val();
        
    if(security_5g == 3) //WPA-PSK+WPA2-PSK
    {
        if (WpaAuto_alert_already_show_5g == false) 
        {
            WpaAuto_alert_already_show_5g = true;
            /* Show alert message "WPA-PSK [TKIP] may only operate at legacy rate, not N or AC rate"  */
            setTimeout(function(){
            alert(window.top.mlang["SWSW10"]);
            },10);
        }
    }
    if(security_5g == 4) //WPA/WPA2 enterprise
    {
        if (WpaEnterprise_alert_already_show_5g == false) 
        {
            WpaEnterprise_alert_already_show_5g = true;
            /* Show alert message ""WPA/WPA2 Enterprise cannot work with WPS"  */
            setTimeout(function(){
            alert(window.top.mlang["SGNW01"]);
            },10);
        }
    }
}

var WpaAuto_alert_already_show_5g1 = false;
var WpaEnterprise_alert_already_show_5g1 = false;
function security_5g1_alert()
{
    var security_5g1 = $("input[name='5G1Security']:checked").val();
        
    if(security_5g1 == 3) //WPA-PSK+WPA2-PSK
    {
        if (WpaAuto_alert_already_show_5g1 == false) 
        {
            WpaAuto_alert_already_show_5g1 = true;
            /* Show alert message "WPA-PSK [TKIP] may only operate at legacy rate, not N or AC rate"  */
            setTimeout(function(){
            alert(window.top.mlang["SWSW10"]);
            },10);
        }
    }
    if(security_5g1 == 4) //WPA/WPA2 enterprise
    {
        if (WpaEnterprise_alert_already_show_5g1 == false) 
        {
            WpaEnterprise_alert_already_show_5g1 = true;
            /* Show alert message ""WPA/WPA2 Enterprise cannot work with WPS"  */
            setTimeout(function(){
            alert(window.top.mlang["SGNW01"]);
            },10);
        }
    }
}

function checkRegion(init_country)
{
    var changeMsg = window.top.mlang["SWSW01"];

    /* Show a warnning message when the user want to change region. */
    if($('select[name=country]').val() != init_country)
    {
        if(!confirm(changeMsg))
            return false;
    }
    
    return true;
}

function checkSsidBroadcast()
{
    var showed_ssid_bc_msg = false;

    if($('[name=2GSsidBroadcast]').val() == "false") 
    {
        // show warnning "WPS requires SSID broadcasting"
        if (!confirm(window.top.mlang["SWSW11"]))
        {
            return false;
        }
        showed_ssid_bc_msg = true;
    }

    if($('[name=5GSsidBroadcast]').val() == "false") 
    {
        if (showed_ssid_bc_msg == false) 
        {
            // show warnning "WPS requires SSID broadcasting"
            if (!confirm(window.top.mlang["SWSW11"]))
            {
                return false;
            }
            showed_ssid_bc_msg = true;
        }
    }
/*
    if($('#5G1SsidBroadcast').val() == "false") 
    {
        if (showed_ssid_bc_msg == false) 
        {
            // show warnning "WPS requires SSID broadcasting"
            if (!confirm(window.top.mlang["SWSW11"]))
            {
                return false;
            }
        }
    }
*/    
    return true;
}

function checkSsid()
{
    if ($('[name=2GSsid]').val() == "")
    {
        alert(window.top.mlang["SWSE07"]);
        return false;
    }

    if ($('[name=2GSsid]').val().match( /[^\x20-\x7E]/ ))
    {
        alert(window.top.mlang["SWSE02"]);
        return false;
    }

    if ($('[name=5GSsid]').val() == "")
    {
        alert(window.top.mlang["SWSE07"]);
        return false;
    }
    
    if ($('[name=5GSsid]').val().match( /[^\x20-\x7E]/ ))
    {
        alert(window.top.mlang["SWSE02"]);
        return false;
    }
/*
    if ($('#5G1Ssid').val() == "")
    {
        alert(window.top.mlang["SWSE07"]);
        return false;
    }
    
    if ($('#5G1Ssid').val().match( /[^\x20-\x7E]/ ))
    {
        alert(window.top.mlang["SWSE02"]);
        return false;
    }
*/     
    //Main & Guest SSIDs can NOT be set to the same name
    if ($('[name=2GSsid]').val() == $('[name=2GGuestSsid]').val() ||
        $('[name=2GSsid]').val() == $('[name=5GGuestSsid]').val() ||
        $('[name=5GSsid]').val() == $('[name=2GGuestSsid]').val() ||
        $('[name=5GSsid]').val() == $('[name=5GGuestSsid]').val() ) {
        //"The SSID is duplicate, please change to another one."
        alert(window.top.mlang["SGNW02"]);
        return false;
    }
    return true;
}


function checkSecurityType()
{       
    var security_2g = $("input[name='2GSecurity']:checked").val();
    var security_5g = $("input[name='5GSecurity']:checked").val();
    //var security_5g1 = $("input[name='5G1Security']:checked").val();
    
    //Security option is set to None
    //if (security_2g == "1" || security_5g == "1" || security_5g1 == "1") {
    if (security_2g == "1" || security_5g == "1") {
        // none security warnning
        if (!confirm(window.top.mlang["SWSW12"])){
            return false;
        }
    }
       
    //Security option is set to WPA2-PSK, WPA-AUTO-PSK, WPA3-PSK or WPA2+WPA3 (2.4GHz)
    if (security_2g == "2" || security_2g == "3" || security_2g == "6")
    {
        //Validation WPA Password
        if($('[name=2GPassword]').val().length == 64)
        {
            if ( isHex($('[name=2GPassword]').val()) == false)
            {
                alert(window.top.mlang["SWSE15"]);
                $('[name=2GPassword]').val("");
                return false;
            }
        }
        else
        {
        if($('[name=2GPassword]').val().length < 8)
        {
            alert(window.top.mlang["SWSE15"]);
            return false;
        }

        if($('[name=2GPassword]').val().length > 63)
        {
                alert(window.top.mlang["SWSE15"]);
                $('[name=2GPassword]').val("");
                return false;
            }

            if ($('[name=2GPassword]').val().match( /[^\x20-\x7E]/ ))
            {
                alert(window.top.mlang["SWSE01"]);
                $('[name=2GPassword]').focus();
                return false;
            }
        }
    }

    if (security_2g == "5" )
    {
        //Validation WPA Password
        if($('[name=2GPassword]').val().length == 128)
        {
            if ( isHex($('[name=2GPassword]').val()) == false)
            {
                alert(window.top.mlang["SWSE15"].replace("63", "127").replace("64", "128"));
                $('[name=2GPassword]').val("");
                return false;
            }
        }
        else
        {
            if($('[name=2GPassword]').val().length < 8)
            {
                alert(window.top.mlang["SWSE15"].replace("63", "127").replace("64", "128"));
                return false;
            }

            if($('[name=2GPassword]').val().length > 127)
            {
                alert(window.top.mlang["SWSE15"].replace("63", "127").replace("64", "128"));
                $('[name=2GPassword]').val("");
                return false;
            }

        if ($('[name=2GPassword]').val().match( /[^\x20-\x7E]/ ))
        {
            alert(window.top.mlang["SWSE01"]);
            $('[name=2GPassword]').focus();
            return false;
        }
    }

    }

    //Security option is set to WPA2-PSK, WPA-AUTO-PSK, WPA3-PSK or WPA2+WPA3 (5GHz)
    if (security_5g == "2" || security_5g == "3" || security_5g == "6")
    {
        //Validation WPA Password
        if($('[name=5GPassword]').val().length == 64)
        {
            if ( isHex($('[name=5GPassword]').val()) == false)
            {
                alert(window.top.mlang["SWSE15"]);
                $('[name=5GPassword]').val("");
                return false;
            }
        }
        else
        {
        if($('[name=5GPassword]').val().length < 8)
        {
            alert(window.top.mlang["SWSE15"]);
            return false;
        }

        if($('[name=5GPassword]').val().length > 63)
        {
                alert(window.top.mlang["SWSE15"]);
                $('[name=5GPassword]').val("");
                return false;
            }

            if ($('[name=5GPassword]').val().match( /[^\x20-\x7E]/ ))
            {
                alert(window.top.mlang["SWSE01"]);
                $('[name=5GPassword]').focus();
                return false;
            }
        }
    }

    if (security_5g == "5" )
    {
        //Validation WPA Password
        if($('[name=5GPassword]').val().length == 128)
        {
            if ( isHex($('[name=5GPassword]').val()) == false)
            {
                alert(window.top.mlang["SWSE15"].replace("63", "127").replace("64", "128"));
                $('[name=5GPassword]').val("");
                return false;
            }
        }
        else
        {
            if($('[name=5GPassword]').val().length < 8)
            {
                alert(window.top.mlang["SWSE15"].replace("63", "127").replace("64", "128"));
                return false;
            }

            if($('[name=5GPassword]').val().length > 127)
            {
                alert(window.top.mlang["SWSE15"].replace("63", "127").replace("64", "128"));
                $('[name=5GPassword]').val("");
                return false;
            }

        if ($('[name=5GPassword]').val().match( /[^\x20-\x7E]/ ))
        {
            alert(window.top.mlang["SWSE01"]);
            $('[name=5GPassword]').focus();
            return false;
        }
    }

    }
/*        
    //Security option is set to WPA2-PSK, WPA-AUTO-PSK, WPA3-PSK or WPA2+WPA3 (5GHz-High)
    if (security_5g1 == "2" || security_5g1 == "3" || security_5g1 == "5" || security_5g1 == "6")
    {
        //Validation WPA Password
        if($('#5G1Password').val().length < 8)
        {
            alert(window.top.mlang["SWSE15"]);
            return false;
        }
        if($('#5G1Password').val().length > 63)
        {
            if ( isHex($('#5G1Password').val()) == false)
            {
                alert(window.top.mlang["SWSE15"]);
                $('#5G1Password').val("");
                return false;
            }
        }

        if ($('#5G1Password').val().match( /[^\x20-\x7E]/ ))
        {
            alert(window.top.mlang["SWSE01"]);
            $('#5G1Password').focus();
            return false;
        }
    }
*/    
    //Security option is set to Enterprise (2.4GHz)
    if (security_2g == "4")
    {
        /* ip checking  */
        if(!$('[name=2GRadiusIP]').inputmask("isComplete"))
        {
            alert(window.top.mlang["SWPE05"]);
            return false;
        }

        /* port  checking */ 
        if(isNaN($('[name=2GRadiusPort]').val()) || parseInt($('[name=2GRadiusPort]').val()) > 65535 || parseInt($('[name=2GRadiusPort]').val()) < 0)
        {
            alert(window.top.mlang["SWSE12"]);
            return false;
        }

        /* share screct length checking */
        if($('[name=2GRadiusSecret]').val().length == 0 || $('[name=2GRadiusSecret]').val().length > 128 || $('[name=2GRadiusSecret]').val().match( /[^\x20-\x7E]/ ))
        {
            alert(window.top.mlang["SWSE11"]);
            return false;
        }
    }

    //Security option is set to Enterprise (5GHz)
    if (security_5g == "4")
    {
        // ip checking
        if(!$('[name=5GRadiusIP]').inputmask("isComplete"))
        {
            alert(window.top.mlang["SWPE05"]);
            return false;
        }

        // port  checking
        if(isNaN($('[name=5GRadiusPort]').val()) || parseInt($('[name=5GRadiusPort]').val()) > 65535 || parseInt($('[name=5GRadiusPort]').val()) < 0)
        {
            alert(window.top.mlang["SWSE12"]);
            return false;
        }

        // share screct length checking 
        if($('[name=5GRadiusSecret]').val().length == 0 || $('[name=5GRadiusSecret]').val().length > 128 || $('[name=5GRadiusSecret]').val().match( /[^\x20-\x7E]/ ))
        {
            alert(window.top.mlang["SWSE11"]);
            return false;
        }
    }
/*        
    //Security option is set to Enterprise (5GHz-High)
    if (security_5g1 == "4")
    {
        // ip checking  
        if(!$('#5G1RadiusIP').inputmask("isComplete"))
        {
            alert(window.top.mlang["SWPE05"]);
            return false;
        }

        // port  checking 
        if(parseInt($('#5G1RadiusPort').val()) > 65535 || parseInt($('#5G1RadiusPort').val()) < 0)
        {
            alert(window.top.mlang["SWSE12"]);
            return false;
        }

        // share screct length checking 
        if($('#5G1RadiusSecret').val().length > 128)
        {
            alert(window.top.mlang["SWSE11"]);
            return false;
        }
    }
*/    
    return true;
}

function isHex(str) {
    var i;
    for(i = 0; i<str.length; i++) {
        var c = str.substring(i, i+1);
        if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
            continue;
        }
        return false;
    }
    return true;
}


/* WiFi Schedule Table functions ------------------------------------->Begin */
function show_WifiSche_form()
{
    $("#target").hide();
    $("#target button[name='apply']").attr("id", "");
    $("#target button[name='cancel']").attr("id", "");
    $("#target_sche").show();
    $("#target_sche button[name='apply_sch']").attr("id", "apply");
    $("#target_sche button[name='cancel_sch']").attr("id", "cancel");

    /* Load the wifi schedule help page  */
    loadhelp('WLG_wireless_sche','');
}

function greyout_weekdays_checkbox(val)
{
    if (val == true)
    {
        $(".weekdays").css("pointer-events", "none");
        $(".weekdays").css("opacity", "0.5");
    }
    else
    {
        $(".weekdays").css("pointer-events", "");
        $(".weekdays").css("opacity", "");
    }
}

function isSchRule_Conflict(sel_index)
{
    var startTime = $("select[name='startTime']").val();
    var endTime = $("select[name='endTime']").val();
    var isSunday = $("[name='isSunday']").val();
    var isMonday = $("[name='isMonday']").val();
    var isTuesday = $("[name='isTuesday']").val();
    var isWednesday = $("[name='isWednesday']").val();
    var isThursday = $("[name='isThursday']").val();
    var isFriday = $("[name='isFriday']").val();
    var isSaturday = $("[name='isSaturday']").val();
    var isEveryDay = $("[name='isEveryDay']:checked").val();
    var isAllDayChecked = (isSunday == "true" && isMonday == "true" && isTuesday == "true" && isWednesday == "true" && isThursday == "true" && isFriday == "true" && isSaturday == "true") ? "true" : "false";
    
    var radio = $("input[name='wlanRadio']").val();
    var action = $("input[name='action']").val();
    var table;
    var rows;
    var i;
        
    if (radio == "2G") {
        table = document.getElementById("schedule_bgn_table");
    }
    else {
        table = document.getElementById("schedule_an_table");
    }
        
    rows = table.getElementsByTagName("tr");
        
    for (i = 1; i < rows.length; i++)
    {
        var tmpIndex = rows[i].getElementsByTagName("td")[4].innerHTML;
        var tmpStartTime = rows[i].getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML;
        var tmpEndTime = rows[i].getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerHTML;
        var tmpDays = rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerHTML;
            
        var tmpIsSunday = (tmpDays.indexOf("Sunday") == -1) ? "false" : "true";
        var tmpIsMonday = (tmpDays.indexOf("Monday") == -1) ? "false" : "true";
        var tmpIsTuesday = (tmpDays.indexOf("Tuesday") == -1) ? "false" : "true";
        var tmpIsWednesday = (tmpDays.indexOf("Wednesday") == -1) ? "false" : "true";
        var tmpIsThursday = (tmpDays.indexOf("Thursday") == -1) ? "false" : "true";
        var tmpIsFriday = (tmpDays.indexOf("Friday") == -1) ? "false" : "true";
        var tmpIsSaturday = (tmpDays.indexOf("Saturday") == -1) ? "false" : "true";
        var tmpIsEveryDay = (tmpDays.indexOf("Every Day") == -1) ? "false" : "true";
        
            
        //No need to compare the editing rule with the table rule which refers to the editing rule itself
        if (action == "edit" && sel_index == tmpIndex) {
            continue;
        }
            
        //check if the editing rule is same with any existing rule
        if (tmpStartTime == startTime && tmpEndTime == endTime) {
            if (tmpIsEveryDay == "true" && isEveryDay == "true")
            {
                return true;
            }
            else if (tmpIsEveryDay == "true" && isAllDayChecked == "true")
            {
                return true;
            }
            else if (tmpIsSunday == isSunday && tmpIsMonday == isMonday &&
                     tmpIsTuesday == isTuesday && tmpIsWednesday == isWednesday &&
                     tmpIsThursday == isThursday && tmpIsFriday == isFriday &&
                     tmpIsSaturday == isSaturday)
            {
                return true;
            }
        }
    }
        
    return false;
}
/* WiFi Schedule Table functions <-------------------------------------End */
    

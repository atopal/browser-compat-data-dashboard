const bcd = require('mdn-browser-compat-data');
const entries = (bcd);
const browsers = ["webview_android", "chrome","chrome_android", "edge", "edge_mobile", "firefox", "firefox_android", "ie", "nodejs", "opera", "opera_android", "qq_android", "safari", "safari_ios", "samsunginternet_android", "uc_android", "uc_chinese_android"];
let csvfile = "feature, "; 

browsers.forEach(function(browser){
  csvfile= csvfile+browser + ", ";
});
csvfile=csvfile+"\n";


function extract_support(supportobject) {
  csvfile=csvfile+ ", ";
  browsers.forEach(function(browser){
  let issue = false;
  let exists = supportobject.support.hasOwnProperty(browser);

  if (!exists) {
    issue=true;
    csvfile=csvfile+ "not in JSON, ";
  } 
  if (exists) {
    let helper=(JSON.stringify(supportobject.support[browser]));
    if (helper.includes("true")){
      issue=true;
      csvfile=csvfile+ "true value, ";
    }
    if (helper.includes("null")) {
      issue=true;
      csvfile=csvfile+ "null value, ";
    }
  }
  if (!issue) {
   csvfile=csvfile+ "real value, "; //real value might be a version number or "false"
  }
});
csvfile=csvfile+"\n";
}


function testcompat(name, feature_object, path) { 
  let temp_path="";
  for (var x in feature_object) {
    if (x=="__compat") {
      csvfile=csvfile+path;
      extract_support(feature_object[x]);
    }
    else {
      temp_path=path;
      path=path+"/"+x;
      testcompat(x, feature_object[x], path);
      path=temp_path;
    }
   
  }
}

for ( let feature_name in entries) {
  let path2="";
  if (feature_name=="browsers") {
  }
  else{
    path2=feature_name;
  testcompat(feature_name, entries[feature_name], path2);
  } 
}

console.log(csvfile);


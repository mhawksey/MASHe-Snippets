// script used in http://mashe.hawksey.info/google-refine-apps-script-integration
function setup(){
  ScriptProperties.setProperty('active', SpreadsheetApp.getActiveSpreadsheet().getId());
}
function doGet(e){
  var secret ="orangetree"; //must match secret in Google Refine
  if (e.parameter.secret == secret){
    var ss = SpreadsheetApp.openById(ScriptProperties.getProperty('active')); 
    var sheet = ss.getSheetByName("Vertices"); // sheet name of where you want the data to go
    var idx = parseInt(e.parameter.idx); // I had an idx column sequentially numbered to give me a row index
    var geo = e.parameter.geo; // I was passing back some geo data, you can add more variables as long as their name matches what is being passed in the querystring
    sheet.getRange(idx+1,25).setValue(geo); // idx+1 is because I had a header row and 25 is the column number
    var app = UiApp.createApplication(); // included this part so something is returned to refine so that we can filter for errors
    var label = app.createLabel("VALUE ADDED"); // can be anything you like
    app.add(label);
    return app;
  }
}
public class uploadCSVcontroller {

    public Blob contentFile { get; set; }
    public String nameFile { get; set; }
    public Integer rowCount { get; set; }
    public Integer colCount { get; set; }

    public List<List<String>> getResults() {
        List<List<String>> parsedCSV = new List<List<String>>();
        rowCount = 0;
        colCount = 0;
        if (contentFile != null){
            String fileString = contentFile.toString();
            system.debug('contentFile  --->>>>'+contentFile);
            parsedCSV = parseCSV(fileString, true);
            rowCount = parsedCSV.size();
            for (List<String> row : parsedCSV){
                if (row.size() > colCount){
                    system.debug('row   ====>>>'+row);
                    colCount = row.size();
                }
            }
        }
        return parsedCSV;
    }
    /*
    Credit to
    http://wiki.developerforce.com/index.php/Code_Samples#Parse_a_CSV_with_APEX
    */
    public static List<List<String>> parseCSV(String contents,Boolean skipHeaders) {
     List<List<String>> allFields = new List<List<String>>();    
            // replace instances where a double quote begins a field containing a comma    
            // in this case you get a double quote followed by a doubled double quote    
            // do this for beginning and end of a field    
            contents = contents.replaceAll(',"""',',"DBLQT').replaceall('""",','DBLQT",');    
            // now replace all remaining double quotes - we do this so that we can reconstruct    
            // fields with commas inside assuming they begin and end with a double quote    
            contents = contents.replaceAll('""','DBLQT');    
            // we are not attempting to handle fields with a newline inside of them    
            // so, split on newline to get the spreadsheet rows    
            List<String> lines = new List<String>();    
            try {        
                lines = contents.split('\n');  
                system.debug('lines---->>>'+lines);
            } 
            catch (System.ListException e) {        
                System.debug('Limits exceeded?' + e.getMessage());    
            }    
            Integer num = 0;    
            for(String line : lines) {        
                // check for blank CSV lines (only commas)        
           system.debug('line50---->>>'+line);
                if (line.replaceAll(',','').trim().length() == 0) break;
                  system.debug('line---->>>'+line);
                List<String> fields = line.split(',');          
                List<String> cleanFields = new List<String>();        
                String compositeField;        
                Boolean makeCompositeField = false;        
                for(String field : fields) {            
                    if (field.length() > 1 && field.startsWith('"') && field.endsWith('"'))
                        {
                            cleanFields.add(field.replaceAll('DBLQT','"'));            
                        } 
                        else if (field.startsWith('"')) {                
                            makeCompositeField = true;                
                            compositeField = field;            
                        }
                        else if (field.endsWith('"')) {
                            compositeField += ',' + field;                
                            cleanFields.add(compositeField.replaceAll('DBLQT','"'));                
                            makeCompositeField = false;            
                        }
                        else if (makeCompositeField) {                
                            compositeField +=  ',' + field;            
                        }
                        else {
                            cleanFields.add(field.replaceAll('DBLQT','"'));            
                        }        
                    }                
                    allFields.add(cleanFields);    
                }    
                if (skipHeaders) allFields.remove(0);   
        		system.debug('allFields------->>>'+allFields);
                return allFields;       
              
    }

}
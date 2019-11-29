export function func_validateNumbersInForms(lowerLimit,higherLimit,value){
  if(value != ""){
    if(value <= lowerLimit || value > higherLimit){
      return true
    }
    else{
      return false
    }
  }
  else{
    return false
  } 
}
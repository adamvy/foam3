# Concatenate JDAO files from subdirectories into one JDAO
MODE=1
INSTANCE=1
VERSION=1

# Creates an array of the file names 
declare -a arr=( "brokers" "businessSectors" "businessTypes" "cicoServiceProviders" "countries" "cronjobs" "currencies" "corridors" "payoutOptions" "transactionPurposes" "dugs" "emailTemplates" "exportDriverRegistrys" "groups" "institutions" "languages" "menus" "permissions" "questionnaireQuestionJunction" "questionnaires" "questions" "regions" "scripts" "services" "spids" "tests" "transactionLimits" "users" )

# Go through the array and check each location for the file and concatenate into one JDAO
for file in "${arr[@]}"
do
  # Emptys the file
   > $file
  # Checks if file exists, if so grabs the file from there
  if  [[ -f "foam2/src/$file" ]]; then
      cat foam2/src/$file >> $file
  fi
  if  [[ -f "nanopay/src/$file" ]]; then
      cat nanopay/src/$file >> $file
  fi
  if  [[ -f "interac/src/$file" ]]; then
      cat interac/src/$file >> $file
  fi
  if  [[ -f "deployment/$file" ]]; then
      cat deployment/$file >> $file
  fi
  if  [[ -f "deployment/$MODE/$file" ]]; then
      cat deployment/$MODE/$file >> $file
  fi
  if  [[ -f "deployment/$MODE/$INSTANCE/$file" ]]; then
      cat deployment/$MODE/$INSTANCE/$file >> $file
  fi
  if  [[ -f "deployment/$MODE/$INSTANCE/$VERSION/$file" ]]; then
      cat deployment/$MODE/$INSTANCE/$VERSION/$file >> $file
  fi

done

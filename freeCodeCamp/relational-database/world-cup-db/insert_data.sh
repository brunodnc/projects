#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
echo $($PSQL "TRUNCATE TABLE games, teams;")


cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WG OG
do
  if [[ $YEAR != year ]] #Dont read .csv first line
  then
    if [[ "${TEAMS_ARR[@]}" != *"$OPPONENT"* ]] #If teams not already in array, insert team
    then
      TEAMS_ARR+=("$OPPONENT")
    fi
    if [[ "${TEAMS_ARR[@]}" != *"$WINNER"* ]]
    then
      TEAMS_ARR+=("$WINNER")
    fi
    echo "${TEAMS_ARR[@]}" > tmp #Creates temporary file to save LAST LOOP'S RESULT
  fi
done

declare -a TEAMS_ARR=($(cat tmp)) #call temporary file into an array
rm tmp #remove temporary file
for T in "${TEAMS_ARR[@]}"
do
  #United States and Costa Rica space provisory fix:
  if [[ $T == "Costa" ]]
  then
    RESULT=$($PSQL "INSERT INTO teams(name) VALUES ('Costa Rica');")  
  elif [[ $T == "United" ]]
  then
    RESULT=$($PSQL "INSERT INTO teams(name) VALUES ('United States');")
  elif [[ $T == "Rica" || $T == "States" ]]
  then
    echo Need to learn how to quickly deal with this space on array formation problem later
  else
  #Insert data into teams table
    RESULT=$($PSQL "INSERT INTO teams(name) VALUES ('$T');")
  fi
  if [[ $RESULT == "INSERT 0 1" ]]
  then
    echo Inserted $T
  else
    echo $($RESULT)
  fi
done

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WG OG
do
  if [[ $YEAR != year ]]
  then
    #Get winner and opponent team_id
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER';")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT';")
    echo WINNER_ID is $WINNER_ID
    echo OPPONENT_ID is $OPPONENT_ID
    echo $WG
    #Insert data into games table
    RESULT=$($PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WG, $OG);")
    if [[ $RESULT = "INSERT 0 1"  ]]
    then
      echo Inserted $YEAR $ROUND $WINNER $WG x $OG $OPPONENT
    else
      echo $($RESULT)
    fi
  fi
done
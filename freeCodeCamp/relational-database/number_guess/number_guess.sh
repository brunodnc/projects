#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess --tuples-only --no-align -c"
MAIN() {
  echo "Enter your username:"
  read USERNAME
  #checks if already registered
  USER=$($PSQL "SELECT name FROM users WHERE name = '$USERNAME';")
  if [[ -z $USER ]]; then
    NEW_USER=1
    echo "Welcome,  $USERNAME! It looks like this is your first time here."
  else
  #find user data
    PLAYED_GAMES=$($PSQL "SELECT COUNT(game_id) FROM games INNER JOIN users USING(user_id) WHERE name = '$USERNAME' GROUP BY user_id;")
    TRIES=$($PSQL "SELECT MIN(tries) FROM games INNER JOIN users USING(user_id) WHERE name = '$USERNAME' GROUP BY user_id;")
    echo "Welcome back, $USERNAME! You have played $PLAYED_GAMES games, and your best game took $TRIES guesses."
  fi
  NUMBER=$((1 + $RANDOM % 1000))
  echo "R NUMBER: $NUMBER"
  GUESS=0
  TRIES=0
  echo "Guess the secret number between 1 and 1000:"
  while [[ $GUESS != $NUMBER ]]; do
    read GUESS
    if [[ $GUESS = $NUMBER ]]; then
      TRIES=$(($TRIES + 1))
      if [[ $NEW_USER = 1 ]]; then
        REGISTER_USER=$($PSQL "INSERT INTO users(name) VALUES ('$USERNAME');")
      fi
      USER_ID=$($PSQL "SELECT user_id FROM users WHERE name = '$USERNAME';")
      REGISTER_GAME=$($PSQL "INSERT INTO games(tries, user_id) VALUES ($TRIES, $USER_ID);")
      echo "You guessed it in $TRIES tries. The secret number was $NUMBER. Nice job!"
    elif [[ ! $GUESS =~ ^[0-9]+$ ]]; then
      echo "That is not an integer, guess again:"
    elif [[ $GUESS < $NUMBER ]]; then
      TRIES=$(($TRIES + 1))
      echo "It's higher than that, guess again:"
    elif [[ $GUESS > $NUMBER ]]; then
      TRIES=$(($TRIES + 1))
      echo "It's lower than that, guess again:"
    fi
  done
  exit
}
MAIN